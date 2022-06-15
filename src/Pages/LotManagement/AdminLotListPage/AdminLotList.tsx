import React, { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { DetailedLot } from "../../../Components/Types/Lot";

import Tbody from "./Components/Table/Tbody";
import TheaderList from "./Components/Table/TheaderList";
import LoadAllLotInfoService from "./Services/LoadAllLotInfoService";

import style from "./AdminLotListStyle.module.sass";
import { Trans } from "react-i18next";

interface IAdminLotList {}

function AdminLotList(props: IAdminLotList) {
  const [lotsInfo, setLotsInfo] = useState<DetailedLot[]>([]);

  useEffect(() => {
    LoadAllLotInfoService({
      setLotInfo: setLotsInfo,
    });
  }, []);

  return (
    <div className={style.background_style}>
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
            <Table responsive
              className={style.table_style}
            >
              <TheaderList />
              <Tbody bodyData={lotsInfo} />
            </Table>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default AdminLotList;
