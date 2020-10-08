export default class DataService {
  baseUrl = "https://api.openweathermap.org/data/2.5/";
  apiKey = "b71d73f8b937fc881ba7e49af2d32f3f";

  async getCurrentByCity(city) {
    const url = `${this.baseUrl}weather?q=${city}&appid=${this.apiKey}&units=metric&lang=ru`;
    let result = await fetch(url, {
      method: "GET",
      dataType: "json",
    });
    result = await result.json();
    return result;
  }

  async getCurrentByCoordinates(lat, lon) {
    const url = `${this.baseUrl}weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=ru`;
    let result = await fetch(url, {
      method: "GET",
      dataType: "json",
    });
    result = await result.json();
    return result;
  }
}
