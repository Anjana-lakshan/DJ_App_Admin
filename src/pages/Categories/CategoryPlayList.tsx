import { getAllCategoriesPlaylist } from '@/services/ant-design-pro/api';
import { history, useParams } from '@umijs/max';
import { Card, ConfigProvider, List } from 'antd';
import React, { useEffect, useState } from 'react';

const Categories: React.FC = () => {
  const { categoryid, categoryname } = useParams();
  const [dataSource, setDataSource] = useState([]);

  const fetchData = () => {
    getAllCategoriesPlaylist(categoryid).then((response) => {
      setDataSource(response.data.songs);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickCategory = (id: string, name: string) => {
    history.push(window.location.pathname + '/songs/' + id + '/' + name);
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
          @media (max-width: 1900px) {
            .ant-list-grid.ant-list-item {
              width: 50%;
            }
            .ant-card .ant-card-head {
              font-size: 11px; 
              overflow: visible;
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
          <h3>{categoryname}</h3>
          <p
            style={{
              color: '#B6B6B6',
              paddingBottom: '10px',
              fontSize: '12px',
            }}
          >
            Select playList and add songs to the playlist
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
                      src={item?.images && item.images.length > 0 ? item.images[0].url : null}
                    />
                  }
                  title={item?.name ?? '-'}
                >
                  <div style={{ height: '50px', overflowY: 'auto' }}>
                    {item?.description ?? '-'}
                  </div>
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
