import { getAuthspot } from '@/services/ant-design-pro/api';
import { Card, ConfigProvider, List } from 'antd';
import React, { useEffect } from 'react';
import { history } from '@umijs/max';

const data = [
  {
    title: 'Pop',
  },
  {
    title: 'Hip-Hop',
  },
  {
    title: 'Rock',
  },
  {
    title: 'Jazz',
  },
];

const Categories: React.FC = () => {
  const fetchData = () => {
    getAuthspot()
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickCategory = () => {
    history.push('/categories/playList');
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Segoe UI"
        }
      }}
    >
    <>
     <style>
        {`
          @media (max-width: 768px) {
            .ant-list-grid.ant-list-item {
              width: 50%;
            }
          }
        `}
      </style>
      <div
        style={{
          overflow: 'auto',
          padding: '25px 25px',
          marginTop: '10px',
        }}
      >
        <h3>Categories</h3>
        <p
          style={{
            color: '#B6B6B6',
            paddingBottom:'10px',
            fontSize:'12px'
          }}
        >
          Select categories and add songs to the playlist
        </p>
        <List
          grid={{ gutter: 16, column: 3  }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
            >
              <Card
                bodyStyle={{ padding: '10px' }}
                style={{
                  backgroundColor: '#C2B0D8',
                  textAlign: 'center',
                }}
                onClick={handleClickCategory}
                cover={
                  <img
                    alt="example"
                    src="https://c-fa.cdn.smule.com/rs-s19/arr/04/56/79f36fb7-6771-4cbb-ad75-de7d5b63892c.jpg"
                  />
                }
                title={''}
              >
                {item.title}
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>
    </ConfigProvider>
  );
};

export default Categories;
