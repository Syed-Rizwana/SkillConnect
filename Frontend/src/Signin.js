import React, { useState } from 'react';
import './Signin.css';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Signin = () => {
    const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSignUpClick = () => {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    };

    const handleSignInClick = () => {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    };

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        if (!signUpData.name || !signUpData.email || !signUpData.password) {
            setMessage('Please fill all the details');
            setMessageType('error');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSignUpData({ name: '', email: '', password: '' });
                setMessage('User created successfully!');
                setMessageType('success');
            } else {
                setMessage('Email is already registered');
                setMessageType('error');
                throw new Error('Failed to sign up');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    const handleSignInSubmit = async (event) => {
        event.preventDefault();
        if (!signInData.email || !signInData.password) {
            setMessage('Please enter email and password');
            setMessageType('error');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setMessage('Sign in successful!');
                setMessageType('success');
                setSignInData({ email: '', password: '' }); // Clear form fields on successful sign-in
            } else {
                setMessage('Invalid Credentials');
                setMessageType('error');
                setSignInData({ email: '', password: '' });
                throw new Error('Failed to sign in');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    const handleSignUpInputChange = (event) => {
        setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
    };

    const handleSignInInputChange = (event) => {
        setSignInData({ ...signInData, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Navbar />
            <div className='containermain'>
            <div className="container1" id="container">
                {message && (
                    <p id="message" className={`message ${messageType}`}>{message} </p>
                )}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUpSubmit}>
                        <h1>Create Account</h1>
                        <input type="text" name="name" placeholder="Name" value={signUpData.name} onChange={handleSignUpInputChange} />
                        <input type="email" name="email" value={signUpData.email} placeholder="Email" onChange={handleSignUpInputChange} />
                        <input type="password" name="password" value={signUpData.password} placeholder="Password" onChange={handleSignUpInputChange} />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSignInSubmit}>
                        <h1>Sign in</h1>
                        <input type="email" name="email" value={signInData.email} placeholder="Email" onChange={handleSignInInputChange} />
                        <input type="password" name="password" value={signInData.password} placeholder="Password" onChange={handleSignInInputChange} />
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default Signin;
