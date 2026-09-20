import type { Post as PostData } from '../types/post'
import { getPreview, formatDate, isNew } from '../utils/format'
import '../styles/post.css'
import { memo } from 'react'

const HIGHLIGHTED_AUTHOR = 'Amara Okafor'

interface PostProps {
  post: PostData
}

function Post({ post }: PostProps) {
  const isHighlighted = post.author === HIGHLIGHTED_AUTHOR
  const className = isHighlighted ? 'post post--highlighted' : 'post'

  return (
    <article className={className}>
      <h2 className="post-title">
        {post.title}
        {isNew(post.date) && <span className="post-badge">New!</span>}
      </h2>
      <p className="post-meta">
        By {post.author} on <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <p className="post-preview">{getPreview(post.content)}</p>
    </article>
  )
}

export default memo(Post)
