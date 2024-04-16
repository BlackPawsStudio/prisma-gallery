import { IUser } from './utils/types';

export const data: IUser[] = [
  {
    id: '1010',
    name: 'John Doe',
    description: 'John Doe is an artist, view his work here.',
    images: [
      {
        id: '101',
        title: 'Image 1',
        url: 'https://via.placeholder.com/150',
        artistId: '1010',
      },
      {
        id: '102',
        title: 'Image 2',
        url: 'https://via.placeholder.com/150',
        artistId: '1010',
      },
    ],
    colors: {
      cardColor: 'transparent',
      cardDarkerColor: '#001314',
      mainColor: '#00a2a2',
      mainDarkerColor: '#001314',
      topColor: 'transparent',
      bottomColor: '#001314',
      lightColor: '#01dbdb',
      textColor: '#fff',
    },
  },
  {
    id: '230',
    name: 'Jane Doe',
    description: 'Jane Doe is an artist, view her work here.',
    images: [
      {
        id: '101',
        title: 'Image 1',
        url: 'https://via.placeholder.com/150',
        artistId: '1010',
      },
      {
        id: '102',
        title: 'Image 2',
        url: 'https://via.placeholder.com/150',
        artistId: '1010',
      },
    ],
    colors: {
      cardColor: '#3e0239',
      cardDarkerColor: 'transparent',
      lightColor: '#d178e0',
      mainColor: '#3e0239',
      mainDarkerColor: '#3e0239',
      textColor: '#74ffff',
      topColor: '#3e0239',
    },
  },
];
