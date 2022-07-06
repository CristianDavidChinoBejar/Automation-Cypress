///<reference types="Cypress"/>

import Customer_Page from '../../../pagesObjects/Customer_Page'

describe('Funcional - Verificar pantalla Customer login', () => {
    const customer = new Customer_Page()
    beforeEach(()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit(Cypress.env("customer"))
    })

    it('Verificar en pantalla Customer login - elemento.SelectOption - botonLogin.NoVisible', () => {
        cy.get('label').should('have.text','Your Name :')
        cy.get('[id=userSelect]').each($opciones=>{
            var primerOptions = $opciones[0][0].text
            expect(primerOptions).to.deep.eq('---Your Name---')
        }).select(0)
        customer.botonLogin().should('not.be.visible', 'Login')
    })
    
    it('Verificar en pantalla Customer login - elemento.SelectOption - botonLogin.Visible', () => {
        cy.get('[id=userSelect]').as('selectTag')
        cy.get('@selectTag').find('option').each(($opciones)=>{
            if ($opciones[0].text != '---Your Name---') {
                cy.get('@selectTag').select($opciones[0].text )
                customer.botonLogin().should('be.visible', 'Login')
            }
        })
    })

    it('Verificar en pantalla Customer login - elemento.SelectOption - botonLogin.derivacionAccount', () => {
        cy.intercept('GET', '/angularJs-protractor/BankingProject/customerView.html', {
            fixture: 'intercept/customer.html'
        }).as('getCustomerMock')
        cy.get('select').select('1')
        cy.get('#userSelect > option:nth-child(2)').should('have.text', 'Cris')
        customer.botonLogin().should('be.visible', 'Login').click()
        cy.wait(1000);
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}account`
          )
    })
 })