import {AbstractState} from './abstractState';
import {StateSystem} from "./stateSystem";
import {MainMenuState} from "./mainMenuState";
import {Entity} from "../entities/entity";
import {Size} from "../components/size";
import {Sprite} from "../components/sprite";
import {Position} from "../components/position";
import {RenderSystem} from "../systems/render";
import {UserInputSystem} from "../systems/userInput";

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

    this.player.addComponent(new Position());
    this.player.addComponent(new Size());
    this.player.addComponent(new Sprite());

    this.player.components['position'].x = 10;
    this.player.components['position'].y = 20;

    this.player.components['size'].width = 64;
    this.player.components['size'].height = 64;

    this.player.components['sprite'].image = new Image();
    this.player.components['sprite'].image.src = '/app/game/assets/images/player.png';


    for(var i = 0; i < 25; i++){
      this.entities.push(new Entity());
    }

    // enable event listeners
    window.addEventListener('keypress', this.handleKeypress);
    UserInputSystem.init();

  };

  private handleKeypress = (event) => {
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
