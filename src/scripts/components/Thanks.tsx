import * as React from 'react';
import Lottie from 'react-lottie';
const animationData = require('../../assets/animations/luna_bobbing.json');

export default class Thanks extends React.Component<any, any> {

  inputEle: HTMLInputElement;

  render() {
    const { onSubmit } = this.props;
    return (
      <div className='thanks-container'>
        <div className='flex-grow-container'>
          <div className='luna'>
            <Lottie options={{ animationData }} isClickToPauseDisabled={true}/>
          </div>
          <div className='title'>
            {'Thank you!!'}
          </div>
          <div className='description'>{`Grab your swag and thanks for shopping with O3!`}</div>
        </div>
        <div className='button' onClick={onSubmit}>{`CONTINUE SHOPPING`}</div>
      </div>
    );
  }
}
