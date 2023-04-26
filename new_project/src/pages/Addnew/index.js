import React, { useEffect, useState } from "react";
import EmployeeForm from "../../components/employeeform/index";
import "./index.css";
import request from "../../apiClient/request";
import { message } from "antd";
import { useParams } from "react-router-dom";
const AddNew = () => {
  const [edit, setEdit] = useState(false);
  const params = useParams();
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    if (params?.id) {
      setEdit(true);

      request
        .get("form/getData")
        .then((res) => {
          if (res.status >= 200 && res.status < 208) {
            let newData = res.data;
            const filterData = newData.filter(
              (value, _id) => value._id === params.id
            );
            setEmployeeData(filterData);
          } else {
            message.error("Something went wrong");
          }
        })
        .catch((e) => message.error("Something went wrong"));
    } else {
      setEdit(false);
    }
  }, [edit, params.id]);

  return (
    <div className='form'>
      <EmployeeForm
        isEdit={edit}
        currentEmployee={employeeData}
        id={params?.id}
      />
    </div>
  );
};

export default AddNew;
