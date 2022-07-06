///<reference types="Cypress"/>

import Customer_Page from '../../../pagesObjects/Customer_Page'

describe('Funcional - Verificar deposit Account', () => {
    const customer = new Customer_Page()
    
    beforeEach(()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit(Cypress.env("customer"))
    })
    
    it('Deposit Account - Verificar input - input.numeroPositivos', () => {
        let valorDepositado = 10
        cy.cuentaDeposit('Hermoine Granger')
        
        customer.balanceInfo().then(balanceActual =>{
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            customer.typeTransaccion(valorDepositado)
            customer.submitDeposit().should('have.text','Deposit').click()
            customer.balanceInfo().should('have.text', valorBalanceActual + valorDepositado)
            customer.mensajeEstado().and('have.text', 'Deposit Successful')
        })
    })

    it('Deposit Account - Verificar input - input.numerosNegativos', () => {
        let valorDepositado = -10
        cy.cuentaDeposit('Hermoine Granger')

        customer.balanceInfo().then(balanceActual =>{
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            customer.typeTransaccion(valorDepositado)
            customer.submitDeposit().should('have.text','Deposit').click()
            customer.balanceInfo().should('have.text', valorBalanceActual)
        })
    })

    it('Deposit Account - Verificar input - input.NumeroCero', () => {
        let valorDepositado = 0
        cy.cuentaDeposit('Hermoine Granger')
        
        customer.balanceInfo().then(balanceActual =>{
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            customer.typeTransaccion(valorDepositado)
            customer.submitDeposit().should('have.text','Deposit').click()
            customer.balanceInfo().should('have.text', valorBalanceActual)
        })
    })

    it('Deposit Account - Verificar input - input.vacio', () => {
        cy.cuentaDeposit('Hermoine Granger')
    
        customer.balanceInfo().then(balanceActual =>{
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            cy.get('[type="number"]').should("have.attr", "required")
            customer.submitDeposit().should('have.text','Deposit').click()
            customer.balanceInfo().should('have.text', valorBalanceActual)
        })
    })
 })