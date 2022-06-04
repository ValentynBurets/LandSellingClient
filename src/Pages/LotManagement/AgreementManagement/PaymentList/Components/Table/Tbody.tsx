import React from "react"
import { Payment } from "../../../../../../Components/Types/Payment";
import TableElement from "./TableElement";

interface TbodyProps {
  bodyData : Payment[]
}

function Tbody(props: TbodyProps) {

  return (
    <tbody>
      {props.bodyData && props.bodyData.map((elem: Payment, index: number) => (
        <TableElement
          elementData={elem}
          key={index}
          index={index}
        />
      ))}
    </tbody>
  );
}

export default Tbody;