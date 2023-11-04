const typeDefs = `#graphql
  type User {
    id: ID!
    created_at: String!
    username: String
    name: String!
    image_url: String
    bio: String
    email: String!
    passwordHash:String!
    roles: [String]
    premiumTill: String
    allow_text: Boolean!
    allow_followers: Boolean!
    verified_at: String
    disabled_till: String
    premium_till: String
    followers: [User]
    following: [User]
    blocked: [User]
    blocked_by: [User]
    notifications: [Notification]
    verification: Verification
    tokens: [Token]
  }

  type Notification{
    id: ID!
    created_at: String!
    content: NotificationContent
  }

  type NotificationContent{
    type: String
    text: String
  }

  type NotificationUser{
    id:ID!
  }

  type Token {
    id: ID!
    created_at: String!
    valid_until: String!
    token: String!
  }

  type Verification{
    id:ID!
    created_at: String!
    code: Int!
    block_till: String
    attempt: Int
    use_agent: String
  }

  type JWT{
    access_token:String!
    refresh_token:String!
  }

  type Query {
     get_users:[User]
     get_me:User
     get_user(id:ID!):User
     get_followers(id:ID!):[User]
     get_following(id:ID!):[User]
     get_blocked(id:ID!):[User]
     get_blocked_by(id:ID!):[User]
     get_notifications(id:ID!):[Notification]
     get_verification(id:ID!):Verification
     get_tokens(id:ID!):[Token]
  }

  type Mutation {
     login(email:String! password:String!): JWT
  }
`;

export { typeDefs };
