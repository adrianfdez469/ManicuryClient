import "core-js";
import React, {Component} from 'react';
import {useTheme, create} from "@amcharts/amcharts4/core";
import {XYChart,DateAxis, ValueAxis, LineSeries, XYCursor, XYChartScrollbar} from "@amcharts/amcharts4/charts";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {resetTimeToDate} from '../../Generics'

useTheme(am4themes_animated);


class App extends Component {

    componentDidMount() {

      let chart = create("chartdiv", XYChart);
      chart.language.locale = am4lang_es_ES;
      chart.hiddenState.properties.opacity = 0;

        
      const ing = this.props.dataIngresses;

      const data = ing.sort((a, b) => {
        if(a.date > b.date) return 1;
        if(a.date < b.date) return -1;
        return 0;
      })
      
      .reduce((acumulator, value) => {
        if(acumulator.length > 0){
          const lastIngress = acumulator[acumulator.length-1];
          const lastDate = new Date(lastIngress.date);
          const lastDay = lastDate.getDate();
          const lastMonth = lastDate.getMonth();
          const lastYear = lastDate.getFullYear();

          const actualDate = new Date(value.date);
          const actualDay = actualDate.getDate();
          const actualMonth = actualDate.getMonth();
          const actualYear = actualDate.getFullYear();

          if(lastDay === actualDay && lastMonth === actualMonth && lastYear === actualYear){
            acumulator[acumulator.length - 1].ingressAmount += value.ingressAmount;
          }else{
            acumulator.push(value);
          }
          return acumulator;
        } return [value];

      }, []);


      const fechas = [];
      for (var i = 1, j = 0; i < 367; i++) {
        const date = new Date(2020, 0, i);
        let ingressAmount = 0;        

        if(data[j] && resetTimeToDate(data[j].date).toString() === resetTimeToDate(date).toString()){
          console.log(data[j]);
          console.log(date);

          ingressAmount = data[j].ingressAmount;  
          j++
        }
        fechas.push({ date, ingressAmount });
      }

      chart.data = fechas;

    let dateAxis = chart.xAxes.push(new DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.groupData = true;

    let valueAxis = chart.yAxes.push(new ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.title.text = "Ingresos ($)";

    let series = chart.series.push(new LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "ingressAmount";

    series.tooltipText = "Ingreso: ${valueY}";
    chart.cursor = new XYCursor();

    let scrollbarX = new XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
     
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