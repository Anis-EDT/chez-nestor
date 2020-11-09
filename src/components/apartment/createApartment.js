/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, Breadcrumb, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { addApartment } from '../../actions/apartment';

import * as Dialog from '../../shared/Dialog';

const { Title } = Typography;

const createApartment = props => {
  const history = useHistory();

  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [inputFields, setInputFields] = useState([
    { number: '', area: '', price: '' }
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ number: '', area: '', price: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === 'number') {
      values[index].number = event.target.value;
    } else if (event.target.name === 'area') {
      values[index].area = event.target.value;
    } else if (event.target.name === 'price') {
      values[index].price = event.target.value;
    }

    setInputFields(values);
  };

  const onFinish = values => {
    // Verify that room form is created
    if (inputFields.length > 0) {
      console.log('success');
      const apartment = { ...values, rooms: inputFields };
      props
        .addApartment(apartment)
        .then(() => {
          history.push('/');
          Dialog.toast(Dialog.SUCCESS, 'succés');
        })
        .catch(e => {
          Dialog.toast(Dialog.FAILURE, 'ERREUR ', e);
        });
    } else {
      console.log('failure');
      Dialog.toast(
        Dialog.WARNING,
        'Un apartement contient au moins une chambre'
      );
    }
  };
  const onFinishFailed = errorInfo => {
    Dialog.toast(Dialog.FAILURE, errorInfo);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Appartements</Breadcrumb.Item>
        <Breadcrumb.Item>Ajout</Breadcrumb.Item>
      </Breadcrumb>
      <Title>Ajout d&apos;un nouvel appartement</Title>

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
        <legend>Champs appartement</legend>

        <Form.Item
          label="Numéro"
          name="number"
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
          label="nom"
          name="name"
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
          label="rue"
          name="street"
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
          label="zip code"
          name="zipCode"
          rules={[
            {
              required: true,
              message: 'ce champ obligatoire'
            }
          ]}
        >
          <Input />
        </Form.Item>
        {inputFields.map((inputField, index) => {
          return (
            <Fragment key={`${inputField}~${index}`}>
              <legend>Nouvelle chambre</legend>
              <fieldset>
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
                    value={inputField.number}
                    onChange={event => handleInputChange(index, event)}
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
                  <Input
                    type="text"
                    className="form-control"
                    id="area"
                    name="area"
                    value={inputField.area}
                    onChange={event => handleInputChange(index, event)}
                  />
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
                  <Input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={inputField.price}
                    onChange={event => handleInputChange(index, event)}
                  />
                </Form.Item>
              </fieldset>
            </Fragment>
          );
        })}
        <div className="form-group col-sm-2 confirm-button-container">
          <div className="form-handler-buton-wrapper">
            <Button
              type="dashed"
              onClick={() => handleRemoveFields(inputFields.length - 1)}
            >
              <DeleteOutlined />
            </Button>
          </div>

          <div className="form-handler-buton-wrapper">
            <Button
              type="dashed"
              className="btn btn-link"
              onClick={() => handleAddFields()}
            >
              <PlusOutlined />{' '}
            </Button>
          </div>
        </div>

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
  addApartment
};
const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps, mapDispatchToProps)(createApartment);
