import React, { useState, useEffect } from "react";
import { Row, Modal, Button, Container, Table } from "react-bootstrap";

import BadRequest from "../../../../../../Components/Message/BadRequest";
import GoodRequest from "../../../../../../Components/Message/GoodRequest";
import ConnectionConfig from "../../../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";

import GetService from "../../../../../../Components/Services/GetService";
import PutService from "../../../../../../Components/Services/PutService";
import {
  FullAgreement,
  TableAgreement,
} from "../../../../../../Components/Types/Agreement";
import Tbody from "../Table/Tbody";
import TheaderList from "../Table/TheaderList";
import { Trans } from "react-i18next";
import { RequestResult } from "../../../../../../Components/Types/RequestResult";

interface AgreementPageProps {}

function AgreementListPage(props: AgreementPageProps) {

  const [agreementNumber, setAgreementNumber] = useState<number>(0);

  const [goodRequest, setGoodRequest] = useState<RequestResult>({ show: false, message: "" });
  const [badRequest, setBadRequest] = useState<RequestResult>({ show: false, message: "" });

  const [isLoaded, setIsLoaded] = useState(false);
  const [agreements, setAgreements] = useState<FullAgreement[]>();
  const [tableAgreements, setTableAgreements] = useState<TableAgreement[]>([]);

  const [disApproveState, setDisApproveState] = useState(false);
  const [approveState, setApproveState] = useState(false);

  useEffect(() => {
    LoadAgreements();
  }, []);

  const LoadAgreements = () => {
    GetService.request(
      ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Agreement.GetMy
    ).then((response) => {
      if (response.data === null) {
        setBadRequest({show: true, message: "agreements won't loaded"});
      } else {
        var data = response.data;
        console.log(data)
        setAgreements(data);
        setIsLoaded(true);
        console.log(data);
      }
    });
  }

  useEffect(() => {
    if (agreements !== undefined) {
      setTableAgreements([]);
      for (let i = 0; i < agreements?.length; i++) {
        let tAgreement: TableAgreement = {
          number: i + 1,
          id: agreements[i].id,
          lotId: agreements[i].lotId,
          customerId: agreements[i].customerId,
          status: agreements[i].status,
          description: agreements[i].description,
          creationDate: agreements[i].creationDate,
          startDate: agreements[i].startDate,
          endDate: agreements[i].endDate,
          isApprove: agreements[i].approved,
          isDisApprove: false,
          price: agreements[i].price
        };
        setTableAgreements((prev) => [...prev, tAgreement]);
      }
    }
  }, [agreements]);

  const approveAgreement = () => {
    if (agreements !== undefined) {
      PutService.request(
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Agreement.Approve,
        "?AgreementId=" + agreements[agreementNumber].id
      ).then((response) => {
        if (response.data === true) {
          window.location.reload();
          setGoodRequest({show: true, message: "aggrement is appreved"});
        } else {
          setBadRequest({show: true, message: "aggrement isn't appreved"});
          setApproveState(!approveState);
          setAgreementNumber(0);
          LoadAgreements();
        }
      });
    }
  };
  const disApproveAgreement = () => {
    if (agreements !== undefined) {
      PutService.request(
        ConnectionConfig.ServerUrl +
          ConnectionConfig.Routes.Agreement.Disapprove,
          "?AgreementId=" + agreements[agreementNumber].id
      ).then((response) => {
        if (response.data === true) {
          window.location.reload();
          setGoodRequest({show: true, message: "agreements is disaproved"});
        } else {
          setBadRequest({show: true, message: "agreements isn't disaproved"});
          setDisApproveState(!disApproveState);
          setAgreementNumber(0);
          LoadAgreements();
        }
      });
    }
  };

  // useEffect(() => {
  //   console.log(tableAgreements);
  // }, [tableAgreements]);


  return (
    <div>
      <BadRequest show={badRequest.show} text={badRequest.message} />
      <GoodRequest show={goodRequest.show} text={goodRequest.message} />
      {!isLoaded ? null : (
        <Container style={{ width: "70%" }}>
          <Modal
            style={{ display: "flex", marginTop: "10%" }}
            show={disApproveState}
            getOpenState={(e: any) => setDisApproveState(e)}
            tabIndex="-1"
          >
            <Modal.Header>
              <Modal.Title>
                <Trans i18nKey="HeaderDisapprove">HeaderDisapprove</Trans>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Trans i18nKey="BodyDisapprove">BodyDisapprove</Trans>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={disApproveAgreement}>
                <Trans i18nKey="FooterDisapprove">FooterDisapprove</Trans>
              </Button>
              <div className="vr" />
              <Button
                variant="secondary"
                onClick={() => {
                  setDisApproveState(!disApproveState);
                  setAgreementNumber(0);
                }}
              >
                <Trans i18nKey="FooterCancel">FooterCancel</Trans>
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            style={{ display: "flex", marginTop: "10%" }}
            show={approveState}
            getOpenState={(e: any) => setApproveState(e)}
            tabIndex="-1"
          >
            <Modal.Header>
              <Modal.Title>
                <Trans i18nKey="HeaderApprove">HeaderApprove</Trans>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Trans i18nKey="BodyApprove">BodyApprove</Trans>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={approveAgreement}>
                <Trans i18nKey="FooterContinue">FooterContinue</Trans>
              </Button>
              <div className="vr" />
              <Button
                variant="secondary"
                onClick={() => {
                  setApproveState(!approveState);
                  setAgreementNumber(0);
                }}
              >
                <Trans i18nKey="FooterCancel">FooterCancel</Trans>
              </Button>
            </Modal.Footer>
          </Modal>

          <Row style={{marginTop: "5rem"}}>
            <h1 className="text-center mt-3">
              <Trans i18nKey="MyAgreementsList">
                My agreements list 
              </Trans>
            </h1>
          </Row>
          <Row style={{marginBottom: "20rem"}} className="justify-content-md-center mx-auto mt-3 ListOfElem">
            {tableAgreements && tableAgreements.length > 0 && (
              <Table responsive>
                <TheaderList />
                <Tbody  
                  setGoodRequest={setGoodRequest}
                  setBadRequest={setBadRequest}
                  bodyData={tableAgreements}
                  setApproveState={() => {
                    setApproveState(!approveState);
                  }}
                  setDisApproveState={() => {
                    setDisApproveState(!disApproveState);
                  }}
                  setAgreementNumber={(arg: number) => {
                    setAgreementNumber(arg);
                  }}
                />
              </Table>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default AgreementListPage;
