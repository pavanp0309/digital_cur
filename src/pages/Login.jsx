
import { Button, Input, Form, message, Modal } from "antd";
import { useGoogleLoginMutation, useLoginUserMutation } from "../store/authReducers/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authReducers/authSlice";

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await loginUser({ email, password }).unwrap();
      // ✅ store only plain data
      dispatch(setUser({
        uid: res.uid,
        email: res.email,
        displayName: res.displayName,
        photoURL: res.photoURL,
      }));
      message.success(`Welcome back, ${res.displayName || "User"}`);
      navigate("/dashboard");
    } catch (err) {
      message.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await googleLogin().unwrap();
      const { user, isNewUser } = res;

      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }));

      message.success(`Welcome ${user.displayName || "User"}`);
      if (isNewUser) {
        Modal.info({
          title: "New User Detected",
          content: "Please complete your registration profile.",
          onOk: () =>
            navigate("/register", {
              state: {
                name: user.displayName || "",
                email: user.email || "",
                photoURL: user.photoURL || "",
              },
            }),
        });
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      message.error(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, min: 6 }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>

      <Button onClick={handleGoogleLogin} block type="default" loading={loading}>
        Login with Google
      </Button>

      <div className="mt-3">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        <p><Link to="/forgot-password">Forgot Password?</Link></p>
      </div>
    </div>
  );
};

export default Login;
