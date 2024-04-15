export interface IImage {
  id: number;
  title: string;
  url: string;
  artistId: string;
}

export interface IColors {
  mainColor: string;
  mainDarkerColor: string;
  cardColor: string;
  cardDarkerColor: string;
  lightColor: string;
  textColor: string;
}

export interface IUser {
  id: number;
  name: string;
  description: string;
  images: IImage[];
  colors: IColors;
}
