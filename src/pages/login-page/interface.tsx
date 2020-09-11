export interface UserCreds {
  username: string;
  password: string;
}

export type Variables = {
  login: UserCreds;
};
