///<reference types="Cypress"/>

describe('Funcional - Verificar Open Account', () => { 
    beforeEach(()=>{
        // cy.clearCookies()
        // cy.clearLocalStorage()
        // cy.visit(Cypress.env("account"))
        // cy.visit(Cypress.env("openAccount"))
        cy.visit(Cypress.env("customer"))
    })

    it('Open Account - Verificar nueva cuenta a cliente', () => {
        cy.get('#userSelect').select(2)
        cy.get('button').contains('Login').click()

         cy.get('#accountSelect').then(cantidadDeCuentas =>{
            let cuentas = cantidadDeCuentas[0].innerText.split("\n")
            expect(cuentas.length).to.be.eq(3)

        })
        cy.get('button').contains('Home').click()
        cy.get('button').contains('Bank Manager Login').click()
        cy.wait(1000)
        cy.get('[ng-class="btnClass2"]').click()
        
        cy.get(':nth-child(1) > label').should('have.text','Customer :')
        cy.get('#userSelect').select(2)
        cy.get(':nth-child(2) > label').should('have.text','Currency :')
        cy.get('#currency').select(3)

        cy.get('button').contains('Process').click()

        cy.get('button').contains('Home').click()
        cy.get('button').contains('Customer Login').click()

        cy.get('#userSelect').select(2)
        cy.get('button').contains('Login').click()

        cy.get('#accountSelect').then(cantidadDeCuentas =>{
            let cuentas = cantidadDeCuentas[0].innerText.split("\n")
            expect(cuentas.length).to.be.greaterThan(3)
        })
    })
})