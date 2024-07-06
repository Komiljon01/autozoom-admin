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

function Categories() {
  const [form] = Form.useForm();
  const categoriesURL =
    "https://autoapi.dezinfeksiyatashkent.uz/api/categories";
  const imageURL =
    "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
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
    fetch(categoriesURL)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => message.error(err))
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    getData();
  }, []);

  // POST or PUT
  const [postNameEn, setPostNameEn] = useState("");
  const [postNameRu, setPostNameRu] = useState("");
  const [postImage, setPostImage] = useState(null);

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("name_en", postNameEn);
    formData.append("name_ru", postNameRu);
    if (postImage) {
      formData.append("images", postImage);
    }

    const url = isEditMode
      ? `${categoriesURL}/${currentCategory.id}`
      : categoriesURL;
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getData();
          setIsModalOpen(false);
          message.success(data.message);
          setPostImage(null);
          setPostNameEn("");
          setPostNameRu("");
          form.resetFields();
        } else {
          message.error(data.success);
        }
      })
      .catch((err) => message.error(err));
  };

  // Delete
  const deleteData = (id) => {
    fetch(`${categoriesURL}/${id}`, {
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
          throw new Error(data.message);
        }
      })
      .catch((err) => message.error(err));
  };

  const handleEdit = (category) => {
    setIsEditMode(true);
    setCurrentCategory(category);
    setPostNameEn(category.name_en);
    setPostNameRu(category.name_ru);
    setIsModalOpen(true);
    form.setFieldsValue({
      name_en: category.name_en,
      name_ru: category.name_ru,
    });
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentCategory(null);
    setPostNameEn("");
    setPostNameRu("");
    setPostImage(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name_en",
      dataIndex: "name_en",
      key: "name_en",
    },
    {
      title: "Name_ru",
      dataIndex: "name_ru",
      key: "name_ru",
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
        <Button type="primary" onClick={handleAdd}>
          Add Category
        </Button>
      ),
      dataIndex: "add-brand",
      key: "add-brand",
    },
  ];

  const dataSource =
    data &&
    data.map((category, index) => ({
      index: index + 1,
      key: category.id,
      name_en: category.name_en,
      name_ru: category.name_ru,
      image: (
        <Image
          width={100}
          src={`${imageURL}${category.image_src}`}
          alt={category.title}
        />
      ),
      action: (
        <Flex gap="small">
          <Button type="primary" onClick={() => handleEdit(category)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteData(category.id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Flex>
      ),
    }));

  return (
    <section id="categories">
      <h1 style={{ marginBottom: "20px" }}>Categories</h1>

      <Table
        loading={loader ? true : false}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{
          x: 800,
        }}
      />

      {/* Modal for Add and Edit */}
      <Modal
        title={isEditMode ? "Edit Category" : "Add Category"}
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
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Name_en"
            name="name_en"
            rules={[
              {
                required: true,
                message: "Please input the brand name!",
              },
            ]}
          >
            <Input onChange={(e) => setPostNameEn(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Name_ru"
            name="name_ru"
            rules={[
              {
                required: true,
                message: "Please input the brand name!",
              },
            ]}
          >
            <Input onChange={(e) => setPostNameRu(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
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

export default Categories;
