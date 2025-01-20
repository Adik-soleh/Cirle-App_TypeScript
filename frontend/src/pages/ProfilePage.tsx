import { RootState } from "@/redux";
import { UserType } from "@/types/types";
import { Card, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { CgFeed } from "react-icons/cg";
import { GrMultimedia } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link, Params, useNavigate, useParams } from "react-router-dom";

import MainBar from "@/components/bars/MainBar";
import NavigationHeading from "@/components/leftPannel/NavigationHeading";
import VibeList from "@/components/post/PostsList";
import ProfileCardBody from "@/components/rightPanel/ProfileCardBody";
import ProfileCardFooter from "@/components/rightPanel/ProfileCardFooter";
import ProfileCardHeader from "@/components/rightPanel/ProfileCardHeader";
import BrandTabs from "@/components/utils/BrandTabs";
import CircleSpinner from "@/components/utils/CircleSpinner";
import MediaCollection from "@/components/utils/MediaCollection";
import API from "@/connect/api";

interface ProfilePageProps {
  dark?: boolean;
}

function ProfilePage({ dark }: ProfilePageProps) {
  const { colorMode } = useColorMode();
  const loggedUser = useSelector(
    (states: RootState) => states.loggedUser.value
  );

  const { id }: Readonly<Params<string>> = useParams();
  const targetId = id ? +id : NaN;

  const [user, setUser] = useState<UserType | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function GET_USER() {
      const user: UserType = await API.GET_USER(targetId);

      if (loggedUser) {
        if (loggedUser.id === user.id) {
          navigate("/me");
        }
      }

      setUser(user);
    }

    setUser(null);
    GET_USER();
  }, [loggedUser, targetId, navigate]);

  if (user) {
    const {
      username,
      name,
      bio,
      avatar,
      banner,
      totalFollower,
      totalFollowing,
      isFollowed,
      vibes,
    } = user;

    const bg = dark
      ? colorMode === "dark"
        ? "circle.backdrop.dark"
        : "circle.backdrop.light"
      : colorMode === "dark"
      ? "circle.darker.dark"
      : "white";

    return (
      <MainBar>
        <Link to={"/"}>
          <NavigationHeading icon={<BiLeftArrowAlt />} text={name} sticky />
        </Link>
        <Card bg={bg} px={"1rem"} color={"circle.font"} mb={"1.5rem"}>
          <ProfileCardHeader
            buttonText={isFollowed ? "Following" : "Follow"}
            avatar={avatar}
            banner={banner}
            isUserProfile={true}
          />
          <ProfileCardBody
            py={"1rem"}
            username={username}
            name={name}
            bio={bio}
          />
          <ProfileCardFooter
            totalFollower={totalFollower}
            totalFollowing={totalFollowing}
          />
        </Card>
        <BrandTabs
          leftTitle={<CgFeed />}
          leftContent={<VibeList vibes={vibes} />}
          rightTitle={<GrMultimedia />}
          rightContent={<MediaCollection vibes={vibes} />}
        />
      </MainBar>
    );
  }

  return (
    <Grid templateColumns={"repeat(19, 1fr)"} height={"100vh"}>
      <GridItem colSpan={19}>
        <CircleSpinner />
      </GridItem>
    </Grid>
  );
}

export default ProfilePage;
