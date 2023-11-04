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
import get_username_availability from "./resolvers/query/get_username_availability";
import get_verification_sent from "./resolvers/query/get_verification_sent";

import login from "./resolvers/mutations/login";
import create_account from "./resolvers/mutations/create_account";
import send_verification_request from "./resolvers/mutations/send_verification_request";
import submit_code from "./resolvers/mutations/submit_code";

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
    get_username_availability,
    get_verification_sent,
  },
  Mutation: {
    login,
    create_account,
    send_verification_request,
    submit_code,
  },
};

export default resolvers;
