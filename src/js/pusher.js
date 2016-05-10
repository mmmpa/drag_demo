import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class Pusher extends React.Component {
  render() {
    return <div className="drag-area" onMouseDown={this.props.onPress} onMouseMove={this.props.onDrag}>pusher drag area</div>
  }
}
