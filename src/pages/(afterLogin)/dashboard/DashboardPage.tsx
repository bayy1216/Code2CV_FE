import {useUserStore} from "@/store/userStore.ts";
import {SkillDashboardResponse} from "@/api/user/user.response.ts";
import {useQuery} from "@tanstack/react-query";
import {getSkillDashboard} from "@/api/user/user.api.ts";
import DashboardUserMenu from "@/pages/(afterLogin)/dashboard/components/Dashboard.UserMenu.tsx";
import {DashboardMain} from "@/pages/(afterLogin)/dashboard/components/Dashboard.Main.tsx";

export default function DashboardPage() {
  const {user} = useUserStore();
  const {data} = useQuery<SkillDashboardResponse>({
    queryKey: ['skillDashboard'],
    queryFn: getSkillDashboard,
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-row px-32 justify-center">
      <DashboardUserMenu user={user}/>
      <DashboardMain skillDashboard={data}/>
    </div>
  );
}




