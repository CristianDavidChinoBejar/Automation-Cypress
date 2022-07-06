export default class Manager_Page {
        botonCustomerLogin = () => cy.get('button').contains('Customer Login')
        botonManagerLogin = () => cy.get('button').contains('Bank Manager Login')
        botonDelete = () => cy.get(':nth-child(1) > :nth-child(5) > button')
        botonOpenAccount = () => cy.get('button').contains('Open Account ')
        botonProcess = () => cy.get('button').contains('Process')
}
