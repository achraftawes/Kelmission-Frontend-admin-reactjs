import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0
  const commentsPerPage = 10; // Number of comments to display per page

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/all_comments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };


  const deleteComment = async (commentId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/job/delete_comment`,
        { comment_id: commentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      console.log(response.data);
  
      // Call a function to fetch updated comments after deleting
      fetchComments(); // Replace this with the appropriate function to fetch comments
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  // Calculate total pages based on comment entries
  const pageCount = Math.ceil(comments.length / commentsPerPage);

  // Get current comment entries based on current page
  const indexOfLastComment = (currentPage + 1) * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5; // Number of page numbers to show before "..."
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 0) {
      startPage = 0;
      endPage = Math.min(maxPageNumbers, pageCount - 1);
    } else if (endPage >= pageCount) {
      endPage = pageCount - 1;
      startPage = Math.max(pageCount - maxPageNumbers, 0);
    }

    if (startPage > 0) {
      pageNumbers.push(0);
    }

    if (startPage > 1) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < pageCount - 2) {
      pageNumbers.push('...');
    }

    if (endPage < pageCount - 1) {
      pageNumbers.push(pageCount - 1);
    }

    return pageNumbers;
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div><p></p></div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">All Comments</h1>
            </div>
          </div>
        </div>
      </section>
      <div><p></p></div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Comments</h3>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>Comment ID</th>
                        <th>User name</th>
                        <th>User prenom</th>
                        <th>Comment Text</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentComments.map((comment) => (
                        <tr key={comment.comment_id}>
                          <td>{comment.comment_id}</td>
                          <td>{comment.user_nom}</td>
                          <td>{comment.user_prenom}</td>
                          <td>{comment.comment_text}</td>
                          <td>{comment.created_at}</td>
                          <td>
                            <button className="btn btn-block bg-gradient-danger" onClick={() => deleteComment(comment.comment_id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                  <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                  {getPageNumbers().map((page, index) => (
                    <li
                      className={`page-item ${currentPage === page ? 'active' : ''}`}
                      key={index}
                      onClick={() => (typeof page === 'number' ? handlePageChange(page) : null)}
                    >
                      <button className="page-link">{typeof page === 'number' ? page + 1 : page}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === pageCount - 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Comments;
