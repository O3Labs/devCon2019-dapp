import * as React from 'react';
import Lottie from 'react-lottie';
const animationData = require('../../assets/animations/luna_bobbing.json');

enum Status {
  WELCOME,
  CONFIRM,
}

interface State {
  status: Status;
}

const initialState = {
  status: Status.WELCOME,
};

export default class Welcome extends React.Component<any, State> {

  nameInputEle: HTMLInputElement;
  emailInputEle: HTMLInputElement;
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
    const { onSubmit } = this.props;

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

          <input type='checkbox' name='gdpr' id='gdpr'/>
          <div className='explain row'>
            <strong>Marketing permission</strong>: I give my consent to  to be in touch with me via email using the information I have provided in this form for the purpose of news, updates and marketing.
          </div>
          <div className='explain'>
            <strong>What to expect</strong>: If you wish to withdraw your consent and stop hearing from us, simply click the unsubscribe link at the bottom of every email we send or contact us at support@o3.network. We value and respect your personal data and privacy. To view our privacy policy, please visit our website. By submitting this form, you agree that we may process your information in accordance with these terms.
          </div>
        </div>

        <div className='button' onClick={onSubmit}>{`SUBMIT!`}</div>
      </div>
    );
  }
}
