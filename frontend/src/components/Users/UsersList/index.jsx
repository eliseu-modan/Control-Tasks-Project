import { DeleteOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row, Table, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { usePageEvents } from "../../../contexts/pageEvents";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";
import { SaveOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";

function UserList({ onEdit, ...props }) {
  const { reloadList, setReloadList, filter } = usePageEvents();
  const [dataUsers, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const service = useService();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblePassword, setModalVisiblePassword] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 6 });
  const [form] = Form.useForm();
  // const { TextArea } = Input;
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    getUsers();
  }, [reloadList, filter, pagination.current, pagination.pageSize]);

  const adminState = {
    false: "Usuario",
    true: "Administrador",
  };
  async function getUsers() {
    try {
      const params = {
        page: pagination.current,
        pageSize: pagination.pageSize,
      };
      if (filter && filter.search !== null) {
        params.search = filter.search;
      }
      const { data } = await service.get("/users/auth/getUsers", {
        params,
      });
      setCards(data);
    } catch (error) {
      message.error("Não foi possível listar os Usuarios.");
    } finally {
      setLoading(false);
      setReloadList(false);
    }
  }

  async function onEdit(values) {
    setLoading(true);
    try {
      if (editMode === "password") {
        await service.patch(
          `/users/auth/editPassword/${form.getFieldValue("id")}`,
          values
        );
      } else {
        await service.patch(
          `/users/auth/editUser/${form.getFieldValue("id")}`,
          values
        );
      }
      window.location.reload();
    } catch (error) {
      console.error("Erro ao editar:", error);
    }
    setLoading(false);
  }

  async function onRemove(userSelected) {
    try {
      await service.delete(`users/auth/deleteUser/${userSelected.id}`);
      getUsers({ page: 1 });
      message.success(
        `O Usuario "${userSelected.id}" foi removido com sucesso!`
      );
    } catch (error) {
      message.error(`Não foi possível remover o Usuario "${userSelected.id}"`);
    }
  }

  const columns = [
    { key: "id", dataIndex: "id", title: "ID" },
    { key: "email", dataIndex: "email", title: "Email" },
    {
      key: "admin",
      title: "Admin?",
      render: (record) => {
        return adminState[record.admin];
      },
    },

    {
      key: "action",
      title: "Ação",
      align: "right",
      render: (userSelected) => (
        <Row justify="end" gutter={24}>
          <Col>
            <Button
              icon={<LockOutlined />}
              type="link"
              onClick={() => {
                handleEditClick(userSelected, "password");
              }}
            />
          </Col>
          <Col>
            <Button
              icon={<EditOutlined />}
              type="link"
              onClick={() => {
                handleEditClick(userSelected, "user");
              }}
            />
          </Col>
          <Col>
            <Button
              icon={<DeleteOutlined />}
              type="link"
              danger
              onClick={() => removeConfirm(userSelected)}
            />
          </Col>
        </Row>
      ),
    },
  ];

  const handleEditClick = (userSelected, mode) => {
    setEditMode(mode);
    form.setFieldsValue(userSelected);

    if (mode === "password") {
      setModalVisible(true);
    } else {
      setModalVisiblePassword(true);
    }
  };

  function removeConfirm(userSelected) {
    Modal.confirm({
      title: "Remover Usuario",
      content: `Deseja realmente remover o Usuario "${userSelected.id}?"`,
      okText: "Não",
      cancelText: "Remover!",
      cancelButtonProps: { danger: true },
      onCancel: () => onRemove(userSelected),
    });
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={(userSelected) => userSelected.id}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: dataUsers.length,
          onChange: (page, pageSize) =>
            setPagination({ current: page, pageSize }),
        }}
        loading={loading}
        scroll={{ x: 670 }}
        {...props}
      />
      <Modal
        title={editMode === "password" ? "Editar Senha" : "Editar Usuario"}
        visible={editMode === "password" ? modalVisible : modalVisiblePassword}
        onCancel={() =>
          editMode === "password"
            ? setModalVisible(false)
            : setModalVisiblePassword(false)
        }
        footer={null}
      >
        <Form form={form} onFinish={onEdit} layout="vertical">
          {editMode === "password" && (
            <>
              <Form.Item
                label="Senha"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a senha!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Repetir Senha"
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Por favor, confirme a senha!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("As senhas não coincidem!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}

          {editMode === "user" && (
            <>
              <FormItem
                name="email"
                label="E-mail"
                isFocused
                rules={[
                  { required: false },
                  {
                    type: "email",
                    message: "E-mail inválido",
                  },
                ]}
              >
                <Input />
              </FormItem>

              <FormItem
                name="admin"
                rules={[{ required: false }]}
                valuePropName="checked"
              >
                <Checkbox>Admin?</Checkbox>
              </FormItem>
            </>
          )}

          <Form.Item>
            <Button
              icon={<SaveOutlined />}
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() =>
                editMode === "password"
                  ? setModalVisible(false)
                  : setModalVisiblePassword(false)
              }
            >
              Salvar
            </Button>
            <Button
              id="editButtonCancel"
              icon={<SaveOutlined />}
              type="primary"
              onClick={() =>
                editMode === "password"
                  ? setModalVisible(false)
                  : setModalVisiblePassword(false)
              }
              style={{ position: "relative", left: "10%" }}
            >
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UserList;
