import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Modal,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextData from "../../../Assets/jsonData/TextData/Header.json";
import ConnectionConfig from "../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { useTranslation, Trans } from "react-i18next";

import style from "./Header.module.sass";

function Header() {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);

  const [show, setShow] = useState(false);
  let history = useHistory();

  const lngs = {
    en: { nativeName: "Eng" },
    ua: { nativeName: "Ukr" },
  };

  const { i18n } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSignOut() {
    localStorage.clear();
    setName(null);
    setSurname(null);
    history.push({
      pathname: "/about",
    });
  }

  function handleSignIn() {
    const logInJson = {
      email: email,
      password: password,
    };

    console.log(logInJson);

    axios
      .post(
        `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Login}`,
        logInJson
      )
      .then((responce) => {
        var data = responce.data;
        localStorage.setItem("token", data.token);
      })
      .finally(function () {
        myInfo();
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      });
  }

  const myInfo = () => {
    console.log(
      "ConnectionConfig.ServerUrl + ConnectionConfig.Routes.GetProfileInfo",
      ConnectionConfig.ServerUrl + ConnectionConfig.Routes.GetProfileInfo
    );
    axios
      .get(
        `${
          ConnectionConfig.ServerUrl + ConnectionConfig.Routes.GetProfileInfo
        }`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + localStorage.getItem("token"), //the token is a variable which holds the token
          },
        }
      )
      .then((responce) => {
        var data = responce.data;
        localStorage.setItem("UserName", data.name);
        localStorage.setItem("UserSurname", data.surname);
        localStorage.setItem("UserRole", data.role);
        localStorage.setItem("UserEmail", data.email);
        console.log(data);
      })
      .finally(function () {
        setShow(false);
      })
      .catch((e) => {
        console.log(e);
        alert(e);
        return false;
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setName(localStorage.getItem("UserName"));
      setSurname(localStorage.getItem("UserSurname"));
      setRole(localStorage.getItem("UserRole"));
      setEmail(localStorage.getItem("UserEmail"));
    }
  }, []);

  const getDropdown = () => {
    if (name !== null) {
      return (
        <Nav>
          <DropdownButton
            id="dropdown-basic-button"
            title={name + " " + surname + " " + email + " " + role}
          >
            {/* <Dropdown.Item variant="primary" id="dd-but-sign-in" onClick={handleShow}>Sign in</Dropdown.Item> */}
            <Dropdown.Item variant="primary" id="dd-but-profile">
              <Trans i18nKey="Profile">Profile</Trans>
            </Dropdown.Item>
            <Dropdown.Item
              variant="primary"
              id="dd-but-sign-out"
              onClick={handleSignOut}
            >
              <Trans i18nKey="LogOut">LogOut</Trans>
            </Dropdown.Item>
          </DropdownButton>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <DropdownButton id="dropdown-basic-button" title="Account">
            <Dropdown.Item
              variant="primary"
              id="dd-but-sign-in"
              onClick={handleShow}
            >
              <Trans i18nKey="LogIn">LogIn</Trans>
            </Dropdown.Item>
          </DropdownButton>
        </Nav>
      );
    }
  };

  const getUserLinks = () => {
    if (localStorage.getItem("UserRole") === "Student") {
      return (
        <div className={style.header_links_container}>
          <Nav.Link href="/home">
            <Trans i18nKey="Home">Home</Trans>
          </Nav.Link>
          <Nav.Link href="/lots">
            <Trans i18nKey="Lots">Lots</Trans>
          </Nav.Link>
        </div>
      );
    } else if (localStorage.getItem("UserRole") === "Admin") {
      return (
        <div className={style.header_links_container}>
          <Nav.Link href="/statistics-page">
            <Nav.Link href="/lots">
              <Trans i18nKey="Statistics">Statistics</Trans>
            </Nav.Link>
          </Nav.Link>
          <Nav.Link href="/admin-task-list-page">
            <Trans i18nKey="Lots">Lots</Trans>
          </Nav.Link>
          <Nav.Link href="/user-list-page">
            <Trans i18nKey="Users">Users</Trans>
          </Nav.Link>
        </div>
      );
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">
            <Trans i18nKey="LS">LS</Trans>
          </Navbar.Brand>

          <div>
            {Object.keys(lngs).map((lng) => (
              <button
                key={lng}
                style={{
                  fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
                }}
                type="submit"
                onClick={() => {
                  i18n.changeLanguage(lng);
                  window.location.reload();
                }}
              >
                {lngs[lng].nativeName}
              </button>
            ))}
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home">
                <Trans i18nKey="Home">Home</Trans>
              </Nav.Link>
              {getUserLinks()}
              <Nav.Link href="/about">
                <Trans i18nKey="AboutUs">About Us</Trans>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav>{getDropdown()}</Nav>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Trans i18nKey="LogIn">LogIn</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="fromBasicEmail">
              <Form.Label>
                <Trans i18nKey="Email">Email</Trans>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                <Trans i18nKey="InvalidEmail">InvalidEmail</Trans>
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="fromBasicPassword">
              <Form.Label>
                {" "}
                <Trans i18nKey="Password">Password</Trans>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="fromBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Form.Group controlId="fromSignInButton">
              <Button variant="primary" onClick={handleSignIn}>
                {TextData.AuthorizeBox.LoginTab.LogIn}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
