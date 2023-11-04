import get_me from "./resolvers/query/get_me";
import get_users from "./resolvers/query/get_users";
import get_user from "./resolvers/query/get_user";
import get_followers from "./resolvers/query/get_followers";
import get_following from "./resolvers/query/get_followings";
import get_blocked from "./resolvers/query/get_blocked";
import get_blocked_by from "./resolvers/query/get_blocked_by";
import get_notifications from "./resolvers/query/get_notifications";
import get_verification from "./resolvers/query/get_verification";
import get_tokens from "./resolvers/query/get_tokens";

import login from "./resolvers/mutations/login";

const resolvers = {
  Query: {
    get_users,
    get_me,
    get_user,
    get_followers,
    get_following,
    get_blocked,
    get_blocked_by,
    get_notifications,
    get_verification,
    get_tokens,
  },
  Mutation: {
    login,
  },
};

export default resolvers;
