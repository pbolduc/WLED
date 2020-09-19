#pragma once

#include "wled.h"

#define ELAPSED(current, previous) ((previous) <= (current) ? (current) - (previous) : (UINT32_MAX - previous) + current)

#define SAMPLE_COUNT 1000

class UsermodLatency : public Usermod {
  private:
    unsigned long samples[SAMPLE_COUNT];
    unsigned long total = 0;
    unsigned long samples_count = 0;

    // the previous micros value
    unsigned long previous = 0;
    // true if we have populated all SAMPLE_COUNT samples
    bool full_samples = false;
    bool firstLoop = true;

    unsigned long lastPublish = 0;

  public:
    void setup() {
    }

    void loop() {
      unsigned long current = micros();

      if (firstLoop) {
        // need to capture the first loop time on the first 
        // loop call. cant capture in setup due to other setup
        // additional latency
        firstLoop = false;
      } else {
        // calculate the time between loop() calls
        unsigned long sample = ELAPSED(current, previous);

        samples[samples_count++] = sample;
        total += sample;

        // just keep accumulating the samples until our rolling
        // average buffer is full
        if (!full_samples) {
          full_samples = (samples_count == SAMPLE_COUNT);
        } else {
          // subtract the oldest value from the total
          total -=  samples[samples_count % SAMPLE_COUNT];
        }
      }

      previous = current;


      unsigned long now = millis();
      // publish every 5 seconds
      if (now - lastPublish < 5000)
      {
        return;
      }

      lastPublish = now;

      if (WLED_MQTT_CONNECTED) {
          float average = (1.0/SAMPLE_COUNT)  * total;

          char topic[38];
          strcpy(topic, mqttDeviceTopic);
          strcat(topic, "/loop-latency");
          mqtt->publish(topic, 0, true, String(average).c_str());
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