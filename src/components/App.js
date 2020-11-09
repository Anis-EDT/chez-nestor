/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import ApartmentDetails from './apartment/ApartmentDetails';
import createApartment from './apartment/CreateApartment';
import createRoom from './apartment/CreateRoom';

import ClientList from './client/ClientList';
import ClientDetails from './client/ClientDetails';
import CreateCLient from './client/CreateClient';

import BookingList from './booking/BookingList';
import BookingDetails from './booking/BookingDetails';

import NotFoundPage from './NotFoundPage';
import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';

import { Layout, Menu } from 'antd';

import './App.css';
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const { Header, Footer, Content } = Layout;

    return (
      <Layout>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <NavLink exact to="/">
                Apartements
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink exact to="/clients">
                Clients
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink exact to="/bookings">
                Réservation
              </NavLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Content style={{ padding: '25px 50px' }}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route
                exact
                path="/ApartmentDetails"
                component={ApartmentDetails}
              />
              <Route
                exact
                path="/createApartment"
                component={createApartment}
              />

              <Route exact path="/createRoom" component={createRoom} />

              <Route exact path="/Clients" component={ClientList} />
              <Route exact path="/ClientDetails" component={ClientDetails} />
              <Route exact path="/CreateCLient" component={CreateCLient} />

              <Route exact path="/Bookings" component={BookingList} />
              <Route exact path="/BookingDetails" component={BookingDetails} />

              <Route component={NotFoundPage} />
            </Switch>
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          ©2020 Created by Anis Fenina
        </Footer>
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
