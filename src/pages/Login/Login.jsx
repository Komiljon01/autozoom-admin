import { useState } from "react";
import "./Login.css";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

function Login() {
  const url = "https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin";
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginData = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("phone_number", number);
    formData.append("password", password);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem(
            "access_token",
            data.data.tokens.accessToken.token
          );
          navigate("/home");
          message.success(data.message);
        } else {
          message.error(data.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <section id="login">
      {loading ? <Loader /> : null}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={loginData}
      >
        <Form.Item
          label="Tel number"
          name="telNumber"
          rules={[
            {
              required: true,
              message: "Please input your tel number!",
            },
          ]}
        >
          <Input onChange={(e) => setNumber(e.target.value)} value={number} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            value={password}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default Login;
