import { useEffect, useState } from 'react'
import { database } from '../../firebase'
import { useUser } from '../contexts/UserContext'

export function useFollowingPosts() {
  const [followingPosts, setFollowingPosts] = useState<App.Post[]>([])
  const { userId } = useUser()

  useEffect(() => {
    database.collection(`/users/${userId}/following`).onSnapshot((querySnapshot) => {
      setFollowingPosts([])

      const _followingUsersIds: string[] = querySnapshot.docs.map(
        (pF: any) => pF.data().userId
      )

      if (_followingUsersIds.length) {
        _followingUsersIds.forEach((id) => {
          database
            .collection('/posts')
            .where('autorId', '==', id)
            .onSnapshot((querySnapshot) => {
              if (querySnapshot) {
                _postCallback(querySnapshot.docs)
              }
            })
        })
      }
    })

    const _postCallback = (_p: any) => {
      for (const post of _p) {
        setFollowingPosts((oldPosts) => {
          const _oldPosts = [...oldPosts]

          if (!_oldPosts.map((p: any) => p.id).includes(post.id)) {
            _oldPosts.push({
              id: post.id,
              ...post.data()
            })
          }

          return _oldPosts
        })
      }
    }
  }, [])

  return followingPosts
}
