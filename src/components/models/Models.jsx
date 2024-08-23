import {
  Button,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";

function Models() {
  const [form] = Form.useForm();
  const modelsURL = "https://autoapi.dezinfeksiyatashkent.uz/api/models";
  const brandsURL = "https://autoapi.dezinfeksiyatashkent.uz/api/brands";

  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // GET Models Data
  const getData = () => {
    setLoader(true);

    fetch(modelsURL)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    getData();
  }, []);

  // Get Brands Data
  const [brandsData, setBrandsData] = useState();

  const getBrandsData = () => {
    setLoader(true);

    fetch(brandsURL)
      .then((res) => res.json())
      .then((data) => {
        setBrandsData(data.data);
      })
      .finally(() => setLoader(false));
  };

  useEffect(getBrandsData, []);

  // POST/PUT
  const [postName, setPostName] = useState("");
  const [postBrand, setPostBrand] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentModel, setCurrentModel] = useState(null);
  const token = localStorage.getItem("access_token");

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("name", postName);
    formData.append("brand_id", postBrand);

    const url = isEditMode ? `${modelsURL}/${currentModel.id}` : modelsURL;
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getData();
          setIsModalOpen(false);
          message.success(data.message);
          form.resetFields();
        } else {
          message.error(data.success);
        }
      })
      .catch((err) => message.error(err));
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentModel(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleEdit = (model) => {
    setIsEditMode(true);
    setCurrentModel(model);
    setIsModalOpen(true);
    form.setFieldsValue({
      name: model.name,
      brand: model.brand_id,
    });
  };

  // DELETE
  const deleteData = (id) => {
    fetch(`${modelsURL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
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

  const options =
    brandsData &&
    brandsData.map((brand) => ({
      label: brand.title,
      value: brand.id,
    }));

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
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: (
        <Button type="primary" onClick={handleAdd}>
          Add Model
        </Button>
      ),
      dataIndex: "add-model",
      key: "add-model",
    },
  ];

  const dataSource =
    data &&
    data.map((model, index) => ({
      key: model.id,
      index: index + 1,
      name: model.name,
      brand: model.brand_title,
      action: (
        <Flex gap="small">
          <Button type="primary" onClick={() => handleEdit(model)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete the model"
            description="Are you sure to delete this model?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteData(model.id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Flex>
      ),
    }));

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Models</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loader}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }}
      />

      {/* Modal for POST/PUT */}
      <Modal
        title={`${isEditMode ? "Edit Model" : "Add Model"}`}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          name="model form"
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
          onFinish={handleFormSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your model name!",
              },
            ]}
          >
            <Input onChange={(e) => setPostName(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Brand name"
            name="brand"
            rules={[
              {
                required: true,
                message: "Please input your model brand!",
              },
            ]}
          >
            <Select
              placeholder="Select a brand"
              style={{ width: "100%" }}
              options={options}
              onChange={(e) => setPostBrand(e)}
            />
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
    </div>
  );
}

export default Models;
