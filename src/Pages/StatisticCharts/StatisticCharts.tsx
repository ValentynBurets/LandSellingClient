import React, { useEffect, useState } from "react";
import { Quantity } from "../../Components/Types/Quantity";
import Chart from "./Components/Chart";
import LoadStatisticServices from "./Services/LoadStatisticServices";

import BadRequest from "../../Components/Message/BadRequest";

interface IStatisticChartsProps {}

function StatisticCharts(props: IStatisticChartsProps) {
  const [quantity, setQuantity] = useState<Quantity>({
    lots: 0,
    agreements: 0,
    bids: 0,
    averageViewsPerLot: 0
  });

  const [badRequest, setBadRequest] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  useEffect(() => {
    LoadStatisticServices({
      setLotsQuantity: (data: number) => {
        setQuantity((prev: any) => ({ ...prev, lots: data }));
      },
      setAgreementsQuantity: (data: number) => {
        setQuantity((prev: any) => ({ ...prev, agreements: data }));
      },
      setBidsQuantity: (data: number) => {
        setQuantity((prev: any) => ({ ...prev, bids: data }));
      },
      setAverageViewsPerLot: (data: number) => {
        setQuantity((prev: any) => ({ ...prev, averageViewsPerLot: data }));
      },
      setBadRequest: setBadRequest,
    });
  }, []);

  return (
    <div>
      <BadRequest show={badRequest.show} text={badRequest.message} />
      <Chart quantity={quantity} />
    </div>
  );
}

export default StatisticCharts;
