import { System } from '../types';
import { useECSStore } from '../../../stores/ecsStore';
import { ResourceComponent } from '../components/ResourceComponent';
import { eventBus } from '../../services/EventBus';

export class ResourceSystem extends System {
  update(deltaTime) {
    const store = useECSStore();
    const resources = store.getComponents('ResourceComponent');

    for (const resource of resources) {
      if (!resource.unlocked) continue;


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
    eventBus.emit('resource:levelUp', {
      type: resource.type,
      level: resource.level,
      entityId: resource.entityId
    });

    if (resource.type === 'faith') {
      const followersResources = useECSStore().getComponents('ResourceComponent').filter(r => r.type === 'followers');
      console.log('faith level up, followersResources', followersResources);
      if (followersResources.length > 0) {
        followersResources[0].current += 1;
      }
    }

    // see if this unlocks any other resources
    // get all resources that are unlocked by this resource
    // and check if the current level satisfies the unlock condition
    // if so, unlock them and emit an event
    const resources = useECSStore().getComponents('ResourceComponent');
    const unlockedResources = resources.filter(r => r.unlockedBy === resource.type && r.unlockedAtLevel <= resource.level);
    for (const unlockedResource of unlockedResources) {
      if (unlockedResource.unlocked) continue;

      unlockedResource.unlock();
      eventBus.emit('resource:unlocked', {
        type: unlockedResource.type,
        entityId: unlockedResource.entityId
      });

      if (unlockedResource.type === 'followers') {
        unlockedResource.current = 1;
      }
    }
  }

}
