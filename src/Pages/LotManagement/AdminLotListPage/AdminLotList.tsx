import React, { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { DetailedLot } from "../../../Components/Types/Lot";

import Tbody from "./Components/Table/Tbody";
import TheaderList from "./Components/Table/TheaderList";
import LoadAllLotInfoService from "./Services/LoadAllLotInfoService";

import style from "./AdminLotListStyle.module.sass";
import { Trans } from "react-i18next";
import BadRequest from "../../../Components/Message/BadRequest";
import { RequestResult } from "../../../Components/Types/RequestResult";
import GoodRequest from "../../../Components/Message/GoodRequest";

interface IAdminLotList {}

function AdminLotList(props: IAdminLotList) {
  const [lotsInfo, setLotsInfo] = useState<DetailedLot[]>([]);

  const [goodRequest, setGoodRequest] = useState<RequestResult>({
    show: false,
    message: "",
  });
  const [badRequest, setBadRequest] = useState<RequestResult>({
    show: false,
    message: "",
  });

  useEffect(() => {
    LoadAllLotInfoService({
      setLotInfo: setLotsInfo,
    });
  }, []);

  return (
    <div className={style.background_style}>
      <BadRequest show={badRequest.show} text={badRequest.message} />
      <GoodRequest show={goodRequest.show} text={goodRequest.message} />
      <Container className={style.container_style}>
        <div>
          <div className={style.header_text}>
            <Trans i18nKey="LotListManagement">lot list management</Trans>
          </div>
        </div>

        <Row
          style={{ marginBottom: "20rem" }}
          className="justify-content-md-center mx-auto mt-3 ListOfElem"
        >
          {lotsInfo && lotsInfo.length > 0 && (
            <Table responsive className={style.table_style}>
              <TheaderList />
              <Tbody
                bodyData={lotsInfo}
                setGoodRequest={setGoodRequest}
                setBadRequest={setBadRequest}
              />
            </Table>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default AdminLotList;
