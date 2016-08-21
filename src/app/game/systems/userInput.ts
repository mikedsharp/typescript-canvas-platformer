import {Position} from '../components/position';
import {Entity} from "../entities/entity";

export class UserInputSystem {

  static messageQueue = [];

  static meetsSystemRequisites(entity:Entity):boolean{
    return entity.components['position'];
  }

  static init(){
    //set up various event listeners user will need to control the character
    window.addEventListener('keydown', UserInputSystem.handleKeypress);
  }

  static update(entities, dt:number):void {

    var filteredEntities = entities.filter(UserInputSystem.meetsSystemRequisites)
    var currentMessage = null;

    var keys = {
      LEFT: 37,
      RIGHT: 39,
      DOWN: 40,
      UP: 38
    };

    while(currentMessage = UserInputSystem.messageQueue.shift()){
      filteredEntities.forEach(function (entity) {
        console.log('processing input for entity: ' + entity['id']);

        if(currentMessage.key == 'playerMove'){
          switch(currentMessage.value){
            case keys.LEFT:{
              entity.components.position.x -= 200 * dt;
              break;
            }
            case keys.RIGHT:{
              entity.components.position.x += 200 * dt;
              break;
            }
            case keys.DOWN:{
              entity.components.position.y += 200 * dt;
              break;
            }
            case keys.UP:{
              entity.components.position.y -= 200 * dt;
              break;
            }
            default:break;
          }
        }
      });


    }


  }

  static destroy(){
    //remover listeners, this will happen if the user changes state, or component is removed
    window.removeEventListener('keydown', UserInputSystem.handleKeypress);
  }

  static handleKeypress(event) {
    let keys = {
      LEFT: 37,
      RIGHT: 39,
      DOWN: 40,
      UP: 38
    };

    if(event.which == keys.LEFT
      || event.which == keys.RIGHT
      || event.which == keys.DOWN
      || event.which == keys.UP ){

      UserInputSystem.messageQueue.push({
        key: 'playerMove',
        value: event.which
      })
    }

  };
}
