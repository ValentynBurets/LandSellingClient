import React from "react"
import { PriceCoef } from "../../../../../Components/Types/PriceCoef";
import TableElement from "./TableElement";

interface TbodyProps {
  bodyData: PriceCoef[];
  RemovePriceCoef: (arg: number) => void;
}

function Tbody(props: TbodyProps) {
  return (
    <tbody>
      {props.bodyData && props.bodyData.map((elem: PriceCoef, index: number) => (
        <TableElement
          elementData={elem}
          key={index}
          RemovePriceCoef={props.RemovePriceCoef}
          index={index}
        />
      ))}
    </tbody>
  );
}

export default Tbody;