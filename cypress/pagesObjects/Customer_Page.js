export default class Customer_Page {

    elements = {
        inputForm: () => cy.get('.form-control')
    }

    typeTransaccion(monto){
        this.elements.inputForm().type(monto)
    }

    botonLogin = () => cy.get('button').contains('Login')
    botonDeposit = () => cy.get('button').contains('Deposit')
    submitDeposit = () => cy.get('button[type="submit"]').contains('Deposit')
    submitWithdraw = () => cy.get('button[type="submit"]').contains('Withdraw')
    balanceInfo = () => cy.get('.borderM > :nth-child(3) > :nth-child(2)')
    accountNumberInfo = () => cy.get('.borderM > :nth-child(3) > :nth-child(1)')
    mensajeEstado = () => cy.get('.error').should('be.visible')
    customerNombre = () => cy.get('.fontBig')
    botonTransactions = () => cy.get('button').contains('Transactions')
    botonWithdrawl = () => cy.get('button').contains('Withdrawl')
    botonBack = () => cy.get('button').contains('Back')
}