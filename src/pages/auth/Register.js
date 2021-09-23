import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user]);

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
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder='Your email'
        />
      </div>
      <Button
        type='primary'
        shape='round'
        icon={<MailOutlined />}
        onClick={handleSubmit}
        block
        size='large'
        disabled={!email}
      >
        Register
      </Button>
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
