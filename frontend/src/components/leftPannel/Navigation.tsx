import { Box, Flex, Image, Spacer, useDisclosure } from "@chakra-ui/react";
import { BiHeart, BiSearchAlt, BiSolidHome, BiUser } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

import API from "@/connect/api";
import { unsetLoggedUser } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

import SolidButton from "@/components/buttons/SolidButton";
import BrandModal from "@/components/modalsCard/BrandModal";
import NewVibe from "@/components/post/NewPost";
import DarkModeToggle from "@/DarkMode/useColorMode";
import { usePost } from "@/hooks/usePosts";
import NavigationItem, { LogoutItem } from "./NavigationItem";

function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, onPost] = usePost({ onClose });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onLogout() {
    API.SET_TOKEN("");
    dispatch(unsetLoggedUser());

    navigate("/");
  }

  return (
    <Flex
      as={"nav"}
      direction={"column"}
      pr={"2rem"}
      gap={"2rem"}
      height={"90vh"}
      // pos={'fixed'}
      w={"266px"}
    >
      <Image
        src={"/circle.png"}
        objectFit={"cover"}
        width={"85%"}
        mb={"1rem"}
      />
      <DarkModeToggle />
      <Link to={"/"}>
        <NavigationItem icon={<BiSolidHome />} text={"Home"} />
      </Link>
      <Link to={"/search"}>
        <NavigationItem icon={<BiSearchAlt />} text={"Search"} />
      </Link>
      <Link to={"/follows"}>
        <NavigationItem icon={<BiHeart />} text={"Follows"} />
      </Link>
      <Link to={"/me"}>
        <NavigationItem icon={<BiUser />} text={"Profile"} />
      </Link>
      <SolidButton onClick={onOpen} text={"Create Post"} py={"1.5rem"} />
      <Spacer />

      <LogoutItem icon={<CgLogOut />} text={"Logout"} onLogout={onLogout} />
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
  );
}

export default Navigation;
