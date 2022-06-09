import React from "react";
import Button from "react-bootstrap/Button";

import { Trans } from "react-i18next";
import { PriceCoef } from "../../../../../Components/Types/PriceCoef";

interface TableElementProps {
  index: number;
  elementData: PriceCoef;
  RemovePriceCoef: (arg: number) => void;
}

function TableElement(props: TableElementProps) {
  return (
    <tr className="align-middle text-center">
      <td>{props.elementData.id}</td>
      <td>{props.elementData.monthCount}</td>
      <td>{props.elementData.value}</td>

      <td>
        <Button
          onClick={() => {
            props.RemovePriceCoef(props.index);
          }}
          variant="dark"
        >
          <Trans i18nKey="Remove">Remove</Trans>
        </Button>
      </td>
    </tr>
  );
}

export default TableElement;
