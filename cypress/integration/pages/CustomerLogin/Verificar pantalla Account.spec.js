///<reference types="Cypress"/>

import Pantalla_Inicial_Page from '../../../pagesObjects/Pantalla_Inicial_Page'
import Customer_Page from '../../../pagesObjects/Customer_Page'

describe('Funcional - Verificar pantalla Account', () => { 
    const pantalla_inicial = new Pantalla_Inicial_Page()
    const customer = new Customer_Page()

    beforeEach(()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
    })
    
    it('Verificar pantalla Account - elemento.BotonHome', () => {
        cy.visit(Cypress.env("account"))
        pantalla_inicial.botonHome()
            .should('be.visible')
            .and('have.text','Home').click()
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}login`
        )
    })

    it('Verificar pantalla Account - elemento.BotonLogout', () => {
        cy.visit(Cypress.env("account"))
        pantalla_inicial.botonLogout()
            .should('be.visible')
            .and('have.text','Logout').click()
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}customer`
        )
    })

    it('Pantalla Account - Verificar mapeo de nombre seleccionado en Login a pantalla Account - elemento.NombreVariable', () => {
        cy.visit(Cypress.env("customer"))
        pantalla_inicial.seleccionarOpcion('Hermoine Granger')
        customer.botonLogin().click()
        customer.customerNombre().should('have.text', 'Hermoine Granger')
    })

    it('Pantalla Account - Verificar que el numero de cuenta seleccionado en el Dropdawn sea el que se visualiza en los datos - elemento.DropDawn', () => {
        cy.visit(Cypress.env("customer"))
        pantalla_inicial.seleccionarOpcion('Hermoine Granger')
        customer.botonLogin().click()

        cy.get('[id=accountSelect]').find('option').each(($opciones, i)=>{
            cy.get('select').select($opciones[0].text)
            customer.accountNumberInfo().should('include.text', $opciones[0].text)
        })
    })

    it('Pantalla Account - Verificar derivacion a istTx - Boton.Transactions', () => {
        cy.visit(Cypress.env("customer"))
        pantalla_inicial.seleccionarOpcion('Hermoine Granger')
        customer.botonLogin().click()
        cy.wait(500);
        customer.botonTransactions().click()

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx`
          )
    })

    it('Pantalla Account - Verificar que se visibiliza formulario - Boton.Deposit', () => {
        cy.visit(Cypress.env("customer"))
        pantalla_inicial.seleccionarOpcion('Hermoine Granger')
        customer.botonLogin().click()
        cy.wait(500);
        customer.botonDeposit().click()

        cy.get('form').should('be.visible')
        cy.get('label').should('be.visible').and('have.text', 'Amount to be Deposited :')
        cy.get('.form-control')
            .invoke('attr', 'placeholder')
            .and('contain', 'amount')
        customer.submitDeposit().should('have.text','Deposit')
    })

    it('Pantalla Account - Verificar que se visibiliza formulario - Boton.Withdrawn', () => {
        cy.visit(Cypress.env("customer"))
        pantalla_inicial.seleccionarOpcion('Hermoine Granger')
        customer.botonLogin().click()
        cy.wait(500);
        customer.botonWithdrawl().click()

        cy.get('form').should('be.visible')
        cy.get('label').should('be.visible').and('have.text', 'Amount to be Withdrawn :')
        cy.get('.form-control')
            .invoke('attr', 'placeholder')
            .and('contain', 'amount')
        customer.submitWithdraw().should('have.text','Withdraw')
    })
 })