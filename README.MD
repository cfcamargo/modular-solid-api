# Estoque Software - API

## Recursos

## Controle de Pedidos
- Listar e buscar pedidos
- Cadastrar um pedidos
- Cadastro de orçamentos
- Impressao de um pedido
- Adicionar produtos a um pedido
- Adicionar taxa entrega a um pedido
- Selecionar um cliente para o pedido
- Filtrar pedidos por um cliente

## Controle de Clientes
- Lista clientes
- Cadastra um cliente
- Edicao do cliente


## Controle de produtos
- Listagem de Produtos
- Cadastro de um produto
- Controlar estoque de produtos
- O estoque nao vai influenciar muito, pois a empresa fabrica seus produtos. ( Regra de negocio)
- Utilizar um produto nao cadastrado no pedido


## Controle de usuarios
- Cadastro de Usuários
- Permissoes de usuários (ADMIN, NORMAL)
- Autenticacao

## Relatorios
- Dashboar com relatorios de vendas
- Filtar por mes, ano, periodo

## Solicitar Fabricacao
- Aqui podemos criar um formuario para gerar um pedido de fabricacao
- AO utilizar um produto em um pedido, que nao tenha o estoque suficiente, vamos criar um aviso ao cliente, dizendo q precisa fabricar 
- Listagem de solicitacoes de fabricacao


## Regras De Negocio

- Usuários admin , podem gerenciar a administracao do sistema, 
- Usuario comum , ele vai poder gerar orcamentos e pedidos, e consulta-los
- Usuario comum, pode criar produto, e solicitar fabricacao
- todas as rotas do sistema devem ser autenticadas.
- Produtos com estoque 0 devem emitir um alerta informando que precisa fabricar um produto


## 


- Cadastro De clientes
- Cadastro de usuários
- Autenticacao

