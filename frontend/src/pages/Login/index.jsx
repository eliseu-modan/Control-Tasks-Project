import { Card } from "antd";
import { LoginForm } from "../../components/Login";
import Task from "../../assets/images/task3.png";
import "../../assets/styles/global.css";
const Login = () => {
  return (
    <div className="login-container">
      <img
        src={Task}
        alt="Task"
        style={{
          position: "absolute",
          width: "100%",
          left: "0px",
          top: "4%",
          height: "90%",
          opacity: "85.4%",
        }}
      />
      <Card
        className="login-card"
        style={{
          position: "absolute",
          width: "30%",
          height: "29.78%",
          top: "59%",
          background: "#d4d9d8",
          left: "39.6%",
          opacity: "70%",
        }}
      >
        <h3 style={{ color: "#009183" }}>Login - Task </h3>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
