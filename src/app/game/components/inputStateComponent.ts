import {Component} from "./component";
export class InputStateComponent implements Component{

  name:string;
  static keyStates:Object =  {
      LEFT: false,
      RIGHT: false,
      DOWN: false,
      UP: false
    };

  constructor(){
    this.name = 'inputState';
  }
}
