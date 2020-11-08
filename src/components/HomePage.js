import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import intl from 'react-intl-universal';
import { getApartments } from './../actions/apartment';
//import * as Dialog from '../shared/Dialog';
//import PropTypes from 'prop-types';

//import { GET_APARTMENTS } from './../constants/types';
const HomePage = () => {
  useEffect(() => {
    console.log('hehi');
    this.props.getApartments();
  }, []);
  return (
    <div>
      <h1>React Slingshot</h1>

      <h2>Get Started</h2>
      <ol>
        <li>
          Review the <Link to="/">demo app</Link>
        </li>
        <li>Remove the demo and start coding: npm run remove-demo</li>
      </ol>
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
//const mapStateToProps = state => ({ apartments: state.apartments });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
