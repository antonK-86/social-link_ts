import axios from "axios"; //для typescript (https://www.npmjs.com/package/axios)
import { UserTypes, TProfile } from "../types/types";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "3b0fc426-1055-4e9c-95b5-f49150fe87ee",
  },
});

//TYPES
type GetUsersApiType = {
  items: Array<UserTypes>;
  totalCount: number;
  error: string;
};

type FollowApiType = {
  resultCode: number;
  messages: Array<string>;
  data: {};
};

type AuthApiType = {
  resultCode: number;
  messages: Array<string>;
  data: { id: number; email: string; login: string };
};

type GetProfileApiType = TProfile;

//userApi
export const usersApi = {
  getUsers: (
    count: number,
    page: number,
    friends: boolean | null,
    term: string
  ) => {
    return instance.get<GetUsersApiType>(
      `users?friend=${friends}&count=${count}&page=${page}&term=${term}`
    );
  },
  follow: (userId: number) => {
    return instance.post<FollowApiType>(`follow/${userId}`);
  },
  unFollow: (userId: number) => {
    return instance.delete<FollowApiType>(`follow/${userId}`);
  },
  getSubscribe: (userId: number) => {
    return instance.get(`follow/${userId}`);
  },
};

//authApi
export const authApi = {
  authMe() {
    return instance.get<AuthApiType>(`auth/me`);
  },
  signIn: (
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null
  ) => {
    return instance.post("auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  signOut: () => {
    return instance.delete("auth/login");
  },
};

export const securityApi = {
  getCaptcha: () => {
    return instance.get("security/get-captcha-url");
  },
};

//profileApi
export const profileApi = {
  getProfile: (userId: number) => {
    return instance.get<GetProfileApiType>("profile/" + userId);
  },
  getProfileStatus: (userId: number) => {
    return instance.get<string>("profile/status/" + userId);
  },
  editProfile: (data: any) => {
    return instance.put("profile", data);
  },
  editProfileStatus: (status: string) => {
    return instance.put("profile/status", { status: status });
  },
  uploadProfilePhoto: (file: File) => {
    var formData = new FormData(); //создаем объект для отправки файла
    formData.append("image", file);
    return instance.put("profile/photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
