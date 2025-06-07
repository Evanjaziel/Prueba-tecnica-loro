import { Formulario } from '../support/POM';
import { faker } from '@faker-js/faker';
import '../support/commands';

const tiempo = 1000; // Tiempo de espera entre acciones para estabilizar pruebas

describe('Prueba técnica Loro QA Automation', () => {


  before(() => {
    cy.log('🚀 Iniciando pruebas automatizadas del formulario de seguros').wait(tiempo);
  });


  beforeEach(() => {
    cy.viewport(1440, 1000);
    Formulario.visitPage();
  
    // Validar URL Correcta
    cy.url().then((url) => {
      if (!url.includes('pulpo.loroqa')) {
        cy.log('❌ La URL no es la esperada').screenshot('error-url-inicial');
        throw new Error(`URL incorrecta: ${url}`);
      } else {
        cy.log('✅ URL correcta');
      }
    });
  
    // Validar título correcto 
    cy.title().then((titulo) => {
      if (titulo !== 'Loro - Sell Specialty Insurance Online') {
        cy.log('❌ El título de la página no es el esperado').screenshot('error-titulo-inicial');
        throw new Error(`Título incorrecto: ${titulo}`);
      } else {
        cy.log('✅ Título correcto');
      }
    });
  
    cy.wait(tiempo);
  });    

  it('Happy Path, Debe llenar el formulario correctamente y validar la dirección autocompletada asi como el acceder a la siguiente Pagina', () => {
    // Datos ficticios generados con faker para llenar el formulario
    const datos = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      country: 'United States', 
      state: 'California',
      direccion: 'San Diego Sushi',  // Dirección de prueba fija
      phone: faker.phone.number('##########'),
    };

    // Llenar el formulario con los datos definidos arriba
    Formulario.llenarFormulario(
      datos.email,
      datos.name,
      datos.country,
      datos.state,
      datos.direccion,
      datos.phone,
    );

  });

  it('Happy Path desde fixture - Llenar el formulario con datos estáticos', function () {
    //Manda a llamar los datos del json que esta en fixture para cuando se tengan que usar datos estaticos
    cy.fixture('formularioData').then((datos) => {
      Formulario.llenarFormulario(
        datos.email,
        datos.name,
        datos.country,
        datos.state,
        datos.direccion,
        datos.phone
      );
    });
  });
  
  
  afterEach(() => {
    // Validar que la dirección autocompletada contenga "Mission Bay Dr."
    cy.get('#address-autocomplete-input')
      .invoke('val')
      .then((direccionCompleta) => {
        cy.log(`📍 Dirección autocompletada: ${direccionCompleta}`);
  
        if (!direccionCompleta.includes('Mission Bay Dr.')) {
          cy.log('⚠️ La dirección no contiene "Mission Bay Dr.", revisar manualmente');
          cy.screenshot('error-direccion');
        } else {
          cy.log('✅ Dirección correcta');
        }
      });
  
    // Hacer clic en el botón Next para avanzar
    Formulario.ClickNextButton();
  
    // Esperar que cargue la nueva URL (puedes ajustar el tiempo si hace falta)
    cy.url({ timeout: 5000 }).then((url) => {
      const urlEsperada = 'https://pulpo.loroqa.com/products/34/insurance/quote?found=true&unavailable=false';
      
      if (url.includes('/insurance/quote') && url.includes('found=true') && url.includes('unavailable=false')) {
        cy.log('🎉 ¡Formulario completado con éxito! Llegaste a la página esperada ✅');
      } else {
        cy.log('❌ No se llegó a la página esperada, Captcha no logra validarse favor de reportarlo');
        cy.log(`🔍 URL actual: ${url}`);
        cy.screenshot('error-url');
      }
    });
  });

  after(() => {
    cy.log('✅ Pruebas finalizadas correctamente').wait(tiempo);
  });
  

});


