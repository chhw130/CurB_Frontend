import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValue } from "../../interface/Interface";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { send_message } from "api/axios/phoneAuthentication";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<FormValue>();

  /**링크 네비게이트 */
  const navigate = useNavigate();

  /**회원가입 form 제출시 */
  const onSubmit = (data: FormValue) => {
    const signUpData = {
      id: data.id,
      password: data.password,
      name: data.name,
      phone_number: "010" + data.phone_number,
      email: data.email,
      gender: data.gender,
      group: data.group,
      is_coach: data.is_coach,
    };
    console.log(signUpData);
  };

  return (
    <>
      <div className={styles.signUp}>
        <img
          className={styles.signUpImg}
          alt=""
          src="https://velog.velcdn.com/images/view_coding/post/6e4d7220-8bc8-4e88-9d4b-f3dd9e09b523/image.png"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.typeDiv}>
            <label htmlFor="id">ID</label>
            <Input
              id="id"
              placeholder="Id를 입력하세요."
              {...register("id", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                maxLength: {
                  value: 15,
                  message: "15자까지 입력가능합니다.",
                },
                minLength: {
                  value: 3,
                  message: "2자 이상 입력하세요.",
                },
                pattern: {
                  value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
                  message: "공백을 제거해 주세요.",
                },
              })}
            />
            {errors.id && <p>{errors.id.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label htmlFor="password">비밀번호</label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              autoComplete="off"
              {...register("password", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                minLength: {
                  value: 8,
                  message: "8자 이상 입력하세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자까지 입력가능합니다.",
                },
                pattern: {
                  // eslint-disable-next-line
                  // value: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,

                  value:
                    // eslint-disable-next-line
                    /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/,
                  // eslint-disable-next-line

                  message: "특수문자 1개 이상 넣어주세요.",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              autoComplete="off"
              {...register("passwordConfirm", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                validate: {
                  check: (val) => {
                    if (getValues("password") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
              })}
            />
            {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label htmlFor="name">성명</label>
            <Input
              id="name"
              placeholder="이름을 입력하세요"
              {...register("name", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                maxLength: {
                  value: 10,
                  message: "20자까지 입력 가능합니다.",
                },
                pattern: {
                  value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
                  message:
                    "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)",
                },
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className={styles.typeDiv}>
            <label htmlFor="number">전화번호</label>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<FontAwesomeIcon icon={faPhone} />}
                height="50px"
              />
              <Input
                id="number"
                type="number"
                placeholder="전화번호를 입력하세요."
                {...register("phone_number", {
                  required: "필수 정보입니다.",
                })}
              />
              <Button onClick={() => send_message(getValues("phone_number"))}>
                인증하기
              </Button>
            </InputGroup>
            {errors?.email && <p>{errors.phone_number?.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              placeholder="이메일을 입력하세요"
              {...register("email", {
                required: "필수 정보입니다.",
                pattern: {
                  // eslint-disable-next-line
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식에 맞지 않습니다.",
                },
                maxLength: {
                  value: 40,
                  message: "40자까지 입력가능합니다.",
                },
              })}
            />
            {errors?.email && <p>{errors.email.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label htmlFor="group">부트캠프</label>
            <Select
              id="group"
              height="50px"
              placeholder="부트캠프를 선택해주세요"
              {...register("group", {
                required: "필수 정보입니다.",
              })}
            >
              <option>oz코딩스쿨</option>
              <option>싸피(Ssafy)</option>
              <option>라피신(서울42)</option>
            </Select>
            {errors?.group && <p>{errors.group?.message}</p>}
          </div>
          <Box width="87%">
            <Box display="flex" justifyContent="center">
              <RadioGroup>
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="twitter"
                    value="남"
                    {...register("gender", {
                      required: "성별을 입력해주세요.",
                    })}
                  >
                    남
                  </Radio>
                  <Radio
                    colorScheme="red"
                    value="여"
                    {...register("gender", {
                      required: "성별을 입력해주세요.",
                    })}
                  >
                    여
                  </Radio>
                </Stack>
              </RadioGroup>
              <Flex>
                <Checkbox {...register("is_coach")} marginLeft="20px">
                  코치
                </Checkbox>
              </Flex>
            </Box>
            {errors?.gender && (
              <p className={styles.error}>{errors.gender?.message}</p>
            )}
          </Box>
          <div className={styles.buttonDiv}>
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              이전
            </button>

            <button>회원가입</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUp;
