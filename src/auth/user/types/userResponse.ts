import { UserType } from './user.type';

export interface UserResponse {
  user: UserType & { token: string };
}
