import Header from './components/Header'
import PostList from './components/PostList'
import { posts } from './data/posts'


function App() {
  return (
    <>
      <Header />
      <main>
        <PostList posts={posts} />
      </main>
    </>
  )
}

export default App
