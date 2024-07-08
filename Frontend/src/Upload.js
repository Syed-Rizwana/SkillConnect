import React, { useState } from 'react';
import './Upload.css'; // Import your CSS file for styling
import Navbar from './Navbar';

const UploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    artName: '',
    email: '',
    phoneNumber: '',
    address: '',
    demoVideo: null,
    experience: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setFormData(prevState => ({
        ...prevState,
        demoVideo: file
      }));
    } else {
      // Reset the input field if the selected file is not a video
      e.target.value = null;
      alert('Please select a valid video file.');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('artName', formData.artName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('demoVideo', formData.demoVideo);
    formDataToSend.append('experience', formData.experience);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData); // Handle response data accordingly
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Navbar/>
     
      <div className='uploadi'>
      <div className="image-container">
      <p>Your talent deserves to be uploaded and shared with the world. Let everyone see your brilliance, praise your work, and offer you exciting opportunities.</p>

         </div>
      <div className="upload-form-container">
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Art Name</label>
            <input type="text" name="artName" placeholder="Art Name" value={formData.artName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Demo Video</label>
            <input type="file" name="demoVideo" onChange={handleVideoChange} accept="video/*" />
          </div>
          <div className="form-group">
            <label>Experience</label>
            <input type="text" name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} />
          </div>
          <button className="sub" type="submit">Submit</button>
        </form>
      </div>
      </div>
      
    </>
  );
};

export default UploadForm;
