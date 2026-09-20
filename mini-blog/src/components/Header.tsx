import '../styles/header.css'
import withLogger from '../hoc/withLogger'

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <span style={{ color: '#a5b4fc' }}>Dev</span> Insights
      </div>
      <nav className="header-nav">
        <a href="#new-post" className="header-link">
          New Post
        </a>
      </nav>
    </header>
  )
}

export default withLogger(Header)
