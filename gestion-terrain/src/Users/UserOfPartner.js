import React,{useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import UserItem from "./UserItem";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { getUsers } from "../Redux/Slices/sliceUser";
import Button from 'react-bootstrap/Button';
import AddUser from "./AddUser";
import Modal from 'react-bootstrap/Modal';
function UserOfPartner() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(id));
  }, [id, dispatch]);

  const  users = useSelector((state) => state.user.users);
  

  //add user
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

 
  return (
    <>
      <h1>List of my users</h1>
      <Button variant="primary" onClick={handleShow}>Add user</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body><AddUser idPartner={id} handleClose={handleClose}/></Modal.Body>
      </Modal>


      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {users?.map((item, key) => {
            
            return (
              <UserItem
                key={key}
                user={item}
              />
            );
          })}
          
        </tbody>
      </Table>
    </>
  );
}

export default UserOfPartner;
