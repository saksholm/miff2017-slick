import React from 'react'
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';

class ChannelList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [{ name: 'general', active: true }, { name: 'foobar', active: false }],
    }
  }
/*
  changeChannel = (name) => {

    const channels = this.state.channels.map( (channel) => {
      if(channel.name  === name) {
        return {name: channel.name, active: true}
      } else {
        return {name: channel.name, active: false}
      }
    });

    this.setState({channels});
  }
*/
  render() {
    if(this.props.data.loading) {
      return <p>Loading...</p>
    }
    if(this.props.data.errors) {
      return <p>:G</p>
    }
    return (
      <div className="ChannelList">
        <ul>
        CHANNELS ({this.props.data.channels.length}) <Link to="/create-channel" className="createChannel">+</Link>

        {this.props.data.channels.map( (channel,index) => {
          return (
            <Link
              key={"mainlink" + channel.name}
              to={"/channel/"+ channel.name}
              className="channelListLink"
              >
              <li className={this.props.current === channel.name && "channelActive"}>
                <span className="hashtag">#</span>{channel.name}
              </li>
            </Link>
          )
        })}
        </ul>
      </div>
    );
  }
}

const query = gql`
  query ChannelList {
    channels {
      _id
      name
    }
  }
`;

const ChannelListWithData = graphql(query, {
//  pollInterval: 5000,
})(ChannelList);
export default ChannelListWithData
