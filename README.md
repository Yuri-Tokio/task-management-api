# API NestJS + Typescript com TypeORM
  API rest para gerenciamento de tarefas, onde podemos cadastrar, ler, editar, deletar e procurar tarefas.

  O projeto contém:
  `validações de DTOs`, `autenticação de rotas com APP_GUARDs`, variáveis de ambientes com `config service` e `banco de dados com TypeORM`.

# Explicando arquivos:

  O projeto está no Docker e o bd pode ser visto através do DBeaver

# Rodando o projeto
  `Instalar dependências`
  npm i

  `rodar o migration no BD`
  npm run migration:run

  `Iniciar o projeto`
  npm run start

  `Iniciar em modo debug`
  npm run start:debug 
