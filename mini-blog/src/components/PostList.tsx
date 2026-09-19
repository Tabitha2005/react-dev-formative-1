import type { Post as PostData } from '../types/post'
import Post from './Post'

interface PostListProps {
  posts: PostData[]
}

function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="post-list-empty">No posts yet.</p>
  }

  return (
    <section className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  )
}

export default PostList
