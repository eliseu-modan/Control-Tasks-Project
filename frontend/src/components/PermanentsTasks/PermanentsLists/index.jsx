import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Row, Col, Input, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";
import { SaveOutlined } from "@ant-design/icons";

const PermanentsLists = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);
  const service = useService();
  const [dataPermanents, setDataPermanents] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTask, setModalVisibleTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    getTasksPermanents();
  }, []);

  async function getTasksPermanents() {
    setLoading(true);
    try {
      const { data } = await service.get("tasks/auth/getTasksPermanent");
      setDataPermanents(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  const openModalTask = (task) => {
    setSelectedTask(task);
    setModalVisibleTask(true);
  };
  const columns = [
    { key: "name", dataIndex: "name", title: "Nome da Tarefa" },
    {
      key: "subject",
      dataIndex: "subject",
      title: "Tarefa",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => openModalTask(record)}>
            Ver Tarefa
          </Button>
        </div>
      ),
    },
    {
      key: "action",
      title: "Ação",
      align: "center",
      render: (taskSelected) => (
        <Row justify="left" gutter={24}>
          <Col>
            <Button
              icon={<EditOutlined />}
              type="link"
              style={{ position: "relative", top: "0px", left: "0%" }}
              onClick={() => {
                handleEditClick(taskSelected);
              }}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                removeConfirmPermanent(taskSelected);
              }}
            />
          </Col>
        </Row>
      ),
    },
  ];
  const closeModalTask = () => {
    setSelectedTask(null);
    setModalVisibleTask(false);
  };

  function removeConfirmPermanent(taskSelected) {
    Modal.confirm({
      title: "Remover Tarefa",
      content: `Deseja realmente remover a Tarefa "${taskSelected.name}?"`,
      okText: "Remover",
      cancelText: "Cancelar",
      onOk: () => onRemovePermanent(taskSelected),
    });
  }

  async function onRemovePermanent(taskSelected) {
    try {
      await service.delete(`tasks/auth/deleteTaskPermanent/${taskSelected.id}`);
      getTasksPermanents({ page: 1 });
    } catch (error) {
      throw error;
    }
  }

  const handleEditClick = (taskSelected) => {
    form.setFieldsValue(taskSelected);
    setModalVisible(true);
  };
  async function onSubmitEdit(values) {
    try {
      setLoading(true);
      const response = await service.patch(
        `/tasks/auth/updateTask/${form.getFieldValue("id")}`,
        values
      );
      getTasksPermanents({ page: 1 });
      setIsEditFormVisible(false);
      message.success("Tarefa atualizada com sucesso!");
    } catch (error) {
      message.error("Não foi possível atualizar a Tarefa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <Table
          columns={columns}
          dataSource={dataPermanents}
          loading={loading}
        ></Table>
        <Modal
          visible={modalVisibleTask}
          title="Detalhes da Tarefa :"
          onCancel={closeModalTask}
          footer={null}
        >
          {selectedTask && (
            <div>
              <b>
                <p>{selectedTask.subject}</p>
              </b>
            </div>
          )}
        </Modal>
        <Modal
          title="Editar Tarefa"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={onSubmitEdit} layout="vertical">
            <FormItem
              name="name"
              label="Nome"
              rules={[
                { required: true },
                { type: "name", message: "Nome inválido" },
              ]}
            >
              <Input />
            </FormItem>

            <FormItem
              name="email"
              label="E-mail"
              // style={{ display: "none" }}
              rules={[
                { required: true },
                { type: "email", message: "E-mail inválido" },
              ]}
            >
              <Input />
            </FormItem>
            <Form.Item
              name="subject"
              label="Digite Sua Tarefa"
              rules={[{ required: true }]}
            >
              <TextArea hidden={4} />
            </Form.Item>
            <Form.Item>
              <Button
                icon={<SaveOutlined />}
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={(a) => setModalVisible(false)}
              >
                Salvar
              </Button>
              <Button
                id="editButtonCancel"
                icon={<SaveOutlined />}
                type="primary"
                onClick={(a) => setModalVisible(false)}
                style={{ position: "relative", left: "10%" }}
              >
                Cancelar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default PermanentsLists;
