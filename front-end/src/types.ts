export interface IUserInterface {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  password: string;
  RentPosts?: [];
}

export interface IRentAreaInterface {
  id: string;
  area: string;
}

export interface IRentPostInterface {
  id?: string;
  heading: string;
  description: string;
  rent: number;
  bed: number;
  bath: number;
  size: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  userUsername?: string;
  rentAreaName: string;
}

export interface IErrorInterface {
  success: boolean | null;
  message: string;
}
export interface IUserCredentialsInterface {
  username: string;
  password: string;
}
