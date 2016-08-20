import {AbstractState} from './abstractState';

export class StateSystem{
  private storedStates;
  private currentState:AbstractState;

  constructor(){
    this.storedStates = {};
  }

  public addState = (newState:AbstractState) => {
    if(this.storedStates[newState.id]){
      console.error('state already exists');
      return;
    }

    this.storedStates[newState.id] = newState;
  };

  public removeState = (stateId:string) => {
    if(this.storedStates[stateId]){
      this.storedStates[stateId].destroy();
      delete this.storedStates[stateId];
    }
  };

  public transitionTo = (stateId:string, destroyState: boolean, messages?:Object) => {

    if(!this.storedStates[stateId]){
      console.error(stateId + ' does not exist!');
      return;
    }

    this.currentState.exit();

    if(destroyState){
      this.currentState.destroy();
      delete this.storedStates[ this.currentState.id];
    }

    this.currentState = this.storedStates[stateId];

    if(messages){
      this.currentState.receiveMessages(messages);
    }

    this.currentState.enter();

    return this.currentState;

  };

  public getCurrentState = ():AbstractState =>{
    return this.currentState;
  };

  public setCurrentState = (stateId:string) =>{
    if(!this.storedStates[stateId]){
      console.error(stateId + ': does not exist!');
      return;
    }
    this.currentState = this.storedStates[stateId];
  };

  public saveState = (stateId:string) => {
    //TODO, investigate local storage to save state data, this should be available to
    // states that implement a serializable-like interface
  };

}
