beforeEach(() => {
  cy.visit('src/index.html')

}) 

describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Irgo')
    cy.get('#lastName').type('Serrado')
    cy.get('#email').type('igorserrado@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  })
})
