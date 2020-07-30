# Iniciando com API

Esta API é utilizada para ...

## Enpoints

### GET /games

Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.

#### Parametros

Nenhum

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber a listagem de todos os games.

Exemplo de resposta:

```

[
  {
    "id": 1,
    "title": "Call of duty",
    "year": 2019,
    "price": 120
  },
  {
    "id": 2,
    "title": "Pes 2021",
    "year": 2020,
    "price": 150
  },
  {
    "id": 3,
    "title": "Cs Go",
    "year": 2016,
    "price": 50
  }
]

```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token invalido, Token inspirado.

Exemplo de erro:

```

{
  "err": "Token inválido"
}

```

### POST /auth

Esse endpoint é responsável por fazer o processo de login.

#### Parametros

email: E-mail do usuário cadastrado no sistema

password: password do usuário cadastrado no sistema

```

{
	"email":"vitor@teste.com",
	"password":"teste123"
}

```

#### Respostas

##### OK ! 200

Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na api.

Exemplo de resposta:

```

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2aXRvckB0ZXN0ZS5jb20iLCJpYXQiOjE1OTYwNzI5MjEsImV4cCI6MTU5NjI0NTcyMX0.dnuuJDc55cRLjbyN0n5TZV4lxA4QyRBpagYrEKooZnU"
}

```

#### Falha na autenticação ! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.

Exemplo de erro:

```

{
  "err": "Credenciais inválidas"
}

```
