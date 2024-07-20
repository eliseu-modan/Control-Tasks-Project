import { Card } from "antd";
import { LoginForm } from "../../components/Login";
import "../../assets/styles/global.css";
import Logo from "../../assets/images/logo.jpg"
const Login = () => {
  return (
    <div className="login-container">
      <img
        src={Logo}
        alt="Task"
        style={{
          position: "absolute",
          width: "100%",
          left: "0%",
          top: "0%",
          height: "100%",
          opacity: "40.4%",
        }}
      />
      <Card
        className="login-card"
        style={{
          position: "absolute",
          width: "30%",
          height: "30.78%",
          top: "60%",
          background: "#d4d9d8",
          left: "35.8%",
          opacity: "75%",
        }}
      >
        <h3 style={{ color: "#120164" }}>Login - Task </h3>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
