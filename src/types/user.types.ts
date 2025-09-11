export type TUser = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  avatar: string;
};

export type TAuthState = {
  token: string | null;
  user: string | null;
  _persist?: {
    version: number;
    rehydrated: boolean;
  };
};
