import {MainMenuState} from './states/mainMenuState';
import {StateSystem} from "./states/stateSystem";

export class GameEngine {

  private canvas:HTMLCanvasElement;
  private ctx:CanvasRenderingContext2D;

  private now;
  private dt;
  private last;

  private stateManager:StateSystem;

  constructor(){
    console.log('entered constructor of engine');
    this.canvas = <HTMLCanvasElement>document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.stateManager = new StateSystem();
    this.init();
  }

  timestamp = (): number => {
      return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  };

  updateDelta = () : number => {
    this.now = this.timestamp();
    let delta =  Math.min(1,(this.now - this.last)/1000);
    this.last = this.now;
    return delta;
  };

  gameLoop = (): void =>{
    this.dt = this.updateDelta();
    this.stateManager.getCurrentState().update(this.dt);
    this.stateManager.getCurrentState().render(this.dt, this.canvas,this.ctx);
    window.requestAnimationFrame(this.gameLoop);
  };

  init():void{
    this.last = this.timestamp();
    this.stateManager.addState(new MainMenuState(this.stateManager));
    console.log('initiating game...');
    this.stateManager.setCurrentState("STATE_MAIN_MENU");
    this.stateManager.getCurrentState().enter();
    window.requestAnimationFrame(this.gameLoop);
  }

}
