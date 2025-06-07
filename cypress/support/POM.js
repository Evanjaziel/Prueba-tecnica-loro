const tiempo = 1000; // Tiempo de espera entre acciones para estabilizar pruebas

class FormularioPage {

  // Navegar a la URL del formulario con autenticación básica
  visitPage() {
    cy.visit('https://loro:GDL2025@pulpo.loroqa.com/products/34/details');
  }

  // Selectores agrupados para mejor mantenimiento y legibilidad
  get = {
    EmailField: () => cy.get('[data-test="input-email"]'),
    NameField: () => cy.get('[data-test="input-insured-name"]'),
    CountryField: () => cy.get('[data-test="menu-options-input"]'),
    StateField: () => cy.get('.mat-mdc-select-placeholder'),
    AddressField: () => cy.get("#address-autocomplete-input"),
    AddressSuggestion: () => cy.get(".pac-item").eq(0), // Primera sugerencia de autocompletar dirección
    CodeField: () => cy.get('#mat-select-value-1'),
    PhoneField: () => cy.get('mat-label.ng-tns-c3736059725-9'),
    DateField: () => cy.get('mat-label.ng-tns-c3736059725-6'),
    Captcha: () => cy.get('[style="width: 304px; height: 78px;"] > div > iframe'),
    NextButton: () => cy.get('[data-test="button-submit-form"] > .p-ripple')
  }

  /**
   * Método para llenar el formulario con los datos necesarios.
   * @param {string} email - Correo electrónico
   * @param {string} name - Nombre completo
   * @param {string} country - País
   * @param {string} state - Estado (solo si país es USA)
   * @param {string} direccion - Dirección para autocompletar
   * @param {string} phone - Teléfono
   * @param {string} fecha - Fecha (no usada, por ahora fija)
   */
  llenarFormulario(email, name, country, state, direccion, phone) {
    this.get.EmailField().type(email).wait(tiempo);
    this.get.NameField().type(name).wait(tiempo);
    this.get.CountryField().clear().type(`${country}{enter}`).wait(tiempo);

    // Si el país es Estados Unidos, seleccionar estado
    if (country === "United States") {
      this.get.StateField().click().wait(tiempo);
      cy.contains("mat-option", state).click().wait(tiempo);
    }

    // Escribir dirección y seleccionar primera sugerencia
    this.get.AddressField()
    .clear()
    .type(`${direccion}{downarrow}{enter}`, { delay: 250 }) // esto sí selecciona la dirección
    .wait(tiempo);
  

    // Código (selección aleatoria)
    this.get.CodeField().click().wait(tiempo);
    cy.get('mat-option').should('have.length.greaterThan', 0).then($options => {
      const total = $options.length;
      const randomIndex = Math.floor(Math.random() * total);
      cy.wrap($options[randomIndex]).click().wait(tiempo);
    });

    // Teléfono
    this.get.PhoneField().type(phone).wait(tiempo);

    // Selección de fecha fija mediante clicks en calendario
    this.get.DateField().click().wait(tiempo).then(() => {
      cy.get('.mdc-button__label > span').click().wait(tiempo);
      cy.get('#mat-datepicker-0 > div > mat-multi-year-view > table > tbody > tr:nth-child(6) > td:nth-child(4) > button').click().wait(tiempo);
      cy.get('#mat-datepicker-0 > div > mat-year-view > table > tbody > tr:nth-child(3) > td:nth-child(3) > button > span.mat-calendar-body-cell-content.mat-focus-indicator').click().wait(tiempo);
      cy.get('#mat-datepicker-0 > div > mat-month-view > table > tbody > tr:nth-child(2) > td:nth-child(2) > button > span.mat-calendar-body-cell-content.mat-focus-indicator').click().wait(tiempo);
    });

    // Captcha - solo clic forzado para evitar problemas
    this.get.Captcha().click({ force: true }).wait(tiempo);


  }

  ClickNextButton(){
        // Botón para avanzar o enviar formulario
        this.get.NextButton().click().wait(tiempo);

  }

}

export const Formulario = new FormularioPage();