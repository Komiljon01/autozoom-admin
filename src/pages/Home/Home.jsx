import "./Home.css";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Dropdown, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;

// Icons
import { FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { SiBrandfolder } from "react-icons/si";
import { SiThemodelsresource } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

import logo from "../../assets/autozoom.svg";

function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: (
        <Link
          onClick={() => {
            navigate("/");
            localStorage.removeItem("access_token");
          }}
        >
          Log Out
        </Link>
      ),
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
        width={250}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={[
            {
              key: "0",
              icon: collapsed && <img src={logo} />,
              label: (
                <Link>
                  <h3>AvtoZoomAdmin</h3>
                </Link>
              ),
            },
            {
              key: "1",
              icon: <FaHome />,
              label: <Link to="dashboard">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <BiCategory />,
              label: <Link to="categories">Categories</Link>,
            },
            {
              key: "3",
              icon: <SiBrandfolder />,
              label: <Link to="brands">Brands</Link>,
            },
            {
              key: "4",
              icon: <SiThemodelsresource />,
              label: <Link to="models">Models</Link>,
            },
            {
              key: "5",
              icon: <FaLocationDot />,
              label: <Link to="locations">Locations</Link>,
            },
            {
              key: "6",
              icon: <FaCity />,
              label: <Link to="cities">Cities</Link>,
            },
            {
              key: "7",
              icon: <IoCarSport />,
              label: <Link to="cars">Cars</Link>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          id="navbar"
          style={
            collapsed
              ? {
                  padding: 0,
                  background: colorBgContainer,
                  position: "fixed",
                  right: 0,
                  width: "calc(100% - 80px)",
                }
              : {
                  padding: 0,
                  background: colorBgContainer,
                  position: "fixed",
                  right: 0,
                  width: "calc(100% - 250px)",
                }
          }
        >
          <div id="navbar-lists">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <Button type="primary">
                <UserOutlined />
                Admin
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="content"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
