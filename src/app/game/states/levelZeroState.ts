import {AbstractState} from './abstractState';
import {StateSystem} from "./stateSystem";
import {MainMenuState} from "./mainMenuState";
import {Entity} from "../entities/entity";
import {SizeComponent} from "../components/sizeComponent";
import {SpriteComponent} from "../components/spriteComponent";
import {PositionComponent} from "../components/positionComponent";
import {RenderSystem} from "../systems/render";
import {UserInputSystem} from "../systems/userInput";
import {VelocityComponent} from "../components/velocityComponent";
import {InputStateComponent} from "../components/inputStateComponent";

export class LevelZeroState implements AbstractState{

  id:string;
  stateManager:StateSystem;
  entities:Array<Entity> = [];
  player:Entity;

  constructor(stateManager:StateSystem){
    this.id = 'STATE_LEVEL_0';
    this.stateManager = stateManager;
    this.init();
  }

  public receiveMessages = (messages:Object):void => {
    // the state gets to decide how to process the messages, maybe it could be used to
    // update scores and other visuals
    console.log(messages);
  };

  public init = ():void => {
    console.log('initiating state: ' + this.id);
  };

  public enter = ():void  => {
    console.log('entering state: ' + this.id);

    this.player = new Entity();

    this.player.addComponent(new PositionComponent());
    this.player.addComponent(new SizeComponent());
    this.player.addComponent(new VelocityComponent());
    this.player.addComponent(new SpriteComponent());
    this.player.addComponent(new InputStateComponent());

    this.player.components['position'].x = 10;
    this.player.components['position'].y = 20;

    this.player.components['size'].width = 64;
    this.player.components['size'].height = 64;

    this.player.components['velocity'].x = 200;
    this.player.components['velocity'].y = 300;

    this.player.components['sprite'].image = new Image();
    this.player.components['sprite'].image.src = '/app/game/assets/images/player.png';

    // enable event listeners
    window.addEventListener('keypress', this.handleKeypress);
    UserInputSystem.init();
  };

  private handleKeypress = (event):void => {
    let keys = {
      'KEY_Q': 113
    };

    if (event.which == keys.KEY_Q) {
      this.stateManager.addState(new MainMenuState(this.stateManager));
      this.stateManager.transitionTo('STATE_MAIN_MENU', true, {score: 44})
    }
  };

  public update = (dt:number):void => {
    UserInputSystem.update([this.player], dt);
  };

  public render = (dt:number, canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D):void => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = "60px arial";
    ctx.fillText("Level Zero", 260,240,720);

    RenderSystem.invoke([this.player], ctx);
  };

  public exit = ():void  =>{
    console.log('exiting state: ' + this.id);
    // example usage, disabling any input listeners that this state uses
    window.removeEventListener('keypress', this.handleKeypress);
    UserInputSystem.destroy();
  };

  public destroy = ():void => {
    console.log('destroying state: ' + this.id);
  };
}
