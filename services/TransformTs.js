export default function unixToNormal(unix) {
  let time;
  if (unix !== undefined) {
    const date = new Date(unix);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).substr(-2);
    const day = ("0" + date.getDate()).substr(-2);
    const hours = ("0" + date.getHours()).substr(-2);
    const minutes = ("0" + date.getMinutes()).substr(-2);
    const seconds = ("0" + date.getSeconds()).substr(-2);
    time =
      day +
      "-" +
      month +
      "-" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    return time;
  } else {
    time = "не указано";
    return time;
  }
}
