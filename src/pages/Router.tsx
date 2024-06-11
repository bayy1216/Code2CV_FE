import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useUserStore} from "@/store/userStore.ts";
import {useEffect} from "react";
import secureLocalStorage from "react-secure-storage";
import MainPage from "@/pages/(beforeLogin)/main/MainPage.tsx";
import LoginPage from "@/pages/(beforeLogin)/login/LoginPage.tsx";
import {getUser} from "@/api/user/user.api.ts";
import RootLayout from "@/pages/RootLayout.tsx";
import GithubAfterLoginPage from "@/pages/(beforeLogin)/login/GithubAfterLoginPage.tsx";
import DashboardPage from "@/pages/(afterLogin)/dashboard/DashboardPage.tsx";
import AfterLoginLayout from "@/pages/(afterLogin)/AfterLoginLayout.tsx";
import ProjectPage from "@/pages/(afterLogin)/dashboard/ProjectPage.tsx";

const router = createBrowserRouter([
  {path: "/", element: <RootLayout/>, children: [
    {path: "", element: <MainPage/>},
    {path: "user", element: <AfterLoginLayout/>, children: [
        {path: "dashboard", element: <DashboardPage/>},
        {path: "resume", element: <div>resume</div>},
        {path: "project", element: <ProjectPage/>},
        {path: "mypage", element: <div>mypage</div>}
      ]
    },
  ]},
  {path: "/login", element: <LoginPage/>},
  {path: "/login/oauth2/github", element: <GithubAfterLoginPage/>},
]);

export default function Router() {
  const {user, setUser, resetUser} = useUserStore();
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
    <RouterProvider router={router}/>
  );
}