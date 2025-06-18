# inChurch
Vaga para Desenvolvedor Frontend Angular Pleno na empresa inChurch

---

## 🎯 Objetivo

Este desafio tem como objetivo avaliar suas habilidades com Angular e desenvolvimento de interfaces responsivas. Você deverá implementar um sistema para
gerenciamento de eventos, incluindo funcionalidades de listagem, visualização em detalhes, e um sistema de login simples.

---

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.


## ⚙️ Tecnologias utilizadas

```
- **Angular CLI**: 15.2.11  
- **Node.js**: 16.20.2  
- **NPM**: 8.19.4  
- **Angular Material**: 15.2.9  
- **Tailwind CSS**: 3.3.3
- **json-server 
```

## ⚙️ Clonar o Repositório

Crie uma pasta para baixar o projeto, após isso rode o comando:

```
git clone https://github.com/NathanCastro/inChurch.git
cd seu-repositorio
```

Instalar dependências
```
npm install

```
## 📦 Rodar a aplicação
Para rodar a API Fake entre na pasta do seu projeto
Abra um terminal especifico e digite:

```
npx json-server db.json
```
A aplicação vai inicar em http://localhost:3000/.

Quando estiver funcionando, abra outro terminal e digite:

```
ng serve
ou
ng s
```

## Página de login
```
admin@admin.com.br
```
senha 

```
13579
```

## 🛠️ Funcionalidades

  * Criado tela de login simulando rota autenticada e rota para autenticação
  * O sistema salva o token fictício para simular a sessão do usuário, caso limpe o token, o sistema volta para a tela de login
  * Criado o layout onde agrupa Header, Menu, Cards, Listas e Footer
  * Criado funcionalidade de CRUD onde cadastra o evento, edita, visualiza e deleta o evento
  * Serviços de HTTP criados
  * Modal desenvolvida para criar, editar, visualizar e deletar o evento
  * As imagens no componente de criação inicialmente seguem mockadas. Assim que adicionadas, elas são salvas como base64 no servidor.
  * Filtro foi criado para a pesquisa por palavra-chave, na lista e no card.
  * Sistema todo responsivo no Login e no Layout.
  * Criado funcionalidade de exibir tabela em cards(Default) ou em lista
  * Validações criadas para a tela de login e formulário dentro das modais
  * Logout do sistemas com o botão no canto superio direito
  * Paginação criada tanto na página de Cards quanto na Lista
  * Teste unitários feitos em jest
  
  
## Conclusão

#Login e #Logout

![login](https://github.com/user-attachments/assets/8c9355c1-ad89-44cc-81d1-3186291d23dd)


#Layout
Cards
![image](https://github.com/user-attachments/assets/c6076876-537d-4bd0-97b8-9d6ddd252cbf)
Mobile

![image](https://github.com/user-attachments/assets/c60bb58b-9cc0-4b94-8ffb-a14e9e7fd895)

Lista
![image](https://github.com/user-attachments/assets/9569a312-0033-4466-ae8d-026ac0d3de7b)
Mobile

![image](https://github.com/user-attachments/assets/4ee0aae9-80b9-44f4-90ea-ec9f003831f7)

#Modal Cadastro, Editar, Visualizar Apagar
![image](https://github.com/user-attachments/assets/dbe4f6a7-12a0-4aec-98f9-438a952c4ff2)
![image](https://github.com/user-attachments/assets/b63815ea-89d1-49bc-8cab-c590c04192cd)
![image](https://github.com/user-attachments/assets/5273ad79-788d-46c0-9406-d80591aa9979)
![image](https://github.com/user-attachments/assets/5e98852c-f43b-4416-8d83-ad9acb5809d2)



