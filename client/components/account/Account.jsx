import React from 'react';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

class AccountsUIWrapper extends React.Component {

  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, this.node);
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    return <span ref={node => (this.node = node)} />;
  }

}

const Account = (props) => {
  if(props.user) {
    return props.children;
  }

  return <AccountsUIWrapper />;
}

const AccountContainer = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, Account);


export default AccountContainer
