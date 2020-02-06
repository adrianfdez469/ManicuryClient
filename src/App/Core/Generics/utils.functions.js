const getStringDate = ISODate => {

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const daysOfWeak = [
        "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"
    ];

    const date = new Date(ISODate);

    const day = date.getDay()+1;
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${daysOfWeak[day - 1]}, ${dayOfMonth} de ${months[month]} del ${year}` ;

}
const isYearBicester = year => year % 4 === 0;
const getLastDayOfMonth = (month, year) => {
    switch(month){
        case 1: return 31;
        case 2: return (isYearBicester(year)) ? 29 : 28;
        case 3: return 31;
        case 4: return 30;
        case 5: return 29;
        case 6: return 30;
        case 7: return 31;
        case 8: return 31;
        case 9: return 30;
        case 10: return 30;
        case 11: return 30;
        case 12: return 31;
        default: return 0;
    }
}

const getMonthRange = date => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = 1;
    const lastDay = getLastDayOfMonth(month, year);
    const firstDate = new Date(year, month, firstDay, 0, 0, 0);
    const lastDate = new Date(year, month, lastDay, 23, 59, 59, 99);
    return {
        firstDate,
        lastDate
    };
}

export {getStringDate, getMonthRange};