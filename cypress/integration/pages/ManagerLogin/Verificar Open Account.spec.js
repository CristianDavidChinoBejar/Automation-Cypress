///<reference types="Cypress"/>

import Pantalla_Inicial_Page from '../../../pagesObjects/Pantalla_Inicial_Page'
import Customer_Page from '../../../pagesObjects/Customer_Page'
import Manager_Page from '../../../pagesObjects/Manager_Page'

describe('Funcional - Verificar Open Account', () => { 
    const pantalla_inicial = new Pantalla_Inicial_Page()
    const customer = new Customer_Page()
    const manager = new Manager_Page()

    beforeEach(()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit(Cypress.env("customer"))
    })

    it('Open Account - Verificar nueva cuenta a cliente', () => {
        pantalla_inicial.seleccionarOpcion(2)
        customer.botonLogin().click()
        cy.get('#accountSelect').then(cantidadDeCuentas =>{
            let cuentas = cantidadDeCuentas[0].innerText.split("\n")
            expect(cuentas.length).to.be.eq(3)
        })
        pantalla_inicial.botonHome().click()
        pantalla_inicial.botonManagerLogin().click()
        cy.wait(1000)
        cy.selectButton('Open Account').click()
        
        cy.get(':nth-child(1) > label').should('have.text','Customer :')
        cy.get('#userSelect').select(2)
        cy.get(':nth-child(2) > label').should('have.text','Currency :')
        cy.get('#currency').select(3)

        manager.botonProcess().click()
        cy.redireccionCustomerLogin()

        pantalla_inicial.seleccionarOpcion(2)
        customer.botonLogin().click()

        cy.get('#accountSelect').then(cantidadDeCuentas =>{
            let cuentas = cantidadDeCuentas[0].innerText.split("\n")
            expect(cuentas.length).to.be.greaterThan(3)
        })
    })
})