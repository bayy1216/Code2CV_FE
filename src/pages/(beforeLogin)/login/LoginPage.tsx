import {useUserStore} from "@/store/userStore.ts";
import {useNavigate} from "react-router-dom";
import {GITHUB_LOGIN_URL} from "@/const/data.ts";


export default function LoginPage() {
  const { user } = useUserStore();
  const nav = useNavigate();
  const randomState = Math.random().toString(36).substring(7);
  localStorage.setItem('state', randomState);
  if(user){
    nav('/');
  }else{
    window.location.href =
      `${GITHUB_LOGIN_URL}&state=${randomState}`;
  }
  return (
    <div>
      Loading...
    </div>
  );
}