import { ProList } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

const dataSource = [
  {
    title: 'Fortnight (feat. Post Malone)',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Fortnight (feat. Post Malone)',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Fortnight (feat. Post Malone)',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Fortnight (feat. Post Malone)',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Fortnight (feat. Post Malone)',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Fortnight (feat. Post Malone)',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Fortnight (feat. Post Malone)',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Fortnight (feat. Post Malone)',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Fortnight (feat. Post Malone)',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Fortnight (feat. Post Malone)',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <ProList<{ title: string }>
      style={{
        padding: '20px',
      }}
      toolBarRender={() => {
        return [
          <Button
            key="3"
            type="primary"
            style={{
              backgroundColor: '#D635A9',
            }}
          >
            Add to current playlist
          </Button>,
        ];
      }}
      metas={{
        title: {},
        description: {
          render: () => {
            return 'Taylor Swift, Post Malone';
          },
        },
        avatar: {},
      }}
      rowKey="title"
      headerTitle={
        <div>
          <h3>Hip-Pop</h3>
          <p
            style={{
              color: '#B6B6B6',
              fontSize:'12px'
            }}
          >
            Add tracks to the playlist
          </p>
        </div>
      }
      rowSelection={rowSelection}
      dataSource={dataSource}
    />
  );
};
