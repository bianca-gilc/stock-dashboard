export const convertDateToUnixTimeStamp = (date) => {
    //return Math.floor(date.getTime() / 1000);
    return date.getTime();
};

export const convertUnixTimeStampToDate = (unixTimeStamp) => {
    const milliseconds = unixTimeStamp;
    return new Date(milliseconds).toLocaleDateString();
};

export const convertUnixTimeStampToTime = (unixTimeStamp) => {
    const milliseconds = unixTimeStamp;
    return new Date(milliseconds).toLocaleTimeString([], {timeStyle: "short"});
};

export const createDate = (date, days, weeks, months, years) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days + 7 * weeks);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
};