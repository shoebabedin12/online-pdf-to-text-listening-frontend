import { Button, Checkbox, Form, Input, Select, Space, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 10
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 20
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 24,
      offset: 8
    }
  }
};
const Signup = () => {
  const api = process.env.REACT_APP_API_KEY;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const onFinish = async (values) => {
    await axios
      .post(`${api}/auth/signup`, values)
      .then((response) => {
        console.log(response);
        if (response?.status === 200) {
          messageApi.open({
            type: "success",
            content: response?.data.message
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: error.response.data.message
        });
        console.log(error);
      });
  };


  return (
    <>
      {contextHolder}
      <Content
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: "24px 16px 0"
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: "88"
          }}
          style={{
            maxWidth: 600
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!"
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!"
              }
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement"))
              }
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <Link to="">agreement</Link>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Space size="middle">
              <Button
                type="primary"
                htmlType="submit"
                loading={loadings[0]}
                onClick={() => enterLoading(0)}
              >
                Register
              </Button>
              <span>
                Or <Link to="/login">Login now!</Link>
              </span>
            </Space>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};

export default Signup;
