import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import request from "../../apiClient/request";

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
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 30px;
`;
const StyledDeleteIcon = styled(DeleteOutlined)`
  font-size: 22px;
  cursor: pointer;
`;
const StyledEditIcon = styled(EditOutlined)`
  font-size: 22px;
  cursor: pointer;
  margin-left: 4px;
`;
const Home = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const handleClick = () => {
    navigate("/form");
  };
  const handleDelete = (id) => {
    request
      .delete(`form/deleteData/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getData();
          message.success(" Employee Successfully Deleted");
        }
      })
      .catch((e) => {
        message.error("Something went wrong");
      });
  };

  const handleEdit = (id) => {
    navigate(`/form/${id}`);
  };
  const getData = () => {
    request
      .get("form/getData")
      .then((res) => {
        if (res.status >= 200 && res.status < 208) {
          setEmployeeData(res.data);
        } else {
          message.error("Something went wrong");
        }
      })
      .catch((e) => message.error("Something went wrong"));
  };

  const columns = [
    { title: "Name", key: "name", dataIndex: "name" },
    { title: "Email", key: "email", dataIndex: "email" },
    { title: "PhoneNumber", key: "phone", dataIndex: "phone" },

    { title: "Age", key: "age", dataIndex: "age" },

    { title: "Department", key: "department", dataIndex: "department" },

    {
      title: "Actions",
      key: "actions",
      render: (data) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}>
          <StyledEditIcon
            onClick={() => {
              handleEdit(data._id);
            }}
          />
          <div onClick={() => handleDelete(data._id)}>
            <StyledDeleteIcon />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <ButtonDiv>
        <SendButton onClick={handleClick}>Add New</SendButton>
      </ButtonDiv>
      <div>
        <Table columns={columns} dataSource={employeeData} />
      </div>
    </div>
  );
};

export default Home;
