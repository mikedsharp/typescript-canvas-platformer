import {Component} from "./component";
export class AnimationComponent implements Component{

  name:string;
  animationType:number;
  currentFrame:number;
  frameCount:number;
  lastIteration:number;
  updateRate:number;
  animating:boolean;

  constructor(){
    this.name = 'animation';
    this.animationType = 0;
    this.animating = false;
    this.currentFrame = 0;
    this.frameCount = 0;
    this.lastIteration = new Date().getTime();
    this.updateRate = 150;
  }
}
