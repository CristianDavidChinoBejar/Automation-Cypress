///<reference types="Cypress"/>

import Customer_Page from '../../../pagesObjects/Customer_Page'
import Pantalla_Inicial_Page from '../../../pagesObjects/Pantalla_Inicial_Page'

describe('Funcional - Transactions Account', () => { 
    const customer = new Customer_Page()
    const pantalla_inicial = new Pantalla_Inicial_Page()
    
    beforeEach(()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('Transactions Account - Verificar que los depositos y retiros se muestran en la lista de transacciones', () => {
        let valorDepositado = 20
        let valorRetirado = 19

        cy.visit(Cypress.env("customer"))
        cy.get('select').select(2)
        customer.botonLogin().click()
        cy.wait(1000);
        customer.botonTransactions().click()

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx`
          )

        cy.get('tbody > tr')
            .should('not.exist').then(cantidadElementos =>{
                cy.log(`CANTIDAD DE ELEMENTOS EN LA TABLA: ${cantidadElementos}`)
            })

        customer.botonBack().click()    
        customer.botonDeposit().click()
        customer.typeTransaccion(valorDepositado)
        customer.submitDeposit().should('have.text','Deposit').click()
        cy.wait(1000);
        customer.mensajeEstado().and('have.text', 'Deposit Successful')
        cy.wait(1000);
        customer.botonTransactions().click()

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx`
          )

        cy.get('tbody > tr')
            .should('exist').then(cantidadElementos => {
                        cy.get(`#anchor${0}> :nth-child(2)`).should('have.text', 20)
                        cy.get(`#anchor${0}> :nth-child(3)`).should('have.text', 'Credit')
                
            cy.log(`CANTIDAD DE ELEMENTOS EN LA TABLA: ${cantidadElementos.length}`)
        })

        customer.botonBack().click()  
        customer.botonWithdrawl().click()

        customer.typeTransaccion(valorRetirado)
        customer.submitWithdraw().should('have.text','Withdraw').click()

        cy.wait(1000);
        customer.botonTransactions().click()
        
        cy.get('tbody > tr')
            .should('exist').then(cantidadElementos => {
                cy.get(`#anchor${1}> :nth-child(2)`).should('have.text', 19)
                cy.get(`#anchor${1}> :nth-child(3)`).should('have.text', 'Debit')
            
        cy.log(`CANTIDAD DE ELEMENTOS EN LA TABLA: ${cantidadElementos.length}`)
        })  
    })

    it('Transactions Account - Verificar derivacion a pantalla inicial - elemento.BotonLogout', () => {
        cy.visit(Cypress.env("listTx"))
        pantalla_inicial.botonLogout()
            .should('be.visible')
            .and('have.text','Logout').click()
        cy.wait(500);
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}customer`
        )
    })

    it('Transactions Account - Verificar derivacion a pantalla inicial - elemento.BotonBack', () => {
        cy.visit(Cypress.env("customer"))
        cy.get('select').select(1)
        customer.botonLogin().click()
        cy.wait(1000);
        customer.botonTransactions().click()

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx`
          )
        customer.botonBack()
            .should('have.text','Back')
            .click()
        cy.wait(500);
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}account`
        )
    })

    it('Transactions Account - Verificar que elimina todas las transacciones - elemento.BotonReset', () => {
        cy.intercept('/angularJs-protractor/BankingProject/listTx.html', {
            fixture: 'intercept/TransactionAccount.html'
        }).as('getListTxMock')

        cy.visit(Cypress.env("customer"))
        cy.get('select').select(1)
        customer.botonLogin().click()
        cy.wait(1000);
        customer.botonTransactions().click()

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx`
          )

        //tbody -> contenido de la tabla
        cy.get('tbody > tr')
            .should('exist').then(cantidadElementos =>{
                    cy.log(`CANTIDAD DE ELEMENTOS EN LA TABLA: ${cantidadElementos.length}`)
                })

        cy.get('button').contains('Reset')
            .click()
        
        cy.get('tbody > tr')
            .should('not.exist');
    })
    
    it('Transactions Account - Verificar que boton siguiente avance - elemento.botonSiguiente', () => {
        cy.visit(Cypress.env("customer"))
        cy.get('select').select(1)
        customer.botonLogin().click()
        cy.wait(1000);
        customer.botonTransactions().click()

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx`
        )

        cy.get('[style="float:right"]').click()
        cy.get('button').contains('Top').should('be.visible').should('have.text','Top')
        cy.get('[style="float:left"]').contains('<').should('be.visible')

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx#anchor5`
        )

        cy.get('[style="float:right"]').click()
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx#anchor13`
        )
    })

    it('Transactions Account - Verificar que boton atras redirija a la pantalla Customer - elemento.botonAtras', () => {
        cy.visit(Cypress.env("customer"))
        cy.get('select').select(1)
        customer.botonLogin().click()
        cy.wait(1000);
        customer.botonTransactions().click()

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx`
        )

        cy.get('[style="float:right"]').click()
        cy.get('button').contains('Top').should('be.visible').should('have.text','Top')
        cy.get('[style="float:left"]').contains('<').should('be.visible')

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx#anchor5`
        )

        cy.get('[style="float:left"]').contains('<').click()

        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}listTx#anchor`
        )
        cy.get('button').contains('Top').should('not.be.visible').should('have.text','Top')
        cy.get('[style="float:left"]').contains('<').should('not.be.visible')
    })
 })