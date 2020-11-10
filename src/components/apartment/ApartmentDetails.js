/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  List,
  message,
  Spin,
  Typography,
  Button,
  Breadcrumb,
  Modal
} from 'antd';
import './Apartment.scss';
import { getApartmentRoomsById, getRooms } from '../../actions/apartment';
import { getClients } from '../../actions/client';
import { bookRoom } from '../../actions/booking';

import * as Dialog from '../../shared/Dialog';

import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

const ApartmentDetails = props => {
  const history = useHistory();

  const apartment = props.location.state.apartment;
  useEffect(() => {
    props.getApartmentRoomsById(apartment.id);
    props.getRooms();
    props.getClients();
  }, []);
  const [loading, setloading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const handleModalOk = () => {
    setVisible(false);
  };

  const apartmentRooms = props.apartmentReducer.currentRooms;
  const clients = props.clientReducer.clients;
  console.log('ROOOOOms', apartmentRooms);

  const createRoom = () => {
    history.push('/createRoom');
  };
  const handleInfiniteOnLoad = data => {
    setHasMore(true);
    if (data.length > 5) {
      message.warning('Infinite List loaded all');
      setHasMore(false);
      setloading(false);
      return;
    }
  };
  const bookRoomByClient = clientId => {
    props
      .bookRoom(clientId, selectedRoom)
      .then(result => {
        console.log(result);
        history.push('/');
        Dialog.toast(Dialog.SUCCESS, 'succés');
      })
      .catch(e => {
        Dialog.toast(Dialog.FAILURE, 'ERREUR ', e);
      });
  };
  // eslint-disable-next-line react/prop-types
  return (
    <div className="apartment-details-container">
      <Breadcrumb>
        <Breadcrumb.Item>Appartements</Breadcrumb.Item>
        <Breadcrumb.Item>Détails</Breadcrumb.Item>
      </Breadcrumb>
      <Title>Découvrez les chambre disponibles de l&apos;apartement</Title>

      <List.Item>
        <List.Item.Meta
          title={apartment.name}
          description={`${apartment.street} ${apartment.zipCode}`}
        />
        {
          <div className="apartment-details-rooms-container">
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={handleInfiniteOnLoad}
              hasMore={!loading && hasMore}
              useWindow={false}
              className="apartment-details-infinite-container infinite-container"
            >
              <div className="confirm-button-container">
                <Button type="primary" onClick={() => createRoom()}>
                  Ajouter une chambre
                </Button>
              </div>

              <List
                dataSource={apartmentRooms}
                renderItem={(item, key) => (
                  <List.Item key={key}>
                    <List.Item.Meta
                      title={`région : ${item.area}`}
                      description={`numéro: ${item.number}`}
                    />
                    <div className="apartment-details-booking">
                      <div className="apartment-details-price">
                        prix : {item.price}
                      </div>
                      <Button
                        type="primary"
                        onClick={() => {
                          showModal();
                          setSelectedRoom(item.id);
                        }}
                      >
                        Réserver
                      </Button>
                    </div>
                  </List.Item>
                )}
              >
                {loading && hasMore && (
                  <div className="apartment-details-loading-container">
                    <Spin />
                  </div>
                )}
              </List>
            </InfiniteScroll>
            <img
              alt="logo"
              src="https://shorttermrentalz.com/wp-content/uploads/2019/07/Sonder-adds-spaces-in-two-downtown-Chicago-properties.jpg"
            />
          </div>
        }
      </List.Item>
      <Modal title="Basic Modal" visible={visible} onOk={handleModalOk}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
          className="infinite-container"
        >
          <List
            dataSource={clients}
            renderItem={(item, key) => (
              <List.Item key={key}>
                <List.Item.Meta title={`${item.firstName} ${item.lastName}`} />
                <div className="apartment-details-booking">
                  <Button
                    type="primary"
                    onClick={() => {
                      bookRoomByClient(item.id);
                    }}
                  >
                    Confirmer
                  </Button>
                </div>
              </List.Item>
            )}
          ></List>
        </InfiniteScroll>
      </Modal>
    </div>
  );
};
//HomePage.propTypes = {
//dispatch: PropTypes.any
//};

const mapDispatchToProps = {
  getApartmentRoomsById,
  getRooms,
  getClients,
  bookRoom
};
const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps, mapDispatchToProps)(ApartmentDetails);
