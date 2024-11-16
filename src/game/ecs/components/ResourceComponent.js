import { Component } from '../types';

export class ResourceComponent extends Component {
  constructor(entityId, type, initial = 0, max = 100, perSecond = 0) {
    super(entityId);
    this.type = type;
    this.current = initial;
    this.max = max;
    this.perSecond = perSecond;
    this.level = 1;
  }

  triggerAction() {
    console.log('triggerAction', this.type);
    this.current = Math.min(this.max, this.current + 1 * this.level);
  }
}
