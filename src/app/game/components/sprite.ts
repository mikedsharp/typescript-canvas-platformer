import {Renderable} from "./render";
import {Component} from "./component";
export class Sprite implements Renderable, Component {
  name:string;
  image:HTMLImageElement;

  constructor(){
    this.name = 'sprite';
    this.image = null;
  }

}
