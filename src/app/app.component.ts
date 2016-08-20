import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {GameEngine} from './game/gameEngine';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  engineInstance:GameEngine;

  ngOnInit():any{
    this.engineInstance = new GameEngine();
    this.engineInstance.init();
  }
}
