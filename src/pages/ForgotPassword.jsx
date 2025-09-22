import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useResetPasswordMutation } from "../store/authReducers/authApi";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [resetPassword] = useResetPasswordMutation();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email }) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await resetPassword(email);
      if (res.error) throw new Error(res.error.message);
      setMessage("Password reset email sent successfully.");
      form.resetFields(); // Clear form after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical" autoComplete="off" initialValues={{ email: "" }}
    >
      <h2>Forgot Password</h2>

      {error && (
        <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }}/>
      )}
      {message && (
        <Alert type="success" message={message} showIcon style={{ marginBottom: 16 }}/>
      )}

      <Form.Item  name="email"  label="Email"  rules={[{ required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email address" },]}>
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block> Send Reset Link</Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
