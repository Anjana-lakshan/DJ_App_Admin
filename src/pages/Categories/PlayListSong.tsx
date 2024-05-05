import { addSongs, getAllCategoriesPlaylistSongs } from '@/services/ant-design-pro/api';
import { ProList } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Button, message } from 'antd';
import type { Key } from 'react';
import { useEffect, useState } from 'react';

// const dataSource = [
//   {
//     title: 'Fortnight (feat. Post Malone)',
//     avatar:
//       'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
//   },
//   // Add more data items as needed
// ];

export default () => {
  const { playlistid, playlistname } = useParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const [dataSource, setDataSource] = useState([]);

  const fetchData = () => {
    getAllCategoriesPlaylistSongs(playlistid).then((response) => {
      setDataSource(response.data.songs);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectAll = () => {
    const allIds = dataSource.map(item => item.track.id); // Extracting track IDs for all items
    setSelectedRowKeys(allIds); // Setting all track IDs as selected row keys
  };

  const handleSubmit = async () => {
    const hide = message.loading('Loading');
    try {
     console.log("selectedRowKeys",selectedRowKeys);
      await addSongs(selectedRowKeys);
      hide();
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  return (
    <ProList<{ title: string }>
      style={{
        padding: '20px',
      }}
      toolBarRender={() => {
        return [
          <Button
            key="selectAll"
            onClick={handleSelectAll}
            style={{
              marginRight: '10px',
            }}
          >
            Select All
          </Button>,
          <Button
            key="addToPlaylist"
            type="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: '#D635A9',
            }}
          >
            Add to current playlist
          </Button>,
        ];
      }}
      metas={{
        title: {render: (text, record) => {
            return record.track.name ? record.track.name : "-";
          },},
        description: {
            render: (text, record) => {
                return record.track.artists[0].name ? record.track.artists[0].name : "-";
              },
        },
        avatar: {
            render: (text, record) => {
              return record.track.album && record.track.album.images.length > 0
                ? <img src={record.track.album.images[0].url} alt="Avatar" style={{ width: '50px' }} />
                : "-";
            },
          },
      }}
      rowKey="title"
      headerTitle={
        <div>
          <h3>{playlistname}</h3>
          <p
            style={{
              color: '#B6B6B6',
              fontSize: '12px',
            }}
          >
            Add tracks to the playlist
          </p>
        </div>
      }
      rowSelection={{
        // selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          const selectedIds = selectedRows.map(row => row.track.id); // Extracting track IDs from selected rows
          setSelectedRowKeys(selectedIds); // Setting the selected IDs as selected row keys
        },
      }}
      dataSource={dataSource}
    />
  );
};
