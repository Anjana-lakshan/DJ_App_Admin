import { getGuestDJQue } from '@/services/ant-design-pro/api';
import { CheckCircleTwoTone, ClockCircleTwoTone, PlayCircleTwoTone } from '@ant-design/icons';
import { Avatar, Col, Divider, List, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const PlayList: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    getGuestDJQue()
      .then((response) => {
        setDataSource(response);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        id="scrollableDiv"
        style={{
          // height: 300,
          overflow: 'auto',
          padding: '16px 20px',
          // border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
     
        <h3>DJ’s Que</h3>
        <p  style={{
              color: '#B6B6B6',
              paddingBottom: '10px',
              fontSize: '12px',
            }}>Tracks to be played according to BPM</p>
        

        <InfiniteScroll
          dataLength={dataSource.length}
          // next={fetchData}
          hasMore={dataSource.length < 15}
          // loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={dataSource}
            renderItem={(item) => (
              <List.Item key={item.songName}>
                <List.Item.Meta
                  avatar={<Avatar src={item.imageUrl} size={50}/>}
                  title={item.songName}
                  description={item.artistName}
                />
                <div>
                  {item.isPlaying ? (
                    <PlayCircleTwoTone twoToneColor="#ef3bf5" style={{ fontSize: '20px' }} />
                  ) : item.isPlayed ? (
                    <CheckCircleTwoTone twoToneColor="#5e42ad" style={{ fontSize: '20px' }} />
                  ) : (
                    <ClockCircleTwoTone twoToneColor="#bab6ba" style={{ fontSize: '20px' }} />
                  )}
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PlayList;
