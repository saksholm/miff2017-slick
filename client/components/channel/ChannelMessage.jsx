import React from 'react';
import timeago from 'timeago.js'

export default class ChannelMessage extends React.Component {
  render() {
    const ta = new timeago().format(this.props.timestamp * 1000);
    return (
      <div className="ChannelMessage">
        <div className="messageAvatar">
          <div className="avatar"><img alt="avatar" src="http://www.fillmurray.com/g/50/50" /></div>
        </div>
        <div className="messageContent">
          <span className="messageDetails">{this.props.handle} - {ta}</span>
          <span className="message">{this.props.message}</span>
        </div>
      </div>
    )
  }
}
