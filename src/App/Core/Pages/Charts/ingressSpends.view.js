import "core-js";
import React, {PureComponent} from 'react';
import {useTheme, create} from "@amcharts/amcharts4/core";
import {XYChart,DateAxis, ValueAxis, LineSeries, XYCursor, XYChartScrollbar} from "@amcharts/amcharts4/charts";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

useTheme(am4themes_animated);


class App extends PureComponent {


    showChart () {
      let chart = create("chartdiv", XYChart);
      chart.language.locale = am4lang_es_ES;
      chart.hiddenState.properties.opacity = 0;

      const chartIngressDate = this.props.chartIngressDate;
  
      chart.data = chartIngressDate;

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
      series.fillOpacity = 1;

      // eslint-disable-next-line no-template-curly-in-string
      series.tooltipText = "Ingreso: ${valueY}";
      chart.cursor = new XYCursor();

      let scrollbarX = new XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    }

    componentDidMount() {
      this.showChart();
      
    }

    componentWillUpdate() {
      this.showChart();
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