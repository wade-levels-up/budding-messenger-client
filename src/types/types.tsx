export type UserData = {
  username: string;
  bio: string;
  joined: string;
  profile_picture_path: string;
  friendsOf: Friend[];
};

export type Friend = {
  username: string;
  profile_picture_path: string;
  joined: string;
  bio: string;
  friendsOf: Friend[];
};
