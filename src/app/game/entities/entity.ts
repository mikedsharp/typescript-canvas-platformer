import {Component} from "../components/component";

export interface Entity {
  components:Component[];
  sendMessage(message:Object);
  update();
}
