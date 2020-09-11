export interface UserCreds {
  username: string;
  password: string;
  confirmPassword: string;
  age: string;
  email: string;
}

export type Variables = {
  register: UserCreds;
};
