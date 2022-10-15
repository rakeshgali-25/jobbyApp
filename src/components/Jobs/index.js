import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItem from '../JobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    salaryRange: '',
    employmentType: '',
    profileStatus: apiStatusConstants.initial,
    profileDetails: {},
    jobsStatus: apiStatusConstants.initial,
    jobsList: [],
  }

  componentDidMount = () => {
    this.getTheData()
  }

  getTheData = async () => {
    this.setState({
      profileDetails: apiStatusConstants.isLoading,
      jobsStatus: apiStatusConstants.isLoading,
    })
    const {salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const apiUrl = 'https://apis.ccbp.in/profile'

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const profileDetails = data.profile_details
      console.log(profileDetails)
      const profileDetails2 = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      console.log(profileDetails2)
      this.setState({
        profileDetails: profileDetails2,
        profileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileStatus: apiStatusConstants.failure,
      })
    }

    const apiUrlJobs =
      'https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search='

    const jobsResponse = await fetch(apiUrlJobs, options)
    if (jobsResponse.ok) {
      const jobsData = await jobsResponse.json()
      const {jobs} = jobsData
      console.log(jobs)
      const updatedJobs = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsData: updatedJobs,
        jobsStatus: apiStatusConstants.success,
      })
    }
  }

  profileStatusSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  jobsStatusSuccess = () => {
    const {jobsData} = this.state
    return (
      <ul className="unordered-list">
        {jobsData.map(each => (
          <JobItem each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  profileStatusLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsStatusLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileStatusFailure = () => <div>failed</div>

  renderProfile = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiStatusConstants.inProgress:
        return this.profileStatusLoading()
      case apiStatusConstants.success:
        return this.profileStatusSuccess()
      case apiStatusConstants.failure:
        return this.profileStatusFailure()

      default:
        return null
    }
  }

  renderJobs = () => {
    const {jobsStatus} = this.state
    switch (jobsStatus) {
      case apiStatusConstants.inProgress:
        return this.jobsStatusLoading()
      case apiStatusConstants.success:
        return this.jobsStatusSuccess()
      case apiStatusConstants.failure:
        return this.jobsStatusFailure()

      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="left">{this.renderProfile()}</div>
          <div className="right">{this.renderJobs()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
