import * as React from 'react';
import { send } from '../utils/dapi';

interface State {
  error: string;
}

const initialState = {
  error: null,
};

export default class Review extends React.Component<any, State> {

  state = initialState;

  render() {
    const { item, discount, onBack } = this.props;
    const { error } = this.state;
    const {
      type,
      title,
      description,
      imageURL,
      price,
    } = item;

    const discountedPrice = Number((price * (1 - (discount || 0))).toFixed(2));
    const amountSaved = Number((price - discountedPrice).toFixed(2));

    return (
      <div className='review-container'>
        <div className='title-container'>
          <div className='back-button' onClick={onBack}>{'<'}</div>
          <div className='title flex-grow-container'>
            <div>{`Oooo a ${type}?`}</div>
            <div>{'Good choice!'}</div>
          </div>
        </div>
        <div className='flex-grow-container'>
          <div className='item-preview'>
            <img src={imageURL} />
          </div>
          <div className='description'>
            {description}
          </div>
          <div className='price-summary'>
            <div className='row'>
              <div className='flex-grow-container'>
                {title}
              </div>
              {`${price} GAS`}
            </div>
            <div className='row'>
              <div className='flex-grow-container'>
                {`${Math.round(discount * 100)}% discount applied`}
              </div>
              {amountSaved}
            </div>
          </div>
          <div className='total'>
            {`${discountedPrice} GAS`}
          </div>
        </div>
        {
          error ?
            <div className='error'>{error}</div> :
            <div className='button confirm' onClick={() => this.handleSubmit(discountedPrice)}>{`PAY NOW`}</div>
        }
      </div>
    );
  }

  handleSubmit(amount) {
    const { onSubmit } = this.props;
    send(amount)
    .then(onSubmit)
    .catch(err => {
      this.setState({error: 'There was an error processing your payment, please try again.'});
      setTimeout(() => this.setState({error: null}), 2500);
    });
  }
}
