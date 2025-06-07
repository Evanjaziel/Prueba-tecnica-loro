# 🧪 Prueba Técnica - QA Automation | LoroQA

Este proyecto es una prueba técnica para el puesto de QA Automation. Se utilizó Cypress como herramienta de automatización para validar el llenado de un formulario en el sitio de pruebas proporcionado.

---

## 🔍 Descripción

El propósito principal de esta prueba es automatizar el flujo de llenado de un formulario de seguros, aplicando buenas prácticas como:

- 🧱 **Page Object Model (POM)** para mantener un código limpio y reutilizable.
- 🎲 **Generación de datos aleatorios** con Faker para simular múltiples inputs.
- 🧩 **Validaciones de URL, título de página** y campos del formulario.
- 📸 **Captura de pantalla automática** ante fallos de validación.
- 🧭 **Simulación del flujo real** desde el ingreso al sitio hasta la navegación hacia la siguiente página.

---

## 🧠 Técnicas de Testing Utilizadas

- 🔍 **Testing Exploratorio**: Se realizaron pruebas manuales previas para detectar comportamientos distintos entre la interacción humana y automatizada (como el autocompletado de dirección).
- 🤖 **Testing Automatizado E2E** con Cypress, simulando el comportamiento de un usuario.
- ⚙️ **Validaciones condicionales** para manejar comportamientos variables o inesperados (como direcciones autocompletadas distintas).

---

## ⚠️ Problemas Detectados

### ✅ Dirección Autocompletada

- Se detectó que la dirección autocompletada a veces no coincidía con "Mission Bay Dr.".
- Este comportamiento fue corregido, y ahora se valida correctamente que la dirección final contenga `"Mission Bay Dr."`.
- Si no se cumple, se genera una captura de pantalla (`error-direccion.png`) y se muestra un mensaje de advertencia.

### 🧱 Captcha no automatizable

- A pesar de múltiples intentos (clic forzado, interacción vía iframe), el Captcha **no puede resolverse mediante automatización**.
- Se documentó esta limitación y se simula la interacción con un clic forzado, aunque no permite avanzar realmente.

---

## 🧰 Tecnologías Utilizadas

- ✅ Cypress v13+
- ✅ Faker.js (`@faker-js/faker`)
- ✅ JavaScript ES6+
- ✅ Visual Studio Code

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para instalar y correr las pruebas:

```bash
# 1. Clona el repositorio
git clone https://github.com/Evanjaziel/Prueba-tecnica-loro.git
cd Prueba-tecnica-loro

# 2. Instala las dependencias
npm install

# 3. Abre Cypress
npx cypress open
