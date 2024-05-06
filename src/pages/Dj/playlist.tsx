import { getGuestDJQue } from '@/services/ant-design-pro/api';
import { CheckCircleTwoTone, ClockCircleTwoTone, PlayCircleTwoTone } from '@ant-design/icons';
import { TableDropdown } from '@ant-design/pro-components';
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
     
        <p  style={{
              fontSize: '15px',
            }}>Available tracks</p>
        

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
                <div style={{ margin: '7px' }}>
                  {item.isPlaying ? (
                    <PlayCircleTwoTone twoToneColor="#ef3bf5" style={{ fontSize: '20px' }} />
                  ) : item.isPlayed ? (
                    <CheckCircleTwoTone twoToneColor="#5e42ad" style={{ fontSize: '20px' }} />
                  ) : (
                    <ClockCircleTwoTone twoToneColor="#bab6ba" style={{ fontSize: '20px' }} />
                  )}
                </div>
                <div style={{ margin: '7px' }}> 
                <TableDropdown
                  key="actionGroup"
                  menus={[
                    {
                      key: 'Played',
                      name: (
                        <span>
                          <CheckCircleTwoTone twoToneColor="#5e42ad" style={{ fontSize: '20px', marginRight: '8px' }} />
                          Played
                        </span>
                      ),
                      disabled : item.isPlayed,
                      onClick: () => {
                        
                      },
                    },
                    {
                        key: 'Play',
                        name:  (
                            <span>
                              <PlayCircleTwoTone twoToneColor="#ef3bf5" style={{ fontSize: '20px', marginRight: '8px' }} />
                              Play
                            </span>
                          ),
                        disabled : item.isPlayed || item.isPlaying,
                        onClick: () => {
                          
                        },
                      },
                  ]}
                />
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
