import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Userprofile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [userFavorites, setUserFavorites] = useState([]);
    const { user_id } = useParams();
    const [userApplications, setUserApplications] = useState([]); 

const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/auth/search_user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      setUserProfile(response.data);
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

const fetchUserFavorites = async () => {
  try {
    const favoritesResponse = await axios.get(`http://localhost:3001/api/job/get_favorites/${user_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (favoritesResponse.status === 200) {
      setUserFavorites(favoritesResponse.data.favorites);
    }
  } catch (error) {
    console.error("Error fetching user favorites:", error);
  }
};

const fetchUserApplications = async () => {
    try {
      const applicationsResponse = await axios.get(`http://localhost:3001/api/job/get_user_applications/${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (applicationsResponse.status === 200) {
        setUserApplications(applicationsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching user applications:", error);
    }
  };

useEffect(() => {
  fetchUserProfile();
  fetchUserFavorites();
  fetchUserApplications(); // Add this line
}, [user_id]);


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <div className="content-wrapper">
    
        <section className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
            <div className="col-sm-6">
                <h1>Profile</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                
                </ol>
            </div>
            </div>
        </div>
        </section>
        {userProfile && (
    
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-3">

            
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                {userProfile.photo ? (
                  <img className="profile-user-img img-fluid img-circle"
                  src={`http://localhost:3001/uploads/${userProfile.photo}`}
                       alt="User profile picture" />
                       ) : (
                        <div>No Profile Image</div>
                    )}
                </div>

                <h3 className="profile-username text-center">{userProfile.nom} {userProfile.prenom}</h3>

                <p className="text-muted text-center">{userProfile.profession}</p>

                
                <p>{userProfile.motivation_letter}</p>

                
              </div>
              
            </div>
            

            
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">About Me</h3>
              </div>
              
              <div className="card-body">
                <strong><i className="fas fa-envelope mr-1"></i> Mail :</strong>
                <p>{userProfile.email}</p>

                <strong>
                    <i className="fas fa-book mr-1"></i> Education:
                </strong>

                <p className="text-muted">
                    {(userProfile.education ? userProfile.education.split(', ') : []).map((edu, index) => (
                        <React.Fragment key={index}>
                        {edu} ({(userProfile.education_duree ? userProfile.education_duree.split(', ')[index] : '')})
                        {index < userProfile.education.split(', ').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </p>

                <strong>
                    <i className="fas fa-book mr-1"></i> Work Experience 
                </strong>

                <p className="text-muted">
                {(userProfile.work_experience ? userProfile.work_experience.split(', ') : []).map((exp, index) => (
                      <React.Fragment key={index}>
                        {exp} ({(userProfile.work_experience_duree ? userProfile.work_experience_duree.split(', ')[index] : '')})
                        {index < userProfile.work_experience.split(', ').length - 1 && ', '}
                      </React.Fragment>
                    ))}
                </p>

                

                <strong><i className="fas fa-map-marker-alt mr-1"></i> Location</strong>

                <p className="text-muted">{userProfile.localisation || 'Not specified'}</p>

                

                <strong><i className="fas fa-pencil-alt mr-1"></i> Skills</strong>

                <p className="text-muted">
                  <span className="tag tag-danger">{userProfile.skills || 'Not specified'}</span>
                  
                </p>
                
                    <strong><i className="far fa-file-alt mr-1"></i> Languages</strong>

                    <p className="text-muted">{userProfile.languages || 'Not specified'}</p>
                

                <strong><i className="far fa-file-alt mr-1"></i> Certifications and Licenses</strong>

                    <p className="text-muted">{userProfile.certifications_and_licenses || 'Not specified'}</p>
                
              

                
              </div>
              
            </div>
            
        </div>
        
        {userFavorites.length > 0 && (
  <div className="col-md-9">
    <div className="card">
      <div className="card-header p-2">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link active" href="#activity" data-toggle="tab">
              Favorite
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#timeline" data-toggle="tab">
              Apply
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <div className="tab-content">
          <div className="active tab-pane" id="activity">
            {userFavorites.map((favorite, index) => (
              <div className="post" key={index}>
                <div className="user-block">
                  <span className="username">
                    <a href="#">{favorite.titles}</a>
                    <a href="#" className="float-right btn-tool">
                      <i className="fas fa-times"></i>
                    </a>
                  </span>
                  <span className="description">
                    {formatDate(favorite.date)}
                  </span>
                </div>
                <p>{favorite.description}</p>
              </div>
            ))}
          </div>

          <div className="tab-pane" id="timeline">
            {userApplications.map((apply, index) => (
              <div className="post" key={index}>
                <div className="user-block">
                  <span className="username">
                    <a href="#">Number of apply: {apply.number_apply}</a>
                    <a href="#" className="float-right btn-tool">
                      <i className="fas fa-times"></i>
                    </a>
                  </span>
                  <span className="description">
                    {formatDate(apply.date_applied)}
                  </span>
                </div>
                <p> {apply.job_title}</p>
                <p>Job id : {apply.job_id}</p>
              </div>
            ))}
          </div>

          <div className="timeline timeline-inverse"></div>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
        
            </div>
        </section>
        
    )}
    </div>
  
  )
}

export default Userprofile 
