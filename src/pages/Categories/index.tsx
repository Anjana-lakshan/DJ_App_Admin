import { getAllCategories } from '@/services/ant-design-pro/api';
import { history } from '@umijs/max';
import { Card, ConfigProvider, List } from 'antd';
import React, { useEffect, useState } from 'react';

// const data = [
//   {
//     title: 'Pop',
//   },
//   {
//     title: 'Hip-Hop',
//   },
//   {
//     title: 'Rock',
//   },
//   {
//     title: 'Jazz',
//   },
// ];

const Categories: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);

  const fetchData = () => {
    getAllCategories().then((response) => {
      setDataSource(response.data.songs);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickCategory = (id: string, name: string) => {
    history.push(`/categories/playList/${id}/${name}`);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Segoe UI',
        },
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
              paddingBottom: '10px',
              fontSize: '12px',
            }}
          >
            Select categories and add songs to the playlist
          </p>
          <List
            grid={{
              gutter: 16,
              xs: 2, // on extra small screens (up to 575px), 2 columns
              sm: 2, // on small screens (576px - 767px), 2 columns
              md: 4, // on medium screens (768px - 991px), 4 columns
              lg: 4, // on large screens (992px - 1199px), 4 columns
              xl: 4, // on extra large screens (1200px and above), 4 columns
            }}
            dataSource={dataSource}
            renderItem={(item) => (
              <List.Item>
                <Card
                  bodyStyle={{ padding: '10px' }}
                  style={{
                    backgroundColor: '#C2B0D8',
                    textAlign: 'center',
                  }}
                  onClick={() => handleClickCategory(item.id, item?.name)}
                  cover={
                    <img
                      alt="example"
                      src={item?.icons && item.icons.length > 0 ? item.icons[0].url : null}
                    />
                  }
                  title={''}
                >
                  <div style={{ height: '30px', overflow: 'hidden' }}>{item?.name ?? '-'}</div>
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
