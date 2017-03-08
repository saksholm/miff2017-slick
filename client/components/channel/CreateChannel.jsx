import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

export class CreateChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      private: false,
      newChannel: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.newChannel) {

      this.props.mutate({
        variables: {
          name: this.state.newChannel
        },
        updateQueries: {
          ChannelList: (previousResult, obj) => {
            return update(previousResult, {
              channels: {
                $push: [obj.mutationResult.data.createChannel]
              }
            });
          }
        }
      });

      this.setState({newChannel: ''});
    }

  }

  render() {

    return (
      <div className="CreateChannel">
        <div className="header">
          <h1>Create new channel</h1>
        </div>
        <div className="content">
          Do you like to have a private channel?
          <input
            className="newChannelPrivate"
            type="checkbox"
            value={this.state.private}
            onChange={() => this.setState({private: !this.state.private})}
          />
        &lt;  -- LOL... not implemented yet :DD
        </div>
        <form className="form" onSubmit={this.onSubmit}>
          New channel name #
          <input
            className="newChannelInput"
            type="text"
            placeholder="new_channel_name"
            value={this.state.newChannel}
            onChange={e => this.setState({newChannel: e.target.value})}
          />
        <input
          className="newChannelSubmit"
          type="submit"
          value="Create new channel"
        />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation createChannel($name: String!) {
    createChannel(name: $name) {
      _id name
    }
  }
`;

export default graphql(mutation)(CreateChannel);
