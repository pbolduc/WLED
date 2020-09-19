#pragma once

#include "wled.h"

#define ELAPSED(current, previous) ((previous) <= (current) ? (current) - (previous) : (UINT32_MAX - previous) + current)

template <uint8_t K, class uint_t = uint16_t>
class EMA {
  public:
    /// Update the filter with the given input and return the filtered output.
    uint_t operator()(uint_t input) {
        state += input;
        uint_t output = (state + half) >> K;
        state -= output;
        return output;
    }

    static_assert(
        uint_t(0) < uint_t(-1),  // Check that `uint_t` is an unsigned type
        "The `uint_t` type should be an unsigned integer, otherwise, "
        "the division using bit shifts is invalid.");

    /// Fixed point representation of one half, used for rounding.
    constexpr static uint_t half = 1 << (K - 1);

  private:
    uint_t state = 0;
};

class UsermodLatency : public Usermod {
  private:
    char topic[38] = { 0 };
    EMA<2> filter;
    // the previous micros value
    unsigned long previous = 0;

    unsigned long lastPublish = 0;
    bool firstLoop =  true;

  public:
    void setup() {
      strcpy(topic, mqttDeviceTopic);
      strcat(topic, "/loop-latency");
    }

    void loop() {
      unsigned long current = micros();
      int filteredValue;

      if (firstLoop) {
        // need to capture the first loop time on the first 
        // loop call. cant capture in setup due to other setup
        // additional latency
        firstLoop = false;
      } else {
        unsigned long elapsed = ELAPSED(current, previous);
        filteredValue = filter(elapsed);
      }

      previous = current;


      unsigned long now = millis();
      // publish every 1 second
      if (now - lastPublish < 1000)
      {
        return;
      }

      lastPublish = now;

      Serial.println(filteredValue);

      if (WLED_MQTT_CONNECTED) {
          mqtt->publish(topic, 0, true, String(filteredValue).c_str());
      }
    }

    void addToJsonInfo(JsonObject& root) {
      // do not write to info
    }

    uint16_t getId()
    {
      // just reuse the temperature id
      return USERMOD_ID_TEMPERATURE;
    }

};