import * as React from 'react';
import Lottie from 'react-lottie';
const animationData = require('../../assets/animations/luna_bobbing.json');
import { validateEmail } from '../utils/strings';

enum Status {
  WELCOME,
  CONFIRM,
}

interface State {
  status: Status;
  error: string;
}

const initialState = {
  status: Status.WELCOME,
  error: null,
};

export default class Welcome extends React.Component<any, State> {

  nameInputEle: HTMLInputElement;
  emailInputEle: HTMLInputElement;
  gdprInputEle:  HTMLInputElement;
  state = initialState;

  render() {
    const { status } = this.state;

    switch (status) {
      case Status.WELCOME:
        return this.renderWelcome();
      case Status.CONFIRM:
        return this.renderForm();
    }
  }

  renderWelcome() {
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
        <div className='button' onClick={() => this.setState({status: Status.CONFIRM})}>{`GET A GIFT!`}</div>
      </div>
    );
  }

  renderForm() {
    const { error } = this.state;

    return (
      <div className='welcome-container'>
        <div className='flex-grow-container'>
          <div className='description'>{`Enter your details to win`}</div>

          <div className='input-container'>
            <div className='label'>{`Name`}</div>
            <input
              ref={ref => this.nameInputEle = ref}
              className='input'
              type='text'
              placeholder={'Your name'}
            />
          </div>

          <div className='input-container'>
            <div className='label'>{`Email`}</div>
            <input
              ref={ref => this.emailInputEle = ref}
              className='input'
              type='text'
              placeholder={'Your email address'}
            />
          </div>

          <div className='explain row'>
            <strong>Marketing permission</strong>: I give my consent to  to be in touch with me via email using the information I have provided in this form for the purpose of news, updates and marketing.
          </div>
          <div className='explain row'>
            <strong>What to expect</strong>: If you wish to withdraw your consent and stop hearing from us, simply click the unsubscribe link at the bottom of every email we send or contact us at support@o3.network. We value and respect your personal data and privacy. To view our privacy policy, please visit our website. By submitting this form, you agree that we may process your information in accordance with these terms.
          </div>
          <div className='gdpr-container'>
            <input
              ref={ref => this.gdprInputEle = ref}
              type='checkbox'
              className='gdpr'
            />
            <div>{'Accept'}</div>
          </div>

        </div>

        <div className='action-container'>
          { error ?
            <div className='error'>{error}</div> :
            <div className='button' onClick={() => this.handleSubmit()}>{`SUBMIT!`}</div>
          }
        </div>
      </div>
    );
  }

  handleSubmit() {
    const { onSubmit } = this.props;

    if (!this.nameInputEle.value) {
      this.setState({error: 'Please enter a name.'});
      setTimeout(() => this.setState({error: null}), 2000);
      return;
    }

    if (!validateEmail(this.emailInputEle.value)) {
      this.setState({error: 'Please enter a valid email address.'});
      setTimeout(() => this.setState({error: null}), 2000);
      return;
    }

    if (!this.gdprInputEle.checked) {
      this.setState({error: 'Please accept the terms to continue.'});
      setTimeout(() => this.setState({error: null}), 2000);
      return;
    }

    fetch('https://sendyyyy.o3.network/subscribe', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.nameInputEle.value,
          email: this.emailInputEle.value,
          gdpr: this.gdprInputEle.checked,
          list: 'b68SwypeRj9bMJDwa8gY892A',
          subform: 'yes',
          hp: null,
          submit: null,
        }),
    })
    .then(res => onSubmit())
    .catch(err => {});
  }
}
