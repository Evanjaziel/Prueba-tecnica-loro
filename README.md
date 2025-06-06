# 🧪 Prueba Técnica - QA Automation | LoroQA

Este proyecto es una prueba técnica para el puesto de QA Automation. Utilicé **Cypress** como herramienta de automatización para validar el llenado de un formulario en el sitio de pruebas proporcionado.

---

## 🔍 Descripción

El propósito principal de esta prueba es automatizar el llenado de un formulario de seguro, haciendo uso de buenas prácticas como:

- **Page Object Model (POM)** para mantener un código limpio y reutilizable.
- **Generación de datos aleatorios** con la librería `faker` para simular múltiples inputs.
- Validaciones básicas de URL, título de página y campos del formulario.
- **Captura de pantalla automática en caso de falla** al validar la dirección autocompletada.
- Simulación de flujo real de usuario desde el ingreso al sitio hasta el intento de envío del formulario.

---

## 🧠 Técnicas de testing utilizadas

- **Testing Exploratorio**: se realizaron pruebas manuales antes de automatizar, lo que permitió detectar diferencias clave entre el comportamiento manual y automatizado del formulario (como el autocompletado).
- **Testing Automatizado E2E**: con Cypress para simular el comportamiento de un usuario en el navegador.
- **Validaciones condicionales** para manejar posibles fallos (como el autocompletado incorrecto).

---

## ⚠️ Problemas detectados

Durante el testing exploratorio y la automatización, se encontraron las siguientes anomalías:

- 🧭 **La dirección autocompletada cambia al automatizar el formulario**: al escribir "San Diego Sushi", el campo autocompletado devuelve una dirección distinta (no incluye "Mission Bay Dr."), mientras que manualmente sí lo hace.  
  - Se implementó una **validación condicional** y **captura de pantalla automática** (`cy.screenshot()`) si el resultado no coincide con lo esperado.

- 🤖 **El Captcha no pudo ser automatizado**, a pesar de múltiples intentos:
  - Se revisó documentación y pruebas con distintos métodos (`iframe`, clic forzado, etc.).
  - Al parecer, el Captcha está diseñado para pruebas, pero **bloquea interacciones automatizadas** igual.
  - Se dejó este paso implementado como clic forzado, aunque no funcional en ejecución automatizada.

---

## 🧰 Tecnologías utilizadas

- ✅ Cypress v13+
- ✅ Faker.js (`@faker-js/faker`)
- ✅ JavaScript ES6+
- ✅ Visual Studio Code

---

## 🚀 Instalación y ejecución

Sigue estos pasos para instalar y correr las pruebas:

```bash
# 1. Clona el repositorio
git clone https://github.com/Evanjaziel/Prueba-tecnica-loro.git
cd Prueba-tecnica-loro

# 2. Instala las dependencias
npm install

# 3. Abre Cypress
npx cypress open



✅ Resultados esperados

El formulario se llena completamente con datos generados aleatoriamente.
La dirección se autocompleta y se valida que contenga "Mission Bay Dr.".
En caso contrario, se genera una captura (error-direccion.png).
El Captcha se intenta presionar, pero no se resuelve automáticamente, por las limitaciones ya descritas.


---

📬 *Quedo en espera de cualquier retroalimentación u observación respecto a la prueba técnica. Estoy abierto a sugerencias para mejorar y seguir aprendiendo. ¡Gracias por la oportunidad!*

