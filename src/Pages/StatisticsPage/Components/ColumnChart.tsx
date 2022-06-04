import HighchartsReact from "highcharts-react-official";
import React, { FC, memo, useEffect, useState } from "react"
import { SimpleLot } from "../../../Components/Types/Lot";

import "./ColumnChartStyle.sass"

interface IColumnChartProps{
  lots: SimpleLot[];
}


export const ColumnChart: FC<IColumnChartProps> = memo(
  (props: IColumnChartProps) => {

    const [chartOptions, setChartOptions] = useState({});

    // useEffect(() => {
    //   if (props.lots.length) {
    //     afterChartCreated();
    //   }
    // }, [props.lots]);

    
    const setHeight = () => {
      if (props.lots.length === 1) {
        return props.lots.length * 30 + 200;
      }
      if (props.lots.length < 4) {
        return props.lots.length * 30 + 180;
      }
      return props.lots.length * 30 + 120;
    };

    // const setSeries = (): Highcharts.SeriesOptionsType[] => {
    //   let arr: Highcharts.SeriesOptionsType[] = [];
    //   let formatData = props.lots.map((elementI, indexI) => {
    //     let data = [];
    //     elementI.results.forEach((elementJ: any, indexJ: any) => {
    //       data.push([indexJ, indexI, elementJ.value]);
    //     });
    //     return {
    //       data,
    //     };
    //   });

    //   for (let i = 0; i < props.countries.length; i++) {
    //     arr.push({
    //       type: "heatmap",
    //       keys: ["x", "y", "value"],
    //       colorAxis: i,
    //       data: [...formatData[i].data],
    //       boostThreshold: 100,
    //       turboThreshold: Number.MAX_VALUE,
    //       tooltip: {
    //         pointFormatter: function (): any {
    //           _handlePointChange((this as any).x, (this as any).y);
    //           return `${getCountryByCoordinate((this as any).y)} </br> Index ${
    //             (this as any).value
    //           }<br/>  ${getDateByCoordinate((this as any).x, (this as any).y)}`;
    //         },

    //         headerFormat: "",
    //       },
    //     });
    //   }
    //   return arr;
    // };

    // const afterChartCreated = () => {
    //   const chart: Highcharts.Options = {
    //     chart: {
    //       type: 'column',
    //     },

    //     legend: {
    //       enabled: false,
    //     },
    //     title: {
    //       text: null,
    //     },
    //     credits: {
    //       enabled: false,
    //     },
    //     tooltip: {
    //       enabled: !props.isPdf,
    //     },
    //     colorAxis: colorAxisSettings,
    //     plotOptions: {
    //       heatmap: {
    //         colsize: 0,
    //         borderWidth: 0,
    //         borderColor:
    //           Highcharts && true && Highcharts!.getOptions().colors[0],
    //         dataLabels: {
    //           enabled: false,
    //         },
    //         states: {
    //           inactive: {
    //             opacity: 0.2,
    //           },
    //         },
    //       },
    //     },
    //     xAxis: {
    //       minPadding: 0,
    //       maxPadding: 0,
    //       tickInterval: Math.ceil(
    //         calculateTickInterval() / props.imageExportWidthScale,
    //       ),
    //       tickWidth: 0,
    //       categories:
    //         props.countries &&
    //         props.countries[0] &&
    //         getCategories(props.countries),
    //       gridLineWidth: 1,
    //       crosshair: true,
    //       labels: {
    //         enabled: true,
    //         rotation: -90,
    //       },
    //     },
    //     yAxis: [
    //       {
    //         lineWidth: 1,
    //         categories: ["", "", "", "", "", "", "", "", "", ""],

    //         title: {
    //           text: props.category,
    //         },
    //         tickPixelInterval: 1,
    //         reversed: true,
    //         opposite: false,
    //         labels: {
    //           step: 1,
    //         },
    //       },
    //       {
    //         lineWidth: 1,
    //         categories: ["", "", "", "", "", "", "", "", "", ""],
    //         title: {
    //           text: undefined,
    //         },
    //         opposite: true,
    //         reversed: true,
    //         linkedTo: 0,
    //         tickPixelInterval: 1,
    //         labels: {
    //           step: 1,
    //         },
    //       },
    //     ],
    //     series: setSeries(),
    //     exporting: {
    //       buttons: {
    //         contextButton: {
    //           enabled: false,
    //         },
    //       },
    //     },
    //   };

    //   setHeatmapOptions(chart);
    // };

    return (
      <div>
        {/* {props.countries.length && props.countries[0].results.length ? (
          <div>
            <HighchartsReact
              highcharts={Highcharts}
              options={heatmapOptions}
              ref={heatmapChartRef}
            />
          </div>
        ) : (
          <TextContainer
            text={"NO DATA"}
            title={false}
            fontSize={15}
            centerAlign={true}
          />
        )} */}
      </div>
    );
  },
);


export default ColumnChart