import * as React from 'react';
import { SALES_ITEMS } from '../constants';

export default class ProductList extends React.Component<any, any> {

  render() {
    return (
      <div className='product-list'>
        <div className='title'>
          {'Pick a product'}
        </div>
        <div className='description'>
          {'Before selecting a product, please check if there is stock still available.'}
        </div>
        <div className='item-list'>
          {SALES_ITEMS.map((item, index) => this.renderItem(item, index))}
        </div>
      </div>
    );
  }

  renderItem(item, index) {
    const {title, promoDescription, price, imageURL} = item;
    const { discount, onSubmit } = this.props;
    const discountedPrice = Number((price * (1 - (discount || 0))).toFixed(2));
    const amountSaved = Number((price - discountedPrice).toFixed(2));

    return (
      <div
        key={index}
        className='item'
        onClick={() => onSubmit(item)}
      >
        <div className='text-container'>
          <div className='title'>
            {title}
          </div>
          <div className='description'>
            {promoDescription}
          </div>
          <div className='price-container'>
            <div className='price'>
              {`${discountedPrice} GAS`}
            </div>
            <div className='savings'>
              {`(Save ${amountSaved} GAS)`}
            </div>
          </div>
        </div>
        <div className='item-preview'>
          <img className='item-preview' src={imageURL} />
        </div>
      </div>
    );
  }
}
