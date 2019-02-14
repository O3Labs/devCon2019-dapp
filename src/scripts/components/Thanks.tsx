import * as React from 'react';
import Lottie from 'react-lottie';
const animationData = require('../../assets/animations/luna_bobbing.json');
import { shorten } from '../utils/strings';

export default class Thanks extends React.Component<any, any> {

  inputEle: HTMLInputElement;

  render() {
    const { onSubmit, address, txid, item, discount } = this.props;

    const {
      title,
      price,
    } = item;

    const discountedPrice = Number((price * (1 - (discount || 0))).toFixed(2));

    return (
      <div className='thanks-container'>
        <div className='flex-grow-container'>
          <div className='luna'>
            <Lottie options={{ animationData }} isClickToPauseDisabled={true}/>
          </div>
          <div className='title'>
            {'Thank you!!'}
          </div>
          <div className='description'>{`Please see an O3 team member to collect your ${title}.`}</div>
          <div className='tx-details'>
            <div className='txid'>{`txid: ${shorten(txid)}`}</div>
            <div className='address'>{`Address: ${shorten(address)}`}</div>
            <div className='amount-paid'>{`Amount: ${discountedPrice} GAS`}</div>
          </div>
        </div>
        <div className='button' onClick={onSubmit}>{`CONTINUE SHOPPING`}</div>
      </div>
    );
  }
}
