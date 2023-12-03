import './home.scss'
import Stories from "../../components/stories/Stories"
import Post from "../../components/posts/Posts"
import Share from "../../components/share/Share"

const Home = () => {

  return (
    <div className='home'>
      <Stories />
      <Share />
      <Post />
    </div>
  )
}

export default Home