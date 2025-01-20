import {
  Avatar,
  Box,
  Flex,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

import SideBar from "@/components/bars/SideBar";
import Navigation from "@/components/leftPannel/Navigation";
import BrandModal from "@/components/modalsCard/BrandModal";
import NewVibe from "@/components/post/NewPost";
import DeveloperCard from "@/components/rightPanel/DeveloperCard";
import ProfileCard from "@/components/rightPanel/ProfileCard";
import SuggestionCard from "@/components/rightPanel/SuggestionCard";
import { usePost } from "@/hooks/usePosts";
import { RootState } from "@/redux";
import { UserType } from "@/types/types";
import { BiHeart, BiHome, BiSearch } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { useSelector } from "react-redux";

function CircleLayout() {
  const loggedUser: UserType | undefined = useSelector(
    (states: RootState) => states.loggedUser.value
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, onPost] = usePost({ onClose });
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Flex>
        {!isMobile && (
          <SideBar>
            <Navigation />
          </SideBar>
        )}
        <Outlet />
        {!isMobile && (
          <SideBar>
            <ProfileCard />
            <SuggestionCard />
            <DeveloperCard />
          </SideBar>
        )}
      </Flex>
      {isMobile && (
        <Box
          position={"fixed"}
          bottom={0}
          w={"100%"}
          zIndex={100}
          justifyItems={"center"}
          backgroundColor={"black"}
        >
          <Flex gap={"4.5rem"} justifyContent={"center"} p={"1rem"}>
            <BiHome onClick={() => navigate("/")} size={"25px"} />
            <BiSearch onClick={() => navigate("/search")} size={"25px"} />
            <CiSquarePlus onClick={onOpen} size={"25px"} />
            <BiHeart onClick={() => navigate("/follows")} size={"25px"} />
            <Avatar
              sx={{ width: 8, height: 8 }}
              src={loggedUser?.avatar}
              onClick={() => navigate("/me")}
            />
            <BrandModal isOpen={isOpen} onClose={onClose} size={"xl"}>
              <Box pt={".5rem"}>
                <NewVibe
                  placeholder={"What is happening?!"}
                  imagePreviewId={"atModal"}
                  onPost={onPost}
                />
              </Box>
            </BrandModal>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default CircleLayout;
