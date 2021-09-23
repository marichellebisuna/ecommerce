import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  UserAddOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { firebase } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const history = useHistory();
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };
  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        <Item key='home' icon={<AppstoreOutlined />}>
          <Link to='/'>Home </Link>
        </Item>

        {!user && (
          <Item
            key='login'
            icon={<UserOutlined />}
            style={{ marginLeft: 'auto' }}
          >
            <Link to='/login'>Login</Link>
          </Item>
        )}
        {!user && (
          <Item key='register' icon={<UserAddOutlined />}>
            <Link to='/register'>Register</Link>
          </Item>
        )}
        {user && (
          <SubMenu
            icon={<SettingOutlined />}
            title={`Hello ${user.email && user.email.split('@')[0]} `}
            style={{ marginLeft: 'auto' }}
            className='text-capitalize'
          >
            <Item key='setting:1'>Option 1</Item>
            <Item key='setting:2'>Option 2</Item>
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}
      </Menu>
    </div>
  );
};

export default Header;
