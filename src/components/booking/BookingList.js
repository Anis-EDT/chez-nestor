//this eslint disable is mandatory when using certain antd components
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import {
  Breadcrumb,
  Button,
  Spin,
  Typography,
  Input,
  Space,
  Table
} from 'antd';
import { getBookings } from './../../actions/booking';
import PropTypes from 'prop-types';

const { Title } = Typography;

const BookingList = props => {
  const history = useHistory();

  useEffect(() => {
    props.getBookings();
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

  const bookings = props.bookingReducer.bookings;
  const processedBookings = bookings.map(el => {
    const name = `${el.client.firstName} ${el.client.lastName}`;
    const apartment = `Numéro ${el.room.apartment.number} ${el.room.apartment.name} ${el.room.apartment.zipCode}`;
    const room = `Numéro ${el.room.number} zone ${el.room.area}`;
    const price = `${el.room.price}€`;

    return {
      id: el.id,
      clientName: name,
      apartment: apartment,
      room: room,
      price: price
    };
  });
  const viewDetails = booking => {
    history.push('/bookingDetails', {
      booking: booking
    });
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'clientName',
      ...getColumnSearchProps('clientName')
    },
    {
      title: 'Appartement',
      dataIndex: 'apartment',
      ...getColumnSearchProps('apartment')
    },
    {
      title: 'Chambre',
      dataIndex: 'room',
      ...getColumnSearchProps('room')
    },
    {
      title: 'Prix',
      dataIndex: 'price',
      ...getColumnSearchProps('price')
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
  return bookings ? (
    <div>
      <div className="container-header">
        <Breadcrumb>
          <Breadcrumb.Item>Réservations</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Title>Liste des réservations : </Title>
      <Table columns={columns} dataSource={processedBookings} />;
    </div>
  ) : (
    <div className="apartment-details-loading-container">
      <Spin />
    </div>
  );
};
BookingList.propTypes = {
  getBookings: PropTypes.func.isRequired,
  bookingReducer: PropTypes.object.isRequired,
  setSelectedKeys: PropTypes.func.isRequired,
  selectedKeys: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};
const mapDispatchToProps = {
  getBookings
};
const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingList);
