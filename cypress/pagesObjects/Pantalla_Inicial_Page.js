export default class Pantalla_Inicial_Page {
    elements = {
        getSelect: () => cy.get('[id="userSelect"]'),
    }

    seleccionarOpcion(nombre){
        this.elements.getSelect().select(nombre)
    }

    botonHome = () => cy.get('button').contains('Home')
    botonCustomerLogin = () => cy.get('button').contains('Customer Login')
    botonManagerLogin = () => cy.get('button').contains('Bank Manager Login')
    botonLogout = () => cy.get('button').contains('Logout')
    
    
}