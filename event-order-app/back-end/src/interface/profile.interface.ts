export interface IUserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface IProfileResponse {
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
}
