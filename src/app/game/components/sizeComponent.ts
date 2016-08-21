import {Component} from "./component";
export class SizeComponent implements Component{
  name:string;
  width:number;
  height:number;

  constructor(){
    this.name = 'size';
    this.width = 0;
    this.height = 0;
  }
}
