import { useEffect, useState } from 'react';
import { database } from '../../firebase';

type DataProps = Record<string, { favoriteCounts: number; post: App.Post }>

export function usePopularPost() {
  const [posts, setPosts] = useState<DataProps>({})

  useEffect(() => {
    database
      .collection('/posts')
      .limit(100)
      .onSnapshot((querySnapshot) => {
        const postsIds = querySnapshot.docs.map((doc) => {
          return doc.id
        })
        const posts: App.Post[] = querySnapshot.docs.map((f) => {
          return { id: f.id, ...f.data() }
        }) as any

        console.log(postsIds)
        if (postsIds[0]) {
          database
            .collection('/posts_favorites')
            .where('postId', 'in', postsIds)
            .onSnapshot((querySnapshot) => {
              const data: DataProps = {}
              const postsFavorites = querySnapshot.docs

              for (const postFavorite of postsFavorites) {
                if (!data[postFavorite.data().postId]) {
                  data[postFavorite.data().postId] = {
                    favoriteCounts: 1,
                    post: posts.find((p) => p.id === postFavorite.data().postId)!
                  }
                } else {
                  data[postFavorite.data().postId].favoriteCounts++
                }
              }
              setPosts(data)
            })
        }
      })
  }, [])
  return Object.values(posts)
    .sort((b, a) => a.favoriteCounts - b.favoriteCounts)
    .slice(0, 9)
}
