import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import MainWrapper from './components/root/MainWrapper.jsx';
import {Router, Route, browserHistory, Redirect} from 'react-router';

import Channel from './components/channel/Channel.jsx';
import CreateChannel from './components/channel/CreateChannel.jsx';

const apolloClient = new ApolloClient();

Meteor.startup(() => {
  render(
    <ApolloProvider client={apolloClient}>
      <Router history={browserHistory}>
        <Route component={MainWrapper}>
          <Route
            path="/channel/:channelName"
            component={Channel}
          />
          <Route
            path="/create-channel"
            component={CreateChannel}
          />
          <Redirect
            from="/"
            to="/channel/foobar"
          />
        </Route>
      </Router>

    </ApolloProvider>,
    document.getElementById('root'),
  );
});
