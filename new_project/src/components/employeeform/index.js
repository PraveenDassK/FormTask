import React, { useEffect, useRef, useState } from "react";
import { Form, Select, Input, message } from "antd";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { data } from "../../data/data";
import { useNavigate } from "react-router-dom";
import request from "../../apiClient/request";
const InputDiv = styled.div`
  width: 100%;
  margin-bottom: 1em;
`;
const SendButton = styled.button`
  width: 205px;
  height: 48px;

  /* Primary-Color */
  outline: none;
  border: none;
  background: linear-gradient(94.91deg, #2d8b33 5.75%, #529c29 87.07%);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: #ffffff;
`;

const SendButtonDiv = styled.div`
  text-align: center;
  justify-content: center;
`;
const StyledSelect = styled(Select)`
  .ant-select-selector {
    height: 44px !important;
  }
  .ant-select-selection-item {
    padding: 8px 10px !important;
  }
`;
const EmployeeForm = ({ isEdit, currentEmployee, id }) => {
  const [phone, setPhone] = useState("");
  const [newData, setNewData] = useState(currentEmployee);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handlePhoneInput = (value, country, e, formattedValue) => {
    setPhone(value);
  };
  useEffect(() => {
    if (isEdit === true) {
      form.setFieldsValue({
        name: currentEmployee[0]?.name,
        age: currentEmployee[0]?.age.toString(),
        phonenumber: currentEmployee[0]?.phone.toString(),
        email: currentEmployee[0]?.email,
        department: currentEmployee[0]?.department,
      });
    } else {
      form.resetFields();
    }
  }, [currentEmployee]);
  const submitHandler = (e) => {
    const submittedValue = {
      name: e.name,
      email: e.email,
      phone: e.phonenumber,
      age: e.age,
      department: e.department,
    };

    if (!isEdit) {
      request
        .post("/form/addData", submittedValue)
        .then((res) => {
          if (res.status >= 200 && res.status < 208) {
            message.success("Employee Data added succesfully");
            navigate("/");
          }
        })
        .catch((e) => message.error("Something went wrong"));
    } else {
      request
        .patch(`/form/updateData/${id}`, submittedValue)
        .then((res) => {
          if (res.status >= 200 && res.status < 208) {
            message.success("Employee Data Updated succesfully");
            navigate("/");
          }
        })
        .catch((e) => message.error("Something went wrong"));
    }
  };

  return (
    <>
      <Form
        onFinish={submitHandler}
        name='basic'
        form={form}
        layout={"vertical"}
        style={{ width: "50%" }}>
        <InputDiv>
          <Form.Item
            name='name'
            required={false}
            label='Name'
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              {
                pattern: new RegExp(/^[a-z \s ]+$/i),
                message: "Invalid name",
              },
            ]}>
            <Input
              auto-size
              placeholder='Name'
              style={{ width: "100%", height: "44px" }}
            />
          </Form.Item>
        </InputDiv>
        <InputDiv>
          <Form.Item
            name='email'
            label='Email'
            labelAlign='left'
            required={false}
            rules={[
              {
                required: true,
                message: "Enter your Email",
              },
            ]}>
            <Input
              type='email'
              placeholder='Eg. Sushma.singh@gmail.com'
              style={{ width: "100%", height: "44px" }}
            />
          </Form.Item>
        </InputDiv>
        <InputDiv>
          <Form.Item
            name='age'
            label='age'
            required={false}
            rules={[
              {
                required: true,
                message: "Please input your age!",
              },
            ]}>
            <StyledSelect
              placeholder='select age'
              style={{
                width: "100%",
              }}
              dropdownMatchSelectWidth={false}
              options={[
                {
                  value: "10",
                  label: "10",
                },
                {
                  value: "11",
                  label: "11",
                },
                {
                  value: "12",
                  label: "12",
                },
                {
                  value: "13",
                  label: "13",
                },
              ]}
            />
          </Form.Item>
        </InputDiv>
        <InputDiv>
          <Form.Item
            name='phonenumber'
            label='PhoneNumber'
            labelStyle={{ marginTop: "10px" }}
            required={false}
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                min: 12,
                message: "Invalid Phone Number",
              },
            ]}>
            <PhoneInput
              country={"in"}
              // value={phone}
              countryCodeEditable={false}
              placeholder='Mobile number'
              specialLabel='Phone Number'
              inputStyle={{
                width: "100%",
                height: "44px",
              }}
              // onChange={handlePhoneInput}
            />
          </Form.Item>
        </InputDiv>
        <InputDiv>
          <Form.Item
            name='department'
            label='Department'
            rules={[
              {
                required: true,
                message: "Please enter your department",
              },
            ]}>
            <StyledSelect
              placeholder='select department'
              style={{
                width: "100%",
              }}
              dropdownMatchSelectWidth={false}
              options={data}
            />
          </Form.Item>
        </InputDiv>
        <SendButtonDiv>
          <SendButton type='primary' htmlType='submit'>
            {isEdit ? "Update employeee" : " Add employeee"}
          </SendButton>
        </SendButtonDiv>
      </Form>
    </>
  );
};

export default EmployeeForm;
