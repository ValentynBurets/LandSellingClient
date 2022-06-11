import React from "react";
import { TableAgreement } from "../../../../../../Components/Types/Agreement";
import { RequestResult } from "../../../../../../Components/Types/RequestResult";
import TableElement from "./TableElement";

interface TbodyProps {
  bodyData: TableAgreement[];
  setApproveState: () => void;
  setDisApproveState: () => void;
  setAgreementNumber: (arg: number) => void;
  isCustomer?: boolean;
  setGoodRequest: (arg: RequestResult) => void;
  setBadRequest: (arg: RequestResult) => void;
}

function Tbody(props: TbodyProps) {
  return (
    <tbody>
      {props.bodyData &&
        props.bodyData.map((elem: TableAgreement, index: number) => (
          <TableElement
            setGoodRequest={props.setGoodRequest}
            setBadRequest={props.setBadRequest}
            isCustomer={props.isCustomer}
            elementData={elem}
            key={index}
            setApproveState={props.setApproveState}
            setDisApproveState={props.setDisApproveState}
            setAgreementNumber={(arg: number) => {
              props.setAgreementNumber(arg);
            }}
            index={index}
          />
        ))}
    </tbody>
  );
}

export default Tbody;
