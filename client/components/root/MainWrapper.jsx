import React from 'react';

import ChannelList from '../root/ChannelList.jsx';
//import Channel from '../channel/Channel.jsx';


const MainWrapper = (props) => {

  return (
    <div className="MainWrapper">
      <ChannelList current={props.params.channelName}/>
      {props.children}
    </div>
  )
}

export default MainWrapper
