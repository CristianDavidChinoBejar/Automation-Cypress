class pantallaPage {
    elements = {
        botonHome: () => cy.get('button').contains('Home'),
        botonCustomerLogin: () => cy.get('button').contains('Customer Login'),
        botonManagerLogin: () => cy.get('button').contains('Bank Manager Login')
    }

    // clickBoton(){
         
    // }
}

module.exports = new pantallaPage();