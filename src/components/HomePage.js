import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

//import intl from 'react-intl-universal';
import { getApartments } from './../actions/apartment';
import { Breadcrumb, Button, Spin, Typography } from 'antd';
import ApartmentList from './apartment/ApartmentList';
import PropTypes from 'prop-types';
import './HomePage.scss';

const { Title } = Typography;

const HomePage = props => {
  const history = useHistory();

  useEffect(() => {
    props.getApartments();
  }, []);

  const apartments = props.apartmentReducer.apartments;

  const createApartment = () => {
    history.push('/createApartment');
  };
  return apartments ? (
    <div>
      <div className="container-header">
        <Breadcrumb>
          <Breadcrumb.Item>Appartements</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={() => createApartment()}>
          Ajouter un appartement
        </Button>
      </div>
      <Title>Liste des apartements : </Title>
      <ApartmentList apartments={apartments} />
    </div>
  ) : (
    <div className="apartment-details-loading-container">
      <Spin />
    </div>
  );
};
HomePage.propTypes = {
  apartmentReducer: PropTypes.object.isRequired,
  getApartments: PropTypes.func.isRequired
};
const mapDispatchToProps = {
  getApartments
};
const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
