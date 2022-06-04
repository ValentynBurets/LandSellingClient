import React, { useEffect, useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { Trans } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { Payment } from "../../../../Components/Types/Payment";
import Tbody from "./Components/Table/Tbody";
import TheaderList from "./Components/Table/TheaderList";

import style from "./PaymentListStyle.module.sass";
import LoadPaymentService from "./Service/LoadPaymentService";

interface PaymentListProps {}

function PaymentList(props: PaymentListProps) {
  // const params: { agreementId: string } = useParams();
  let history = useHistory();

  const [payments, setPayments] = useState<Payment[]>([]);

  const back = () => {
    history.push({
      pathname: "/agreement-list",
    });
  };

  // useEffect(() => {
  //   LoadPaymentService({ setPayments: setPayments, agreementId: params.agreementId });
  // }, []);

  return (
    <div>
      <Row className={style.lot_list_header_text}>
        <p style={{fontSize: "100px"}}>payment list</p>
      </Row>
      {/* <Row>
        <Button
          style={{
            width: "5rem",
            height: "2.5rem",
            marginTop: "1.5rem",
          }}
          variant="primary"
          onClick={back}
        >
          <Trans i18nKey="Back">Back</Trans>
        </Button>
      </Row>

      <Row
        style={{ marginBottom: "20rem" }}
        className="justify-content-md-center mx-auto mt-3 ListOfElem"
      >
        {payments && payments.length > 0 && (
          <Table responsive>
            <TheaderList />
            <Tbody bodyData={payments} />
          </Table>
        )}
      </Row> */}
    </div>
  );
}

export default PaymentList;
