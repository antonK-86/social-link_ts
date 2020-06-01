export type UserTypes = {
  name: string;
  id: number;
  photos: { small: string | null; large: string | null } | null;
  followed: boolean;
  status: string | null;
};

export type TProfile = {
  userId: number;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos: {
    small: string;
    large: string;
  };
};
