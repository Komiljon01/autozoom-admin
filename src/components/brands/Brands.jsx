import {
  Button,
  Flex,
  Image,
  message,
  Table,
  Modal,
  Form,
  Input,
  Upload,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";

function Brands() {
  const [form] = Form.useForm();
  const brandsURL = "https://autoapi.dezinfeksiyatashkent.uz/api/brands";
  const imageURL =
    "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("access_token");

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // GET
  const getData = () => {
    setLoader(true);
    fetch(brandsURL)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => message.error(err))
      .finally(() => setLoader(false));
  };
  useEffect(() => getData, []);

  // POST
  const [postName, setPostName] = useState("");
  const [postImage, setPostImage] = useState(null);

  const postData = () => {
    const formData = new FormData();
    formData.append("title", postName);
    formData.append("images", postImage);

    fetch(brandsURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getData();
        setIsModalOpen(false);
        message.success(data.message);
        setPostImage(null);
        setPostName("");
        form.resetFields();
      })
      .catch((err) => console.log(err));
  };

  // Delete
  const deleteData = (id) => {
    fetch(`${brandsURL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getData();
          message.success(data.message);
        } else {
          message.error(data.message);
        }
      })
      .catch((err) => message.error(err));
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Images",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: (
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Brand
        </Button>
      ),
      dataIndex: "add-brand",
      key: "add-brand",
    },
  ];

  const dataSource =
    data &&
    data.map((brand, index) => ({
      index: index + 1,
      key: brand.id,
      name: brand.title,
      image: (
        <Image
          width={100}
          src={`${imageURL}${brand.image_src}`}
          alt={brand.title}
        />
      ),
      action: (
        <Flex gap="small">
          <Button type="primary">Edit</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => deleteData(brand.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Flex>
      ),
    }));

  return (
    <section id="brands">
      <h1>Brands</h1>
      <Table
        loading={loader ? true : false}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      {/* POST Modal */}
      <Modal
        title="Post Brand"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        okText="Submit"
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          layout="vertical"
          onFinish={postData}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input onChange={(e) => setPostName(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your image!",
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              onChange={(e) => setPostImage(e.file.originFileObj)}
              customRequest={({ onSuccess }) => {
                onSuccess("ok");
              }}
            >
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Flex justify="flex-end" gap="small">
              <Button htmlType="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}

export default Brands;
