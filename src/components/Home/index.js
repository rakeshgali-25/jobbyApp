import './index.css'

import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="big-heading">
        Find The Job That <br />
        Fits Your Life
      </h1>
      <p className="big-para">
        Millions of people are searching for jobs,salary
        <br />
        information,company reviews. Find the job that fits your
        <br />
        abilities and potential.
      </p>
      <div>
        <Link to="/jobs" className="link">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
