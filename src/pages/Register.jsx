import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useRegisterUserMutation,useUpdateProfileMutation } from "../store/authReducers/authApi";

const Register = () => {
  const [form] = Form.useForm();
  const [registerUser]=useRegisterUserMutation()
  const [updateProfile]=useUpdateProfileMutation()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  let handleSubmit=async(values)=>{
    setLoading(true);
    setError(null);
    try {
       const res = await registerUser({
        email: values.email,
        password: values.password,
      });
       if (res.error) throw new Error(res.error.message);

      await updateProfile({ displayName: values.name });
    } catch (error) {
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }

  
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical" autoComplete="off" initialValues={{name: "",email: "",password: "",}}>
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
        <Button type="primary" htmlType="submit"  block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
