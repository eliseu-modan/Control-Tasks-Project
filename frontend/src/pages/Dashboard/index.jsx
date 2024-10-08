import { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import "../../assets/styles/global.css";

function DashboardPage({ numberTasks, ultimoElemento }) {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [tasksCount, setTasksCount] = useState(numberTasks);
  useEffect(() => {
    setTasksCount(numberTasks);
  }, [numberTasks]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); //

  function getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={6}>
        <Card id="borderColor">
          <h2>Tarefas Criadas</h2>
          <h1>{tasksCount}</h1>
        </Card>
      </Col>
      <Col span={6}>
        <Card id="borderColor">
          <h2>Data</h2>
          <h1>{currentDate}</h1>
        </Card>
      </Col>
      <Col span={6}>
        <Card id="borderColor">
          <h2>Horario Atual</h2>
          <h1>{currentTime}</h1>
        </Card>
      </Col>
      <Col span={6}>
        <Card id="borderColor">
          <h2>Ultima tarefa Criada</h2>
          <h1>{ultimoElemento}</h1>
        </Card>
      </Col>
    </Row>
  );
}

export default DashboardPage;
