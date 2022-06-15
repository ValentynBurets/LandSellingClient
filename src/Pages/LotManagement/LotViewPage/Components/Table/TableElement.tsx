import React from "react";
import Button from "react-bootstrap/Button";

import { Trans } from "react-i18next";
import { PriceCoef } from "../../../../../Components/Types/PriceCoef";

import style from "./TableStyle.module.sass";

interface TableElementProps {
  index: number;
  elementData: PriceCoef;
  setSelectedPriceCoefIdState: (arg: string) => void;
  isSelected: number;
  setIsSelected: (arg: number) => void;
}

function TableElement(props: TableElementProps) {
  return (
    <tr className="align-middle text-center">
      <td
        className={
          props.isSelected === props.elementData.number
            ? style.row_selected
            : style.row_style
        }
      >
        {props.elementData.number}
      </td>
      <td
        className={
          props.isSelected === props.elementData.number
            ? style.row_selected
            : style.row_style
        }
      >
        {props.elementData.monthCount}
      </td>
      <td
        className={
          props.isSelected === props.elementData.number
            ? style.row_selected
            : style.row_style
        }
      >
        {props.elementData.value}
      </td>
      <td className={
          props.isSelected === props.elementData.number
            ? style.row_selected
            : style.row_style
        }>
        <Button
          style={
            props.isSelected !== props.elementData.number
              ? {...{color: "white", backgroundColor: "#4287f5"}}
              : {...{color: "#4287f5", backgroundColor: "white"}}
            }
          onClick={() => {
            props.setSelectedPriceCoefIdState(props.elementData.id);
            props.setIsSelected(props.elementData.number);
          }}
        >
          {props.isSelected === props.elementData.number ? (
            <Trans i18nKey="LotViewSelected">Selected</Trans>
          ) : (
            <Trans i18nKey="LotViewSelect">Select</Trans>
          )}
        </Button>
      </td>
    </tr>
  );
}

export default TableElement;
