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

      this.props.mutate({
        variables: {
          channel: this.props.currentChannel,
          message: this.state.newMessage,
          handle: this.state.handle,
        },
        updateQueries: {
          Channel: (previousResult, obj) => {
            return update(previousResult, {
              messages: {
                $push: [obj.mutationResult.data.post],
              },
            });

          },
        },
      });

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
  mutation post($channel: String!, $message: String!, $handle: String!) {
    post(channel: $channel, message: $message, handle: $handle) {
      _id handle message timestamp
    }
  }
`;

export default graphql(mutation)(ChannelMessageForm);
