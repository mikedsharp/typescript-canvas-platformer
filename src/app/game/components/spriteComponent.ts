import {Renderable} from "./renderComponent";
import {Component} from "./component";
export class SpriteComponent implements Renderable, Component {
  name:string;
  image:HTMLImageElement;

  constructor(){
    this.name = 'sprite';
    this.image = null;
  }
}
