
import { Button, Input, Form, message, Modal } from "antd";
import { useGoogleLoginMutation,useLoginUserMutation } from "../store/authReducers/authApi";
import { Link,useNavigate } from "react-router-dom";


const Login = () => {
  let [googleLogin]=useGoogleLoginMutation()
  let [loginUser]=useLoginUserMutation()
  let navigate=useNavigate()

 let handleGoogleLogin=async()=>{
  //  alert("login with google")
  try {
    let res=await googleLogin().unwrap()
    console.log(res)//{data:{user:{},iseNewUser}}
    // data.user data.isNewUser
    const {user,isNewUser}=res.data
    alert(`welcome user${user.userName}`)
    // only for the newUsers
    if(isNewUser){
      Modal.info({
       title :"newUser detected",
       content:"please select an account",
       onOk:()=>navigate("/register",{
         state:{
          name:user.displayName || "",
          email:user.email || "" ,
          photoUrl:user.photoURL|| ""
         }
       })

      })
    }else{
      navigate("/dashboard")
    }


  } catch (error) {
    
  }













 }

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      <Form layout="vertical" onFinish={''}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, min: 6 }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={''}>
            Login
          </Button>
        </Form.Item>
      </Form>

      <Button onClick={handleGoogleLogin} block type="default">
        Login with Google
      </Button>

      <div className="mt-3">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
