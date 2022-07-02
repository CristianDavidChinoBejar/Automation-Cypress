///<reference types="Cypress"/>

describe('Funcional - Verificar botones en la pantalla Home', () => { 
    beforeEach(()=>{
        // cy.clearCookies()
        // cy.clearLocalStorage()
        cy.visit(Cypress.env("login"))
    })
    
    it('Verificar botones en la pantalla Home - botón.Home', () => {
        cy.get('button').contains('Home')
            .should('have.text','Home').click()
            
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}login`
          )
    })
    
    it('Verificar botones en la pantalla Home - botón.CustomerLogin', () => {
        cy.get('button').contains('Customer Login')
            .should('have.text','Customer Login').click()

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}customer`
          )
    })
    
    it('Verificar botones en la pantalla Home - botón.BankManagerLogin', () => {
        cy.get('button').contains('Bank Manager Login')
            .should('have.text','Bank Manager Login').click()
        
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}manager`
          )
    })
 })