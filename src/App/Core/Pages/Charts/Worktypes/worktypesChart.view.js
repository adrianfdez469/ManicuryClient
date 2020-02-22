import "core-js";
import React, {Component} from 'react';
import {useTheme, create} from "@amcharts/amcharts4/core";
import { XYChart, CategoryAxis,ValueAxis, ColumnSeries, XYCursor} from "@amcharts/amcharts4/charts";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {
  Typography,
  Grid,
  Switch
} from '@material-ui/core';

useTheme(am4themes_animated);


class WorkTypesChart extends Component {

    constructor(props){
      super(props);
      this.state = {
        cantidades: true
      }
    }

    showChart () {

      
      


      //options.onlyShowOnViewport = true;
      //options.queue = true; 
      let chart = create("chartdiv1", XYChart);
      chart.language.locale = am4lang_es_ES;
      chart.hiddenState.properties.opacity = 0;
      
      
      chart.data = this.props.workTypesQuantity;

      let categoryAxis = chart.xAxes.push(new CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.title.text = "Tipos de trabajos";
      categoryAxis.dataFields.category = "name";
      

      let valueAxis = chart.yAxes.push(new ValueAxis());
      valueAxis.tooltip.disabled = true;
      //valueAxis.renderer.minWidth = 35;
      valueAxis.min = 0;
      valueAxis.title.text = this.state.cantidades ? "Cantidad" : "Ingresos";
      //svalueAxis. = "cantidad";


      var series = chart.series.push(new ColumnSeries());
      series.dataFields.valueY = this.state.cantidades ? "ammount" : "ingress";
      series.dataFields.categoryX = "name";
      series.name = "Sales";


      //let series = chart.series.push(new ColumnSeries());
      //series.dataFields.categoryX = "name";
      //series.dataFields.valueY = "ammount";
            
      // eslint-disable-next-line no-template-curly-in-string
      series.tooltipText = this.state.cantidades ? "Cantidad: {valueY}" : "Ingresos: ${valueY}";
      chart.cursor = new XYCursor();

      /*let scrollbarX = new XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;*/

      this.chart = chart;
    }

    componentDidMount() {
      this.showChart();      
    }

    componentDidUpdate(){
      this.showChart();      
    }
    /*componentWillUpdate() {
      this.showChart();
    }*/

    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  
    render() {

      console.log(this.state);
      
      return (<>
        <div id="chartdiv1" style={{ width: "100%", height: "400px" }}></div>
        <Typography component="div" style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Graficar por ingresos</Grid>
                    <Grid item>
                        <Switch
                            checked={this.state.cantidades}
                            onChange={() => this.setState(state => ({cantidades: !state.cantidades}))}
                            value={this.state.cantidades}
                            color="primary"
                        />
                    </Grid>
                <Grid item>Graficar por cantidades</Grid>
            </Grid>
        </Typography>
        </>
      );
    }
  }
  
  export default WorkTypesChart;