window.addEventListener('load', () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(".temperature-description");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`
      const api = `${proxy}https://api.darksky.net/forecast/c086fe7d8659ed7651fcbffc97d42e27/${lat},${long}`;

      fetch(api)
            .then(response => {
              return response.json();
            })
            .then(data => {
              const {temperature, summary, icon} = data.currently;
              //Set DOM elements from API
              temperatureDegree.textContent = temperature;
              temperatureDescription.textContent = summary;
              locationTimezone.textContent = data.timezone;
              //Conversion Formula C --> f
              const celsius = (temperature - 32) * (5 / 9);
              //Set Icon
              setIcons(icon, document.querySelector('.icon'));

              //Switch between Celsius and Fehrenhiet
              temperatureSection.addEventListener('click', () => {

                if (temperatureSpan.textContent === "F") {
                  temperatureSpan.textContent = "C";
                  temperatureDegree.textContent = Math.floor(celsius);
                } else {
                  temperatureSpan.textContent = "F";
                  temperatureDegree.textContent = temperature;
                }
              });
            })
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
