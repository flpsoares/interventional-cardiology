import { ImageSourcePropType } from 'react-native'

export interface CommentProp {
  id: number
  name: string
  date: string
  time: string
  content: string
  userPhoto: ImageSourcePropType
  isLiked: boolean
}

export const commentData = [
  {
    id: 1,
    name: 'Felipe Bruno',
    date: '21/03/22',
    time: '5 horas',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    userPhoto: require('../assets/default-user.png'),
    isLiked: false
  },
  {
    id: 2,
    name: 'Victor Silva',
    date: '18/03/22',
    time: '2 dias',
    content:
      'standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    userPhoto: require('../assets/default-user.png'),
    isLiked: true
  },
  {
    id: 3,
    name: 'Pedro Santos',
    date: '17/03/22',
    time: '3 dias',
    content:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old',
    userPhoto: require('../assets/default-user.png'),
    isLiked: false
  },
  {
    id: 4,
    name: 'Felipe Bruno',
    date: '21/03/22',
    time: '5 horas',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    userPhoto: require('../assets/default-user.png'),
    isLiked: false
  },
  {
    id: 5,
    name: 'Victor Silva',
    date: '18/03/22',
    time: '2 dias',
    content:
      'standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    userPhoto: require('../assets/default-user.png'),
    isLiked: true
  },
  {
    id: 6,
    name: 'Pedro Santos',
    date: '17/03/22',
    time: '3 dias',
    content:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old',
    userPhoto: require('../assets/default-user.png'),
    isLiked: false
  }
]
