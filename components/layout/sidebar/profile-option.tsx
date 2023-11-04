"use client";

import { SidebarOption } from "./sidebar-option";
import { BsFillPersonFill } from "react-icons/bs";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query Query {
    get_me {
      image_url
    }
  }
`;

export default function ProfileOption() {
  let user: any;
  const { data, error, loading } = useQuery(query);
  if (data) {
    user = data.get_me;
  }
  return (
    <>
      {loading ? (
        <SidebarOption
          Icon={BsFillPersonFill}
          title="Profile"
          slug="/profile"
        />
      ) : (
        <SidebarOption
          Icon={user.image_url || BsFillPersonFill}
          title="Profile"
          slug="/profile"
        />
      )}
    </>
  );
}
