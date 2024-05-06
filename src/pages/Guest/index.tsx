import { clearLocalStorage, getSongs, getspotifyAuth } from '@/services/ant-design-pro/api';
import { LogoutOutlined } from '@ant-design/icons';
import { ProCard, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Col, ConfigProvider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import PlayList from './Playlist/index.tsx';

const Home: React.FC = () => {
  const [dataSource, setDataSource] = useState(null);

  const fetchData = () => {
    getSongs().then((response) => {
      setDataSource(response.data.songs);
    });
    // getspotifyAuth();
  };

  useEffect(() => {
    fetchData();
  }, []);

  type DataItem = (typeof dataSource)[number];

  const handleClickMyRequests = () => {
    history.push('/guestUser/MyRequest');
  };
  const handleClickDJQue = () => {
    history.push('/guestUser/DjQue');
  };
  const handleClickPlaylist = () => {
    // history.push('/users');
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Segoe UI',
        },
      }}
    >
      <style>
        {`
          .ant-pro-card {
            background-color: #C2B0D8;
            transition: background-color 0.3s ease;
            border-radius: 15px;
          }

          .ant-pro-card:hover {
            background-color: #B6B6B6;
          }
          
          .ant-pro-card .ant-pro-card-body {
            // padding-inline: 0; 
          }

          .ant-pro-form-item-control-input-content .ant-input.ant-input-affix-wrapper {
            border-radius: 20px !important;
          }

          .pro-card-col {
            padding: 10px; 
          }
        `}
      </style>
      <div
        style={{
          background: 'linear-gradient(to right, #5e42ad, #0F0C39)',
          borderRadius: '0 0 20px 20px',
        }}
      >
        <Row justify="end" style={{ paddingTop: '30px', paddingRight: '30px' }}>
          <LogoutOutlined
            style={{ color: '#ffff', fontSize: '20px' }}
            onClick={() => clearLocalStorage()}
          />
        </Row>
        <Row justify="end" style={{ padding: '10px' }}>
          <Col span={12} style={{ textAlign: 'right', paddingTop: '50px' }}>
            <p
              style={{
                color: '#ffff',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Hi, Kalindu!
            </p>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <img alt="logo" src="/icons/banner_icon.svg" height={'100px'} />
          </Col>
        </Row>
        <Row justify="space-around" gutter={[16, 16]} style={{ padding: '10px' }}>
          <Col span={12}>
            <ProCard colSpan={8} layout="center" bordered onClick={handleClickMyRequests}>
              My Requests
            </ProCard>
          </Col>
          <Col span={12}>
            <ProCard colSpan={8} layout="center" bordered onClick={handleClickPlaylist}>
              Playlist
            </ProCard>
          </Col>
        </Row>
        <Row justify="space-between" gutter={[16, 16]} style={{ padding: '10px' }}>
          <Col span={12}>
            <ProCard colSpan={12} layout="center" bordered onClick={handleClickDJQue}>
              DJ Que
            </ProCard>
          </Col>
          <Col span={12}>
            <ProCard colSpan={12} layout="center" bordered onClick={handleClickPlaylist}>
              “No Idea”
            </ProCard>
          </Col>
        </Row>

        <Row style={{ padding: '10px' }}>
          <Col span={24}>
            <ProFormText
              width="md"
              name="name"
              label=""
              placeholder="Search your preferred songs!"
            />
          </Col>
        </Row>
      </div>
      <div style={{ padding: '10px' }}>
        <PlayList />
      </div>
    </ConfigProvider>
  );
};

export default Home;
