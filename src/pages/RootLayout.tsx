import RootHeader from "@/pages/RootHeader.tsx";
import {Outlet} from "react-router-dom";
import {useUserStore} from "@/store/userStore.ts";
import secureLocalStorage from "react-secure-storage";
import {useEffect} from "react";
import {getUser} from "@/api/user/user.api.ts";

export default function RootLayout() {
  const {user, setUser, resetUser} = useUserStore();
  if(import.meta.env.MODE === 'dev'){
    const token = import.meta.env.VITE_ACCESS_TOKEN;
    if(token){
      secureLocalStorage.setItem('accessToken', token);
    }
  }
  useEffect(() => {
    if (user) {
      return;
    }
    if (secureLocalStorage.getItem('accessToken') === null) {
      return;
    }
    getUser().then((user) => {
      setUser(user);
    }).catch(() => {
      resetUser();
    });

  }, []);
  return (
    <div className="w-full h-dvh flex flex-col items-center bg-primary-bg-grey">
      <div className="w-full">
        <RootHeader/>
      </div>
      <div className="w-full h-full">
        <Outlet/>
      </div>

    </div>
  );
}