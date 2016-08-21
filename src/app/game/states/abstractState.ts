export interface AbstractState {
  id:string;

  init(): void;
  enter():void;
  update(dt:number):void;
  render(dt:number, canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D):void;
  exit():void;
  destroy():void;
  receiveMessages(messages:Object):void;
}
