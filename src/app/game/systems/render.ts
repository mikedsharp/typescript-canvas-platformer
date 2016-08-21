import {PositionComponent} from '../components/positionComponent';
import {SizeComponent} from '../components/sizeComponent';
import {SpriteComponent} from '../components/spriteComponent';
import {Entity} from '../entities/entity';

export class RenderSystem {

  static meetsSystemRequisites(entity:Entity):boolean{
    return entity.components['size'] && entity.components['position'] && entity.components['sprite'];
  }

  static invoke(entities, ctx:CanvasRenderingContext2D, dt:number):void{

    var filteredEntities = entities.filter(RenderSystem.meetsSystemRequisites)

    filteredEntities.forEach(function(entity){

      let frame = {
        currentFrame: 0,
        animationType:0
      };

      if(entity.components['animation']){
          frame.currentFrame = entity.components.animation.currentFrame;
          frame.animationType = entity.components.animation.animationType;
      }

      ctx.drawImage(
                    entity.components.sprite.image,
                    frame.currentFrame * entity.components.size.width,
                    frame.animationType * entity.components.size.height,
                    entity.components.size.width,
                    entity.components.size.height,
                    entity.components.position.x,
                    entity.components.position.y,
                    entity.components.size.width,
                    entity.components.size.height);

      if(entity.components['animation'] && entity.components['animation'].animating ){

           let currentTicks = new Date().getTime();
           let pastTime = (currentTicks - entity.components.animation.lastIteration);

           if(pastTime >=  entity.components.animation.updateRate){
             entity.components.animation.currentFrame++;

             if(entity.components.animation.currentFrame == entity.components.animation.frameCount){
               entity.components.animation.currentFrame = 0;
             }

             entity.components.animation.lastIteration = currentTicks;
           }
      }
    });

  }
}
