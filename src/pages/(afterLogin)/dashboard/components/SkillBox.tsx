import {SkillDashboardResponse} from "@/api/user/user.response.ts";

export default function SkillBox({skillDashboard}: { skillDashboard?: SkillDashboardResponse}){
  const langStr = skillDashboard?.languages.map((lang) => lang.name).join(', ') ?? '';
  const frameworkStr = skillDashboard?.frameworks.map((framework) => framework.name).join(', ') ?? '';
  return (
    <div className="w-[802px] h-[379px] flex flex-col">
      <div className="w-full flex flex-row justify-between">
        {skillDashboard !== undefined &&
            <SkillItem title={"Language"} content={langStr} count={skillDashboard.languages.length}/> }
        {skillDashboard !== undefined &&
            <SkillItem title={"Framewrok"} content={frameworkStr} count={skillDashboard.frameworks.length}/> }
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
          <div className="text-black text-[12px] font-semibold">
            {count}
          </div>

        </div>
      </div>
      <div className="text-[14px] font-normal text-gray-0">
        {content}
      </div>
    </div>
  );
}