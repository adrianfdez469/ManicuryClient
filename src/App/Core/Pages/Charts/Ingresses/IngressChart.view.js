import "core-js";
import React, {PureComponent} from 'react';
import {useTheme, create, options} from "@amcharts/amcharts4/core";
import { XYChart,DateAxis, ValueAxis, ColumnSeries, XYCursor, XYChartScrollbar} from "@amcharts/amcharts4/charts";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

useTheme(am4themes_animated);


class IngressChart extends PureComponent {


    showChart () {
      options.onlyShowOnViewport = true;
      options.queue = true; 
      let chart = create("chartdiv", XYChart);
      chart.language.locale = am4lang_es_ES;
      chart.hiddenState.properties.opacity = 0;
      
      chart.data = this.props.chartIngressDate;

      let dateAxis = chart.xAxes.push(new DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.groupData = true;
      dateAxis.gridIntervals.setAll([
        { timeUnit: "day", count: 1 },
        { timeUnit: "day", count: 2 },
        { timeUnit: "day", count: 3 },
        { timeUnit: "day", count: 4 },
        { timeUnit: "day", count: 5 },
        { timeUnit: "day", count: 6 },
        { timeUnit: "day", count: 7 },
        { timeUnit: "month", count: 1 },
        { timeUnit: "year", count: 1 },
      ]);
      dateAxis.groupIntervals.setAll([
        { timeUnit: "day", count: 1 },
        { timeUnit: "month", count: 1 },
        { timeUnit: "year", count: 1 }
      ]);
      

      let valueAxis = chart.yAxes.push(new ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
      valueAxis.title.text = "Ingresos ($)";

      let series = chart.series.push(new ColumnSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "ingressAmount";
      
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

    componentDidUpdate(){
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
  
  export default IngressChart;