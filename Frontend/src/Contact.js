import React, { useState } from 'react';
import './Contact.css';
import Navbar from './Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Your form submission logic here
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className='contacti'>
      <div className='con'>
      
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required/>
              
            
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
           
          
            <input className='u'
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          
          <button id="c" type="submit">Send Message</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Contact;
