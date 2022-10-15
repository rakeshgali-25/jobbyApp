import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {HiLocationMarker} from 'react-icons/hi'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsApiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getTheJobData()
  }

  getTheJobData = async () => {
    this.setState({jobDetailsApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const jobUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'Get',
    }
    const jobDetailsResponse = await fetch(jobUrl, options)

    if (jobDetailsResponse.ok) {
      const data = await jobDetailsResponse.json()
      console.log(data)
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        title: data.job_details.title,
      }

      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetailsApiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
      })

      console.log(updatedJobDetails)
    } else {
      this.setState({jobDetailsApiStatus: apiStatusConstants.failure})
    }
  }

  renderTheLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderTheCard = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      lifeAtCompany,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails

    return (
      <div className="job-details-card">
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
        <div className="skills-container">
          <h1 className="heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(each => (
              <li className="skill-item">
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skill-icon"
                />
                <p className="para">{each.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetailsSuccess = () => {
    const {jobDetails} = this.props
    return <>{this.renderTheCard()}</>
  }

  renderTheDetails = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderTheLoader()
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccess()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.renderTheDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
