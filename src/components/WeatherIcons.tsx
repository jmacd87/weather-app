import SunnyIcon from '../assets/wi-day-sunny.svg'
import CloudyIcon from '../assets/wi-cloudy.svg'
import SnowyIcon from '../assets/wi-snow.svg'
import RainyIcon from '../assets/wi-showers.svg'
import StormyIcon from '../assets/wi-thunderstorm.svg'

const WeatherIcons = (props: any) => {
    const { weather, size } = props
    const getIcon = () => {
        switch (weather) {
            case 'Clouds':
                return CloudyIcon
            case 'Clear':
                return SunnyIcon
            case 'Rain':
                return RainyIcon
            case 'Snow':
                return SnowyIcon
            case 'Thunderstorm':
                return StormyIcon
            default:
                return CloudyIcon
        }
    }
    return (
        <img src={getIcon()} alt="Icon" width={size ? size : ''} />
    )
}
export default WeatherIcons