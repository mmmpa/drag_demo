import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Pusher from './pusher'

export default class Catcher extends React.Component {
  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.startDrag = this.startDrag.bind(this);
  }

  componentWillMount() {
    this.setState({
      mousePositions: []
    });
  }


  onPress(e) {
    e.preventDefault();

    this.store = [];
    window.addEventListener('mouseup', this.onRelease);

    let now = {x: e.pageX, y: e.pageY};
    this.store.push({x: e.pageX, y: e.pageY, movedX: 0, movedY: 0});
    this.startPosition = now;
  }

  onRelease(e) {
    e.preventDefault();

    this.setState({mousePositions: this.store});

    this.store = null;
    this.startPosition = null;
    window.removeEventListener('mouseup', this.onRelease);
  }

  onDrag(e) {
    if (!this.store) {
      return;
    }
    e.preventDefault();
    let now = {x: e.pageX, y: e.pageY, movedX: e.pageX - this.startPosition.x, movedY: e.pageY - this.startPosition.y};
    this.store.push(now);
  }

  startDrag(e){
    e.preventDefault();

    let div = e.currentTarget;
    let store = [];
    let startPosition = {x: e.pageX, y: e.pageY};

    store.push({x: e.pageX, y: e.pageY, movedX: 0, movedY: 0});

    let move = (de) => {
      de.preventDefault();

      let now = {x: de.pageX, y: de.pageY, movedX: de.pageX - startPosition.x, movedY: de.pageY - startPosition.y};
      store.push(now);
    };

    let clear = (ue) =>{
      ue.preventDefault();

      this.setState({mousePositions: store});
      div.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', clear);
    };

    div.addEventListener('mousemove', move);
    window.addEventListener('mouseup', clear);
  }

  render() {
    let {onPress, onDrag} = this;

    return <div>
      <Pusher {...{onPress, onDrag}}/>
      <div className="drag-area" onMouseDown={this.startDrag}>inner drag area</div>
      <table>
        <thead>
        <tr>
          <th>x</th>
          <th>y</th>
          <th>movedX</th>
          <th>movedY</th>
        </tr>
        </thead>
        <tbody>
        {this.state.mousePositions.map(({x, y, movedX, movedY}) => <tr>
          <td>{x}</td>
          <td>{y}</td>
          <td>{movedX}</td>
          <td>{movedY}</td>
        </tr>)}
        </tbody>
      </table>
    </div>
  }
}
