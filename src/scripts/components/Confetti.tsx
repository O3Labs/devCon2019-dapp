import * as React from 'react';
import 'confetti-js';
declare const ConfettiGenerator;

export default class Confetti extends React.Component<any, any> {

  componentDidMount() {
    const confetti = new ConfettiGenerator({target: 'confetti'});
    confetti.render();
  }

  render() {
    return (
      <canvas id='confetti'/>
    );
  }
}
