import { getSongs, getUsers } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Card, ConfigProvider } from 'antd';
import en_US from 'antd/es/locale/en_US';
import React, { useEffect, useRef, useState } from 'react';

const TableList: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const [dataSource, setDataSource] = useState(null);

  const intl = useIntl();

  const fetchData = () => {
    getSongs().then((response) => {
      setDataSource(response.data.songs);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ProColumns<API.Customers>[] = [
    {
      title: <FormattedMessage id="Song Name" defaultMessage="Song Name" />,
      dataIndex: 'songName',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="BPM" defaultMessage="BPM" />,
      dataIndex: 'BPM',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="Artist Name" defaultMessage="Artist Name" />,
      dataIndex: 'artistName',
      valueType: 'text',
    },
    
  ];

  return (
    <ConfigProvider locale={en_US}>
      <Card style={{ 
  backgroundImage: 'linear-gradient(to right, #bb41e0, #5ad9f2)', 
  borderRadius: '8px', 
  padding: '16px 19px', 
  minWidth: '220px', 
  flex: 1 
}}>
        
        <div style={{ position: 'relative', marginTop: '50px', background: 'transparent' }}>
      <style>
        {`
          .css-dev-only-do-not-override-vi45fp .ant-table-wrapper .ant-table {
            background: rgba(0, 0, 0, 0.1) !important; // Override the background color
          }
        `}
      </style>
      <ProTable
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={false}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
      </Card>

    
    </ConfigProvider>
  );
};

export default TableList;
