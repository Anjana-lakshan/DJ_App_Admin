import { getUsers } from '@/services/ant-design-pro/api';
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
    getUsers().then((response) => {
      setDataSource(response);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ProColumns<API.Customers>[] = [
    {
      title: <FormattedMessage id="First Name" defaultMessage="First Name" />,
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="Last Name" defaultMessage="Last Name" />,
      dataIndex: 'lastName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.customer.email" defaultMessage="Email" />,
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.customer.mobileNo" defaultMessage="Mobile No" />,
      dataIndex: 'phone',
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
        <div style={{ position: 'relative' }}>
          <Button
            type="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
            style={{ position: 'absolute', top: 0, right: 0, marginBottom: 16 }}
          >
            <PlusOutlined />
            Add User
          </Button>
        </div>
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

      <ModalForm
        title={intl.formatMessage({
          id: 'New User',
          defaultMessage: 'New User',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          let request = {
            firstName: value.firstName,
            password: value.password,
            email: value.email,
            lastName: value.lastName,
            role: 'operator',
            contactNo: value.contactNo,
          };
          // console.log(request);
          await addUser(request);

          handleModalOpen(false);
          fetchData();
        }}
      >
        <ProFormText
          name="firstName"
          label={intl.formatMessage({
            id: 'First Name',
            defaultMessage: 'First Name',
          })}
          placeholder="First Name"
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="Please enter Customer Name"
                />
              ),
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.onlyLetters"
                  defaultMessage="Please enter only letters"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="lastName"
          label={intl.formatMessage({
            id: 'Last Name',
            defaultMessage: 'Last Name',
          })}
          placeholder="Last Name"
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="Please enter Last Name"
                />
              ),
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.onlyLetters"
                  defaultMessage="Please enter only letters"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="email"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Email',
          })}
          placeholder="Email"
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="Please enter Email"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="contactNo"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: 'Contact Number',
          })}
          placeholder="Contact Number"
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="Please enter Contact Number"
                />
              ),
            },
            {
              pattern: new RegExp(/^\+?[0-9]+$/),
              message: 'Please enter a valid phone number',
            },
            {
              max: 20,
              message: 'Phone number cannot exceed 20 digits',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          label={intl.formatMessage({
            id: 'Password',
            defaultMessage: 'Password',
          })}
          placeholder="Enter Password"
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="Please enter Password"
                  defaultMessage="Please enter Password"
                />
              ),
            },
          ]}
        />
      </ModalForm>
    </ConfigProvider>
  );
};

export default TableList;
