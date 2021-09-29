import React, { useState, useEffect } from 'react';
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
  githubAuthProvider,
} from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import {
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

const Login = ({ history }) => {
  const [email, setEmail] = useState('marichellebisuna@yahoo.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user]);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdToken();

      createOrUpdateUser(idTokenResult)
        .then((res) => console.log('Create or update response', res))
        .catch();

      // dispatch({
      //   type: 'LOGGED_IN_USER',
      //   payload: {
      //     email: user.email,
      //     token: idTokenResult,
      //   },
      // });
      // history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdToken();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult,
          },
        });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const githubLogin = async () => {
    auth
      .signInWithPopup(githubAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdToken();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult,
          },
        });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const facebookLogin = async () => {
    auth
      .signInWithPopup(facebookAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdToken();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult,
          },
        });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control '
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder='Your email'
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Your password'
        />
      </div>
      <div className='mb-1'>
        <Button
          type='default'
          style={{ background: 'green', color: 'white' }}
          shape='round'
          icon={<MailOutlined />}
          onClick={handleSubmit}
          block
          size='large'
          disabled={!email || password.length < 6}
        >
          Login with Email/Password
        </Button>
      </div>
    </form>
  );
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 pt-5'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <div className='mb-1'>
            <Button
              type='danger'
              shape='round'
              icon={<GoogleOutlined />}
              onClick={googleLogin}
              block
              size='large'
              disabled={!email || password.length < 6}
            >
              Login with Google
            </Button>
          </div>
          <div className='mb-1'>
            {' '}
            <Button
              type='primary'
              shape='round'
              icon={<FacebookOutlined />}
              onClick={facebookLogin}
              block
              size='large'
              disabled={!email || password.length < 6}
            >
              Login with Facebook
            </Button>
          </div>
          <div className='mb-1'>
            {' '}
            <Button
              type='dark'
              shape='round'
              icon={<GithubOutlined />}
              onClick={githubLogin}
              block
              size='large'
              disabled={!email || password.length < 6}
            >
              Login with Github
            </Button>
          </div>
          <div className='m-2'>
            <Link to='/forgot/password' className='float-right text-danger'>
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
