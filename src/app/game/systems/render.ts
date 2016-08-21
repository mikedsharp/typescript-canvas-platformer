import {Position} from '../components/position';
import {Size} from '../components/size';
import {Sprite} from '../components/sprite';
import {Entity} from '../entities/entity';

export class RenderSystem {

  static meetsSystemRequisites(entity:Entity):boolean{
    return entity.components['size'] && entity.components['position'] && entity.components['sprite'];
  }

  static invoke(entities, ctx:CanvasRenderingContext2D):void{

    var filteredEntities = entities.filter(RenderSystem.meetsSystemRequisites)

    filteredEntities.forEach(function(entity){
      console.log('rendering entity: ' + entity['id']);
      ctx.drawImage(
                    entity.components.sprite.image,
                    0,
                    0,
                    entity.components.size.width,
                    entity.components.size.height,
                    entity.components.position.x,
                    entity.components.position.y,
                    entity.components.size.width,
                    entity.components.size.height);
    });
  }
}
