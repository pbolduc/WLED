#pragma once

#include "wled.h"

#define ELAPSED(current, previous) ((previous) <= (current) ? (current) - (previous) : (UINT32_MAX - previous) + current)

class UsermodLatency : public Usermod {
  private:
    unsigned long last;
    unsigned long latency;

    unsigned long latencyMax;

  public:
    void setup() {
      last = micros();
    }

    void loop() {
      unsigned long now = micros();
      latency = ELAPSED(now, last);
      // only measure the max latency after we have been booted for 2 seconds
      if (latencyMax < latency && 2000000 <= now ) {
        latencyMax = latency;
      }
      last = now;
    }

    void addToJsonInfo(JsonObject& root) {
      JsonObject user = root["u"];
      if (user.isNull()) user = root.createNestedObject("u");

      JsonArray temp = user.createNestedArray("Latency");
      temp.add(latency);
      temp.add(" μs");

      temp = user.createNestedArray("Max Latency");
      temp.add(latencyMax);
      temp.add(" μs");
      return;
    }

    uint16_t getId()
    {
      // just reuse the temperature id
      return USERMOD_ID_TEMPERATURE;
    }

};