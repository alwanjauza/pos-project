import React, { useEffect, useState } from "react";
import { List, Card, Typography, Spin } from "antd";
import api from "../../api/auth";

const { Title, Paragraph } = Typography;

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-6 bg-gray-100'>
      <Title level={2} className='text-center mb-6'>
        Products Page
      </Title>
      {loading ? (
        <div className='flex justify-center items-center mt-12'>
          <Spin size='large' />
        </div>
      ) : (
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={products}
          renderItem={(product) => (
            <List.Item>
              <Card
                title={product.name}
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src='https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg'
                    className='w-full h-48 object-cover'
                  />
                }
              >
                <Paragraph className='line-clamp-1'>
                  {product.description}
                </Paragraph>
                <Paragraph strong>Price: ${product.price}</Paragraph>
                <Paragraph className='text-gray-500'>
                  Quantity: {product.quantity}
                </Paragraph>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default ProductsPage;
