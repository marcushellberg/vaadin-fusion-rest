package com.example.application;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.server.connect.Endpoint;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;

@Endpoint
@AnonymousAllowed
public class WeatherEndpoint {

  @Value("${weather.api.key}")
  private String apiKey;
  private WebClient client;

  public WeatherEndpoint(WebClient.Builder builder) {
    this.client = builder.baseUrl("https://api.openweathermap.org/data/2.5/weather").build();
  }

  public Weather getWeather(Double lat, Double lon) {
    return client.get().uri(uri -> uri.path("/")
        .queryParam("lat", lat.toString())
        .queryParam("lon", lon.toString())
        .queryParam("units", "metric")
        .queryParam("apiKey", apiKey)
        .build())
        .retrieve()
        .toEntity(Weather.class)
        .block()
        .getBody();
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Weather {
    public String name;
    public Main main;
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Main {
    public Double temp;
    public Double humidity;
  }

}
