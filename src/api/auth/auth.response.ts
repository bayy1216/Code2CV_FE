import { UserModel} from "@/api/user/user.response.ts";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserModel
}