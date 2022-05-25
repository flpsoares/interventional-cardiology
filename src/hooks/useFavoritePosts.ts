import { useEffect, useState } from 'react'
import { database } from '../../firebase'
import { useUser } from '../contexts/UserContext'

export function useFavoritePost() {
  const [favoritePosts, setPosts] = useState<App.Post[]>([])
  const { userId } = useUser()

  useEffect(() => {
    const _postsFavoritesRef = database
      .collection('/posts_favorites')
      .where('userId', '==', userId)

    // Registrando o listerner do on snapshot do posts favorites.
    _postsFavoritesRef.onSnapshot((querySnapshot) =>
      _postsFavoritesCallback(querySnapshot)
    )

    // Callback para o posts favorites
    const _postsFavoritesCallback = (_snapshot: any) => {
      setPosts([])

      const _postsFavoritesIds: string[] = _snapshot.docs.map(
        (pF: any) => pF.data().postId
      )

      // Se houver post favoritado pro usuário atual
      if (_postsFavoritesIds.length) {
        _postsFavoritesIds.forEach((id) => {
          // Obtendo dados do Post de acordo com o id
          const _collectionPost = database.collection('/posts').doc(id)

          _collectionPost.onSnapshot((querySnapshot) => {
            if (querySnapshot) {
              _postCallback(querySnapshot)
            }
          })
        })
      }
    }

    // Callback para o post
    const _postCallback = (_p: any) => {
      setPosts((oldPosts) => {
        const _oldPosts = [...oldPosts]

        if (!_oldPosts.map((p: any) => p.id).includes(_p.id)) {
          _oldPosts.push({
            id: _p.id,
            ..._p.data()
          })
        }

        return _oldPosts
      })
    }
  }, [])

  return favoritePosts
}
