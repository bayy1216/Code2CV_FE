import {useUserStore} from "@/store/userStore.ts";
import {UserModel} from "@/api/user/user.response.ts";
import {analyzeProjects} from "@/api/analyze/analyze.api.ts";
import {useState} from "react";

export default function DashboardPage() {
  const {user} = useUserStore();
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-row px-32 justify-center">
      <UserMenu user={user}/>
      <DashboardMain/>
    </div>
  );
}

function GrayBox({title, content}: { title: string, content: string }) {
  return (
    <div className="w-[212px] bg-primary-bg-grey rounded-lg py-2 px-4">
      <p className="text-gray-1 text-[12px] font-medium">
        {title}
      </p>
      <p className="text-[14px] font-semibold">
        {content}
      </p>
    </div>
  );
}

function UserMenu({user}: { user: UserModel }) {
  const now = new Date();
  const createdYear = new Date(user.githubStartAt);
  const devHistoryYearAndMonth = now.getFullYear() - createdYear.getFullYear();

  const [analyzeLoading, setAnalyzeLoading] = useState(false);


  const onClickAnalyze = () => {
    setAnalyzeLoading(true);
    analyzeProjects().then((res) => {
      console.log(res);
      setAnalyzeLoading(false);
      window.alert('분석 완료');
    });
  }


  return (
    <div className="w-[256px] flex flex-col
    items-center bg-white m-4 p-6 rounded-[24px]">
      <img className=" w-[62px] h-[62px] rounded-full" src={user.profileImageUrl} alt=""/>
      <h1 className="text-[18px] font-bold mt-2">
        {user.githubName}
      </h1>
      <div className="text-[12px] font-medium text-gray-2">
        {user.githubUserName}
      </div>
      <div className="my-2">
        <p className="text-gray-1 text-[14px] font-normal w-full">
          {user.githubBio}
        </p>
      </div>
      <div>
        <GrayBox title="소속" content={user.githubCompany}/>
        <div className="h-2"/>
        <GrayBox title="개발 경력" content={`${devHistoryYearAndMonth}년`}/>
      </div>
      <div className="flex-1"/>
      <button
        className="w-[212px] h-[44px] bg-bc text-white text-[14px] rounded-lg"
        disabled={analyzeLoading}
        onClick={onClickAnalyze}
      >
        Analyze
      </button>
      <div className="h-[6px]"/>
      <button
        className="w-[212px] h-[44px] bg-white text-[14px] border rounded-lg border-bc text-bc"
        onClick={() => console.log('Resume')}
      >
        Resume
      </button>

    </div>
  );
}

function DashboardMain() {
  const [selectIndex, setSelectIndex] = useState(0);
  const menuOnClick = (index: number) => {
    setSelectIndex(index);
  }

  return (
    <div className="w-[802px] my-4">
      <TopMenu menuOnClick={menuOnClick} selectIndex={selectIndex}/>
      <div className="h-[12px]"/>
      <SkillBox/>
    </div>
  );
}


const menuItems = [
  {
    'name': 'Skills',
  },
  {
    'name': 'Project',
  },
  {
    'name': 'Profile',
  },
  {
    'name': 'Contract',
  },
]

function TopMenu({menuOnClick, selectIndex} : {menuOnClick: (index: number) => void, selectIndex: number}){
  return (
    <div className="w-[802px] h-[56px] rounded-[18px] bg-white flex items-center pl-[20px]">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`w-[120px] h-full flex flex-col items-center justify-between cursor-pointer`}
          onClick={() => menuOnClick(index)}
        >
          <div/>
          <h1 className={`text-[16px] font-medium ${selectIndex === index ? 'text-bc' : 'text-gray-1'}`}>
            {item.name}
          </h1>
          {selectIndex === index ? (
            <line className="w-[60px] h-[3px] bg-bc"/>
          ):  <div/>}

        </div>
      ))}
    </div>
  );
}

function SkillBox(){
  return (
    <div className="w-[802px] h-[379px] flex flex-col">
      <div className="w-full flex flex-row justify-between">
        <SkillItem title={"Language"} content={"js, ts"} count={6}/>
        <SkillItem title={"Language"} content={"js, ts"} count={6}/>
        <SkillItem title={"Language"} content={"js, ts"} count={6}/>
      </div>
      <div className="flex-grow"/>
      <div className="w-full flex flex-row justify-between">
        <SkillItem title={"Language"} content={"js, ts"} count={6}/>
        <SkillItem title={"Language"} content={"js, ts"} count={6}/>
        <SkillItem title={"Language"} content={"js, ts"} count={6}/>
      </div>
    </div>
  );
}

interface SkillItemProps {
  title: string;
  count: number;
  content: string;
}

function SkillItem({title, count, content}: SkillItemProps) {
  return (
    <div className="w-[260px] h-[184px] bg-white rounded-[18px] p-4 pl-5">
      <div className="flex flex-row justify-between">
        <h1 className="text-[20px] font-semibold">
          {title}
        </h1>
        <div className="rounded-full bg-[#F4EEFF] w-6 h-6 flex justify-center items-center">
          <text className="text-black text-[12px] font-semibold">
            {count}
          </text>

        </div>
      </div>
      <text className="text-[14px] font-normal text-gray-0">
        {content}
      </text>
    </div>
  );
}