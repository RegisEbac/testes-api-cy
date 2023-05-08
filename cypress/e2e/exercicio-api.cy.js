/// <reference types="cypress" />
var faker =require('faker');

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve listar usuários cadastrados', () => {
     cy.request({
        method: 'GET',
        url: 'usuarios'
     }).then((response) =>{
expect(response.body.usuarios[0].nome).to.equal('Heitor Monticelli Silveira')
expect(response.status).to.equal(200)
expect(response.body).to.have.property('usuarios')
expect(response.duration).to.be.lessThan(15)
     })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
     
         cy.request({
method: 'POST',
url:'usuarios',
body: {
     "nome":'Heitor Monticelli Silveira',
     "email":(faker.internet.email()),
     "password": "teste",
     "administrador": "true"
   }

         })
    });

    it('Deve validar um usuário com email repetido', () => {
              
     cy.request({
          method: 'POST',
          url:'usuarios',
          body: {
               "nome":'Heitor Monticelli Silveira',
               "email":'Heitorfilho@ebac.com.br',
               "password": "teste",
               "administrador": "true"
             },
             failOnStatusCode: false
                   }).then((response) =>{
                    expect(response.status).to.equal(400)
                   expect(response.body.message).to.equal('Este email já está sendo usado')
                   })
    });

    it('Deve editar um usuário já cadastrado', () => {
         cy.request('usuarios').then(response =>{

let id = (response.body.usuarios[0]._id)
cy.request({
     method:'PUT',
     url:`usuarios/${id}`,
     body:{
          "nome": "Fulano da Silva",
          "email":(faker.internet.email()),
          "password": "teste",
          "administrador": "true"
        }

}).then(response =>{
expect(response.body.message).to.equal('Registro alterado com sucesso')

})

         })


    });

    it('Deve deletar um usuário previamente cadastrado', () => {
     cy.request('http://localhost:3000/usuarios').then(response =>{

     let id = (response.body.usuarios[0]._id)
     cy.request({
          method:'PUT',
          url:`usuarios/${id}`,
          body:{
               "nome": "Fulano da Silva",
               "email":(faker.internet.email()),
               "password": "teste",
               "administrador": "true"
             }
             
             })
             cy.request({
               method:'DELETE',
               url:`usuarios/${id}`,
          }).then(response =>{
expect(response.body.message).to.equal('Registro excluído com sucesso')
expect(response.status).to.equal(200)

          })
     
     })






    });


});
