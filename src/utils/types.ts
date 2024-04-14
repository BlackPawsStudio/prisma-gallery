export interface IImage {
  id: number;
  title: string;
  url: string;
  artistId: string;
}

export interface IUser {
  id: number;
  name: string;
  description: string;
  images: IImage[];
}