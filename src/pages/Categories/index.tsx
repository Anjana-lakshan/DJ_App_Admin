import { getAuthspot } from '@/services/ant-design-pro/api';
import { Card, List } from 'antd';
import React, { useEffect } from 'react';

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
        console.log(response.data)
      })
      .catch(() => {

      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return(
  <>
    <div
      style={{
        overflow: 'auto',
        padding: '16px 16px',
        marginTop: '10px',
      }}
    >
      <h3>Categories</h3>
      <p>Select categories and add songs to the playlist</p>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              bodyStyle={{ padding: '10px' }}
              style={{
                backgroundColor: '#C2B0D8',
                textAlign: 'center',
              }}
              cover={
                <img
                  alt="example"
                  src="https://s3.amazonaws.com/thumbnails.venngage.com/template/a8897941-0545-4eaa-a427-76503a01b7e7.png"
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
)
};

export default Categories;
