import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

export class ChannelMessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: '',
      handle: 'Joni'
    };
  }
  componentDidMount() {
    this.input.focus();
  }

  componentDidUpdate(prevState, prevProps) {
    if(prevProps.currentChannel !== this.props.currentChannel) {
      this.input.focus();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.newMessage) {
      this.props.submit(this.state.newMessage);
      this.setState({newMessage: ''});
    }
  };

  render() {
    return (
      <form
        className="ChannelMessageForm"
        onSubmit={this.onSubmit}
        >
        <input
          ref={e => {this.input = e} }
          className="MessageInput"
          type="text"
          value={this.state.newMessage}
          placeholder="Message here!"
          onChange={e => this.setState({newMessage: e.target.value})}
        />
        <input
          className="MessageSubmit"
          type="submit"
          value="Send to channel"
        />
      </form>
    )
  }
}


const mutation = gql`
  mutation post($channel: String!, $message: String!) {
    post(channel: $channel, message: $message) {
      _id handle message timestamp
    }
  }
`;

export default graphql(mutation, {
  props: ({mutate, ownProps}) => {
    return {
      submit: (message) => {
        mutate({
          variables: {
            channel: ownProps.currentChannel,
            message,
          },
          updateQueries: {
            Channel: (previousResult, {mutationResult}) => {
              return update(previousResult, {
                messages: {
                  $push: [mutationResult.data.post],
                },
              });
            },
          }, // updateQueries
        }); // mutate
      } // submit
    } // return
  } // props
})(ChannelMessageForm);
