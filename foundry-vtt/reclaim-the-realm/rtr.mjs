import * as dataModels from "./module/data/_module.mjs";

Hooks.once("init", () => {
  // Configure custom Document implementations.
  CONFIG.Actor.documentClass = Actor;
  CONFIG.Item.documentClass = Item;

  // Configure System Data Models.
  CONFIG.Actor.dataModels = dataModels.actor.config;
  CONFIG.Item.dataModels = dataModels.item.config;
});