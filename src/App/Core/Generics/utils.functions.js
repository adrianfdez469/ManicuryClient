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
export {getStringDate};