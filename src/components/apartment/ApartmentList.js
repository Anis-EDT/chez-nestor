import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Card, Row, Col } from 'antd';
import './Apartment.scss';

const { Meta } = Card;
const ApartmentList = props => {
  const history = useHistory();
  const viewDetails = apartment => {
    history.push('/ApartmentDetails', {
      apartment: apartment
    });
  };

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {props.apartments.map((el, key) => (
        <Col className="gutter-row" span={6} key={key}>
          <Card
            hoverable
            className="apartment-list-card"
            cover={
              <img
                alt="chez nestor logo"
                src="https://www.chez-nestor.com/_nuxt/img/186473d.png"
              />
            }
            onClick={() => viewDetails(el)}
          >
            <Meta title={el.name} description={`rue: ${el.street}`} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
ApartmentList.propTypes = {
  apartments: PropTypes.array.isRequired
};

export default ApartmentList;
