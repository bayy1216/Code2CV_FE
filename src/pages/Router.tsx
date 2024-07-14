import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "@/pages/(beforeLogin)/main/MainPage.tsx";
import LoginPage from "@/pages/(beforeLogin)/login/LoginPage.tsx";
import RootLayout from "@/pages/RootLayout.tsx";
import GithubAfterLoginPage from "@/pages/(beforeLogin)/login/GithubAfterLoginPage.tsx";
import DashboardPage from "@/pages/(afterLogin)/dashboard/DashboardPage.tsx";
import AfterLoginLayout from "@/pages/(afterLogin)/AfterLoginLayout.tsx";
import ProjectPage from "@/pages/(afterLogin)/project/ProjectPage.tsx";
import ProjectDetailPage from "@/pages/(afterLogin)/project/ProjectDetailPage.tsx";

const router = createBrowserRouter([
  {path: "/", element: <RootLayout/>, children: [
    {path: "", element: <MainPage/>},
    {path: "user", element: <AfterLoginLayout/>, children: [
        {path: "dashboard", element: <DashboardPage/>},
        {path: "resume", element: <div>resume</div>},
        {path: "project", element: <ProjectPage/>},
        {path: "project/:id", element: <ProjectDetailPage/>},
        {path: "mypage", element: <div>mypage</div>}
      ]
    },
    {path: "login", element: <LoginPage/>},
  ]},
  {path: "/login/oauth2/github", element: <GithubAfterLoginPage/>},
]);

export default function Router() {
  return (
    <RouterProvider router={router}/>
  );
}