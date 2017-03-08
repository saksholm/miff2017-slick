const resolvers = {
  Query: {
    channels(obj, args, context) {
      return context.Channels.getChannels(); //return channels;
    },
    channel(obj, args, context) {
      return context.Channels.getChannelByName(args.name);
    },
    messages(obj, args, context) {
      return context.Channels.getChannelMessages(args.channel);

    }
  },
  Mutation: {
    createChannel(obj, args, context) {
      const newChannel = {name: args.name};

      return context.Channels.addChannel(newChannel);
    },
    post(obj, args, context) {
      const newMessage = {handle: context.user.handle, message: args.message, channel: args.channel};

      return context.Channels.addMessage(newMessage);
    }
  },
};

export default resolvers;
