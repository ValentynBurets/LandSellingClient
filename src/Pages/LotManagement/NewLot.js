import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import style from "./NewLot.module.sass";
import saveOrder from "./Services/SaveOrder";
import LoadServiceData from "./Services/DataLoading";
import { useHistory } from "react-router-dom";
import UploadImage from "./Components/UploadImage";
import TextData from "../../Assets/jsonData/NewLotPage.json";
import Spinner from "react-bootstrap/spinner";
import {Loader, LoaderOptions} from 'google-maps';

export default function NewLot() {
  let history = useHistory();

  const [data, saveData] = useState({
    isLoading: false,
    requests: null,
    inProgress: null,
  });

  //#region
  //current lot state

  const lotInitialState = {
    ImageArray: [],
  };

  const [lot, setLot] = useState(lotInitialState);

  function setLotPicture(fileString) {
    setLot((prevState) => ({ ...prevState, fileString }));
  }
  function setLotService(selectedService) {
    setLot((prevState) => ({ ...prevState, selectedService }));
  }
  //end current pruct state
  //#endregion

  const [mylotArray, updateMylotArray] = useState([]);
  const [myCommentArray, updateMyCommentArray] = useState([]);

  const commentTextArea = useRef(null);

  function addCommentHandleInputChange(e) {
    const value = commentTextArea.current.value;
    updateMyCommentArray(value);
  }

  const setCencellot = (lot) => {
    console.log(lot);
    alert("delete lot");
    updateMylotArray(mylotArray.filter((item) => item.id !== lot.id));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLot((prev) => ({ ...prev, [name]: value }));
  };

  const addlot = () => {
    updateMylotArray((arr) => [
      ...arr,
      {
        id: "id" + Math.random().toString(16).slice(2),
        picture: lot.fileString.toString(),
        name: lot.selectedService.name,
      },
    ]);
  };

  const newOrder = () => {
    console.log(mylotArray);
    saveOrder(mylotArray, myCommentArray);
    history.push({
      pathname: "/order_list",
    });
  };

  const [newPriceCoef, setNewPriceCoef] = useState({
    id: 1,
    days: 1,
    cost: 1,
  });

  const daysClickHandler = (v) => {
    setNewPriceCoef({ id: newPriceCoef.id, days: v, cost: newPriceCoef.cost });
  };
  const costClickHandler = (v) => {
    setNewPriceCoef({ id: newPriceCoef.id, days: newPriceCoef.days, cost: v });
  };

  const [priceCoefs, setPriceCoefs] = useState([]);

  const addNewPriceCoef = () => {
    setNewPriceCoef({
      id: newPriceCoef.id + 1,
      days: newPriceCoef.days,
      cost: newPriceCoef.cost,
    });
    const PriceCoef = {
      id: newPriceCoef.id,
      days: newPriceCoef.days,
      cost: newPriceCoef.cost,
    };

    setPriceCoefs((prev) => [...prev, PriceCoef]);
  };

  const [lotPictures, addLotPicture] = useState([]);

  useEffect(() => {
    console.log(lotPictures);
  }, [lotPictures]);
  return (
    <Container>
      {data.isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          <Row className="OrderHeader">
            <div>{TextData.NewOrder}</div>
          </Row>

          <Row className="containerStyle">
            <Col>
              <UploadImage
                lotPictures={lotPictures}
                addLotPictureToArr={(value) => {
                  addLotPicture(prevState => [...prevState, value]);
                }}
              />
            </Col>

            <Col className="ServicesBox">
              <Container>
                <Row className="HeaderText">
                  <div>{TextData.Services}</div>
                </Row>
                <Row>
                  <BootstrapTable
                    data={priceCoefs}
                    bodyStyle={{ border: "none" }}
                    tableStyle={{ border: "none" }}
                    headerStyle={{ border: "none !important" }}
                    version="4"
                  >
                    <TableHeaderColumn width="150" isKey dataField="id">
                      ID
                    </TableHeaderColumn>
                    <TableHeaderColumn width="150" dataField="days">
                      Days
                    </TableHeaderColumn>
                    <TableHeaderColumn width="150" dataField="cost">
                      Cost
                    </TableHeaderColumn>
                  </BootstrapTable>
                </Row>
                <Row>
                  <Col>
                    <InputGroup className="form-control">
                      <InputGroup.Text>Days</InputGroup.Text>
                      <FormControl
                        onChange={(e) => daysClickHandler(e.target.value)}
                        type="number"
                        min="1"
                        max="100"
                        aria-label="Dayds (Dyration for rent)"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="form-control">
                      <InputGroup.Text>Cost</InputGroup.Text>
                      <FormControl
                        onChange={(e) => costClickHandler(e.target.value)}
                        type="number"
                        min="1"
                        max="100"
                        aria-label="Cost (Cost of rent dyring this period)"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Button variant="primary" onClick={addNewPriceCoef}>
                      Add price coef
                    </Button>
                  </Col>
                </Row>
                <Row className="AdditionalTextBlock"></Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
                
              <label className="HeaderText CommentText">
                {TextData.OptionalComment}
              </label>

              <textarea
                className={style.descriptionAreaStyle}
                ref={commentTextArea}
              />
              <Button
                className="lotButtonDown"
                variant="primary"
                onClick={addCommentHandleInputChange}
              >
                {TextData.AddComment}
              </Button>
            </Col>

            <Col>
              <div className="lotListStyle">
                <div className="HeaderText CommentText">{TextData.lotList}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className="lotButton"
                variant="primary"
                onClick={newOrder}
              >
                {TextData.Create}
              </Button>
            </Col>
            <Col>
              <Button className="lotButton" variant="warning" onClick={addlot}>
                {TextData.Addlot}
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}
