import React, { useEffect, useState } from "react";
import EmployeeForm from "../../components/employeeform/index";
import "./index.css";
import request from "../../apiClient/request";
import { message } from "antd";
const AddNew = () => {
  function postEvent(values) {
    request
      .post("/form/create", values)
      .then((res) => {
        if (res.status > 200 && res.status < 208) {
        } else if (res.status === 401) {
          message.error("You are not authorized");
        } else {
          message.error("Something went wrong");
        }
      })
      .catch((e) => message.error("Something went wrong"));
  }
  function handleDelete(id) {
    request
      .delete(`/form/${id}`)
      .then((res) => {
        if (res.status === 200) {
          // getContributions();
          message.success(" Employee Successfully Deleted");
        } else if (res.status === 401) {
          message.error("You are not authorized");
        } else {
          message.error("Something went wrong");
        }
      })
      .catch((e) => {
        message.error("Something went wrong");
      });
  }

  return (
    <div className='form'>
      <EmployeeForm />
    </div>
  );
};

export default AddNew;
