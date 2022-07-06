///<reference types="Cypress"/>

import Pantalla_Inicial_Page from '../../../pagesObjects/Pantalla_Inicial_Page'

describe('Funcional - Verificar botones en la pantalla Home', () => { 
    const pantalla_inicial = new Pantalla_Inicial_Page()

    beforeEach(()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit(Cypress.env("login"))
    })
    
    it('Verificar botones en la pantalla Home - botón.Home', () => {
        pantalla_inicial.botonHome()
            .should('have.text','Home').click()
            
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}login`
          )
    })
    
    it('Verificar botones en la pantalla Home - botón.CustomerLogin', () => {
        pantalla_inicial.botonCustomerLogin()
            .should('have.text','Customer Login').click()

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}customer`
          )
    })
    
    it('Verificar botones en la pantalla Home - botón.BankManagerLogin', () => {
        pantalla_inicial.botonManagerLogin()
            .should('have.text','Bank Manager Login').click()
        
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}manager`
          )
    })
 })