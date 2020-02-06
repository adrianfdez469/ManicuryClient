import "core-js";
import React, {Component} from 'react';
//import {} from 'react-apollo';
import {useTheme, create} from "@amcharts/amcharts4/core";
import {XYChart,DateAxis, ValueAxis, LineSeries, XYCursor, XYChartScrollbar} from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

useTheme(am4themes_animated);
/*
const Chart = () => {

    let chart = create("chartdiv", XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.data = [];

        var dateAxis = chart.xAxes.push(new DateAxis());

        var valueAxis = chart.yAxes.push(new ValueAxis());
        valueAxis.tooltip.disabled = true;

        var series = chart.series.push(new LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.openValueY = "gastos";
        series.dataFields.valueY = "ingresos";
        series.tooltipText = "Ingresos: {valueY.value}\nGastos: {openValueY.value}\n";
        series.sequencedInterpolation = true;
        series.fillOpacity = 0.3;
        series.defaultState.transitionDuration = 1000;
        series.tensionX = 0.8;

        var series2 = chart.series.push(new LineSeries());
        series2.dataFields.dateX = "date";
        series2.dataFields.valueY = "gastos";
        series2.sequencedInterpolation = true;
        series2.defaultState.transitionDuration = 1500;
        series2.stroke = chart.colors.getIndex(6);
        series2.tensionX = 0.8;

        chart.cursor = new XYCursor();
        chart.cursor.xAxis = dateAxis;


        let scrollbarX = new XYChartScrollbar();
        scrollbarX.series.push(series);
        scrollbarX.series.push(series2);
        chart.scrollbarX = scrollbarX;

        useEffect(() => {
            return () => {
                if(chart){
                    chart.dispose();
                }
            }
        })

    return (
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      );
};
export default Chart;
*/

class App extends Component {
    componentDidMount() {






        let chart = create("chartdiv", XYChart);
        chart.hiddenState.properties.opacity = 0;

        let gastos = 100;
        let ingresos = 250;
        let data = [];

/*
      for (var i = 1; i < 120; i++) {
        gastos += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4);
        ingresos = Math.round(gastos + Math.random() * 5 + i / 5 - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2);
        data.push({ date: new Date(2018, 0, i), gastos: gastos, ingresos: ingresos });
      }*/


      data = [
        

          {date: '2020-01-01', gastos: 0, ingresos: 1500},
          {date: '2020-02-01', gastos: 250, ingresos: 1250},
          {date: '2020-03-01', gastos: 0, ingresos: 1000},
          {date: '2020-04-01', gastos: 0, ingresos: 980},
          {date: '2020-05-01', gastos: 420, ingresos: 2678},
          {date: '2020-06-01', gastos: 0, ingresos: 590},
          {date: '2020-07-01', gastos: 150, ingresos: 1145},
          {date: '2020-08-01', gastos: 0, ingresos: 2561},
          {date: '2020-09-01', gastos: 300, ingresos: 790},
          {date: '2020-10-01', gastos: 0, ingresos: 689},
          {date: '2020-11-01', gastos: 500, ingresos: 1450},
          {date: '2020-12-01', gastos: 0, ingresos: 560}
          
      ];

      

      
        chart.data = data;

        var dateAxis = chart.xAxes.push(new DateAxis());

        var valueAxis = chart.yAxes.push(new ValueAxis());
        valueAxis.tooltip.disabled = true;

        var series = chart.series.push(new LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.openValueY = "gastos";
        series.dataFields.valueY = "ingresos";
        series.tooltipText = "Ingresos: {valueY.value}\nGastos: {openValueY.value}\n";
        series.sequencedInterpolation = true;
        series.fillOpacity = 0.3;
        series.defaultState.transitionDuration = 1000;
        series.tensionX = 0.8;

        var series2 = chart.series.push(new LineSeries());
        series2.dataFields.dateX = "date";
        series2.dataFields.valueY = "gastos";
        series2.sequencedInterpolation = true;
        series2.defaultState.transitionDuration = 1500;
        series2.stroke = chart.colors.getIndex(6);
        series2.tensionX = 0.8;

        chart.cursor = new XYCursor();
        chart.cursor.xAxis = dateAxis;


        let scrollbarX = new XYChartScrollbar();
        scrollbarX.series.push(series);
        scrollbarX.series.push(series2);
        chart.scrollbarX = scrollbarX;

    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  
    render() {
      return (
        <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
      );
    }
  }
  
  export default App;