import React, { useState, useEffect } from "react"
import { WeatherData, List } from "../types"
import { fetchWeatherData } from "../api";
import { Button, Card, Grid, Container, Typography, CircularProgress } from '@mui/material';
import WeatherIcons from './WeatherIcons'

interface Style {
    color: string;
    fontWeight: number;
    letterSpacing: number;
}

const WeatherWidget = () => {
    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [city, setCity] = useState<string>("Ottawa");
    const color: string = "#EEF6FB"
    useEffect(() => {
        setTimeout(() => {
            fetchWeather("Ottawa")
        }, 400
        )
    }, [])
    const fetchWeather = async (cityName: string) => {
        const response: WeatherData = await fetchWeatherData(cityName)
        setWeatherData(response)
    };
    const handleClickCity = (newCity: string) => {
        setCity(newCity)
        fetchWeather(newCity)
    }
    const getDayName = (dateNum: number) => {
        const date = new Date(dateNum * 1000);
        return date.toLocaleString('en-us', { weekday: 'short' });
    }

    let filteredList: any = weatherData?.list.filter((day: List) => {
        return day.dt_txt.endsWith("21:00:00");
    })
    const selected: Style = {
        color: "",
        fontWeight: 900,
        letterSpacing: 1
    }
    return (
        <React.Fragment>
            <div style={{ display: "inline-block", marginTop: 20, justifyContent: "center" }}>
                <Button size="large" disableRipple sx={city === "Ottawa" ? { ...selected } : { color: 'black', letterSpacing: 1 }} onClick={() => handleClickCity("Ottawa")} >Ottawa</Button>
                <Button size="large" disableRipple sx={city === "Moscow" ? { ...selected } : { color: 'black', letterSpacing: 1 }} onClick={() => handleClickCity("Moscow")} >Moscow</Button>
                <Button size="large" disableRipple sx={city === "Tokyo" ? { ...selected } : { color: 'black', letterSpacing: 1 }} onClick={() => handleClickCity("Tokyo")} >Tokyo</Button>
            </div>
            <Container maxWidth="sm" sx={{ mt: 3, mb: 3 }}>
                {weatherData ?
                    <Card raised={true} id="wrapper" sx={{ textAlign: "center", backgroundColor: color, border: "4px solid white", mt: 3, borderRadius: 2 }}>
                        <Typography sx={{ mt: 3, fontFamily: 'Roboto', fontWeight: 300 }} variant="h5">Today</Typography>
                        <Grid container justifyContent="center">
                            <Grid item xs={6} sm={4} sx={{ mr: 2, mt: 0 }}>
                                {filteredList &&
                                    <WeatherIcons weather={filteredList[0]?.weather[0].main} size={220} />
                                }
                            </Grid>
                            <Grid item xs={4} sm={2} sx={{ mt: 3 }}>
                                <Typography sx={{ fontSize: 66, lineHeight: 1, mt: 2, fontFamily: 'Teko' }}><strong>{weatherData ? Math.round(weatherData?.list[0].main.temp) : null}°</strong></Typography>
                                <Typography sx={{ fontSize: 26, textAlign: "left", ml: 1.5, lineHeight: 1, fontFamily: 'Roboto', fontWeight: 300 }}>
                                    {filteredList && filteredList[0]?.weather[0].main}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
                            {filteredList?.map((dayOfWeek: any, index: any) => (index > 0) && (
                                <Grid item key={index} xs={3} sx={{ bgColor: color, borderRight: index !== 4 ? "4px solid white" : "none", borderTop: "4px solid white" }}>
                                    <Typography variant="h6" sx={{ pt: 1, fontWeight: 1 }}>
                                        {getDayName(dayOfWeek.dt)}
                                    </Typography>
                                    <WeatherIcons weather={dayOfWeek?.weather[0].main} size={80} />
                                    <Typography sx={{ lineHeight: 1, fontSize: 36, pb: 2, fontFamily: 'Teko', }} > <strong>{weatherData ? Math.round(dayOfWeek.main.temp) : null}°</strong></Typography>
                                </Grid>)
                            )}
                        </Grid>
                    </Card> : <CircularProgress sx={{ mt: 16 }} />}
            </Container>
        </React.Fragment>)
}
export default WeatherWidget