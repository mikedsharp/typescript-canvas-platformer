import {Component} from "./component";
export class PositionComponent implements Component{

  name:string;
  x:number;
  y:number;

  constructor(){
    this.name = 'position';
    this.x = 0;
    this.y = 0;
  }
}
