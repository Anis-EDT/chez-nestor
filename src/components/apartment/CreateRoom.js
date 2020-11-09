/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, Breadcrumb, Typography } from 'antd';
import { addRoom } from '../../actions/apartment';

import * as Dialog from '../../shared/Dialog';

const { Title } = Typography;

const createRoom = props => {
  const history = useHistory();
  const currentApartmentId = props.apartmentReducer.currentApartment.id;

  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = values => {
    const roomPayload = { ...values, apartmentId: currentApartmentId };
    props
      .addRoom(roomPayload)
      .then(() => {
        history.push('/');
        Dialog.toast(Dialog.SUCCESS, 'succés');
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
        <Breadcrumb.Item>Appartements</Breadcrumb.Item>
        <Breadcrumb.Item>Chambre</Breadcrumb.Item>
        <Breadcrumb.Item>Ajout</Breadcrumb.Item>
      </Breadcrumb>
      <Title>Ajout d&apos;une nouvelle chambre</Title>
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
        <legend>Champs chambre</legend>

        <Form.Item
          label="numéro"
          name="number"
          rules={[
            {
              required: true,
              message: 'ce champ obligatoire'
            }
          ]}
        >
          <Input
            type="text"
            className="form-control"
            id="number"
            name="number"
          />
        </Form.Item>
        <Form.Item
          label="région"
          name="area"
          rules={[
            {
              required: true,
              message: 'ce champ obligatoire'
            }
          ]}
        >
          <Input type="text" className="form-control" id="area" name="area" />
        </Form.Item>
        <Form.Item
          label="prix"
          name="price"
          rules={[
            {
              required: true,
              message: 'ce champ obligatoire'
            }
          ]}
        >
          <Input type="text" className="form-control" id="price" name="price" />
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
const mapDispatchToProps = {
  addRoom
};
const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps, mapDispatchToProps)(createRoom);
