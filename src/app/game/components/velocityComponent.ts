import {Component} from "./component";
export class VelocityComponent implements  Component {
  name:string;
  x:number;
  y:number;

  constructor(){
    this.name = 'velocity';
    this.x = 0;
    this.y = 0;
  }
}
