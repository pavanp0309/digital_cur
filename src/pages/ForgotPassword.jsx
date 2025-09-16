import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";


const ForgotPassword = () => {
  const [form] = Form.useForm();


  return (
    <Form form={form} onFinish={''} layout="vertical" autoComplete="off" initialValues={{ email: "" }}
    >
      <h2>Forgot Password</h2>

      {error && (
        <Alert type="error" message={''} showIcon style={{ marginBottom: 16 }}/>
      )}
      {message && (
        <Alert type="success" message={''} showIcon style={{ marginBottom: 16 }}/>
      )}

      <Form.Item  name="email"  label="Email"  rules={[{ required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email address" },]}>
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={''} block> Send Reset Link</Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
