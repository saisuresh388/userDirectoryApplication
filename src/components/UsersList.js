import React, { useState, useEffect } from "react";
import UserDataService from "../services/userService";
// import Card from "react-bootstrap/Card";
import { Card, Row } from "react-bootstrap";
const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    debugger;
    UserDataService.getAll()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Row xs="auto">
        {users &&
          users.map((user, index) => (
            <Card style={{ width: "18rem" }} key={index}>
              <Card.Body>
                <Card.Title> {user["Full Name"] || "--"}</Card.Title>

                <Card.Text>
                  <li>Email : {user?.Email}</li>
                  <li>Country : {user?.Country}</li>
                  <li>
                    Date of birth :{" "}
                    {user["Date of birth"]
                      ? user["Date of birth"].toString()
                      : "--"}
                  </li>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      </Row>
    </div>
  );
};

export default UsersList;
