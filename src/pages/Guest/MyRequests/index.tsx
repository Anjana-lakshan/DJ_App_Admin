import { getMyRequest } from '@/services/ant-design-pro/api';
import { CheckCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import { Avatar, Divider, List } from 'antd';
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
    getMyRequest()
      .then((response) => {
        setDataSource(response.data);
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
        <h3>My Requests</h3>
        <p
          style={{
            color: '#B6B6B6',
            paddingBottom: '10px',
            fontSize: '13px',
          }}
        >
          All requested songs
        </p>

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
                  avatar={<Avatar src={item.imageUrl} size={50} />}
                  title={item.songName}
                  description={item.artistName}
                />
                <div>
                  {item?.isPlayed ? (
                    <CheckCircleTwoTone twoToneColor="#ef3bf5" style={{ fontSize: '20px' }} />
                  ) : (
                    <ClockCircleTwoTone twoToneColor="#5e42ad" style={{ fontSize: '20px' }} />
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
