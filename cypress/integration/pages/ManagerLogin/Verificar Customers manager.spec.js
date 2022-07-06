///<reference types="Cypress"/>

import Manager_Page from '../../../pagesObjects/Manager_Page'

describe('Funcional - Verificar Customers manager', () => {
    const manager = new Manager_Page()
    
    beforeEach(()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit(Cypress.env("manager"))
    })

    it('Add Customer - Verificar que se agregan clientes al final de la lista en Open Account, Customers y Customers Login', () => {
        let cantidadCuentasIniciales = 5
        cy.selectButton('Customers')

        cy.get('tbody > tr')
            .should('exist').then(cantidadElementos => {
                let getValoresLista = []
                cantidadElementos.each((index) => {
                    getValoresLista[index] = cantidadElementos[index].innerText.split("\n") 
                })
                cy.log(`CANTIDAD DE ELEMENTOS EN LA TABLA: ${getValoresLista.length}`)
                expect(getValoresLista.length).to.be.eq(cantidadCuentasIniciales)
                let getUltimoValor = getValoresLista.pop()[0].split("\t")
                cy.log(getUltimoValor)
                manager.botonDelete().click()
                expect(getValoresLista.length).lessThan(cantidadCuentasIniciales)
                cy.log(`CANTIDAD DE ELEMENTOS EN LA TABLA: ${getValoresLista.length}`)
            })
        manager.botonOpenAccount().click()
        cy.get('#userSelect').find('option').each(($opciones, cantidadCuentas)=>{
            expect(cantidadCuentas).lessThan(cantidadCuentasIniciales)
        })
    })
})
