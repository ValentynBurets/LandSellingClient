import React, { useState, useEffect } from "react";
import { Row, Modal, Button, Container, Table } from "react-bootstrap";

import BadRequest from "../../../../Components/BadRequest/BadRequest";
import TextData from "../../../../Assets/jsonData/TextData/TextData.json";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";

import GetService from "../../../../Components/Services/GetService";
import PutService from "../../../../Components/Services/PutService";
import {
  FullAgreement,
  TableAgreement,
} from "../../../../Components/Types/Agreement";
import Tbody from "./Components/Table/Tbody";
import TheaderList from "./Components/Table/TheaderList";
import { Trans } from "react-i18next";

interface AgreementPageProps {}

function AgreementListPage(props: AgreementPageProps) {
  const [agreementNumber, setAgreementNumber] = useState<number>(0);

  const [badRequest, setBadRequest] = useState(false);
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
        setBadRequest(true);
      } else {
        var data = response.data;
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
          isApprove: false,
          isDisApprove: false,
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
        } else {
          setBadRequest(true);
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
        } else {
          setBadRequest(true);
          setDisApproveState(!disApproveState);
          setAgreementNumber(0);
          LoadAgreements();
        }
      });
    }
  };

  useEffect(() => {
    console.log(tableAgreements);
  }, [tableAgreements]);

  return (
    <div>
      <BadRequest show={badRequest} text={TextData.BadRequest.BadConnection} />
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
              <Trans i18nKey="AgreementsList">
                AgreementsList 
              </Trans>
            </h1>
          </Row>
          <Row style={{marginBottom: "20rem"}} className="justify-content-md-center mx-auto mt-3 ListOfElem">
            {tableAgreements && tableAgreements.length > 0 && (
              <Table responsive>
                <TheaderList />
                <Tbody
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
