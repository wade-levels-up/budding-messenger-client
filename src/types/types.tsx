export type UserData = {
  username: string;
  bio: string;
  joined: string;
  profile_picture_path: string;
  friendsOf: Friend[];
  verified: boolean;
};

export type ShallowUserData = {
  username: string;
  profile_picture_path: string;
};

export type Friend = {
  username: string;
  profile_picture_path: string;
  joined: string;
  bio: string;
  friendsOf: Friend[];
};
