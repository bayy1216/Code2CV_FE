import {Outlet, useNavigate} from "react-router-dom";
import {useUserStore} from "@/store/userStore.ts";
import {useEffect} from "react";
import secureLocalStorage from "react-secure-storage";

export default function AfterLoginLayout() {
  const { user } = useUserStore();
  const nav = useNavigate();

  useEffect(() => {
    if(!user && secureLocalStorage.getItem('accessToken') === null){
      nav('/');
    }
  }, [user]);

  return (
    <div className="h-full w-full flex flex-col items-center bg-primary-bg-grey">
      <div className="h-full w-[1280px]">
        <Outlet/>
      </div>

    </div>

  );
}