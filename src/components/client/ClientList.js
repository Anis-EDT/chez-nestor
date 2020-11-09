/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

//import intl from 'react-intl-universal';
import {
  Breadcrumb,
  Button,
  Spin,
  Typography,
  Input,
  Space,
  Table
} from 'antd';
import { getClients } from './../../actions/client';
//import * as Dialog from '../shared/Dialog';
//import PropTypes from 'prop-types';

const { Title } = Typography;

const ClientList = props => {
  const history = useHistory();

  useEffect(() => {
    props.getClients();
  }, []);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),

    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const clients = props.clientReducer.clients;
  const processedClients = clients.filter(el => {
    el.firstName == null && el.lastName == null
      ? false
      : (el.name = `${el.firstName} ${el.lastName}`);
    if (el.name) {
      return el;
    }
  });

  const createClient = () => {
    history.push('/createClient');
  };
  const viewDetails = client => {
    history.push('/clientDetails', {
      client: client
    });
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email')
    },
    {
      title: 'Téléphone',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Nationalité',
      dataIndex: 'nationality',
      ...getColumnSearchProps('nationality')
    },
    {
      title: 'Date de naissance',
      dataIndex: 'birthDate'
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'x',
      render: id => (
        <Button type="primary" onClick={() => viewDetails(id)}>
          Voir détails
        </Button>
      )
    }
  ];
  return clients ? (
    <div>
      <div className="container-header">
        <Breadcrumb>
          <Breadcrumb.Item>Clients</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={() => createClient()}>
          Ajouter un client
        </Button>
      </div>
      <Title>Liste des clients : </Title>
      <Table columns={columns} dataSource={processedClients} />;
    </div>
  ) : (
    <div className="apartment-details-loading-container">
      <Spin />
    </div>
  );
};
//HomePage.propTypes = {
//dispatch: PropTypes.any
//};
const mapDispatchToProps = {
  getClients
};
const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
