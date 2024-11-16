import { System } from '../types';
import { useECSStore } from '../../../stores/ecsStore';
import { ResourceComponent } from '../components/ResourceComponent';

export class ResourceSystem extends System {
  update(deltaTime) {
    const store = useECSStore();
    const resources = store.getComponents('ResourceComponent');

    for (const resource of resources) {
      resource.current += resource.perSecond * (deltaTime / 1000);
      resource.current = Math.max(0, Math.min(resource.current, resource.max));

      if (resource.current >= resource.max) {
        this.levelUp(resource);
      }
    }
  }

  levelUp(resource) {
    console.log('levelUp', resource.type);
    resource.level += 1;
    resource.max = Math.floor(resource.max * 2.4);
  }
}
