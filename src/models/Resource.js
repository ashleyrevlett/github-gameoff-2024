import { reactive } from 'vue';

// attributes and resources
export class Resource {
  constructor(resourceType, current = 0, max = 10, perSecond = 0, level = 1, unlocked = false, unlockedBy = undefined) {
    const resource = reactive({
      resourceType,
      current,
      max,
      perSecond,
      level,
      unlocked,
      unlockedBy
    });
    return resource;
  }

  // Static method to deserialize from JSON
  static fromJSON(data) {
    return new Resource(
      data.resourceType,
      data.current,
      data.max,
      data.perSecond,
      data.level,
      data.unlocked,
      data.unlockedBy
    );
  }

  // Static method to serialize multiple resources
  static serializeAll(resources) {
    const serialized = {};
    Object.entries(resources).forEach(([key, resource]) => {
      serialized[key] = {
        resourceType: resource.resourceType,
        current: resource.current,
        max: resource.max,
        perSecond: resource.perSecond,
        level: resource.level,
        unlocked: resource.unlocked,
        unlockedBy: resource.unlockedBy
      };
    });
    return serialized;
  }

  // Static method to deserialize multiple resources
  static deserializeAll(data) {
    const resources = {};
    Object.entries(data).forEach(([key, resourceData]) => {
      resources[key] = Resource.fromJSON(resourceData);
    });
    return resources;
  }
}