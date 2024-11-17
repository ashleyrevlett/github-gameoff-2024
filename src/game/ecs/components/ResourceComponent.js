import { Component } from '../types';

export class ResourceComponent extends Component {
  constructor(entityId, type, initial = 0, max = 100, perSecond = 0, unlocked = false, unlockedBy = null, unlockedAtLevel = null) {
    super(entityId);
    this.type = type;
    this.current = initial;
    this.max = max;
    this.perSecond = perSecond;
    this.level = 1;
    this.unlocked = unlocked;
    this.unlockedBy = unlockedBy;
    this.unlockedAtLevel = unlockedAtLevel;
  }

  triggerAction() {
    console.log('triggerAction', this.type);
    this.current = Math.min(this.max, this.current + 1 * this.level);
  }

  unlock() {
    this.unlocked = true;

  }
}
