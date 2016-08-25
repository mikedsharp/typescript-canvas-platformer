import {PositionComponent} from '../components/positionComponent';
import {VelocityComponent} from '../components/velocityComponent';
import {InputStateComponent} from '../components/inputStateComponent';
import {AnimationComponent} from '../components/animationComponent';
import {PlayerAnimationTypes} from '../enums/playerAnimationTypes';
import {Entity} from "../entities/entity";

export class UserInputSystem {

  static meetsSystemRequisites(entity:Entity):boolean{
    return entity.components['position']
      &&   entity.components['velocity']
      &&   entity.components['animation']
      &&  entity.components['inputState'];
  }

  static init():void{
    //set up various event listeners user will need to control the character
    for(var keycode in InputStateComponent.keyStates){
      InputStateComponent.keyStates[keycode] = false;
    }

    window.addEventListener('keydown', UserInputSystem.handleKeydown);
    window.addEventListener('keyup', UserInputSystem.handleKeyup);
  }

  static update(entities, dt:number):void {

    var filteredEntities = entities.filter(UserInputSystem.meetsSystemRequisites)

    filteredEntities.forEach(function (entity) {

      entity.components.animation.animating = true;

      if (InputStateComponent.keyStates['LEFT']) {
        entity.components.position.x -= entity.components.velocity.x * dt;
        entity.components.animation.animationType = PlayerAnimationTypes.PLAYER_LEFT;
      }
      else if (InputStateComponent.keyStates['RIGHT']) {
        entity.components.position.x += entity.components.velocity.x * dt;
        entity.components.animation.animationType = PlayerAnimationTypes.PLAYER_RIGHT;
      }
      else if (InputStateComponent.keyStates['DOWN']) {
        entity.components.position.y += entity.components.velocity.y * dt;
        entity.components.animation.animationType = PlayerAnimationTypes.PLAYER_DOWN;
      }
      else if (InputStateComponent.keyStates['UP']) {
        entity.components.position.y -= entity.components.velocity.y * dt;
        entity.components.animation.animationType = PlayerAnimationTypes.PLAYER_UP;
      } else {
        entity.components.animation.animating = false;
      }


    });
  }

  static destroy():void{
    //remover listeners, this will happen if the user changes state, or component is removed
    window.removeEventListener('keydown', UserInputSystem.handleKeydown);
    window.removeEventListener('keyup', UserInputSystem.handleKeyup);
  }

  static handleKeydown(event):void {
    let keys = {
      LEFT: 37,
      RIGHT: 39,
      DOWN: 40,
      UP: 38
    };

    switch(event.which){
      case keys.LEFT:{
        InputStateComponent.keyStates['LEFT'] = true;
        break;
      }
      case keys.RIGHT:{
        InputStateComponent.keyStates['RIGHT'] = true;
        break;
      }
      case keys.DOWN:{
        InputStateComponent.keyStates['DOWN'] = true;
        break;
      }
      case keys.UP:{
        InputStateComponent.keyStates['UP'] = true;
        break;
      }
    }

  };
  static handleKeyup(event):void {
    let keys = {
      LEFT: 37,
      RIGHT: 39,
      DOWN: 40,
      UP: 38
    };

    switch(event.which){
      case keys.LEFT:{
        InputStateComponent.keyStates['LEFT'] = false;
        break;
      }
      case keys.RIGHT:{
        InputStateComponent.keyStates['RIGHT'] = false;
        break;
      }
      case keys.DOWN:{
        InputStateComponent.keyStates['DOWN'] = false;
        break;
      }
      case keys.UP:{
        InputStateComponent.keyStates['UP'] = false;
        break;
      }
    }



  };
}
