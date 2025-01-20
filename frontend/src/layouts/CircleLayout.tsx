import { Box, Button, Flex, useDisclosure, useBreakpointValue } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

import SideBar from "@/components/bars/SideBar";
import Navigation from "@/components/leftPannel/Navigation";
import BrandModal from "@/components/modalsCard/BrandModal";
import NewVibe from "@/components/post/NewPost";
import DeveloperCard from "@/components/rightPanel/DeveloperCard";
import ProfileCard from "@/components/rightPanel/ProfileCard";
import SuggestionCard from "@/components/rightPanel/SuggestionCard";
import { usePost } from "@/hooks/usePosts";
import { BiHeart, BiHome, BiSearch, BiUser } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";

function CircleLayout() {
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
        backgroundColor={"gray.900"}
      >
        <Flex gap={"1rem"} justifyContent={"center"}>
          <Button onClick={() => navigate("/")}>
            <BiHome />
          </Button>
          <Button onClick={() => navigate("/search")}>
            <BiSearch />
          </Button>
          <Button onClick={onOpen}>
            <CiSquarePlus />
          </Button>
          <Button onClick={() => navigate("/follows")}>
            <BiHeart />
          </Button>
          <Button onClick={() => navigate("/me")}>
            <BiUser />
          </Button>
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
      {/* {isMobile && (
        <Box
          position={"fixed"}
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
          zIndex={50}
          backgroundColor={"rgba(0, 0, 0, 0.8)"}
          color={"white"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button onClick={() => navigate("/")} w={"70%"} mb={4}>
            <BiHome /> Home
          </Button>
          <Button onClick={() => navigate("/search")} w={"70%"} mb={4}>
            <BiSearch /> Search
          </Button>
          <Button onClick={onOpen} w={"70%"} mb={4}>
            <CiSquarePlus /> Add Post
          </Button>
          <Button onClick={() => navigate("/follows")} w={"70%"} mb={4}>
            <BiHeart /> Follows
          </Button>
          <Button onClick={() => navigate("/me")} w={"70%"}>
            <BiUser /> Profile
          </Button>
        </Box>
      )} */}
    </>
  );
}

export default CircleLayout;
