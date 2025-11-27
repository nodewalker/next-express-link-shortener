export type CreateUserDetails = {
  username: string;
  password: string;
};

export type CreateLinkDetails = {
  userId: string;
  longLink: string;
};
