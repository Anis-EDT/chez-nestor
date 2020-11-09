/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

//import intl from 'react-intl-universal';
import { getApartments } from './../actions/apartment';
import { Breadcrumb, Button } from 'antd';
import ApartmentList from './apartment/ApartmentList';
//import * as Dialog from '../shared/Dialog';
//import PropTypes from 'prop-types';
import './HomePage.scss';

const HomePage = props => {
  const history = useHistory();

  useEffect(() => {
    props.getApartments();
  }, []);
  const apartments = props.apartmentReducer.apartments;
  const createApartment = () => {
    history.push('/createApartment');
  };
  return (
    <div>
      <div className="container-header">
        <Breadcrumb>
          <Breadcrumb.Item>Accueil</Breadcrumb.Item>
          <Breadcrumb.Item>Appartements</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={() => createApartment()}>
          Ajouter un appartement
        </Button>
      </div>
      <ApartmentList apartments={apartments} />
    </div>
  );
};
//HomePage.propTypes = {
//dispatch: PropTypes.any
//};
const mapDispatchToProps = {
  getApartments
};
const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
