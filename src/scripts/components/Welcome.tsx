import * as React from 'react';
import Lottie from 'react-lottie';
const animationData = require('../../assets/animations/luna_bobbing.json');

export default class Welcome extends React.Component<any, any> {

  inputEle: HTMLInputElement;

  render() {
    const { onSubmit } = this.props;

    return (
      <div className='welcome-container'>
        <div className='flex-grow-container'>
          <div className='luna'>
            <Lottie options={{ animationData }} isClickToPauseDisabled={true}/>
          </div>
          <div className='title'>
            <div className='row'>{`Win O3 swag`}</div>
            <div className='row'>{`at NEO DevCon 2019`}</div>
          </div>
        </div>
        <div className='description'>{`Enter your email to win`}</div>
        <input
          ref={ref => this.inputEle = ref}
          className='input'
          type='text'
          placeholder={'Your email address'}
        />
        <div className='button' onClick={onSubmit}>{`GET A GIFT!`}</div>
      </div>
    );
  }
}
