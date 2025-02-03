// import dayjs, { type Dayjs } from 'dayjs';
// import dotenv from 'dotenv';
// dotenv.config();

// // TODO: Define an interface for the Coordinates object
// interface Coordinates {
//   name: string;
//   lat: number;
//   lon: number;
//   country: string;
//   state: string;
// }

// // TODO: Define a class for the Weather object
// class Weather {
//   city: string;
//   date: Dayjs | string;
//   tempF: number;
//   windSpeed: number;
//   humidity: number;
//   icon: string;
//   iconDescription: string;
//   constructor(
//     city: string,
//     date: Dayjs | string,
//     tempF: number,
//     windSpeed: number,
//     humidity: number,
//     icon: string,
//     iconDescription: string
//   ) {
//     this.city = city;
//     this.date = date;
//     this.tempF = tempF;
//     this.windSpeed = windSpeed;
//     this.humidity = humidity;
//     this.icon = icon;
//     this.iconDescription = iconDescription;
//   }
// }

// // TODO: Complete the WeatherService class
// class WeatherService {
  
//   private baseURL?: string;

//   private apiKey?: string;

//   private city = '';

//   constructor() {
//     this.baseURL = process.env.API_BASE_URL || 'https://api.openweathermap.org';

//     this.apiKey = process.env.API_KEY || 'b189d7005e52d97021e45dd94dd266ea';
//   }
//   // * Note: The following methods are here as a guide, but you are welcome to provide your own solution.
//   // * Just keep in mind the getWeatherForCity method is being called in your
//   // * 09-Servers-and-APIs/02-Challenge/Develop/server/src/routes/api/weatherRoutes.ts file
  
//   // * the array of Weather objects you are returning ultimately goes to
//   // * 09-Servers-and-APIs/02-Challenge/Develop/client/src/main.ts

//   // TODO: Create fetchLocationData method
//   private async fetchLocationData(query: string) {
//     const response = await fetch(`${this.buildGeocodeQuery(query)}`)
//     if (!response.ok) {
//       throw new Error('Failed to fetch location data.');
//     }
//     const data = await response.json();
//     return this.destructureLocationData(data);
//   }
//   // TODO: Create destructureLocationData method
//   private destructureLocationData(locationData: Coordinates): Coordinates {
//     const { lat, lon } = locationData[0];
//     return { latitude: lat, longitude: lon};
//   }
//   // TODO: Create buildGeocodeQuery method
//   private buildGeocodeQuery(city: string): string {
    
//     const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.apiKey}`;
//     return URL;
//   }  
//   // TODO: Create buildWeatherQuery method
//   private buildWeatherQuery(coordinates: Coordinates): string {
//     return `${this.baseURL}weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
//   }
//   // TODO: Create fetchAndDestructureLocationData method
//   private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
//     return await this.fetchLocationData(city);
//   }
//   // TODO: Create fetchWeatherData method
//   private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
//     const response = await fetch(this.buildWeatherQuery(coordinates));
//     if (!response.ok) {
//       throw new Error('Failed to fetch weather data.'); 
//     }
//     return await response.json();
//   }
//   // TODO: Build parseCurrentWeather method
//   private parseCurrentWeather(response: Record<string, any>) {

//     const currentWeather = {
//       city: response.name,
//       date: new Date(response.dt*1000).toLocaleDateString(),
//       icon: response.weather[0].icon,
//       description: response.weather[0].description,
//       tempF: response.main.temp,
//       humidity: response.main.humidity,
//       windSpeed: response.wind.speed
//     };
//     if (!response ) { 
//       throw new Error('Failed to obtain current weather.');
//     }  
//     return currentWeather;
//   }
//   // TODO: Complete buildForecastArray method
//   private buildForecastArray(weatherData: WeatherData ): Array<{
//     city: string;
//     date: string;
//     icon: string;
//     description: string;
//     tempF: number;
//     humidity: number;
//     windSpeed: number;
//     }> {
//     const forecastData = weatherData.list.filter((_data, i) => i % 8 === 0);
//     const forecastArray = forecastData.map((data) => {
//       const currentWeather = {
//         city: weatherData.city.name,
//         date: new Date(data.dt*1000).toLocaleDateString(),
//         icon: data.weather[0].icon,
//         description: data.weather[0].description,
//         tempF: data.main.temp,
//         humidity: data.main.humidity,
//         windSpeed: data.wind.speed
//       };
//       return currentWeather;
//     });
//     return forecastArray;
    
//   }

//   private buildForecastQuery(coordinates: Coordinates): string {
//     return `${this.baseURL}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
//   }

//   private async fetchForecastData(coordinates: Coordinates): Promise<any> {
//     const response = await fetch(this.buildForecastQuery(coordinates));
//     if (!response.ok) {
//       throw new Error('Failed to fetch forecast data.');
//     }
//     return await response.json();
//   }  // TODO: Complete getWeatherForCity method
//   async getWeatherForCity(city: string) {
//     const coordinates = await this.fetchAndDestructureLocationData(city);
//     const weatherData = await this.fetchWeatherData(coordinates);
//     const currentWeather = this.parseCurrentWeather(weatherData);
//     const forecastData = await this.fetchForecastData(coordinates);
//     const forecast = this.buildForecastArray(forecastData);
//     return { forecast, currentWeather };    this.city = city
//     const coordinates = this.fetchAndDestructureLocationData()
//   }
// }

// export default new WeatherService();

import { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// Coordinates interface
interface Coordinates {
  // name: string;
  lat: number;
  lon: number;
  // country: string;
  // state: string;
}

// Weather class definition
class Weather {
  city: string;
  date: Dayjs | string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;
  
  constructor(
    city: string,
    date: Dayjs | string,
    tempF: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    iconDescription: string
  ) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

// WeatherService class definition
class WeatherService {
  private baseURL?: string;
  private apiKey?: string;
  private city = '';

  constructor() {
    this.baseURL = process.env.API_BASE_URL || 'https://api.openweathermap.org';
    this.apiKey = process.env.API_KEY || 'b189d7005e52d97021e45dd94dd266ea';
  }

  // Fetch location data by city name
  private async fetchLocationData(query: string) {
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error('Failed to fetch location data.');
    }
    const data = await response.json();
    return this.destructureLocationData(data);
  }

  // Destructure location data to get coordinates
  private destructureLocationData(locationData: Coordinates[]): Coordinates {
    const { lat, lon } = locationData[0]; // Assuming the first result is the best match
    let coordinates: Coordinates = {lat, lon}
    return coordinates;
  }

  // Build the geocode query URL
  private buildGeocodeQuery(): string {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=5&appid=${this.apiKey}`;
  }

  // Build the weather query URL
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

  // Fetch weather data by coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    if (!response.ok) {
      throw new Error('Failed to fetch weather data.');
    }
    return await response.json();
  }

  // Parse current weather from the response
  private parseCurrentWeather(response: Record<string, any>) {
    if (!response) {
      throw new Error('Failed to obtain current weather.');
    }

    const currentWeather = {
      city: response.name,
      date: new Date(response.dt * 1000).toLocaleDateString(),
      icon: response.weather[0].icon,
      description: response.weather[0].description,
      tempF: response.main.temp,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
    };
    return currentWeather;
  }

  // Build the forecast query URL
  private buildForecastQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

  // Fetch forecast data by coordinates
  private async fetchForecastData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildForecastQuery(coordinates));
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data.');
    }
    return await response.json();
  }

  // Build forecast array from the response
  private buildForecastArray(weatherData: any): Array<Weather> {
    const forecastData = weatherData.list.filter((_data: any, i: number) => i % 8 === 0);
    return forecastData.map((data: any) => {
      return new Weather(
        weatherData.city.name,
        new Date(data.dt * 1000).toLocaleDateString(),
        data.main.temp,
        data.wind.speed,
        data.main.humidity,
        data.weather[0].icon,
        data.weather[0].description
      );
    });
  }

  // Complete method to get weather for the city
  async getWeatherForCity(city: string) {
    this.city = city 
    const coordinates = await this.fetchLocationData(this.buildGeocodeQuery());
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastData = await this.fetchForecastData(coordinates);
    const forecast = this.buildForecastArray(forecastData);
    return { forecast, currentWeather };
  }
}

export default new WeatherService();
