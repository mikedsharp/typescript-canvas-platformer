import {Component} from "../components/component";

export class Entity {
  public id:string;
  public components = {};

  constructor(){
    this.id = this.guid();
  }

  private guid = ():string => {

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
     }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };

  public addComponent = (component:Component):Component =>{
    this.components[component.name] = component;
    return this.components[component.name];
  };

  public removeComponent = (componentName:string):void =>{
    delete this.components[componentName];
  };

  public serialize = ():string => {
    return JSON.stringify(this, null, 4);
  }
}
