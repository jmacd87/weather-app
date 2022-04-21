const baseUrl = 'https://api.openweathermap.org/data/2.5';
const apiKey = "2a13ea30a4882ef3c4f6ca3c0dda3dcc"

export const fetchWeatherData = async (city: string) => {
    let url = `${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;
    return await (await fetch(url)).json();
};