import { Form, Layout, message, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CustomFooter from "../footer/CustomFooter";
import CustomHeader from "../header/CustomHeader";

const CustomLayout = () => {
  const navigate = useNavigate();
  const api = process.env.REACT_APP_API_KEY;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();



  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("user");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const tokenWithoutQuotes = token.replace(/"/g, "");

      try {
        const response = await axios.get(`${api}/user/single-user`, {
          headers: {
            Authorization: `Bearer ${tokenWithoutQuotes}`
          }
        });

        console.log(response);
        localStorage.setItem("userdata", JSON.stringify(response?.data.data));
        message.success(response.data.message);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, [form]);

  return (
    <>
      <Layout style={{
              // background: colorBgContainer,
              // minHeight: 280,
              // padding: 24,
              // borderRadius: borderRadiusLG,
              minHeight: '100vh',
            }}>
        <CustomHeader />
        <Content
          style={{
            padding: "16px 16px 0 16px"
          }}
        >
          <div
            style={{
              // background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
              // minHeight: '100vh',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <CustomFooter />
      </Layout>
    </>
  );
};

export default CustomLayout;
