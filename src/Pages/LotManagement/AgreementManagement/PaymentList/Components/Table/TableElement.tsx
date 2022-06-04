import React from "react";
import { Payment } from "../../../../../../Components/Types/Payment";

interface TableElementProps {
  index: number;
  elementData: Payment;
}

function TableElement(props: TableElementProps) {
  return (
    <tr className="align-middle text-center">
      <td>
        {props.elementData.date}
      </td>
      <td>
      {props.elementData.value}
      </td>
    </tr>
  );
}

export default TableElement;
