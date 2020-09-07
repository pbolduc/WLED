#pragma once

#include "wled.h"

#define ELAPSED(current, previous) ((previous) <= (current) ? (current) - (previous) : (UINT32_MAX - previous) + current)

class UsermodLatency : public Usermod {
  private:
    unsigned long last;
    unsigned long latency;

  public:
    void setup() {
      last = micros();
    }

    void loop() {
      unsigned long now = micros();
      latency = ELAPSED(now, last);
      last = now;
    }

    void addToJsonInfo(JsonObject& root) {
      JsonObject user = root["u"];
      if (user.isNull()) user = root.createNestedObject("u");

      JsonArray temp = user.createNestedArray("Latency");
      temp.add(latency);
      temp.add(" μs");
      return;
    }

    uint16_t getId()
    {
      // just reuse the temperature id
      return USERMOD_ID_TEMPERATURE;
    }

};