#pragma once

#include "wled.h"
#include "FX.h"

// do not use 1-wire search, crc or alarms
#define REQUIRESALARMS 0

#include <DallasTemperature.h> //DS18B20

#ifndef TEMPERATURE_PIN
// pin defaults for QuinLed Dig-Uno
#ifdef ARDUINO_ARCH_ESP32
#define TEMPERATURE_PIN 18
#else // ESP8266 boards
#define TEMPERATURE_PIN 14
#endif
#endif

// the frequency to check temperature, 1 minute
#ifndef USERMOD_DALLASTEMPERATURE_MEASUREMENT_INTERVAL
#define USERMOD_DALLASTEMPERATURE_MEASUREMENT_INTERVAL 60000
#endif

// how many seconds after boot to take first measurement, 20 seconds
#ifndef USERMOD_DALLASTEMPERATURE_FIRST_MEASUREMENT_AT
#define USERMOD_DALLASTEMPERATURE_FIRST_MEASUREMENT_AT 20000
#endif

OneWire oneWire(TEMPERATURE_PIN);
DallasTemperature sensor(&oneWire);

class UsermodTemperature : public Usermod
{
private:
  // set last reading as "40 sec before boot", so first reading is taken after 20 sec
  uint32_t _lastMeasurement = UINT32_MAX - (USERMOD_DALLASTEMPERATURE_MEASUREMENT_INTERVAL - USERMOD_DALLASTEMPERATURE_FIRST_MEASUREMENT_AT);

  // last time requestTemperatures was called
  // used to determine when we can read the sensors temperature
  // we have to wait at least 93.75 ms after requestTemperatures() is called
  uint32_t _lastTemperaturesRequest;

  uint32_t _errorCount = 0;
  uint32_t _errorCountPublished = 0;

  float _temperature = -100; // default to -100, DS18B20 only goes down to -50C

  // indicates requestTemperatures has been called but the sensor measurement is not complete
  bool _waitingForConversion = false;

  // flag to indicate we have finished the first getTemperature call
  // allows this library to report to the user how long until the first
  // measurement
  bool _getTemperatureComplete = false;

  // flag set at startup if DS18B20 sensor not found, avoids trying to keep getting
  // temperature if flashed to a board without a sensor attached
  bool _disabled = false;

  void requestTemperatures()
  {
    // takes 2,114 μs on ESP32
    if (sensor.requestTemperatures())
    { 
      _lastTemperaturesRequest = millis();
      _waitingForConversion = true;
    }
    else
    {
      DEBUG_PRINTLN("sensor.requestTemperatures failed");
      _errorCount++;
    }
  }

  void getTemperature()
  {
    // #ifdef USERMOD_DALLASTEMPERATURE_CELSIUS
    // temperature = sensor.getTempC(sensorDeviceAddress); // takes 12,729 μs on ESP32
    // #else
    // temperature = sensor.getTempF(sensorDeviceAddress);
    // #endif

    float currentTemperature;
    // readTemperature takes 3,219 μs on ESP32
    if (sensor.readTemperature(&currentTemperature, 9))
    { 
      _temperature = currentTemperature;

#ifndef USERMOD_DALLASTEMPERATURE_CELSIUS
      _temperature = _temperature * 1.8 + 32; // C => F
#endif

      _lastMeasurement = millis();

      DEBUG_PRINT("Dallas Temperature Sensor: ");
      DEBUG_PRINT("Temperature: ");
      DEBUG_PRINTLN(_temperature);
    }
    else
    {
      DEBUG_PRINTLN("Dallas Temperature Sensor: readTemperature failed");
      _errorCount++;
    }

    // reset the state
    _waitingForConversion = false;
    _getTemperatureComplete = true;
  }

  void publishTemperatureToMqtt()
  {
    char subuf[38];

    if (WLED_MQTT_CONNECTED)
    {
      if (-100 <= _temperature)
      {
        // dont publish super low temperature as the graph will get messed up
        // the DallasTemperature library returns -127C or -196.6F when problem
        // reading the sensor
        strcpy(subuf, mqttDeviceTopic);
        strcat(subuf, "/temperature");
        mqtt->publish(subuf, 0, true, String(_temperature).c_str());
      }
      else
      {
        DEBUG_PRINTLN("Temperature error");
      }
    }
  }

  void publishErrorsToMqtt()
  {
    // if there are no errors, then do not publish
    if (_errorCount == 0)
    {
      return;
    }

    // publih at most once every 30 seconds
    uint32_t now = millis();
    if (now - _errorCountPublished < 30000) {
      return;
    }

    DEBUG_PRINT("Dallas Temperature Sensor errors: ");
    DEBUG_PRINTLN(_errorCount);

    char subuf[38];

    if (WLED_MQTT_CONNECTED)
    {
      strcpy(subuf, mqttDeviceTopic);
      strcat(subuf, "/errors");
      mqtt->publish(subuf, 0, true, String(_errorCount).c_str());
      _errorCountPublished = now;
    }
  }

  /* Returns a value indicating the strip is on and scheduled to be updated in the next 4 milliseconds. */
  bool isStripUpdatingSoon()
  {
    // LEDs are on and the strip is due to be updated within 4 ms
    return !offMode && millis() - strip.getLastShow() >= (MIN_SHOW_DELAY - 4);
  }

public:
  void setup()
  {
    //sensor.begin(); // we dont need to call sensor begin, it only does a search of the 1-wire bus

    // get the first (only) device address
    DeviceAddress deviceAddress;
    _disabled = sensor.getAddress(deviceAddress, 0);

    if (!_disabled)
    {
      DEBUG_PRINTLN("Dallas Temperature Sensor: ok");
      sensor.setResolution(deviceAddress, 9, true);
      sensor.setWaitForConversion(false); // do not block waiting for reading
    }
    else
    {
      DEBUG_PRINTLN("Dallas Temperature Sensor: error");
      _errorCount++;
    }
  }

  void loop()
  {
    if (_disabled)
    {
      return;
    }

    uint32_t now = millis();

    // check to see if we are due for taking a measurement
    // _lastMeasurement will not be updated until the conversion
    // is complete the the reading is finished
    if (now - _lastMeasurement < USERMOD_DALLASTEMPERATURE_MEASUREMENT_INTERVAL)
    {
      return;
    }

    if (isStripUpdatingSoon())
    {
      return; // LEDs are on and the strip is due to be updated within 4 ms
    }

    // we are due for a measurement, if we are not already waiting
    // for a conversion to complete, then make a new request for temps
    if (!_waitingForConversion)
    {
      requestTemperatures();
      return;
    }

    // we were waiting for a conversion to complete, have we waited log enough?
    if (now - _lastTemperaturesRequest >= 94 /* 93.75ms per the datasheet */)
    {
      getTemperature();
      publishTemperatureToMqtt();
    }

    // handle publishing errors 
    publishErrorsToMqtt();
  }

  void addToJsonInfo(JsonObject &root)
  {
    // dont add temperature to info if we are disabled
    JsonObject user = root["u"];

    if (user.isNull())
    {
      user = root.createNestedObject("u");
    }

    JsonArray temp = user.createNestedArray("Temperature");

    if (!_getTemperatureComplete)
    {
      // if we haven't read the sensor yet, let the user know
      // that we are still waiting for the first measurement
      temp.add((USERMOD_DALLASTEMPERATURE_FIRST_MEASUREMENT_AT - millis()) / 1000);
      temp.add(" sec until read");
      return;
    }

    if (_temperature <= -100)
    {
      temp.add("Sensor Error");
      if (_disabled)
      {
        temp.add(" (disabled)");
      }
      return;
    }

    temp.add(_temperature);
#ifdef USERMOD_DALLASTEMPERATURE_CELSIUS
    temp.add("°C");
#else
    temp.add("°F");
#endif
  }

  uint16_t getId()
  {
    return USERMOD_ID_TEMPERATURE;
  }
};
