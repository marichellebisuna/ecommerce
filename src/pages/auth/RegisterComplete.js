import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and password is required.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be atleast 6 characters long.');
      return;
    }
    try {
      const url = window.location.href;
      const result = await auth.signInWithEmailLink(email, url);
      console.log(result);
      if (result.user.emailVerified) {
        //remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');
        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user, 'idTokenResult', idTokenResult);
        //redux store

        //redirect
        toast.success('You are now registered!');
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const registerCompleteForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control mb-2'
        value={email}
        disabled
      />
      <input
        type='password'
        className='form-control mb-2'
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <button type='submit' className='btn'>
        Complete Registration
      </button>
    </form>
  );
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 pt-5'>
          <h4>Register</h4>
          {registerCompleteForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
