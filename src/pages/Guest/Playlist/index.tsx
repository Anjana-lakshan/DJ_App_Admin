import { getGuestSongs, requestSongs } from '@/services/ant-design-pro/api';
import { PlayCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { Avatar, Col, Divider, List, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const PlayList: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <div
        id="scrollableDiv"
        style={{
          // height: 300,
          overflow: 'auto',
          padding: '0 7px',
          // border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <Row justify="space-evenly" style={{ padding: '10px' }}>
          <Col span={12}>Available tracks</Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <a href='/guestUser/tracks'>
            See All
            </a>
          </Col>
        </Row>

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
