import {
  Button,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Switch,
  Table,
  Upload,
} from "antd";
import { useEffect, useState } from "react";

function Cars() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // GET Datas

  // URLs
  const carsURL = "https://autoapi.dezinfeksiyatashkent.uz/api/cars";
  const modelsURL = "https://autoapi.dezinfeksiyatashkent.uz/api/models";
  const brandsURL = "https://autoapi.dezinfeksiyatashkent.uz/api/brands";
  const categoriesURL =
    "https://autoapi.dezinfeksiyatashkent.uz/api/categories";
  const locationsURL = "https://autoapi.dezinfeksiyatashkent.uz/api/locations";
  const citiesURL = "https://autoapi.dezinfeksiyatashkent.uz/api/cities";
  const token = localStorage.getItem("access_token");

  // Datas
  const [carsData, setCarsData] = useState();
  const [categoriesData, setCategoriesData] = useState();
  const [modelsData, setModelsData] = useState();
  const [brandsData, setBrandsData] = useState();
  const [locationsData, setLocationsData] = useState();
  const [citiesData, setCitiesData] = useState();
  const [loader, setLoader] = useState(false);

  const fetchData = async (url, setState) => {
    try {
      setLoader(true);
      const response = await fetch(url);
      const result = await response.json();
      setState(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setState(null);
    } finally {
      setLoader(false);
    }
  };

  const getDatas = () => {
    fetchData(carsURL, setCarsData);
    fetchData(categoriesURL, setCategoriesData);
    fetchData(modelsURL, setModelsData);
    fetchData(brandsURL, setBrandsData);
    fetchData(locationsURL, setLocationsData);
    fetchData(citiesURL, setCitiesData);
  };

  useEffect(() => {
    getDatas();
  }, []);

  // POST/PUT
  const [postCategory, setPostCategory] = useState("");
  const [postBrand, setPostBrand] = useState("");
  const [postModel, setPostModel] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [postCity, setPostCity] = useState("");
  const [postColor, setPostColor] = useState("");
  const [postYear, setPostYear] = useState("");
  const [postSeconds, setPostSeconds] = useState("");
  const [postSpeed, setPostSpeed] = useState("");
  const [postMaxPeople, setPostMaxPeople] = useState("");
  const [postMotor, setPostMotor] = useState("");
  const [postTransmission, setPostTransmission] = useState("");
  const [postDriveSide, setPostDriveSide] = useState("");
  const [postPetrol, setPostPetrol] = useState("");
  const [postLimitPerDay, setPostLimitPerDay] = useState("");
  const [postDeposit, setPostDeposit] = useState("");
  const [postPremiumProtectionPrice, setPostPremiumProtectionPrice] =
    useState("");
  const [postPriceInAED, setPostPriceInAED] = useState("");
  const [postPriceInAEDSale, setPostPriceInAEDSale] = useState("");
  const [postPriceInUSD, setPostPriceInUSD] = useState("");
  const [postPriceInUSDSale, setPostPriceInUSDSale] = useState("");
  const [postInclusive, setPostInclusive] = useState("");
  const [postCarImages, setPostCarImages] = useState(null);
  const [postMainImage, setPostMainImage] = useState(null);
  const [postCover, setPostCover] = useState(null);

  const [currentCar, setCurrentCar] = useState(null);

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("category_id", postCategory);
    formData.append("brand_id", postBrand);
    formData.append("model_id", postModel);
    formData.append("location_id", postLocation);
    formData.append("city_id", postCity);
    formData.append("color", postColor);
    formData.append("year", postYear);
    formData.append("seconds", postSeconds);
    formData.append("max_speed", postSpeed);
    formData.append("max_people", postMaxPeople);
    formData.append("motor", postMotor);
    formData.append("transmission", postTransmission);
    formData.append("drive_side", postDriveSide);
    formData.append("petrol", postPetrol);
    formData.append("limitperday", postLimitPerDay);
    formData.append("deposit", postDeposit);
    formData.append("premium_protection", postPremiumProtectionPrice);
    formData.append("price_in_aed", postPriceInAED);
    formData.append("price_in_aed_sale", postPriceInAEDSale);
    formData.append("price_in_usd", postPriceInUSD);
    formData.append("price_in_usd_sale", postPriceInUSDSale);
    formData.append("inclusive", postInclusive);

    if (postCarImages) {
      formData.append("images", postCarImages);
    }

    if (postMainImage) {
      formData.append("images", postMainImage);
    }

    if (postCover) {
      formData.append("cover", postCover);
    }

    const url = isEditMode ? `${carsURL}/${currentCar.id}` : carsURL;
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getDatas();
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
    setCurrentCar(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleEdit = (car) => {
    setIsEditMode(true);
    setCurrentCar(car);
    setIsModalOpen(true);
    form.setFieldsValue({
      category: car.category.id,
      brand: car.brand.id,
      model: car.model.id,
      location: car.location.id,
      city: car.city.id,
      color: car.color,
      year: car.year,
      seconds: car.seconds,
      speed: car.max_speed,
      maxPeople: car.max_people,
      motor: car.motor,
      transmission: car.transmission,
      driveSide: car.drive_side,
      petrol: car.petrol,
      limitperday: car.limitperday,
      deposit: car.deposit,
      premiumProtectionPrice: car.premium_protection,
      priceInAED: car.price_in_aed,
      priceInAEDSale: car.price_in_aed_sale,
      priceInUSD: car.price_in_usd,
      priceInUSDSale: car.price_in_usd_sale,
      inclusive: car.inclusive,
    });
  };

  // DELETE
  const deleteData = (id) => {
    fetch(`${carsURL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getDatas();
          message.success(data.message);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => message.error(err));
  };

  // Options
  const categoryOptions =
    categoriesData &&
    categoriesData.map((data) => ({
      label: data.name_en,
      value: data.id,
    }));

  const brandsOptions =
    brandsData &&
    brandsData.map((data) => ({
      label: data.title,
      value: data.id,
    }));

  const modelsOptions =
    modelsData &&
    modelsData.map((data) => ({
      label: data.name,
      value: data.id,
    }));

  const locationsOptions =
    locationsData &&
    locationsData.map((data) => ({
      label: data.name,
      value: data.id,
    }));

  const citiesOptions =
    citiesData &&
    citiesData.map((data) => ({
      label: data.name,
      value: data.id,
    }));

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: (
        <Button type="primary" onClick={handleAdd}>
          Add Car
        </Button>
      ),
      dataIndex: "add-car",
      key: "add-car",
    },
  ];

  const dataSource =
    carsData &&
    carsData.map((car, index) => ({
      key: car.id,
      index: index + 1,
      brand: car.brand.title,
      model: car.model.name,
      color: car.color,
      city: car.city.name,
      action: (
        <Flex gap="small">
          <Button type="primary" onClick={() => handleEdit(car)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete the car"
            description="Are you sure to delete this car?"
            onConfirm={() => deleteData(car.id)}
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
    <div>
      <h1 style={{ marginBottom: "20px" }}>Cars</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loader}
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
          name="car form"
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
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input your car category!",
              },
            ]}
          >
            <Select
              placeholder="Select a category"
              options={categoryOptions}
              onChange={(e) => setPostCategory(e)}
            />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            rules={[
              {
                required: true,
                message: "Please input your car brand!",
              },
            ]}
          >
            <Select
              placeholder="Select a brand"
              options={brandsOptions}
              onChange={(e) => setPostBrand(e)}
            />
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={[
              {
                required: true,
                message: "Please input your car model!",
              },
            ]}
          >
            <Select
              placeholder="Select a model"
              options={modelsOptions}
              onChange={(e) => setPostModel(e)}
            />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: "Please input your car location!",
              },
            ]}
          >
            <Select
              placeholder="Select a location"
              options={locationsOptions}
              onChange={(e) => setPostLocation(e)}
            />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your car city!",
              },
            ]}
          >
            <Select
              placeholder="Select a city"
              options={citiesOptions}
              onChange={(e) => setPostCity(e)}
            />
          </Form.Item>

          <Form.Item
            label="Color"
            name="color"
            rules={[
              {
                required: true,
                message: "Please input your car color!",
              },
            ]}
          >
            <Input onChange={(e) => setPostColor(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Year"
            name="year"
            rules={[
              {
                required: true,
                message: "Please input your car year!",
              },
            ]}
          >
            <Input onChange={(e) => setPostYear(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Seconds"
            name="seconds"
            rules={[
              {
                required: true,
                message: "Please input your car seconds!",
              },
            ]}
          >
            <Input onChange={(e) => setPostSeconds(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Speed"
            name="speed"
            rules={[
              {
                required: true,
                message: "Please input your car speed!",
              },
            ]}
          >
            <Input onChange={(e) => setPostSpeed(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Max People"
            name="maxPeople"
            rules={[
              {
                required: true,
                message: "Please input your car max-people!",
              },
            ]}
          >
            <Input onChange={(e) => setPostMaxPeople(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Motor"
            name="motor"
            rules={[
              {
                required: true,
                message: "Please input your car motor!",
              },
            ]}
          >
            <Input onChange={(e) => setPostMotor(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Transmission"
            name="transmission"
            rules={[
              {
                required: true,
                message: "Please input your car transmission!",
              },
            ]}
          >
            <Input onChange={(e) => setPostTransmission(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Drive side"
            name="driveSide"
            rules={[
              {
                required: true,
                message: "Please input your car drive side!",
              },
            ]}
          >
            <Input onChange={(e) => setPostDriveSide(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Petrol"
            name="petrol"
            rules={[
              {
                required: true,
                message: "Please input your car petrol!",
              },
            ]}
          >
            <Input onChange={(e) => setPostPetrol(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Limit per day"
            name="limitperday"
            rules={[
              {
                required: true,
                message: "Please input your car limitperday!",
              },
            ]}
          >
            <Input onChange={(e) => setPostLimitPerDay(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Deposit"
            name="deposit"
            rules={[
              {
                required: true,
                message: "Please input your car deposit!",
              },
            ]}
          >
            <Input onChange={(e) => setPostDeposit(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Premium Protection Price"
            name="premiumProtectionPrice"
            rules={[
              {
                required: true,
                message: "Please input your car premium protection price!",
              },
            ]}
          >
            <Input
              onChange={(e) => setPostPremiumProtectionPrice(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Price in AED"
            name="priceInAED"
            rules={[
              {
                required: true,
                message: "Please input your car Price in AED!",
              },
            ]}
          >
            <Input onChange={(e) => setPostPriceInAED(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Price in AED (Sale)"
            name="priceInAEDSale"
            rules={[
              {
                required: true,
                message: "Please input your car Price in AED (Sale)!",
              },
            ]}
          >
            <Input onChange={(e) => setPostPriceInAEDSale(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Price in USD"
            name="priceInUSD"
            rules={[
              {
                required: true,
                message: "Please input your car Price in USD!",
              },
            ]}
          >
            <Input onChange={(e) => setPostPriceInUSD(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Price in USD (Sale)"
            name="priceInUSDSale"
            rules={[
              {
                required: true,
                message: "Please input your car Price in USD (Sale)!",
              },
            ]}
          >
            <Input onChange={(e) => setPostPriceInUSDSale(e.target.value)} />
          </Form.Item>

          <Form.Item label="Inclusive" name="inclusive">
            <Switch onChange={(e) => setPostInclusive(e)} />
          </Form.Item>

          <Form.Item
            label="Upload the car images"
            name="image-1"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              customRequest={({ onSuccess }) => {
                onSuccess("ok");
              }}
              onChange={(e) => setPostCarImages(e.file.originFileObj)}
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
            label="Upload the main image"
            name="image-2"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              customRequest={({ onSuccess }) => {
                onSuccess("ok");
              }}
              onChange={(e) => setPostMainImage(e.file.originFileObj)}
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
            label="Upload the cover image"
            name="cover"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              customRequest={({ onSuccess }) => {
                onSuccess("ok");
              }}
              onChange={(e) => setPostCover(e.file.originFileObj)}
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
    </div>
  );
}

export default Cars;
