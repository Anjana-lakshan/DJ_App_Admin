
import { getSongs } from '@/services/ant-design-pro/api';
import {  ProCard, ProFormText, ProList } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import PlayList from './Home/Playlist';

const Home: React.FC = () => {

    const [dataSource, setDataSource] = useState(null);



  const fetchData = () => {
    getSongs().then((response) => {
      setDataSource(response.data.songs);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  type DataItem = (typeof dataSource)[number];

  return (
    <>
     <style>
        {`
          .ant-pro-card {
            background-color: #C2B0D8;
            transition: background-color 0.3s ease;
            border-radius: 13px;
          }

          .ant-pro-card:hover {
            background-color: #B6B6B6;
          }
          
          .ant-pro-card .ant-pro-card-body {
            padding-inline: 0; 
          }

          .ant-pro-form-item-control-input-content .ant-input.ant-input-affix-wrapper {
            border-radius: 13px !important;
          }
        `}
      </style>
    <ProCard gutter={20} title="" style={{ background:'transparent' , }} >
    <ProCard colSpan={12} layout="center" bordered >
      Users
    </ProCard>
    <ProCard colSpan={12} layout="center" bordered >
      Playlist
    </ProCard>
    
  </ProCard>
  <ProCard gutter={20} title="" style={{ background:'transparent' }}>
  <ProCard colSpan={12} layout="center" bordered >
   Categories
  </ProCard>
  <ProCard colSpan={12} layout="center" bordered >
    New release
  </ProCard>
  
</ProCard>
<ProFormText width="md" name="name" label="" placeholder="Search your preferred songs!" />
<PlayList/>
</>
  );
};

export default Home;