export default`
type Channel {
  _id: ID,
  name: String,
  messages: [Message]!
}

type Message {
  _id: ID,
  handle: String!,
  message: String!,
  timestamp: Int!
}

type Query {
  channels: [Channel]!
  channel(name: String!): Channel
  messages(channel: String!): [Message]!
}

type Mutation {
  post(channel: String!, message: String!): Message!
  createChannel(name: String!): Channel!
}

schema {
  query: Query,
  mutation: Mutation
}


`;
