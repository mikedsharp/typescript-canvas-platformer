export class GameEngine {

  private canvas:HTMLCanvasElement;
  private ctx:CanvasRenderingContext2D;

  private now;
  private dt;
  private last;

  constructor(){
    console.log('entered constructor of engine');
    this.canvas = <HTMLCanvasElement>document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  update = (dt:number) =>{

  };

  render =(dt:number) =>{

  };

  timestamp = (): number => {
      return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  };

  gameLoop = (): void =>{
    this.now = this.timestamp();
    this.dt = (this.now - this.last);
    this.update(this.dt);
    this.render(this.dt);
    this.last = this.now;

    window.requestAnimationFrame(this.gameLoop);
  };

  init():void{
    this.last = this.timestamp();
    //let happyTurquoise = "rgba(0,255,255,0.5)";
    console.log('initiating game...');
    //this.ctx.fillStyle = happyTurquoise;
    //this.ctx.fillRect(100, 200, 64, 64);

    window.requestAnimationFrame(this.gameLoop);
  }

}
