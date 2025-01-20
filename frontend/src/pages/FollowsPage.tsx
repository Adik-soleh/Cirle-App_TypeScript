import { RootState } from "@/redux";
import { UserType } from "@/types/types";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MainBar from "@/components/bars/MainBar";
import NavigationHeading from "@/components/leftPannel/NavigationHeading";
import AccountListCard from "@/components/rightPanel/AccountListCard";
import BrandTabs from "@/components/utils/BrandTabs";
import CircleSpinner from "@/components/utils/CircleSpinner";
import API from "@/connect/api";

function FollowsPage() {
  const [followers, setFollowers] = useState<UserType[]>([]);
  const [followings, setFollowings] = useState<UserType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const loggedUser = useSelector(
    (states: RootState) => states.loggedUser.value
  );

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      const users: UserType[] = await API.GET_ALL_USERS();

      if (loggedUser) {
        setFollowers(() => {
          return users.filter((user) => {
            return loggedUser.followers.some(
              (follower) => follower.ownerId === user.id
            );
          });
        });

        setFollowings(() => {
          return users.filter((user) => {
            return loggedUser.followings.some(
              (following) => following.targetId === user.id
            );
          });
        });

        setLoading(false);
      }
    }

    getUsers();
  }, [loggedUser]);

  return (
    <MainBar>
      <Link to={"/"}>
        <NavigationHeading icon={<BiLeftArrowAlt />} text={"Follows"} sticky />
      </Link>
      {isLoading ? (
        <BrandTabs
          leftTitle={"Followers"}
          leftContent={
            <Box mt={"3rem"}>
              <CircleSpinner />
            </Box>
          }
          rightTitle={"Following"}
          rightContent={
            <Box mt={"3rem"}>
              <CircleSpinner />
            </Box>
          }
        />
      ) : (
        <BrandTabs
          leftTitle={"Followers"}
          leftContent={<AccountListCard accounts={followers} />}
          rightTitle={"Following"}
          rightContent={<AccountListCard accounts={followings} />}
        />
      )}
    </MainBar>
  );
}

export default FollowsPage;
