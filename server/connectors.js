import {Channels} from './collections';
import {currentTimestamp} from './tools';

export default class ChannelRepository {
  getChannels() {
    return Channels.find({type: 'channel'}).fetch();
  }

  getChannelByName(name) {
    return Channels.findOne({name: name, type: 'channel'});
  }

  getChannelMessages(channel) {
    return Channels.find({type: 'message', channel: channel}).fetch();
  }

  addMessage(obj) {
    const verify = Channels.findOne({name: obj.channel, type: 'channel'});
    if(verify && verify._id) {
      const addMsg = {
        type: 'message',
        channel: obj.channel,
        channelId: verify._id,
        message: obj.message,
        handle: obj.handle,
        timestamp: currentTimestamp()
      };

      const id = Channels.insert(addMsg);
      addMsg._id = id;
      return addMsg;

    }
    return null;
  }

  addChannel(obj) {
    const verify = Channels.findOne({name: obj.channel, type: 'channel'});

    if(verify && verify._id) {
      return null;
    } else {
      const addObj = {
        type: 'channel',
        name: obj.name
      };
      
      const id = Channels.insert(addObj);
      addObj._id = id;
      return addObj;
    }

  }
};
