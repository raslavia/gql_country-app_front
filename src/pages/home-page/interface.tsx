export interface CountriesVisited {
  id: string;
  name: string;
  capital: string;
}

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  exp?: number;
  iat?: number;
  token?: string;
  age?: string;
  createdAt?: string;
  visited?: CountriesVisited[];
}
export type UserType = {
  user: UserInterface | null;
  login: (userData: UserInterface) => void;
  logout: () => void;
};
