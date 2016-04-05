import {Observable} from 'data/observable';
import {ParallaxView} from 'nativescript-parallax';

export class HelloWorldModel extends Observable {
  public message: string;
  private ParallaxView: ParallaxView;

  constructor() {
    super();


  }
}