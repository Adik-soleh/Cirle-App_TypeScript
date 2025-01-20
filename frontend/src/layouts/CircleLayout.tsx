import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import SideBar from "@/components/bars/SideBar";
import Navigation from "@/components/leftPannel/Navigation";
import DeveloperCard from "@/components/rightPanel/DeveloperCard";
import ProfileCard from "@/components/rightPanel/ProfileCard";
import SuggestionCard from "@/components/rightPanel/SuggestionCard";

function CircleLayout() {
  return (
    <>
      <Flex>
        <SideBar>
          <Navigation />
        </SideBar>
        <Outlet />
        <SideBar>
          <ProfileCard />
          <SuggestionCard />
          <DeveloperCard />
        </SideBar>
      </Flex>
    </>
  );
}

export default CircleLayout;
