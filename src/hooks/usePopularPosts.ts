import { useEffect, useState } from 'react';
import { database } from '../../firebase';

type DataProps = Record<string, { favoriteCounts: number; post: App.Post }>

export function usePopularPost() {
  const [popularPosts, setPopularPosts] = useState<DataProps>({})

  useEffect(() => {
    const _postsRef = database.collection('/posts').limit(100)

    _postsRef.onSnapshot((querySnapshot) => {
      _popularPostCallback(querySnapshot)
    })

    const _popularPostCallback = (_snapshot: any) => {
      const _postsIds: string[] = _snapshot.docs.map((post: any) => post.id)

      const _posts: App.Post[] = _snapshot.docs.map((post: any) => {
        return { id: post.id, ...post.data() }
      })

      if (_postsIds[0]) {
        _postsIds.forEach((id) => {
          database
            .collection('/posts_favorites')
            .where('postId', '==', id)
            .onSnapshot((querySnapshot) => {
              if (querySnapshot.docs[0] !== undefined) {
                const data: DataProps = {}
                const postsFavorites = querySnapshot.docs
                for (const postFavorite of postsFavorites) {
                  if (postFavorite.data().postId === id) {
                    if (!data[postFavorite.data().postId]) {
                      data[postFavorite.data().postId] = {
                        favoriteCounts: 1,
                        post: _posts.find(
                          (p) => p.id === postFavorite.data().postId
                        )!
                      }
                    } else {
                      data[postFavorite.data().postId].favoriteCounts++
                    }
                  }
                  setPopularPosts(data)
                }
              }
            })
        })
      }
    }

    // const _postCallback = (post: DataProps) => {
    //   setPopularPosts((oldPosts) => {
    //     const _oldPosts = [...oldPosts]
    //     _oldPosts.push(post)
    //     if (!_oldPosts.map((p: any) => p.id).includes(_p.)) {
    //       _oldPosts.push({
    //         favoriteCount: _p.index.favoriteCount,
    //         post: _p.index.post
    //       })
    //     }
    //     return _oldPosts
    //   })
    // }
  }, [])
  return Object.values(popularPosts)
    .sort((b, a) => a.favoriteCounts - b.favoriteCounts)
    .slice(0, 9)
}
