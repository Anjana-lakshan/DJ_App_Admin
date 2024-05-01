import { getUsers } from '@/services/ant-design-pro/api';
import { Avatar, ConfigProvider, List } from 'antd';
import en_US from 'antd/es/locale/en_US';
import React, { useEffect, useState } from 'react';

const TableList: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);

  const position = 'bottom';
  const align = 'center';

  const fetchData = () => {
    getUsers().then((response) => {
      setDataSource(response.users);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ConfigProvider locale={en_US}>
      <div
        style={{
          padding: '20px',
        }}
      >
      
        <h3>Registered users</h3>
        <p style={{
            color:"#B6B6B6",
            fontSize:'12px'
          }}>Add tracks to the playlist</p>
       
        <List
          pagination={{ position, align }}
          dataSource={dataSource}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={item.name}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </div>
    </ConfigProvider>
  );
};

export default TableList;
