const isSameDay = (date1,date2) =>{
    return(
        date1.getFullYear()=== date2.getFullYear() &&
        date1.getMonth()===date2.getMonth() &&
        date1.getDate() === date2.getDate
    )
}

const daysBetween = (date1,date2)=>{
    const d1 = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate());
    const d2 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate());

    const diffMs = d2 - d1;
    return Math.round(diffMs/(1000*60*60*24))
}


module.exports = {isSameDay,daysBetween}