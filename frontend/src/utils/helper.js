// export * from '/actionLocalStorage';

export const setStringToDate = (_date, _format, _delimiter) => {
   let formatLowerCase = _format?.toLowerCase();
   let formatItems = formatLowerCase?.split(_delimiter);
   let dateItems = _date?.split(_delimiter);
   let monthIndex = formatItems?.indexOf('mm');
   let dayIndex = formatItems?.indexOf('dd');
   let yearIndex = formatItems?.indexOf('yyyy');
   let month = parseInt(dateItems[monthIndex]);
   month -= 1;
   let formatedDate = new Date(
      dateItems[yearIndex],
      month,
      dateItems[dayIndex],
   );
   return formatedDate;
};

export const formatDate = (date, format, delimiter) => {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');

   const formatMap = {
      yyyy: year,
      mm: month,
      dd: day,
   };

   return format.replace(/yyyy|mm|dd/g, match => formatMap[match]);
};

export const getDateTime = date => {
   let newDate = `${date.getDate()}/${
      date.getMonth() + 1
   }/${date.getFullYear()}`;
   return newDate;
};

export const getFromLocalStorage = name => {
   return JSON.parse(localStorage.getItem(name));
};

export const saveToLocalStorage = (key, data) => {
   localStorage.setItem(key, JSON.stringify(data));
   return data;
};
