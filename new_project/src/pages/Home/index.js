import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/form");
  };
  const handleDelete = (id) => {
    console.log("delete: " + id);
  };
  const handleEdit = (id) => {
    console.log("delete: " + id);
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
        <>
          <div onClick={() => handleDelete(data._id)}>
            <StyledDeleteIcon />
          </div>
          <StyledEditIcon
            onClick={() => {
              handleEdit(data._id);
            }}
          />
        </>
      ),
    },
  ];
  return (
    <div>
      <ButtonDiv>
        <SendButton onClick={handleClick}>Add New</SendButton>
      </ButtonDiv>
      <div>
        <Table
          columns={columns}
          // dataSource={}
        />
      </div>
    </div>
  );
};

export default Home;
