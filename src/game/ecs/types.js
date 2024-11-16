export class Entity {
  constructor(id) {
    this.id = id;
    this.components = new Set();
  }
}

export class Component {
  constructor(entityId) {
    this.entityId = entityId;
  }
}

export class System {
  update(deltaTime) {
    // Override in child classes
  }
}