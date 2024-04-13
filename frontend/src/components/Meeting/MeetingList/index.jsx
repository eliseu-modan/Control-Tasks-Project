import React, { useState } from "react";
import { Card } from "antd";
import { Input } from "antd";
import { Button } from "antd";

const { TextArea } = Input;

const MeetingList = () => {
  return (
    <>
      <Card style={{ position: "relative", height: "600px" }}>
        <Card
          style={{
            background: "#EFEBE0",
            position: "absolute",
            height: "550px",
            width: "40%",
            left: "30%",
            top: "6%",
          }}
        >
          <p>Melhoria Continua</p>
          <Card
            title="Eliseu Junior"
            bordered={false}
            style={{
              position: "absolute",
              width: 500,
              left: "10%",
              top: "67%",
            }}
          >
            <Input
              placeholder="Responda Algo!"
              rows={4}
              maxLength={500}
              allowClear
            />
            <Button>Responder</Button>
          </Card>
        </Card>

        <Card
          title="Guilherme Melo"
          bordered={false}
          style={{
            position: "absolute",
            width: 300,
            left: "6%",
            top: "30%",
            opacity: "80%",
            borderRadius: "5px",
          }}
        >
          <p>Guilherme esta Aguardando !</p>
        </Card>
        <Card
          title="Rodrigo Souza Santos"
          bordered={false}
          style={{
            position: "absolute",
            width: 300,
            left: "6%",
            top: "10%",
            opacity: "80%",
            borderRadius: "5px",
          }}
        >
          <p>Rodrigo esta Digitando !</p>
        </Card>
        <Card
          title="Junior Melo Santos"
          bordered={false}
          style={{
            position: "absolute",
            width: 300,
            left: "75%",
            top: "30%",
            opacity: "80%",
            borderRadius: "5px",
          }}
        >
          <p>Junior esta Digitando !</p>
        </Card>
        <Card
          title="Bruno Souza Santos"
          bordered={false}
          style={{
            position: "absolute",
            width: 300,
            left: "75%",
            top: "10%",
            opacity: "80%",
            borderRadius: "5px",
          }}
        >
          <p>Bruno esta Digitando !</p>
        </Card>
        {/* <Card
          title="Eliseu Junior"
          bordered={false}
          style={{
            width: 300,
            left: "10%",
            top: "50%",
          }}
        >
        {" "}
        <br />
          <TextArea placeholder="Escreva Algo!" rows={4} maxLength={6} />
          <Button>Responder</Button>
        </Card> */}
        {/* <Card
          title="Eliseu Junior"
          bordered={false}
          style={{
            width: 300,
            left: "70%",
            // top: "10%",
          }}
        >
          {" "}
          <br />
          <TextArea placeholder="Escreva Algo!" rows={4} maxLength={6} />
          <Button>Responder</Button>{" "}
        </Card> */}
        {/* <Card
          title="Eliseu Junior"
          bordered={false}
          style={{
            width: 300,
            left: "70%",
            top: "20%",
          }}
        >
          {" "}
          <br />
          <TextArea placeholder="Escreva Algo!" rows={4} maxLength={6} />
          <Button>Responder</Button>{" "}
        </Card> */}
        {/* <Card
          title="Eliseu Junior"
          bordered={false}
          style={{
            width: 300,
            left: "15%",
          }}
        >
          {" "}
          <br />
          <TextArea placeholder="Escreva Algo!" rows={4} maxLength={6} />
          <Button>Responder</Button>{" "}
        </Card>*/}
      </Card>
    </>
  );
};

export default MeetingList;
