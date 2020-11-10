import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, Breadcrumb, Typography, DatePicker } from 'antd';
import { addClient } from '../../actions/client';

import * as Dialog from '../../shared/Dialog';
import PropTypes from 'prop-types';
const { Title } = Typography;

const CreateClient = props => {
  const history = useHistory();

  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = values => {
    props
      .addClient(values)
      .then(() => {
        history.push('/clients');
        Dialog.toast(Dialog.SUCCESS, 'Succés Client ajouté');
      })
      .catch(e => {
        Dialog.toast(Dialog.FAILURE, 'ERREUR ', e);
      });
  };
  const onFinishFailed = errorInfo => {
    Dialog.toast(Dialog.FAILURE, errorInfo);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Client</Breadcrumb.Item>
        <Breadcrumb.Item>Ajout</Breadcrumb.Item>
      </Breadcrumb>
      <Title>Ajout d&apos;un client</Title>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <legend>Champs client</legend>

        <Form.Item
          label="nom"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'ce champ obligatoire'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="prénom"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'ce champ obligatoire'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Vueillez entrer une adresse email valide'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Téléphone"
          name="phone"
          rules={[
            {
              required: true,
              message: 'ce champ obligatoire'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nationalité"
          name="nationality"
          rules={[
            {
              required: true,
              message: 'ce champ obligatoire'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Année de naissance"
          name="birthDate"
          rules={[
            {
              required: true,
              message: 'ce champ obligatoire'
            }
          ]}
        >
          <DatePicker />
        </Form.Item>
        <div className="confirm-button-container">
          <Button htmlType="submit" type="primary">
            Valider
          </Button>
        </div>
      </Form>
    </>
  );
};
CreateClient.propTypes = {
  addClient: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addClient
};
const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateClient);
