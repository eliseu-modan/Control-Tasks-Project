import { Button, Col, Layout, Row } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

import "./index.css";

const { Header } = Layout;

function PrivateHeader({ toggleCollapsed, route }) {
  const { page } = route;
  return (
    <Header className={`private-header -overlaid`} style={{ paddingRight: 24 }}>
      <Row align="top" justify="space-between" wrap={false}>
        <Col className="header-right"></Col>
        <Col className="header-page-title">
          <h2>{page?.title}</h2>
        </Col>
        <Col className="header-right ">
          <Row align="bottom" wrap={true} gutter={20}>
            <Col>
              <Button
                icon={<MenuFoldOutlined />}
                type="link"
                onClick={toggleCollapsed}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
}

export default PrivateHeader;
