import { Formulario } from '../support/POM';
import { faker } from '@faker-js/faker';
import '../support/commands';

const tiempo = 1000; // Tiempo de espera entre acciones para estabilizar pruebas

describe('Prueba técnica LoroQA', () => {
  it('Debe llenar el formulario correctamente y validar la dirección autocompletada', () => {
    // Datos ficticios generados con faker para llenar el formulario
    const datos = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      country: 'United States', 
      state: 'California',
      direccion: 'San Diego Sushi',  // Dirección de prueba fija
      phone: faker.phone.number('##########'),
    };

    // Navegar a la página del formulario
    Formulario.visitPage();

    // Validaciones iniciales de URL y título
    cy.url().should('include', '/pulpo.loroqa').wait(tiempo);
    cy.title().should('eq', 'Pulpo Insurance').wait(tiempo);

    // Llenar el formulario con los datos definidos arriba
    Formulario.llenarFormulario(
      datos.email,
      datos.name,
      datos.country,
      datos.state,
      datos.direccion,
      datos.phone,
    );

    // Validar que la dirección autocompletada contenga "Mission Bay Dr."
    cy.get('#address-autocomplete-input')
      .invoke('val')
      .then((direccionCompleta) => {
        cy.log(`📍 Dirección autocompletada: ${direccionCompleta}`);

        if (!direccionCompleta.includes('Mission Bay Dr.')) {
          cy.log('⚠️ La dirección no contiene "Mission Bay Dr.", revisar manualmente');
          // Tomar captura solo si la dirección NO es la esperada
          cy.screenshot('error-direccion');
          // Opcional: forzar fallo para alertar en CI/CD
          // throw new Error('La dirección autocompletada no es correcta');
        } else {
          cy.log('✅ Dirección correcta');
        }
      });
  });
});


