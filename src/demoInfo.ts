import { IUser } from './utils/types';

export const data: IUser[] = [
  {
    id: 1010,
    name: 'John Doe',
    description: 'John Doe is an artist, view his work here.',
    images: [
      {
        id: 101,
        title: 'Image 1',
        url: 'https://via.placeholder.com/150',
        artistId: '1010',
      },
      {
        id: 102,
        title: 'Image 2',
        url: 'https://via.placeholder.com/150',
        artistId: '1010',
      },
    ],
    colors: {
      cardColor: '#00a2a2',
      cardDarkerColor: '#001314',
      lightColor: '#01dbdb',
      mainColor: '#00a2a2',
      mainDarkerColor: '#001314',
      textColor: '#fff',
    },
  },
];
