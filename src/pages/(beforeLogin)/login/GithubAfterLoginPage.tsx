import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {oauthLogin} from "@/api/auth/auth.api.ts";
import secureLocalStorage from "react-secure-storage";
import {useUserStore} from "@/store/userStore.ts";

export default function GithubAfterLoginPage() {
  const location = useLocation();
  const nav = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const storedState = localStorage.getItem('state');

  const {setUser} = useUserStore();

  useEffect( () => {
    if (state !== storedState) {
      alert('state is not valid');
      nav('/');
      return;
    }

    localStorage.removeItem('state');
    const req = {
      code: code!,
      state: state!,
    }

    oauthLogin(req).then((res) => {
      secureLocalStorage.setItem('accessToken', res.accessToken);
      secureLocalStorage.setItem('refreshToken', res.refreshToken);
      setUser(res.user);
      nav('/user/dashboard');
    }).catch(() => {
      nav('/');
    });
  }, []);

  return (
    <>
      Loading...
    </>
  );
}