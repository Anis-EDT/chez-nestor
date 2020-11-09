/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography, Breadcrumb, Descriptions } from 'antd';
import { getClientById } from '../../actions/client';

const { Title } = Typography;

const ClientDetails = props => {
  const clientId = props.location.state.client;

  useEffect(() => {
    props.getClientById(clientId);
  }, []);

  const client = props.clientReducer.currentClient;

  // eslint-disable-next-line react/prop-types
  return (
    <div className="client-details-container">
      <Breadcrumb>
        <Breadcrumb.Item>Client</Breadcrumb.Item>
        <Breadcrumb.Item>Détails</Breadcrumb.Item>
      </Breadcrumb>
      <Title>Détails du client : </Title>
      <Descriptions title="Informations Client">
        <Descriptions.Item label="Nom">{`${client.firstName} ${client.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="E-mail">{client.email}</Descriptions.Item>
        <Descriptions.Item label="Téléphone">{client.phone}</Descriptions.Item>
        <Descriptions.Item label="nationalité">
          {client.nationality}
        </Descriptions.Item>
        <Descriptions.Item label="Année de naissance">
          {client.birthDate}
        </Descriptions.Item>
      </Descriptions>
      ,
    </div>
  );
};
//HomePage.propTypes = {
//dispatch: PropTypes.any
//};

const mapDispatchToProps = {
  getClientById
};
const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps, mapDispatchToProps)(ClientDetails);
