import React from 'react';
import ChannelMessages from './ChannelMessages.jsx';
import ChannelMessageForm from './ChannelMessageForm.jsx';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [{ handle: 'jaapm', message: 'Hello, world!' }],
    }
  }

  addNewMessage = (newMessage) => {
    this.setState( (prevState) => {
      return {
        messages: [
          ...prevState.messages, {
            handle: 'foobar',
            message: newMessage
          }
        ]
      }

    });
  };

  render() {
    if(this.props.data.loading) {
      return <p>Loading...</p>
    }
    if(this.props.data.error) {
      return <p>:F</p>
    }
    return (
      <div className="Channel">
        <ChannelMessages
          messages={this.props.data.messages}
        />
        <ChannelMessageForm
          currentChannel={this.props.routeParams.channelName}
          addNewMessage={this.addNewMessage}
        />
      </div>
    )
  }
}

const query = gql`
  query Channel($name: String!) {
    channel(name: $name) {
      name
    },
    messages(channel: $name) {
      _id
      message
      handle
      timestamp
    }
  }
`;

const ChannelWithData = graphql(query, {
  options: ownProps => {
    return {
//      pollInterval: 5000,
      variables: {
        name: ownProps.params.channelName,
      },
    }
  },
})(Channel);
export default ChannelWithData;
