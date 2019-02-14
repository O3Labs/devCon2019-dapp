import * as React from 'react';

export default class Review extends React.Component<any, any> {

  render() {
    const { item, discount, onBack, onSubmit } = this.props;
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
        <div className='flex-grow-container'>
          <div className='title-container'>
            <div className='back-button' onClick={onBack}>{'<'}</div>
            <div className='title flex-grow-container'>
              <div>{`Oooo a ${type}?`}</div>
              <div>{'Good choice!'}</div>
            </div>
          </div>
          <div className='item-preview'>
            <img src={imageURL} />
          </div>
          <div className='description'>
            {description}
          </div>
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
              {`${discount * 100}% discount applied`}
            </div>
            {amountSaved}
          </div>
        </div>
        <div className='total'>
          {`${discountedPrice} GAS`}
        </div>
        <div className='button confirm' onClick={onSubmit}>{`PAY NOW`}</div>
      </div>
    );
  }
}
