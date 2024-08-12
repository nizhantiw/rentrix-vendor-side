import React from 'react'
import { Link } from 'react-router-dom';
import { UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout'
import { Button, Flex } from 'antd';
import logo from "../assets/favicon/rentrix-logo (1).png";

export default function HeaderMain() {
  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: "space-between",
        }}
      >
        <Link to='/'>
          <img src={logo} className='object-cover' width='160px' height='80px' alt='logo-header' />
        </Link>
        <Flex style={{
          gap: '2rem'
        }}
          wrap>
          <Link to='/signup'>
            <Button type="primary" shape="round" icon={<UserAddOutlined />} size="large">
              Signup
            </Button>
          </Link>
          <Link to='/login'>
            <Button type="primary" shape="round" icon={<LoginOutlined />} size="large">
              Login
            </Button>
          </Link>
        </Flex>
      </Header>
    </>
  )
}

