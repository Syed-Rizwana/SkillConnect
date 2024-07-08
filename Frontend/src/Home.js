import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Navbar from './Navbar';

const TypingAnimation = ({ text }) => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [currentIndex, text]);

  return <p className="cd">{typedText}</p>;
};

const Home = () => {
  const navigate = useNavigate();
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleExploreClick = () => {
    navigate('/display');
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSubscriptionMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
        setTimeout(() => {
          setSubscriptionMessage('');
        }, 3000); // Message disappears after 3 seconds
      } else {
        const data = await response.json();
        setSubscriptionMessage(data.message);
        setTimeout(() => {
          setSubscriptionMessage('');
        }, 3000);
      }
    } catch (error) {
      setSubscriptionMessage('An error occurred. Please try again later.');
      setTimeout(() => {
        setSubscriptionMessage('');
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div className='ab'>
        <TypingAnimation text="Your creativity deserves a stage, a platform where it can shine brightly. Upload your work today and let the world applaud your brilliance." />
        <button className="ef" onClick={handleExploreClick}>Explore more</button>
      </div>
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          Welcome to our platform, where creativity knows no bounds. We believe in providing a stage for artists from all walks of life to showcase their talents. Our mission is to empower artists by giving them the tools and opportunities they need to reach a wider audience and make their mark in the world. Join us on this journey and let your art shine.
        </p>
      </div>
      <div className="features">
        <h2>Our Features</h2>
        <ul>
          <li>Upload and showcase your art</li>
          <li>Connect with other artists</li>
          <li>Get feedback from experts</li>
          <li>Participate in art competitions</li>
        </ul>
      </div>
      <div className="gallery">
        <h2>Gallery</h2>
        <div className="gallery-images">
          <img src="https://i.pinimg.com/236x/4d/58/42/4d5842f9dfc536358fbb55c408ee79c0.jpg" alt="Art 1" />
          <img src="https://lh6.googleusercontent.com/proxy/iK8NYtyGwSbX_T-1w2TO5919JnKenmZhfJqHT5-5o8FHSXWJTCl9cCOE2UMYKFvA_avtqpoj0MG2hw6gOgM2H6isjKYIwbare3GgOtZ7h3Dg" alt="Art 2" />
          <img src="https://sdg2030.in/wp-content/uploads/2023/12/SDG-ART-competition.png" alt="Art 3" />
          <img src="https://www.srms.ac.in/cet/wp-content/uploads/2017/04/Art-Competition.jpg" alt="Art 4" />
        </div>
      </div>
      <div className="events">
        <h2>Upcoming Events</h2>
        <ul>
          <li>Art Exhibition - June 25, 2024</li>
          <li>Workshop: Digital Art - July 15, 2024</li>
          <li>Annual Art Competition - August 20, 2024</li>
        </ul>
      </div>
      <div className="newsletter">
        <h2>Sign Up for Our Newsletter</h2>
        <form onSubmit={handleNewsletterSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Subscribe</button>
        </form>
        {subscriptionMessage && <p className="subscription-message">{subscriptionMessage}</p>}
      </div>
    </>
  );
};

export default Home;
