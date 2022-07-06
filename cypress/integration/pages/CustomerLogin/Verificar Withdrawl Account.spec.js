///<reference types="Cypress"/>

import Customer_Page from '../../../pagesObjects/Customer_Page'
import Pantalla_Inicial_Page from '../../../pagesObjects/Pantalla_Inicial_Page'

describe('Funcional - Verificar Withdrawl Account', () => { 
    const customer = new Customer_Page()
    const pantalla_inicial = new Pantalla_Inicial_Page()

    beforeEach(()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit(Cypress.env("customer"))
    })

    it('Withdrawl Account - Verificar input - input.CantidadSuperiorAlMontoActual', () => {
        cy.cuentaWithdrawl('Hermoine Granger')

        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            let valorRetirar = valorBalanceActual + 1;
            customer.typeTransaccion(valorRetirar)
            cy.wait(1000);
            customer.submitWithdraw().should('have.text','Withdraw').click()
            cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', valorBalanceActual)
            customer.mensajeEstado().and('have.text', 'Transaction Failed. You can not withdraw amount more than the balance.')
        })
    })

    it('Withdrawl Account - Verificar input - input.CantidadIgualAlMontoActual', () => {
        cy.cuentaWithdrawl('Hermoine Granger')
        
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            let valorRetirar = valorBalanceActual
            customer.typeTransaccion(valorRetirar)
            customer.submitWithdraw().should('have.text','Withdraw').click()
            customer.balanceInfo().should('have.text', valorBalanceActual - valorRetirar)
            customer.mensajeEstado().and('have.text', 'Transaction successful')
        })
    })
    
    it('Withdrawl Account - Verificar input - input.numeroPositivos', () => {
        let valorDepositado = 10
        cy.cuentaWithdrawl('Hermoine Granger')
        
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            cy.get('.form-control').type(valorDepositado)
            customer.submitWithdraw().should('have.text','Withdraw').click()
            cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', valorBalanceActual - valorDepositado)
            cy.get('.error').should('be.visible').and('have.text', 'Transaction successful')
        })
    })

    it('Withdrawl Account - Verificar input - input.numerosNegativos', () => {
        let valorDepositado = -10
        cy.cuentaWithdrawl('Hermoine Granger')
        
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            cy.get('.form-control').type(valorDepositado)
            customer.submitWithdraw().should('have.text','Withdraw').click()
            cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', valorBalanceActual)
        })
    })

    it('Withdrawl Account - Verificar input - input.NumeroCero', () => {
        let valorDepositado = 0
        cy.cuentaWithdrawl('Hermoine Granger')
        
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            cy.get('.form-control').type(valorDepositado)
            customer.submitWithdraw().should('have.text','Withdraw').click()
            cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', valorBalanceActual)
        })
    })

    it('Withdrawl Account - Verificar input - input.vacio', () => {
        cy.cuentaWithdrawl('Hermoine Granger')
        
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            cy.get('[type="number"]')
                .should("have.attr", "required")
            customer.submitWithdraw().should('have.text','Withdraw').click()
            cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', valorBalanceActual)
        })
    })

 })