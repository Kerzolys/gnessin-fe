export type THeroEvent = {
  title: string;
  date: string;
  id?: string;
};

export type TFestival = {
  description: string;
  image: string;
  id?: string;
};

export type TVideo = {
  title: string;
  videoSrc: string;
  id: string;
};

// export type TAbout = {};

export type TNews = {
  date: string;
  shortDescription: string;
  description: string;
  id?: string;
  title: string;
  photos?: TPhoto[];
};

export type TPhoto = {
  title: string;
  src: string;
  id?: string;
};

export type TSocial = {
  name: string;
  url: string;
  id?: string;
  image: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  token: string;
};
