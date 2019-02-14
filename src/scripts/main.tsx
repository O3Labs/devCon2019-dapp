import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Welcome from './components/Welcome';
import Gift from './components/Gift';
import ProductList from './components/ProductList';
import Review from './components/Review';
import Thanks from './components/Thanks';

import '../styles/main.scss';

enum Status {
  WELCOME,
  GIFT,
  PRODUCT_LIST,
  REVIEW,
  THANKS,
}

interface State {
  status: Status;
  discount: number;
  item: any;
}

const initialState = {
  status: Status.WELCOME,
  discount: null,
  item: null,
};

class Main extends React.Component<any, State> {

  state = initialState;

  render() {
    const { status, item, discount } = this.state;

    switch (status) {
      case Status.WELCOME:
        return <Welcome onSubmit={() => this.setState({status: Status.GIFT})}/>;
      case Status.GIFT:
        return <Gift onSubmit={discount => this.setState({status: Status.PRODUCT_LIST, discount})}/>;
      case Status.PRODUCT_LIST:
        return (
          <ProductList
            discount={discount}
            onSubmit={item => this.setState({status: Status.REVIEW, item})}
          />
        );
      case Status.REVIEW:
        return (
          <Review
            item={item}
            discount={discount}
            onSubmit={() => this.setState({status: Status.THANKS})}
            onBack={() => this.setState({status: Status.PRODUCT_LIST, item: null})}
          />
        );
      case Status.THANKS:
        return <Thanks onSubmit={() => this.setState({status: Status.WELCOME, item: null, discount: null})}/>;
      default:
        return '';
    }
  }
}

export function startApp() {
  ReactDOM.render(<Main/>, document.getElementById('app'));
}
