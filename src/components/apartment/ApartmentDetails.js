/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { List, message, Spin, Typography } from 'antd';
import './Apartment.scss';
import { getApartmentRoomsById } from '../../actions/apartment';
import InfiniteScroll from 'react-infinite-scroller';

const { Title } = Typography;

const ApartmentDetails = props => {
  const apartment = props.location.state.apartment;
  useEffect(() => {
    props.getApartmentRoomsById(apartment.id);
  }, []);
  const [loading, setloading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const apartmentRooms = props.apartmentReducer.currentApartmentRooms;

  const handleInfiniteOnLoad = data => {
    setHasMore(true);
    if (data.length > 5) {
      message.warning('Infinite List loaded all');
      setHasMore(false);
      setloading(false);
      return;
    }
  };
  // eslint-disable-next-line react/prop-types
  return (
    <div className="apartment-details-container">
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
              className="apartment-details-infinite-container"
            >
              <List
                dataSource={apartmentRooms}
                renderItem={(item, key) => (
                  <List.Item key={key}>
                    <List.Item.Meta
                      title={`région : ${item.area}`}
                      description={`numéro: ${item.number}`}
                    />
                    <div className="apartment-details-price">
                      prix : {item.price}
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
    </div>
  );
};
//HomePage.propTypes = {
//dispatch: PropTypes.any
//};

const mapDispatchToProps = {
  getApartmentRoomsById
};
const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps, mapDispatchToProps)(ApartmentDetails);
