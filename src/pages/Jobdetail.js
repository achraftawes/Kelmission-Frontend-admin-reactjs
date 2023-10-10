import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Jobdetail = () => {

  const { job_id } = useParams();
  const [jobDetail, setJobDetail] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/job/get_job/${job_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 200) {
          setJobDetail(response.data);
        } else {
          setJobDetail(null);
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        setJobDetail(null);
      }
    };

    fetchJobDetail();
  }, [job_id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/job/comments/${job_id}`);

        if (response.status === 200) {
          setComments(response.data);
        } else {
          console.error('Error fetching comments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [job_id]);

  const [applyCount, setApplyCount] = useState(0);
 

  const fetchApplyCount = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/job/get_job_applications/${job_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setApplyCount(response.data.length);
    } catch (error) {
      console.error('Error fetching apply count:', error);
    }
  };
  useEffect(() => {
    fetchApplyCount();
  }, []);


  const [favoriteCount, setFavoriteCount] = useState(0);
  const fetchFavoriteCount = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/job/get_job_favorites/${job_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavoriteCount(response.data.length);
    } catch (error) {
      console.error('Error fetching favorite count:', error);
    }
  };
  
  useEffect(() => {
    fetchFavoriteCount();
  }, []);
  

  if (!jobDetail) {
    return <div>Loading...</div>;
  }

  if (jobDetail.error) {
    return <div>{jobDetail.error}</div>;
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} at ${hours}:${minutes}`;
  };

  

  return (
    <div className="content-wrapper">
    
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Project Detail</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Project Detail</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

   
    <section className="content">

      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Job Detail</h3>

          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i className="fas fa-minus"></i>
            </button>
            <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
            <div className="row">
                <div className="col-12 col-sm-4">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Number of apply</span>
                      <span className="info-box-number text-center text-muted mb-0">{applyCount}</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Number of favorite</span>
                      <span className="info-box-number text-center text-muted mb-0">{favoriteCount}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div><p></p></div>
              <div className="row">
                <div className="col-12">
                  <h4>Comments</h4>
                  {comments.map((comment) => (
                        <div className="post" key={comment.comment_id}>
                          <div className="user-block">
                          {comment.photo && (
                            <img
                              className="img-circle img-bordered-sm"
                              src={`http://localhost:3001/uploads/${comment.photo}`}
                              alt="user image"
                            />
                            )}
                            <span className="username">
                              <a href="#">{`${comment.user_prenom} ${comment.user_nom}`}</a>
                            </span>
                            <span className="description">{formatDate(comment.created_at)}</span>
                          </div>

                          <p>{comment.comment_text}</p>

                          {/* You can add more comment details here */}
                        </div>
                      ))}
                    
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
              <h3 className="text-primary"> {jobDetail.titles}</h3>
              <p className="text-muted">{jobDetail.description}</p>
              
              <div className="text-muted">
                <p className="text-sm">Company Name
                  <b className="d-block">{jobDetail.companyName}</b>
                </p>
                <p className="text-sm">Localisation
                  <b className="d-block">{jobDetail.localisation}</b>
                </p>
                <p className="text-sm">Specialty
                  <b className="d-block">{jobDetail.specialty}</b>
                </p>
                <p className="text-sm">Mail
                  <b className="d-block">{jobDetail.mail}</b>
                </p>
                <p className="text-sm">Date of post
                  <b className="d-block">{jobDetail.date}</b>
                </p>
              </div>

              
              
            </div>
          </div>
        </div>
        
      </div>
      

    </section>
    
  </div>
  )
}

export default Jobdetail
