import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
;

const Register = () => {
  const [form] = Form.useForm();
  
  return (
    <Form form={form} onFinish={''} layout="vertical" autoComplete="off" initialValues={{name: "",email: "",password: "",}}>
      <h2>Register</h2>
      {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
      <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter your full name" }]}>
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },]}>
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item name="password" label="Password" rules={[
          { required: true, message: "Please enter your password" },
          { min: 6, message: "Password must be at least 6 characters" },]}>
        <Input.Password autoComplete="off" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={''} block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
