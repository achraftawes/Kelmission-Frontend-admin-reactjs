import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_messages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/job/delete_message',
        { message_id: messageId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      console.log(response.data);
  
      // You may want to refresh your message list or perform other actions here
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const [currentPage, setCurrentPage] = useState(0); // Start from page 0
  const logsPerPage = 10;
  // Calculate total pages based on log entries
  const pageCount = Math.ceil(messages.length / logsPerPage);

  // Get current log entries based on current page
  const indexOfLastLog = (currentPage + 1) * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = messages.slice(indexOfFirstLog, indexOfLastLog);

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
              <h1 className="m-0">Messages</h1>
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
                  <h3 className="card-title">Message List</h3>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>Message ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Subject</th>
                        <th>Message Text</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((message) => (
                        <tr key={message.message_id}>
                          <td>{message.message_id}</td>
                          <td>{message.names}</td>
                          <td>{message.email}</td>
                          <td>{message.phone_number}</td>
                          <td>{message.subject}</td>
                          <td>{message.message_text}</td>
                          <td>{message.created_at}</td>
                          <td>
                            <button className="btn btn-block bg-gradient-danger" onClick={() => deleteMessage(message.message_id)} >
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

export default Messages;

