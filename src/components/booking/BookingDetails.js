import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography, Breadcrumb, Descriptions } from 'antd';
import { getBookingById } from '../../actions/booking';
import PropTypes from 'prop-types';
const { Title } = Typography;

const BookingDetails = props => {
  const bookingId = props.location.state.booking;

  useEffect(() => {
    props.getBookingById(bookingId);
  });

  const booking = props.bookingReducer.currentBooking;
  if (!booking.client) return <div>loading </div>;
  return (
    <div className="booking-details-container">
      <Breadcrumb>
        <Breadcrumb.Item>Réservation</Breadcrumb.Item>
        <Breadcrumb.Item>Détails</Breadcrumb.Item>
      </Breadcrumb>
      <Title>Détails de la réservation Pour</Title>
      {
        <Descriptions
          title={`Informations réservation ${booking.client.firstName} ${booking.client.lastName} :`}
        >
          <Descriptions.Item label="Téléphone">{`${booking.client.phone}`}</Descriptions.Item>
          <Descriptions.Item label="Appartement">
            {`Numéro ${booking.room.apartment.number} ${booking.room.apartment.name} ${booking.room.apartment.zipCode}`}
          </Descriptions.Item>
          <Descriptions.Item label="Chambre">
            {`Numéro ${booking.room.number} zone ${booking.room.area}`}
          </Descriptions.Item>
        </Descriptions>
      }
    </div>
  );
};
BookingDetails.defaultProps = {
  currentBooking: { room: {}, client: {} }
};

BookingDetails.propTypes = {
  location: PropTypes.object.isRequired,
  getBookingById: PropTypes.func.isRequired,
  bookingReducer: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  getBookingById
};
const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);
