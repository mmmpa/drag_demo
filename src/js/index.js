import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Catcher from './catcher'

class Demo {
  static run(dom) {
    ReactDOM.render(
      <Catcher/>
      , dom);
  }
}

Demo.run(document.getElementById('app'));
