export interface UserInterface {
    id: string;
    username: string;
    email: string;
    exp: number;
    iat: number;
  }
 export type UserType = {
    user: UserInterface | null;
    login: (userData: UserInterface) => void;
    logout: () => void;
  };