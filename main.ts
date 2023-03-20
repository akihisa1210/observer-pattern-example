interface Observer<T> {
  update(data: T): void;
}

interface Subject<T> {
  registerObserver(observer: Observer<T>): void;
  removeObserver(observer: Observer<T>): void;
  notifyObserver(date: T): void;
}

type Weather = {
  temperature: number;
  humidity: number;
};

class WeatherInfo implements Subject<Weather> {
  private observers: Observer<Weather>[] = [];
  private weather: Weather = { temperature: 0, humidity: 0 };

  registerObserver(observer: Observer<Weather>): void {
    this.observers = [...this.observers, observer];
  }

  removeObserver(observer: Observer<Weather>): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notifyObserver(): void {
    for (const observer of this.observers) {
      observer.update(this.weather);
    }
  }

  setMeasurements(weather: Weather): void {
    this.weather = weather;
    this.notifyObserver();
  }
}

class CurrentConditionsDisplay implements Observer<Weather> {
  private weather: Weather = { temperature: 0, humidity: 0 };

  update(data: Weather): void {
    this.weather = { temperature: data.temperature, humidity: data.humidity };
    this.display();
  }

  private display(): void {
    console.log(
      `Current conditions: ${this.weather.temperature}C degrees and ${this.weather.humidity}% humidity`
    );
  }
}

const weatherData = new WeatherInfo();
const currentConditionsDisplay1 = new CurrentConditionsDisplay();
const currentConditionsDisplay2 = new CurrentConditionsDisplay();

weatherData.registerObserver(currentConditionsDisplay1);
weatherData.registerObserver(currentConditionsDisplay2);

weatherData.setMeasurements({ temperature: 20, humidity: 50 });

weatherData.removeObserver(currentConditionsDisplay1);

weatherData.setMeasurements({ temperature: 30, humidity: 60 });
