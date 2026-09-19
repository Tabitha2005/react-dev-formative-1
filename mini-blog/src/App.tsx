import Header from './components/Header'
import PostList from './components/PostList'
import { posts } from './data/posts'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <h1 className="app-heading">Latest posts</h1>
        <PostList posts={posts} />
      </main>
    </div>
  )
}

export default App
