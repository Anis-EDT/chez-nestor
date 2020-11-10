import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography, Breadcrumb, Descriptions } from 'antd';
import { getClientById } from '../../actions/client';
import PropTypes from 'prop-types';

const { Title } = Typography;

const ClientDetails = props => {
  const clientId = props.location.state.client;
  useEffect(() => {
    props.getClientById(clientId);
  }, []);

  const client = props.clientReducer.currentClient;

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
ClientDetails.propTypes = {
  location: PropTypes.object.isRequired,
  getClientById: PropTypes.func.isRequired,
  clientReducer: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  getClientById
};
const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps, mapDispatchToProps)(ClientDetails);
