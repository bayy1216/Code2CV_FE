import {UserModel} from "@/api/user/user.response.ts";
import {useState} from "react";
import {refreshProjects} from "@/api/project/project.api.ts";

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

export default function DashboardUserMenu({user}: { user: UserModel }) {
  const now = new Date();
  const createdYear = new Date(user.githubStartAt);
  const devHistoryYearAndMonth = now.getFullYear() - createdYear.getFullYear();

  const [analyzeLoading, setAnalyzeLoading] = useState(false);


  const onClickAnalyze = () => {
    setAnalyzeLoading(true);
    refreshProjects().then((res) => {
      console.log(res);
      setAnalyzeLoading(false);
      window.alert('분석 완료');
    });
  }


  return (
    <div className="w-[256px] h-[calc(100%-16px)] flex flex-col
    items-center bg-white m-4 p-6 rounded-[24px]">
      <img className=" w-[62px] h-[62px] rounded-full" src={user.profileImageUrl} alt=""/>
      <h1 className="text-[18px] font-bold mt-2">
        {user.githubName}
      </h1>
      <div className="text-[12px] font-medium text-gray-2">
        {user.githubUsername}
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