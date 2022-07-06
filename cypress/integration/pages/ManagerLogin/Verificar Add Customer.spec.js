///<reference types="Cypress"/>
import Customer_Page from '../../../pagesObjects/Customer_Page'

describe('Funcional - Verificar Add Customer', () => {
    const customer = new Customer_Page()

    beforeEach(()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit(Cypress.env("manager"))
    })
    
    it('Add Customer - Verificar que se agregan clientes al final de la lista en Open Account, Customers y Customers Login', () => {
        let firstName = 'Cristian David'
        let LastName = 'Test'
        let postCode = '1770'

        cy.selectButton('Add Customer')
        cy.wait(1000);
        cy.get(':nth-child(1) > label').should('have.text', 'First Name :')
        cy.get(':nth-child(1) > .form-control').type(firstName)
        cy.get(':nth-child(2) > label').should('have.text', 'Last Name :')
        cy.get(':nth-child(2) > .form-control').type(LastName)
        cy.get(':nth-child(3) > label').should('have.text', 'Post Code :')
        cy.get(':nth-child(3) > .form-control').type(postCode)
        cy.get('button[type="submit"]').contains('Add Customer').click()
        
        cy.selectButton('Open Account')
        
        cy.get('#userSelect').then(lista => {
            let getValoresLista = lista[0].innerText.split("\n")
            let getUltimoValorLista = getValoresLista.pop()
            expect(getUltimoValorLista).to.deep.equals(firstName + ' ' + LastName)
        })

        cy.selectButton('Customers')

        // cy.valoresLista()
        cy.get('tbody > tr')
            .should('exist').then(cantidadElementos => {
                let getValoresLista = []
                cantidadElementos.each((index) => {
                    getValoresLista[index] = cantidadElementos[index].innerText.split("\n") 
                })

                let getUltimoValor = getValoresLista.pop()[0].split("\t")
                cy.get(`:nth-child(${cantidadElementos.length}) > :nth-child(1)`).should('have.text', getUltimoValor[0])
                cy.get(`:nth-child(${cantidadElementos.length}) > :nth-child(2)`).should('have.text', getUltimoValor[1])
                cy.get(`:nth-child(${cantidadElementos.length}) > :nth-child(3)`).should('have.text', getUltimoValor[2])
                cy.get(`:nth-child(${cantidadElementos.length}) > :nth-child(4)`).should('have.text', getUltimoValor[3])
                cy.get(`:nth-child(${cantidadElementos.length}) > :nth-child(5)`).should('have.text', getUltimoValor[4])
                cy.log(`CANTIDAD DE ELEMENTOS EN LA TABLA: ${cantidadElementos.length}`)
            })
        
        cy.redireccionCustomerLogin()
        
        cy.get('[id=userSelect]').find('option').then((cantidadElementos)=>{
            let getValoresLista = []
            cantidadElementos.each((index) => {
                getValoresLista[index] = cantidadElementos[index].innerText
            })
            let getUltimoValor = [] 
            getUltimoValor = getValoresLista.pop().split("\t")
            expect(getUltimoValor[0]).to.deep.eq(firstName+' '+LastName)
        
        cy.get('#userSelect').select(cantidadElementos.length - 1)
        customer.botonLogin().click()
        cy.get('.fontBig').should('have.text',firstName+' '+LastName)
        cy.get('.borderM > :nth-child(1) > strong').should('include.text', `Welcome ${firstName+' '+LastName} !!`)
        cy.get('[ng-show="noAccount"]').should('include.text', 'Please open an account with us.')
        })
    })
})
