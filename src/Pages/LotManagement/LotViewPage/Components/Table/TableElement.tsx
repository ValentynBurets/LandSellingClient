import React, {useState} from "react"
import Button from "react-bootstrap/Button";

import { Trans } from "react-i18next";
import { PriceCoef } from "../../../../../Components/Types/PriceCoef";

import style from "./TableStyle.module.sass"

interface TableElementProps {
  index: number;
  elementData: PriceCoef;
  setSelectedPriceCoefIdState: (arg: string) => void;
}

function TableElement(props: TableElementProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <tr className="align-middle text-center">
      <td className={isSelected ? style.row_selected : style.row_style}>{props.elementData.number}</td>
      <td>
        {props.elementData.daysCount}
      </td>
      <td>
        {props.elementData.value}
      </td>
      <td>
        <Button
          onClick={() =>{
            props.setSelectedPriceCoefIdState(props.elementData.id);
            setIsSelected(true);
          }}
        >
          <Trans i18nKey="HeaderDisapprove">HeaderDisapprove</Trans>
        </Button>
      </td>
    </tr>
  );
}

export default TableElement;
