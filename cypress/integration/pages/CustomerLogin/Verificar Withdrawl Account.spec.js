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
        pantalla_inicial.seleccionarOpcion('Hermoine Granger')
        customer.botonLogin().click()
        cy.wait(1000);
        customer.botonWithdrawl().click()
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            console.log(balanceActual[0].innerHTML, 'balanceActual');
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            let valorRetirar = valorBalanceActual + 1;
            customer.typeTransaccion(valorRetirar)
            customer.submitWithdraw().should('have.text','Withdraw').click()
            cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', valorBalanceActual)
            customer.mensajeEstado().and('have.text', 'Transaction Failed. You can not withdraw amount more than the balance.')
        })
    })

    it('Withdrawl Account - Verificar input - input.CantidadIgualAlMontoActual', () => {
        pantalla_inicial.seleccionarOpcion('Hermoine Granger')
        customer.botonLogin().click()
        cy.wait(1000);
        customer.botonWithdrawl().click()
        
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            console.log(balanceActual[0].innerHTML, 'balanceActual');
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            let valorRetirar = valorBalanceActual
            customer.typeTransaccion(valorRetirar)
            customer.submitWithdraw().should('have.text','Withdraw').click()
            customer.balanceInfo().should('have.text', valorBalanceActual - valorRetirar)
            customer.mensajeEstado().and('have.text', 'Transaction successful')
        })
    })
    
    it.only('Withdrawl Account - Verificar input - input.numeroPositivos', () => {
        let valorDepositado = 10
        pantalla_inicial.seleccionarOpcion('Hermoine Granger')
        customer.botonLogin().click()
        cy.wait(1000);
        customer.botonWithdrawl().click()
        
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            console.log(balanceActual[0].innerHTML, 'balanceActual');
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            cy.get('.form-control').type(valorDepositado)
            cy.get('button[type="submit"]').contains('Withdraw').should('have.text','Withdraw').click()
            cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', valorBalanceActual - valorDepositado)
            cy.get('.error').should('be.visible').and('have.text', 'Transaction successful')
        })
    })

    it('Withdrawl Account - Verificar input - input.numerosNegativos', () => {
        let valorDepositado = -10
        cy.get('select').select('Hermoine Granger')
        cy.get('button').contains('Login').click()
        cy.wait(1000);
        cy.get('button').contains('Withdrawl').click()
        
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            console.log(balanceActual[0].innerHTML);
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            cy.get('.form-control').type(valorDepositado)
            cy.get('button[type="submit"]').contains('Withdraw').should('have.text','Withdraw').click()
            cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', valorBalanceActual)
        })
    })

    it('Withdrawl Account - Verificar input - input.NumeroCero', () => {
        let valorDepositado = 0
        cy.get('select').select('Hermoine Granger')
        cy.get('button').contains('Login').click()
        cy.wait(1000);
        cy.get('button').contains('Withdrawl').click()
        
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            console.log(balanceActual[0].innerHTML, 'balanceActual');
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            cy.get('.form-control').type(valorDepositado)
            cy.get('button[type="submit"]').contains('Withdraw').should('have.text','Withdraw').click()
            cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', valorBalanceActual)
        })
    })

    it('Withdrawl Account - Verificar input - input.vacio', () => {
        cy.get('select').select('Hermoine Granger')
        cy.get('button').contains('Login').click()
        cy.wait(1000);
        cy.get('button').contains('Withdrawl').click()
        
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').then(balanceActual =>{
            console.log(balanceActual[0].innerHTML, 'balanceActual');
            let valorBalanceActual = Number(balanceActual[0].innerHTML)
            cy.get('[type="number"]')
                .should("have.attr", "required")
            cy.get('button[type="submit"]').contains('Withdraw').should('have.text','Withdraw').click()
            cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', valorBalanceActual)
        })
    })

 })