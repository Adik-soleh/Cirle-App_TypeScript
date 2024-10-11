import { Link as ReactLink } from "react-router-dom";
import {
  Container,
  Flex,
  Text,
  Image,
  Link as CircleLink,
} from "@chakra-ui/react";

import { fontSizing } from "../styles/style";
import LoginInput from "../components/inputs/LoginInput";

function LoginPage() {
  return (
    <Container height={"100vh"} width={"400px"} alignContent={"center"}>
      <Flex direction={"column"} gap={"1rem"}>
        <Image src={"/circle.png"} width={"35%"} mt={"3rem"} />
        <Text
          fontSize={fontSizing.bigger}
          fontWeight={"600"}
          mt={"-.75rem"}
          paddingTop={"4"}
        >
          <h2>Login to circle</h2>
        </Text>
        <LoginInput />
        <Text>
          <p>
            {" "}
            Don't have an account yet?
            <CircleLink
              as={ReactLink}
              to={"/register"}
              color={"circle.accent"}
              ml={".25rem"}
            >
              Create account.
            </CircleLink>
          </p>
        </Text>
      </Flex>
    </Container>
  );
}

export default LoginPage;
