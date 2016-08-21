import {PositionComponent} from '../components/positionComponent';
import {SizeComponent} from '../components/sizeComponent';
import {SpriteComponent} from '../components/spriteComponent';
import {Entity} from '../entities/entity';

export class RenderSystem {

  static meetsSystemRequisites(entity:Entity):boolean{
    return entity.components['size'] && entity.components['position'] && entity.components['sprite'];
  }

  static invoke(entities, ctx:CanvasRenderingContext2D):void{

    var filteredEntities = entities.filter(RenderSystem.meetsSystemRequisites)

    filteredEntities.forEach(function(entity){
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
