// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import Pantalla_Inicial_Page from '../pagesObjects/Pantalla_Inicial_Page'
import Customer_Page from '../pagesObjects/Customer_Page'

const pantalla_inicial = new Pantalla_Inicial_Page()
const customer = new Customer_Page()

Cypress.Commands.add('cuentaDeposit', (cuenta) =>{
    pantalla_inicial.seleccionarOpcion(cuenta)
        customer.botonLogin().click()
        cy.wait(1000);
        customer.botonDeposit().click()
})

Cypress.Commands.add('cuentaWithdrawl', (cuenta) =>{
    pantalla_inicial.seleccionarOpcion(cuenta)
        customer.botonLogin().click()
        cy.wait(1000);
        customer.botonWithdrawl().click()
})

Cypress.Commands.add('redireccionCustomerLogin', () =>{
    pantalla_inicial.botonHome()
        .should('have.text','Home').click()
    
    cy.get('button').contains('Customer Login')
        .should('have.text','Customer Login').click()
    
    cy.url().should(
        'be.equal',
        `${Cypress.config("baseUrl")}customer`
    )
})
