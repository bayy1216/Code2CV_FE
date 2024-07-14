import {SkillDashboardResponse} from "@/api/user/user.response.ts";
import {useState} from "react";
import SkillBox from "@/pages/(afterLogin)/dashboard/components/SkillBox.tsx";

export function DashboardMain({skillDashboard}: { skillDashboard?: SkillDashboardResponse}) {
  const [selectIndex, setSelectIndex] = useState(0);
  const menuOnClick = (index: number) => {
    setSelectIndex(index);
  }

  return (
    <div className="w-[802px] my-4">
      <TopMenu menuOnClick={menuOnClick} selectIndex={selectIndex}/>
      <div className="h-[12px]"/>
      <SkillBox skillDashboard={skillDashboard}/>
    </div>
  );
}



function TopMenu({menuOnClick, selectIndex} : {menuOnClick: (index: number) => void, selectIndex: number}){
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
            <div className="w-[60px] h-[3px] bg-bc"/>
          ):  <div/>}

        </div>
      ))}
    </div>
  );
}
