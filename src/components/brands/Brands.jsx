import { Button, Flex, Image, message, Table } from "antd";
import { useEffect, useState } from "react";

function Brands() {
  const brandsURL = "https://autoapi.dezinfeksiyatashkent.uz/api/brands";
  const imageURL =
    "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  // GET
  useEffect(() => {
    setLoader(true);
    fetch(brandsURL)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => message(err))
      .finally(() => setLoader(false));
  }, []);

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
      title: <Button type="primary">Add Brand</Button>,
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
          <Button type="primary" danger>
            Delete
          </Button>
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
    </section>
  );
}

export default Brands;
