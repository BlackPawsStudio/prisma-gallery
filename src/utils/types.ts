export interface IImage {
  id: string;
  title: string;
  url: string;
  artistId: string;
}

export interface IColors {
  mainColor: string;
  mainDarkerColor?: string;
  lightColor?: string;
  textColor: string;
  topColor?: string;
  cardColor?: string;
  cardDarkerColor?: string;
  bottomColor?: string;
}

export interface IUser {
  id: string;
  name: string;
  description: string;
  images?: IImage[];
  colors: IColors;
  count?: string;
}
