import GhostButton from "@/components/buttons/GhostButton";
import {
  Box,
  Collapse,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";

interface ValidatedInputProps<T extends FieldValues> {
  autoFocus?: boolean;
  type: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
}

function ValidatedInput<T extends FieldValues>(props: ValidatedInputProps<T>) {
  const { type, placeholder, name, error, register } = props;
  const isCollapsed = error ? true : false;

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <Box>
      <InputGroup>
        {type == "password" && (
          <InputLeftElement>
            <RiLockPasswordLine />
          </InputLeftElement>
        )}
        {type == "text" && (
          <InputLeftElement>
            <CiUser />
          </InputLeftElement>
        )}
        {type == "email" && (
          <InputLeftElement>
            <MdOutlineEmail />
          </InputLeftElement>
        )}
        <Input
          autoFocus={props.autoFocus && true}
          id={name}
          type={type !== "password" ? type : showPassword ? "text" : type}
          variant={"hollow"}
          placeholder={placeholder}
          {...register(name)}
        />
        {type === "password" && (
          <InputRightElement width="4.5rem">
            <GhostButton color={"white"} onClick={togglePassword}>
              {showPassword ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
            </GhostButton>
          </InputRightElement>
        )}
      </InputGroup>

      <Collapse in={isCollapsed} transition={{ enter: { duration: 0.5 } }}>
        <Text mt={".5rem"} color={"circle.error"}>
          {error && error.message}
        </Text>
      </Collapse>
    </Box>
  );
}

export default ValidatedInput;
