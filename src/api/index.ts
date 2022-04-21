const baseUrl = 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.REACT_APP_API_KEY

export const fetchWeatherData = async (city: string) => {
    let url = `${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;
    return await (await fetch(url)).json();
};