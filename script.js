const xhr = new XMLHttpRequest();
const urls = [
  "https://api.thingspeak.com/channels/2316782/fields/1.json?results=1",
  "https://api.thingspeak.com/channels/2316782/fields/2.json?results=1",
  "https://api.thingspeak.com/channels/2316782/fields/3.json?results=1",
  "https://api.thingspeak.com/channels/2316782/fields/4.json?results=1"
];
const datos_usar = [];

async function hacerSolicitud(url) {
  return new Promise((resolve, reject) => {
    xhr.open("GET", url);
    xhr.send();
    
    xhr.onload = () => {
      if (xhr.status === 200) {
        const datos = JSON.parse(xhr.responseText);
        const dato = datos.feeds[0];
        resolve(dato);
      } else {
        reject(new Error(`Error en la solicitud: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Error en la solicitud"));
    };
  });
}

async function obtenerDatos() {
  for (const url of urls) {
    var lista = [];
    try {
      const dato = await hacerSolicitud(url);
      lista = Object.values(dato);
      datos_usar.push(lista[2]); // Puedes acceder al campo que desees aquí
    } catch (error) {
      console.error(error.message);
    }
  }

  console.log("Datos a usar:", datos_usar);


// Crear un elemento de lista ul
const listaUl = document.createElement("ul");

// Recorrer los datos y agregar elementos li a la lista ul
datos_usar.forEach(dato => {
  const elementoLi = document.createElement("li");
  elementoLi.textContent = dato;
  listaUl.appendChild(elementoLi);
});

// Mostrar la lista en el elemento con id "resultado"
const resultadoDiv = document.getElementById("resultado");
resultadoDiv.appendChild(listaUl);
}

obtenerDatos();