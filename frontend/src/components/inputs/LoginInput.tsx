import {Input, Box, FormControl, Link as LinkFp } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

import SolidButton from "../buttons/SolidButton";


function LoginInput() {
  return (
    <FormControl display={"flex"} flexDirection={"column"} gap={".5rem"}>
      <Input
        type={"text"}
        placeholder={"Email/Username"}
        name={"username"}
      />
      <Input
        type={"password"}
        placeholder={"Password"}
        name={"password"}
      />
      <h3>
        <LinkFp as={ReactLink} to={"/forgot"} ml={"auto"}>
          Forgot password?
        </LinkFp>
      </h3>

      <Box mt={".5rem"}>
        <SolidButton text={"Login"} />
      </Box>
    </FormControl>
  );
}

export default LoginInput;
