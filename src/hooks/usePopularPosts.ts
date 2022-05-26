import { useEffect, useState } from 'react'
import { database } from '../../firebase'

type DataProps = Partial<{ id: string; favoriteCounts: number; post: App.Post }>

export function usePopularPost() {
  const [popularPosts, setPopularPosts] = useState<DataProps[]>([])

  useEffect(() => {
    database
      .collection('/posts')
      .limit(100)
      .onSnapshot((querySnapshot) => _popularPostCallback(querySnapshot))

    const _popularPostCallback = (_snapshot: any) => {
      const _postsIds: string[] = _snapshot.docs.map((post: any) => post.id)

      const _posts: App.Post[] = _snapshot.docs.map((post: any) => {
        return { id: post.id, ...post.data() }
      })

      if (_postsIds.length) {
        setPopularPosts([])
        _postsIds.forEach((id) => {
          database
            .collection('/posts_favorites')
            .where('postId', '==', id)
            .onSnapshot((querySnapshot) => _postCallback(id, querySnapshot, _posts))
        })
      }
    }

    const _postCallback = (id: string, querySnapshot: any, _posts: App.Post[]) => {
      if (querySnapshot.empty) return

      // Para cada post favoritado.
      for (const postFavorite of querySnapshot.docs) {
        setPopularPosts((oldPopularPosts) => {
          const _oldPopularPosts = [...oldPopularPosts]
          const favoritesCount = _posts.find(
            (p: any) => p.id === postFavorite.data().postId
          )!

          if (!_oldPopularPosts.map((p) => p.id).includes(id)) {
            _oldPopularPosts.push({
              id,
              favoriteCounts: favoritesCount.favorites,
              post: _posts.find((p: any) => p.id === postFavorite.data().postId)!
            })
          }

          return _oldPopularPosts
        })
      }
    }
  }, [])

  return popularPosts.slice(0, 9).sort((a, b) => {
    return b.favoriteCounts! - a.favoriteCounts!
  })
}
