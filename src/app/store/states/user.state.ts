import { UserResp } from "src/app/core/models/UserResp.model";

export interface UserState {
    user: UserResp| null;
    token: string;
    error: any;
  }