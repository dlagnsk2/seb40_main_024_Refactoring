import { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Modal } from '../Common/Modal';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  margin: 250px;
  width: 600px;
  height: 700px;
  border: 8px solid #92b4ec;
  background-color: #e8f0fe;
  border-radius: 10px;
`;

const TitleBox = styled.div`
  margin-bottom: 30px;
  margin-left: 1px;
  width: 210px;
  font-size: 40px;
  font-weight: bold;
  border-bottom: 5px solid #92b4ec;
  color: #92b4ec;
  border-radius: 1px;
`;

const InputBox = styled.div`
  .input-box {
    position: relative;
    margin: 10px 0;
  }
  .input-box > input {
    background: transparent;
    border: none;
    border-bottom: solid 1px #ccc;
    padding: 20px 0px 5px 0px;
    font-size: 14pt;
    width: 100%;
    margin-bottom: 15px;
  }
  input::placeholder {
    color: transparent;
  }
  input:placeholder-shown + label {
    color: #aaa;
    font-size: 14pt;
    top: 15px;
  }
  input:focus + label,
  label {
    color: #8aa1a1;
    font-size: 10pt;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
  }

  input:focus,
  input:not(:placeholder-shown) {
    border-bottom: solid 1px #92b4ec;
    outline: none;
  }
  input[type='submit'] {
    background-color: #8aa1a1;
    border: none;
    color: white;
    border-radius: 5px;
    width: 100%;
    height: 35px;
    font-size: 14pt;
    margin-top: 100px;
  }
  .message {
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -1px;
    &.success {
      color: #92b4ec;
    }
    &.error {
      color: red;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 10px;
  margin-top: 30px;
  /* border: 1px solid #0000ff; */
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 5px;
  margin: 10px;
  /* border: 1px solid #0000ff; */
  button {
    width: 120px;
    height: 35px;
    position: relative;
    border: none;
    display: inline-block;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
    color: #444;
    &.success {
      background-color: #92b4ec;
      :hover {
        color: #fff;
        letter-spacing: 1px;
        transform: scale(1.1);
        cursor: pointer;
      }
      :active {
        position: relative;
        top: 3px;
      }
    }
    &.error {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

export const SignupBox = () => {
  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // 이름, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // Error
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const SignUpData = {
    email: email,
    name: name,
    password: password,
  };
  const [openModal, setOpenModal] = useState(false);
  const [errOpenModal, seterrOpenModal] = useState(false);
  const abc = !(isName && isEmail && isPassword && isPasswordConfirm);

  // 이름
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setNameMessage('2글자 이상 10글자 미만으로 입력해주세요.');
      setIsName(false);
    } else {
      setNameMessage('사용 가능한 이름입니다.');
      setIsName(true);
    }
  }, []);

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸습니다.');
      setIsEmail(false);
    } else {
      setEmailMessage('정확한 이메일 형식입니다.');
      setIsEmail(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('영문, 숫자 조합으로 8자리 이상 입력해주세요.');
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호 입니다.');
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호가 일치합니다.');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 맞지 않습니다.');
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  const SuccessSignUp = () => {
    setOpenModal(true);
  };

  const UnsuccessSignUp = () => {
    seterrOpenModal(true);
  };
  // 회원가입 버튼
  const onClickSubmit = async () => {
    try {
      await axios.post(`${URL}/member/`, SignUpData);
      SuccessSignUp();
    } catch (e) {
      UnsuccessSignUp();
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    navigate('/login');
  };

  const errCloseModal = () => {
    seterrOpenModal(false);
  };

  return (
    <>
      <PageContainer>
        <Container>
          <TitleBox>회원가입</TitleBox>
          <InputBox>
            <div className="input-box">
              <input
                id="username"
                type="text"
                name="username"
                placeholder="이름"
                onChange={onChangeName}
              />
              <label htmlFor="username">이름</label>
              {name.length > 0 && (
                <span className={`message ${isName ? 'success' : 'error'}`}>
                  {nameMessage}
                </span>
              )}
            </div>
            <div className="input-box">
              <input
                id="useremail"
                type="text"
                name="useremail"
                placeholder="이메일"
                onChange={onChangeEmail}
              />
              <label htmlFor="useremail">이메일</label>
              {email.length > 0 && (
                <span className={`message ${isEmail ? 'success' : 'error'}`}>
                  {emailMessage}
                </span>
              )}
            </div>
            <div className="input-box">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호"
                onChange={onChangePassword}
              />
              <label htmlFor="password">비밀번호</label>
              <span className={`message ${isPassword ? 'success' : 'error'}`}>
                {passwordMessage}
              </span>
            </div>
            <div className="input-box">
              <input
                id="passwordconfirm"
                type="password"
                name="passwordconfirm"
                placeholder="비밀번호 확인"
                onChange={onChangePasswordConfirm}
              />
              <label htmlFor="password">비밀번호 확인</label>
              {passwordConfirm.length > 0 && (
                <span
                  className={`message ${
                    isPasswordConfirm ? 'success' : 'error'
                  }`}
                >
                  {passwordConfirmMessage}
                </span>
              )}
            </div>
          </InputBox>
          <ButtonBox>
            <Button>
              <button
                className={`message ${abc ? 'error' : 'success'}`}
                disabled={
                  !(isName && isEmail && isPassword && isPasswordConfirm)
                }
                onClick={onClickSubmit}
              >
                회원가입 하기
              </button>
            </Button>
            <Modal open={openModal} close={closeModal} header="회원가입 알림">
              회원가입이 완료되었습니다.
            </Modal>
            <Modal open={errOpenModal} close={errCloseModal} header="오류 알림">
              회원가입 실패하였습니다.
            </Modal>
          </ButtonBox>
        </Container>
      </PageContainer>
    </>
  );
};
