import {useUserStore} from "@/store/userStore.ts";
import {useNavigate} from "react-router-dom";
import {GITHUB_LOGIN_URL} from "@/const/data.ts";
import {useState} from "react";
import {emailLogin} from "@/api/auth/auth.api.ts";
import secureLocalStorage from "react-secure-storage";


export default function LoginPage() {
  const { user, setUser } = useUserStore();
  const nav = useNavigate();

  const randomState = Math.random().toString(36).substring(7);
  localStorage.setItem('state', randomState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if(user){
    nav('/');
  }
  const onLoginClick = async () => {
    const res = await emailLogin({email, password});
    secureLocalStorage.setItem('accessToken', res.accessToken);
    secureLocalStorage.setItem('refreshToken', res.refreshToken);
    setUser(res.user);
    nav('/user/dashboard');
  }

  return (
    <div className="flex flex-col items-center">
      <div className="h-[60px]"/>
      <button className="font-bold text-[24px]">
        로그인
      </button>
      <div className="h-[40px]"/>
      <EmailLoginBox
        onLoginClick={onLoginClick}
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
      />


      <div className="font-medium text-[14px] text-[#DEDEDE] my-[28px]">
        —————————— SNS 계정으로 로그인 ——————————
      </div>

      <div className="w-[380px] h-[48px] border-[#DEDEDE] border-[1px] rounded-[12px]">
        <a href={GITHUB_LOGIN_URL + `&state=${randomState}`}>
          <div
            className="font-normal text-[#818182] text-[14px]
            h-full w-full justify-center items-center flex"
          >
            Github 게정으로 로그인
          </div>

        </a>
      </div>
    </div>
  );
}

interface EmailLoginBoxProps {
  onLoginClick: () => void;
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
}

function EmailLoginBox({
   onLoginClick, onPasswordChange, onEmailChange, email, password
}: EmailLoginBoxProps){
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      onLoginClick();
    }
  }
  return (
    <div className="flex flex-col">
      <input
        className="border-[#DEDEDE] border-[1px] w-[380px] h-[52px] rounded-[12px] px-[16px] mb-[12px]"
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <input
        className="border-[#DEDEDE] border-[1px] w-[380px] h-[52px] rounded-[12px] px-[16px] mb-[16px]"
        type="password"
        placeholder="비밀번호"
        onChange={(e) => onPasswordChange(e.target.value)}
        value={password}
        onKeyDown={onKeyDown}
      />
      <div className="flex flex-row items-stretch">
        <div className="flex-[1]" />
        <div className="font-medium text-[13px] text-[#A2A2A3] mb-[32px]">
          비밀번호 찾기
        </div>
      </div>
      <button
        className="bg-bc text-white rounded-[12px] w-[380px] h-[54px] border-white"
        onClick={()=> onLoginClick()}
      >
        <div className="font-medium text-[16px]">
          로그인
        </div>
      </button>
    </div>
  );
}

