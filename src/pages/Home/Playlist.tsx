import { getSongs } from '@/services/ant-design-pro/api';
import { DeleteTwoTone } from '@ant-design/icons';
import { Divider, List } from 'antd';
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
    getSongs()
      .then((response) => {
        setDataSource(response.data.songs);
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
          height: 300,
          overflow: 'auto',
          padding: '0 16px',
          // border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <h3>Current playlist</h3>
        <InfiniteScroll
          dataLength={dataSource.length}
          next={fetchData}
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
                  // avatar={<Avatar src={item.picture.large} />}
                  title={<a href="">{item.songName}</a>}
                  description={item.artistName}
                />
                <div>
                  <DeleteTwoTone twoToneColor="#eb2f96" />
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
