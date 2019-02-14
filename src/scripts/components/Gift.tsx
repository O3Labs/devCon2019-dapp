import * as React from 'react';
import Lottie from 'react-lottie';
const smokeAnimationData = require('../../assets/animations/smoke.json');
const giftAnimationData = require('../../assets/animations/giftbox_bounce.json');
const openBoxImg = require('../../assets/images/img_openBox_confetti.png');

enum Status {
  OPENING,
  SMOKE,
  CLAIMABLE,
}

interface State {
  status: Status;
  discount: number;
}

const initialState = {
  status: Status.OPENING,
  discount: null,
};

export default class Gift extends React.Component<any, State> {

  state = initialState;

  render() {
    const { status } = this.state;

    return (
      <div className='gift-container'>
        <div className='flex-grow-container'>
          {status === Status.CLAIMABLE ? this.renderGiftOpen() : this.renderAnimation()}
        </div>
        {this.renderAction()}
      </div>
    );
  }

  renderAction() {
    const { onSubmit } = this.props;
    const { status, discount } = this.state;

    let content: any = '';
    switch (status) {
      case Status.OPENING:
        content = <div className='description'>{`Tap to open your gift`}</div>;
        break;
      case Status.CLAIMABLE:
        content = <div className='button' onClick={() => onSubmit(discount)}>{`CLAIM NOW!`}</div>;
        break;
    }

    return (
      <div className='action-container'>
        {content}
      </div>
    );
  }

  renderAnimation() {
    const { status } = this.state;
    const animationData = status === Status.OPENING ? giftAnimationData : smokeAnimationData;
    const clickAction = status === Status.OPENING ?
      () => {
        this.setState({
          status: Status.SMOKE,
          discount: Math.floor(Math.random() *  100) / 100,
        });
        setTimeout(() => {
          this.setState({ status: Status.CLAIMABLE });
        }, 500);
      } : () => {};

    return (
      <div
        className='animation-container'
        onClick={clickAction}
      >
        <Lottie options={{ animationData }} isClickToPauseDisabled={true}/>
      </div>
    );
  }

  renderGiftOpen() {
    const { discount } = this.state;

    return (
      <div className='gift-open-container'>
        <div className='emoji'>🎉</div>
        <div className='coupon'>
          <div className='coupon-text'>{`${discount * 100}% OFF!`}</div>
        </div>
        <img
          className='open-box-img'
          src={openBoxImg}
        />
      </div>
    );
  }
}
