import i18n from 'i18n-js'

i18n.translations = {
  pt: {
    subTitleOne: 'Entenda como funciona',
    titleOne: 'Cadastre-se',
    descriptionOne:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor',
    skip: 'Pular',
    next: 'Próximo'
  },
  en: {
    subTitleOne: 'Understand how it works',
    titleOne: 'Register',
    descriptionOne:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor',
    skip: 'Skip',
    next: 'Next'
  },
  es: {
    subTitleOne: 'Entender cómo funciona',
    titleOne: 'Registro',
    descriptionOne:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor',
    skip: 'saltar',
    next: 'Próximo'
  }
}

i18n.locale = 'en'

const initialData = [
  {
    id: 1,
    subTitle: i18n.t('subTitleOne'),
    title: i18n.t('titleOne'),
    description: i18n.t('descriptionOne'),
    image: require('../assets/initial/banner_01.png')
  },
  {
    id: 1,
    subTitle: 'Entenda como funciona',
    title: 'Tenha acesso a timeline',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor',
    image: require('../assets/initial/banner_02.png')
  }
]

export default initialData
