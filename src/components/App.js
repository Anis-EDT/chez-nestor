/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import ApartmentDetails from './apartment/ApartmentDetails';
import createApartment from './apartment/createApartment';
import createRoom from './apartment/createRoom';

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
        <Layout>
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <NavLink exact to="/">
                  Accueil
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">Clients</Menu.Item>
              <Menu.Item key="3">Réservation</Menu.Item>
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
                <Route component={NotFoundPage} />
              </Switch>
            </Content>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>
            ©2020 Created by Anis Fenina
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
