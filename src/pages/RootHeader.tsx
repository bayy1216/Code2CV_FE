import {useUserStore} from "@/store/userStore.ts";
import {UserModel} from "@/api/user/user.response.ts";
import {Link} from "react-router-dom";

const menuItems = [
  {label: '홈', href: '/user/dashboard'},
  {label: '이력서', href: '/user/resume'},
  {label: '프로젝트 분석', href: '/user/project'},
  {label: '마이페이지', href: '/user/mypage'},
]


export default function RootHeader() {
  const {user} = useUserStore();


  return (
    <header className="w-full flex flex-row h-[80px] items-center px-[200px]">
      <Link to={'/'}>
        <img src="/CODE2CV.svg" alt="logo"/>
      </Link>

      <div className="w-[80px]"></div>
      <nav className="flex justify-between h-[27px] w-[379px]">
        {menuItems.map((item, index) => (
          <Link to={item.href} key={index} className="text-[18px]">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex-grow"/>
      <UserMenu user={user}/>
    </header>
  )
}


function UserMenu({user}: { user?: UserModel }) {
  if (!user) {
    return (
      <div>
        <Link to="/login">로그인</Link>
      </div>
    )
  }
  return (
    <div>
      <img className="w-8 h-8 rounded-full overflow-hidden" src={user.profileImageUrl} alt=""/>
    </div>
  )
}