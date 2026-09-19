import type { Post as PostData } from '../types/post'
import { getPreview, formatDate } from '../utils/format'

interface PostProps {
  post: PostData
}

function Post({ post }: PostProps) {
  return (
    <article className="post">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-meta">
        By {post.author} on <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <p className="post-preview">{getPreview(post.content)}</p>
    </article>
  )
}

export default Post
