/**
 *
 * TasksFilter Component
 *
 */

import { Button, Col, Form, Input, Row, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormItem } from "../../_commons";
import { useState } from "react";
import TasksCreate from "../TasksCreate";
import { SaveOutlined } from "@ant-design/icons";

function TasksFilter({ onChange }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      className="planning-history-filter"
      name="planning-history-filter"
      onValuesChange={(_, values) => onChange(values)}
      size="large"
    >
      <Row justify="space-between" gutter={[24, 24]}>
        <Col span={24} md={9} lg={7}>
          <FormItem noMargin label="Pesquisar Tarefa" name="search">
            <Input.Search />
          </FormItem>
        </Col>
        <Col>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setModalVisible(true)}
            className="width-100"
          >
            Adicionar Tarefa
          </Button>

          <Modal
            title="Adicionar Tarefa"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
          >
            <TasksCreate />
            <Button
              id="editButtonCancel"
              icon={<SaveOutlined />}
              type="primary"
              onClick={(a) => setModalVisible(false)}
              style={{ position: "relative", top: "-55px" }}
            >
              Cancelar
            </Button>
          </Modal>
        </Col>
      </Row>
    </Form>
  );
}

export default TasksFilter;
