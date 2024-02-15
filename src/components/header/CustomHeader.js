import { DownOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ColorfulText from "../ColorfulText/ColorfulText";

const profileNav = [
  {
    label: <Link to="/profile">Profile</Link>,
    key: "1",
    icon: <UserOutlined />
  },
  {
    label: <Link to="/settings">Settings</Link>,
    key: "2",
    icon: <SettingOutlined />
  },
  {
    type: "divider"
  },
  {
    label: (
      <Button
        danger
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </Button>
    ),
    key: "3"
  }
];

const dropdownMenu = (
  <Menu>
    {profileNav.map((item) =>
      item.type === "divider" ? (
        <Menu.Divider key={item.key} />
      ) : (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      )
    )}
  </Menu>
);

const CustomHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  
  useEffect(() => {
    const storedUserData = localStorage.getItem("userdata");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    }
  }, []);


  const items = [
    { key: 0, label: "Home" },
    { key: 1, label: "About" }
  ];

  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <div className="demo-logo">
          {user?.email && user.email.split("@")[0]}
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            flex: "1 1 auto",
            minWidth: "0px",
            justifyContent: "end",
            marginRight: "1rem"
          }}
        >
          {items.map((item) =>
            item.type === "divider" ? (
              <Menu.Divider key={item.key} />
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
        <div className="demo-logo" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem"
        }}>
          {user?.email && (
        <ColorfulText name={user.email.substring(0, 1)} className={'colored-avatar'}/>
      )}
          <Dropdown overlay={dropdownMenu} trigger={["click"]}>
            <Link onClick={(e) => e.preventDefault()} style={{ color: "#fff" }}>
              <Space>
                {user?.email && user.email.split("@")[0]}
                <DownOutlined />
              </Space>
            </Link>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default CustomHeader;
