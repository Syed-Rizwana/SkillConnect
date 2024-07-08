import React, { useState, useEffect } from 'react';
import './Display.css';
import Navbar from './Navbar';

function Display() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/upload-data');
      const fetchedData = await response.json();
      // Reverse the order of the data array
      setData(fetchedData.reverse());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='displaymain'>
      <div className="container3">
        <h1>Uploaded Data</h1>
        <div className="video-grid">
          {data.length === 0 ? (
            <p>No data available</p>
          ) : (
            data.map((item, index) => (
              <div key={index} className="video-item">
                <div className="video-container">
                  <video width="520" height="540" controls>
                    <source src={`http://localhost:5000/${item.demoVideo}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="details-container">
                  <h3>{item.artName}</h3>
                  <p id="b"><strong>Name:</strong> {item.name}</p>
                  <p id="b"><strong>Email:</strong> {item.email}</p>
                  <p id="b"><strong>Phone Number:</strong> {item.phoneNumber}</p>
                  <p id="b"><strong>Address:</strong> {item.address}</p>
                  <p id="b"><strong>Experience:</strong> {item.experience}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default Display;
