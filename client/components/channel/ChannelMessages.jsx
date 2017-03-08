import React from 'react';

import ChannelMessage from './ChannelMessage.jsx';

export default class ChannelMessages extends React.Component {

  componentDidMount() {
      this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
      this.scrollView.scrollTop = this.scrollView.scrollHeight;
  }

  render() {
    const {messages} = this.props;
    return (
      <div className="ChannelMessages" ref={(scrollView) => { this.scrollView = scrollView; }}>
        {messages.length === 0 ?

          <p>Sorry, no messages yet :/</p>

          :

          messages.map( (message, index) => {
            return <ChannelMessage
              key={message._id}
              handle={message.handle}
              message={message.message}
              timestamp={message.timestamp}
              addNewMessage={this.addNewMessage}
            />
          })
        }

      </div>
    )
  }
}
