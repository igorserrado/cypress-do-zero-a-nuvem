beforeEach(() => {
  cy.visit('src/index.html')

}) 

describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.contains('div', 'Nome').type('Irgo', {delay:100})
    cy.contains('div', 'Sobrenome').type('Serrado')
    cy.contains('div', 'E-mail').type('igorserrado@gmail.com')
    cy.contains('div', 'ajudar').type('Teste')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Irgo')
    cy.get('#lastName').type('Serrado')
    cy.get('#email').type('igorserradogmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    
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
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Irgo').should('have.value', 'Irgo').clear().should('have.value', '')
    cy.get('#lastName').type('Serrado').should('have.value', 'Serrado').clear().should('have.value', '')
    cy.get('#email').type('igorserrado@gmail.com').should('have.value', 'igorserrado@gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('12345678').should('have.value', '12345678').clear().should('have.value', '')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.contains('button', 'Enviar').click()
      
      cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', () => {
      const data = {
        firstName: 'Irgo',
        lastName: 'Serrado',
        email: 'igorserrado@gmail.com',
        text: 'Teste'
      }	
      
      cy.fillMandatoryFieldsAndSubmit(data)
      cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product').select('mentoria').should('have.value', 'mentoria') 
    })

    it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('select').select(1).should('have.value', 'blog') 
    })

    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {
      cy.get('input[type="Radio"]').each(typeOfService => {
        cy.wrap(typeOfService).check().should('be.checked')
      })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should(file => {
        expect(file[0].files[0].name).to.equal('example.json')
      })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(file => {
        expect(file[0].files[0].name).to.equal('example.json')
      })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json', null).as('arquivoSelecionado')
      cy.get('#file-upload').selectFile('@arquivoSelecionado')
      .should(file => {
        expect(file[0].files[0].name).to.equal('example.json')
      })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank').and('have.attr', 'href', 'privacy.html')
    })

    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })
  })