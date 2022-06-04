import React, { useState } from "react"
import { PriceCoef } from "../../../../../Components/Types/PriceCoef";
import TableElement from "./TableElement";

interface TbodyProps {
  bodyData : PriceCoef[]
  setSelectedPriceCoefIdState: (arg: string) => void
}

function Tbody(props: TbodyProps) {
  const [isSelected, setIsSelected] = useState<number>(0);

  return (
    <tbody>
      {props.bodyData && props.bodyData.map((elem: PriceCoef, index: number) => (
        <TableElement
          elementData={elem}
          key={index}
          setSelectedPriceCoefIdState={props.setSelectedPriceCoefIdState}
          index={index}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
      ))}
    </tbody>
  );
}

export default Tbody;