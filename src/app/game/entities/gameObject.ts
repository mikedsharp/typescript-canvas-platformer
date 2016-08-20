import {Entity} from "./entity";
import {Component} from "../components/component";

export class GameObject implements Entity{

  components:Component[];

  addComponent = (newComponent:Component):Component => {
    if(this.components[newComponent.id]){
      return this.components[newComponent.id];
    }

    this.components[newComponent.id] = newComponent;
    this.components[newComponent.id].init();

    return this.components[newComponent.id];
  };

  removeComponent = (componentId:string):void =>{
    if(this.components[componentId]){
      this.components[componentId].destroy();
      delete this.components[componentId];
    }
  };

  sendMessage = (message:Object) => {
    for(let component in this.components){
      this.components[component].receiveMessage(message);
    }
  }
}
