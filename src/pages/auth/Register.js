import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, actionCodeSettings);
    toast.success(
      `Email is sent to your ${email}. Click the link to complete your registration.`
    );
    window.localStorage.setItem('emailForRegistration', email);
    setEmail('');
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />

      <button type='submit' className='btn mt-2'>
        Submit
      </button>
    </form>
  );
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 pt-5'>
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
