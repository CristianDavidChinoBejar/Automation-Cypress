
Cypress.Commands.add('selectButton', (button) =>{
    cy.get('button').contains(button).then($texto => {
        let textoBoton = $texto[0].innerHTML.split("\n")
        expect(textoBoton[0]).to.deep.eq(button)
    }).click()
})

