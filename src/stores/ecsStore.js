import { defineStore } from 'pinia';

export const useECSStore = defineStore('ecs', {
  state: () => ({
    entities: new Map(),
    components: new Map(),
    lastTick: Date.now(),
  }),

  actions: {
    getResource(resourceType) {
      const resources = this.getComponents('ResourceComponent');
      return resources.find(r => r.type === resourceType);
    },

    createEntity(id) {
      const entity = { id, components: new Set() };
      this.entities.set(id, entity);
      return entity;
    },

    addComponent(entityId, component) {
      const entity = this.entities.get(entityId);
      if (!entity) return;

      entity.components.add(component.constructor.name);

      if (!this.components.has(component.constructor.name)) {
        this.components.set(component.constructor.name, []);
      }
      this.components.get(component.constructor.name).push(component);
    },

    getComponents(componentType) {
      return this.components.get(componentType) || [];
    },
  },
});