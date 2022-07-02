///<reference types="Cypress"/>

describe('Funcional - Verificar pantalla Customer login', () => { 
    beforeEach(()=>{
        // cy.clearCookies()
        // cy.clearLocalStorage()
        cy.visit(Cypress.env("customer"))
    })
    
    it('Verificar pantalla Customer login - elemento.BotonHome', () => {
        cy.get('button').contains('Home')
        .should('have.text','Home').click()
        
        cy.url().should(
            'be.equal',
            `${Cypress.config("baseUrl")}login`
        )
    })

    it('Verificar en pantalla Customer login - elemento.SelectOption - botonLogin.NoVisible', () => {
        cy.get('label').should('have.text','Your Name :')
        cy.get('[id=userSelect]').each($opciones=>{
            var primerOptions = $opciones[0][0].text
            expect(primerOptions).to.deep.eq('---Your Name---')
        }).select(0)
        cy.get('button').contains('Login').should('not.be.visible', 'Login')
    })
    
    it('Verificar en pantalla Customer login - elemento.SelectOption - botonLogin.Visible', () => {
        cy.get('[id=userSelect]').as('selectTag')
        cy.get('@selectTag').find('option').each(($opciones, i)=>{
            console.log($opciones[0].text, i);
            if ($opciones[0].text != '---Your Name---') {
                cy.get('@selectTag').select($opciones[0].text )
                cy.get('button').contains('Login').should('be.visible', 'Login')
            }
        })
    })

    it.only('Verificar en pantalla Customer login - elemento.SelectOption - botonLogin.derivacion', () => {
        //Si existe un primer elemento distinto a 0, seleccionarlo y presionar 
        // Modificar la request con un intercept y con eso obligar si o si a q aparezca el boton
        cy.get('[id=userSelect]').as('selectTag')
        cy.get('@selectTag').find('option')
        
        .each(($opciones, i)=>{
            console.log($opciones[0].text, i);
            if ($opciones[0].text != '---Your Name---') {
                index = $opciones[i]
                cy.get('@selectTag').select($opciones[0].text)
                cy.get('button').contains('Login').should('be.visible', 'Login').click({force: true});
            }
        })
    })
 })