import './index.css'
import {Link} from 'react-router-dom'

import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {HiLocationMarker} from 'react-icons/hi'

const JobItem = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = each

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="list-item">
        <div className="upper">
          <div>
            <img src={companyLogoUrl} alt="company" className="company-logo" />
          </div>
          <div className="job-rating-container">
            <h1 className="heading">{title}</h1>
            <div className="rating-container">
              <BsFillStarFill className="star" />
              <p className="para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="icon-container">
            <HiLocationMarker className="icon" />
            <p className="para">{location}</p>
          </div>
          <div className="icon-container">
            <BsFillBriefcaseFill className="icon" />
            <p className="para">{employmentType}</p>
          </div>
          <div className="package-container">
            <p className="para">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line-break" />
        <div className="lower">
          <h1 className="heading">Description</h1>
          <p className="para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
