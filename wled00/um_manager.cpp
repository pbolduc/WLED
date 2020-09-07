#include "wled.h"
/*
 * Registration and management utility for v2 usermods
 */

#define ELAPSED(current, previous) ((previous) <= (current) ? (current) - (previous) : (UINT32_MAX - previous) + current)

//Usermod Manager internals
void UsermodManager::loop()      {

  unsigned long now = millis();

  // only run the usermod loop at max once every 100ms
  if (100 <= ELAPSED(now, loopExecutedAt)) {
    for (byte i = 0; i < numMods; i++) ums[i]->loop();
    loopExecutedAt = now;
  }
}

void UsermodManager::setup()     { for (byte i = 0; i < numMods; i++) ums[i]->setup(); }
void UsermodManager::connected() { for (byte i = 0; i < numMods; i++) ums[i]->connected(); }

void UsermodManager::addToJsonState(JsonObject& obj)    { for (byte i = 0; i < numMods; i++) ums[i]->addToJsonState(obj); }
void UsermodManager::addToJsonInfo(JsonObject& obj)     { for (byte i = 0; i < numMods; i++) ums[i]->addToJsonInfo(obj); }
void UsermodManager::readFromJsonState(JsonObject& obj) { for (byte i = 0; i < numMods; i++) ums[i]->readFromJsonState(obj); }

bool UsermodManager::add(Usermod* um)
{
  if (numMods >= WLED_MAX_USERMODS || um == nullptr) return false;
  ums[numMods] = um;
  numMods++;
}

byte UsermodManager::getModCount() {return numMods;}