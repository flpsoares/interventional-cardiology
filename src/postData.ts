import { ImageSourcePropType } from 'react-native'

export interface PostDataProps {
  id: number
  name: string
  date: string
  time: string
  content: string
  userPhoto: ImageSourcePropType
  image: ImageSourcePropType[]
  likes: number
  comments: number
  isLiked: boolean
}

export const postData = [
  {
    id: 1,
    name: 'Felipe Bruno',
    date: '21/03/22',
    time: '5 horas',
    content: 'Conteúdo do primeiro post',
    userPhoto: require('../assets/default-user.png'),
    image: [
      require('../assets/post-content.png'),
      require('../assets/post-content.png'),
      require('../assets/post-content.png'),
      require('../assets/post-content.png'),
      require('../assets/post-content.png')
    ],
    likes: 332,
    comments: 3,
    isLiked: false
  },
  {
    id: 2,
    name: 'Victor Silva',
    date: '18/03/22',
    time: '2 dias',
    content: 'Conteúdo do segundo post',
    userPhoto: require('../assets/default-user.png'),
    image: [require('../assets/post-content.png')],
    likes: 565,
    comments: 22,
    isLiked: true
  },
  {
    id: 3,
    name: 'Pedro Santos',
    date: '17/03/22',
    time: '3 dias',
    content: 'Conteúdo do terceiro post',
    userPhoto: require('../assets/default-user.png'),
    image: [
      require('../assets/post-content.png'),
      require('../assets/post-content.png')
    ],
    likes: 12,
    comments: 0,
    isLiked: false
  }
]
