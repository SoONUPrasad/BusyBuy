
// this is date File
const CurrentDate = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${"-"}${month < 10 ? `0${month}` : `${month}`}${"-"}${year}`;
};

export default CurrentDate;
