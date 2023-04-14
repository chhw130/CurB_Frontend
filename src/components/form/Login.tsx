import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login } from "api/axios/axiosSetting";
import axios from "axios";
import { LoginData } from "interface/Interface";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

const Login = (props: any) => {
  const { handleSubmit, register } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    console.log(data);
    const loginData = {
      username: data.id,
      password: data.password,
    };

    console.log(loginData);

    // axios
    //   .post(`/api/v1/users/login/`, loginData, {
    //     withCredentials: true,
    //   })
    //   .then((data) => console.log(data));
    login(loginData);
  };
  return (
    <Modal
      motionPreset={"scale"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="md"
    >
      <ModalOverlay />
      <ModalContent p="5" pt="10" pb={"10"}>
        <ModalHeader fontSize={"2xl"} textAlign={"center"} mt={"5"}>
          로그인
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={"5"} pb={"5"}>
            <InputGroup>
              <InputLeftElement children={<FontAwesomeIcon icon={faUser} />} />
              <Input
                required
                {...register("id", { required: "아이디를 입력하세요." })}
                variant={"outline"}
                focusBorderColor="gray.300"
                placeholder="아이디"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FontAwesomeIcon icon={faLock} />} />
              <Input
                required
                type={"password"}
                {...register("password", {
                  required: "비밀번호를 압력하세요.",
                })}
                focusBorderColor="gray.300"
                placeholder="비밀번호"
              />
            </InputGroup>
            <Button
              type="submit"
              mt="4"
              color={"white"}
              bg={"#ff404c"}
              _hover={{
                backgroundColor: "#ff7982",
              }}
              width={"100%"}
            >
              로그인
            </Button>
            <HStack
              fontSize={"sm"}
              pl={5}
              pr={5}
              w={"100%"}
              justifyContent={"center"}
            >
              <Link to="/" onClick={() => props.onClose()}>
                아이디 찾기
              </Link>
              <Text>|</Text>
              <Link to="/" onClick={() => props.onClose()}>
                비밀번호 찾기
              </Link>
              <Text>|</Text>
              <Link to={"/signup"} onClick={() => props.onClose()}>
                회원가입
              </Link>
            </HStack>
            {/* <SocialLogin /> */}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Login;
