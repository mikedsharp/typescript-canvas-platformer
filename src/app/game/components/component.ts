export interface Component {
  id:string;
  destroy():void;
  init():void;
  receiveMessage(message:Object):void;
}
