///<reference types="Cypress"/>

describe('Funcional - Verificar Customers configuration', () => { 
    beforeEach(()=>{
        // cy.clearCookies()
        // cy.clearLocalStorage()
        // cy.visit(Cypress.env("account"))
        cy.visit(Cypress.env("manager"))
    })

//TODO: AGREGAR PAGEOBJECTS
//TODO: Agregar reporte HTML con mockawesom.
//TODO: Agregar readme
//TODO: Accesibilidad
    it('Add Customer - Verificar que se agregan clientes al final de la lista en Open Account, Customers y Customers Login', () => {
        let cantidadCuentasIniciales = 5
        cy.get('button').contains('Customers').then($texto => {
            let textoBoton = $texto[0].innerHTML.split("\n")
            expect(textoBoton[0]).to.deep.eq('Customers')
        }).click()

        cy.get('tbody > tr')
            .should('exist').then(cantidadElementos => {
                let getValoresLista = []
                cantidadElementos.each((index) => {
                    getValoresLista[index] = cantidadElementos[index].innerText.split("\n") 
                })
                cy.log(`CANTIDAD DE ELEMENTOS EN LA TABLA: ${getValoresLista.length}`)
                expect(getValoresLista.length).to.be.eq(cantidadCuentasIniciales)
                let getUltimoValor = getValoresLista.pop()[0].split("\t")
                console.log(getUltimoValor, 'aca');
                cy.get(':nth-child(1) > :nth-child(5) > button').then(e =>{
                    console.log(e, 'ga');
                }) .click()
                expect(getValoresLista.length).lessThan(cantidadCuentasIniciales)
                cy.log(`CANTIDAD DE ELEMENTOS EN LA TABLA: ${getValoresLista.length}`)
            })
        cy.get('button').contains('Open Account ').click()
        cy.get('#userSelect').find('option').each(($opciones, cantidadCuentas)=>{
            expect(cantidadCuentas).lessThan(cantidadCuentasIniciales)
        })
    })
})
