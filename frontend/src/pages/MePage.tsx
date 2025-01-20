import { RootState } from "@/redux";
import { Card, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { CgFeed } from "react-icons/cg";
import { GrMultimedia } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MainBar from "@/components/bars/MainBar";
import NavigationHeading from "@/components/leftPannel/NavigationHeading";
import VibeList from "@/components/post/PostsList";
import ProfileCardBody from "@/components/rightPanel/ProfileCardBody";
import ProfileCardFooter from "@/components/rightPanel/ProfileCardFooter";
import ProfileCardHeader from "@/components/rightPanel/ProfileCardHeader";
import BrandTabs from "@/components/utils/BrandTabs";
import CircleSpinner from "@/components/utils/CircleSpinner";
import MediaCollection from "@/components/utils/MediaCollection";

interface MePageProps {
  dark?: boolean;
}

function MePage({ dark }: MePageProps) {
  const { colorMode } = useColorMode();
  const loggedUser = useSelector(
    (states: RootState) => states.loggedUser.value
  );

  if (loggedUser) {
    const {
      username,
      name,
      bio,
      avatar,
      banner,
      totalFollower,
      totalFollowing,
      vibes,
    } = loggedUser;

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
            buttonText={"Edit Profile"}
            avatar={avatar}
            banner={banner}
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
          leftTitle={
            <>
              <CgFeed />
            </>
          }
          leftContent={<VibeList vibes={vibes} />}
          rightTitle={<GrMultimedia />}
          rightContent={<MediaCollection vibes={vibes} />}
        />
      </MainBar>
    );
  }

  // Determine the background based on the `dark` prop and the current color mode

  return (
    <Grid templateColumns={"repeat(19, 1fr)"} height={"100vh"}>
      <GridItem colSpan={19}>
        <CircleSpinner />
      </GridItem>
    </Grid>
  );
}

export default MePage;
