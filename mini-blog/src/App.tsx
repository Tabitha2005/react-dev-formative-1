import PostList from './components/PostList'
import { posts } from './data/posts'

function App() {
  return (
    <main>
      <PostList posts={posts} />
    </main>
  )
}

export default App
