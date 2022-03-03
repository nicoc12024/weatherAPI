const container = document.querySelector(".container");
const result = document.getElementById("result");
const form = document.getElementById("form");

form.addEventListener("submit", searchWeather);

// Get values from form
function searchWeather(e) {
  e.preventDefault();
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;

  if (city === "" || country === "") {
    showErorr("Both fields are mandatory");
    return;
  }

  checkInfoWithAPI(city, country);
}

// Display error and remove after 3s
function showErorr(msg) {
  const alert = document.querySelector(".alert");

  if (!alert) {
    const alert = document.createElement("div");
    alert.classList.add("mb-2", "mt-3", "alert");
    alert.innerHTML = `
    <p class="btn btn-danger p-3 w-75 mx-auto d-block"> <strong class="bold">Error! </strong> ${msg}</p>
    `;

    form.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

function checkInfoWithAPI(city, country) {
  const appId = "ea73fa9ec03fb5f5e7889b365a3ab0d3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

  fetch(url)
    .then((asnwer) => asnwer.json())
    .then((data) => {
      if (data.cod === "404") {
        showErorr("City not found");
        return;
      }
      showWeather(data);
    });
}

function showWeather(data) {
  deleteHTML();

  const {
    main: { temp, temp_max, temp_min },
  } = data;
  const celsius = parseInt(temp - 275.15);
  const celsiusMin = parseInt(temp_min - 275.15);
  const celsiusMax = parseInt(temp_max - 275.15);

  const actualTemp = document.createElement("p");
  actualTemp.classList.add("text-center", "celsius", "text-white", "bold");
  actualTemp.innerHTML = `
  Actual ${celsius} °C
  `;

  const row = document.createElement("div");
  row.classList.add("row");
  const pMinTemp = document.createElement("p");
  const pMaxTemp = document.createElement("p");

  pMinTemp.classList.add("text-center", "col", "celsiusMin", "text-white", "bold");
  pMaxTemp.classList.add("text-center", "col", "celsiusMax", "text-white", "bold");
  pMaxTemp.innerHTML = `Max ${celsiusMax}  °C`;
  pMinTemp.innerHTML = `Min ${celsiusMin}  °C`;

  row.appendChild(pMinTemp);
  row.appendChild(pMaxTemp);
  result.appendChild(actualTemp);
  result.appendChild(row);
}

function deleteHTML() {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}
