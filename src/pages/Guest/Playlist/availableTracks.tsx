import { getGuestSongs, requestSongs } from '@/services/ant-design-pro/api';
import { PlayCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { Avatar, Divider, List, message } from 'antd';
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
    getGuestSongs()
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
  
  const handleAdd = async (id: { [key: string]: any } | undefined) => {
    const hide = message.loading('Loading');
    try {
      await requestSongs(id);
      hide();
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

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
        <h3>Available Tracks</h3>
        <p  style={{
              color: '#B6B6B6',
              paddingBottom: '10px',
              fontSize: '12px',
            }}>Select and send request tracks to play</p>

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
                  {item?.requestData?.isRequested ? (
                    <PlayCircleTwoTone twoToneColor="#ef3bf5" style={{ fontSize: '20px' }} />
                  ) : (
                    <PlusCircleTwoTone twoToneColor="#5e42ad" style={{ fontSize: '20px' }} onClick={() => handleAdd(item.id)}/>
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
