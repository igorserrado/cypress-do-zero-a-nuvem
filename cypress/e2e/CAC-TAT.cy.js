beforeEach(() => {
  cy.visit('src/index.html')

}) 

describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Irgo', {delay:100})
    cy.get('#lastName').type('Serrado')
    cy.get('#email').type('igorserrado@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Irgo')
    cy.get('#lastName').type('Serrado')
    cy.get('#email').type('igorserradogmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  })

  it('telefone vazio quando preenchido valor não numérico', () => {
   
    cy.get('#phone').type('abc').should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Irgo')
    cy.get('#lastName').type('Serrado')
    cy.get('#email').type('igorserradogmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')

    })

    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Irgo').should('have.value', 'Irgo').clear().should('have.value', '')
    cy.get('#lastName').type('Serrado').should('have.value', 'Serrado').clear().should('have.value', '')
    cy.get('#email').type('igorserrado@gmail.com').should('have.value', 'igorserrado@gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('12345678').should('have.value', '12345678').clear().should('have.value', '')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.get('button[type="submit"]').click()
      
      cy.get('.error').should('be.visible')
    })
})
