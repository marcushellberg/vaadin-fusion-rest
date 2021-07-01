import { customElement, html, state } from 'lit-element';
import { View } from '../../views/view';
import '@vaadin/vaadin-button';
import Weather from 'Frontend/generated/com/example/application/WeatherEndpoint/Weather';
import { WeatherEndpoint } from 'Frontend/generated/WeatherEndpoint';

@customElement('empty-view')
export class EmptyView extends View {
  @state()
  weather: Weather | undefined;
  @state()
  loading = false;

  render() {
    return html`
      <h1>Weather app</h1>
      <vaadin-button @click=${this.fetchWeather} theme="primary" ?disabled=${this.loading}>
        ${this.loading ? 'Loading weather...' : 'Fetch weather'}
      </vaadin-button>

      ${this.weather
        ? html`
            <h2>Weather for ${this.weather.name}</h2>
            <ul>
              <li>${this.weather.main.temp}&deg;C</li>
              <li>${this.weather.main.humidity}% humidity</li>
            </ul>
          `
        : html` <p>No weather available.</p> `}
    `;
  }

  fetchWeather() {
    this.loading = true;
    navigator.geolocation.getCurrentPosition(async (position) => {
      this.weather = await WeatherEndpoint.getWeather(position.coords.latitude, position.coords.longitude);
      this.loading = false;
    });
  }
}
