import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import LoginHeader from './LoginHeader';
import { Link } from 'react-router-dom';

export default function Login() {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <LoginHeader heading='Log in' />
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 450,
          alignItems: 'center',
          padding: '3rem',
          margin: 'auto',
          flexDirection: 'column'
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" shape="round" htmlType="submit">
            Log in
          </Button>
          <span style={{ textAlign: 'center' }}>or</span>
          <Link to='/signup'>
          <Button block type="primary" shape="round">
            SignUp
          </Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
}
