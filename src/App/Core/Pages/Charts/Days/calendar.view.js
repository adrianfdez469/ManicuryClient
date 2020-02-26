import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ReactTooltip from 'react-tooltip';
/*import moment from 'moment';

import {
    Dialog, DialogTitle, DialogContent, DialogContentText
} from '@material-ui/core';
*/


import './main.scss'; // webpack must be configured to do this

export default class DemoApp extends React.PureComponent {
    state = {
        showMostWorkedDay  : false,
        showLessWorkedDay: false
    }

    calendarComponentRef = React.createRef();
    

    handleEventPositioned(info) {
        const eventObj = info.event;        
        info.el.setAttribute("data-tip", 'Trabajo: ' + eventObj.title + '<br>' 
            + 'Ingresos: ' + eventObj.extendedProps.ingress + '<br>'
            + 'Categoria: ' + eventObj.extendedProps.category 
        );
        ReactTooltip.rebuild();
    }
/*
    componentDidMount(){
        const dataMap = new Map();
        let maxIngressDay = {};
        let lessIngressDay = {};
        this.maxWorksDay = {};
        let minWorksDay = {};

        this.props.data.forEach(ingress => {
            const dateKey = moment(ingress.date).format('L');
            if(dataMap.has(dateKey)){
                const newAmmount = dataMap.get(dateKey).ammount + 1;
                const newIngress = dataMap.get(dateKey).ingress + ingress.ingressAmount
                if(this.maxWorksDay && this.maxWorksDay.ammount < newAmmount){
                    this.maxWorksDay.ammount = newAmmount;
                    this.maxWorksDay.date = dateKey;
                }
                dataMap.set(dateKey, {
                    date: dateKey,
                    ingress: newIngress,
                    ammount: newAmmount
                });
            }else{
                if(this.maxWorksDay && this.maxWorksDay.ammount < 1){
                    this.maxWorksDay.ammount = 1;
                    this.maxWorksDay.date = dateKey;
                }
                dataMap.set(dateKey, {
                    date: dateKey,
                    ingress: ingress.ingressAmount,
                    ammount: 1    
                });
            }

        });
    }*/

    render = () => {

        return (
            <div style={{maxWidth: '90%', margin: 'auto'}}>
                <FullCalendar
                    ref={this.calendarComponentRef} 
                    defaultView="dayGridMonth" 
                    plugins={[ dayGridPlugin ]} 
                    height={500}
                    //aspectRatio={1}
                    header={{
                        //center: 'btnDiaMasTrabajado btnDiaMenosTrabajado',
                        right: 'prevYear,prev,next,nextYear'                        
                    }}

                    locale={'es'}
                    eventLimit={true}   
                    eventPositioned={this.handleEventPositioned}
                    
                    /*eventClick={info => {
                        const eventObj = info.event;
                        alert('Trabajo: ' + eventObj.title + '\n' 
                            + 'Ingresos: ' + eventObj.extendedProps.ingress + '\n'
                            + 'Categoria: ' + eventObj.extendedProps.category + '\n'
                            + 'Color: ' + eventObj.extendedProps.bgcolor
                        );
                    }}*/

                    validRange={{
                        start: this.props.start,
                        end: this.props.end
                    }}
                    displayEventTime={false}
                    events={this.props.data.map(ingress => {
                            return {
                                id: ingress.id,
                                title: `${ingress.workType.name} $${ingress.ingressAmount}`,
                                start: ingress.date,
                                color: ingress.workType.category.color,
                                //bgcolor: ingress.workType.category.color,
                                category: ingress.workType.category.name,
                                ingress: ingress.ingressAmount,
                                
                            }
                        })
                    }
                    /*
                    customButtons={{
                        btnDiaMasTrabajado: {
                            text: 'Dia más trabajado',
                            click: () => {
                                const calendarApi = this.calendarComponentRef.current.getApi();
                                calendarApi.gotoDate(moment(this.maxWorksDay.date).format('YYYY-MM-DD')); // call a method on the Calendar object
                                //this.setState(state => ({...state, showMostWorkedDay: true}));
                            }   
                        },
                        btnDiaMenosTrabajado: {
                            text: 'Dia menos trabajado',
                            click: () => {
                                const calendarApi = this.calendarComponentRef.current.getApi();
                                calendarApi.gotoDate("2019-10-12"); // call a method on the Calendar object
                            }                            
                        }
                    }}*/

                    
                />
                <ReactTooltip 
                    type='info'
                    multiline={true}
                />
                {/*<Dialog
                    open={this.state.showMostWorkedDay}
                    onClose={() => this.setState(state => ({...state, showMostWorkedDay: false}))}
                >
                    <DialogTitle id="alert-dialog-title">{"Día más trabajado"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.maxWorksDay && this.maxWorksDay.date}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>*/}

                
            </div>
        )
  }

}