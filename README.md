# API-NodeJS-Express
## Aplicativos e pacotes nodejs necessários para construir o projeto.
* NodeJS(0.12);
* MongoDB(3.0);
* db-migrate(0.9.20)  : usado  para migrar(popular) os documentos no MongoDB;
* mocha(2.2.5) : usado para executar os arquivos de testes “*.spec.js” .
## Instruções para executar o projeto
Depois de instalar o MongoDB e o nodejs em sua maquina é necessário instalar o Mocha e o DB-Migrate para poder migrar o banco de dados e executar os testes, e também instalar as bibliotecas usadas no projeto, seguindo os seguintes comandos no terminal:
```sh
$ sudo npm -g install mocha db-migrate
```
Para instalar mocha e o db-migrate na máquina.
```sh
$ npm install
```
Para instalar as dependências do projeto.

Depois disso, você pode popular o banco de dados, para esse projeto é necessário que MongoDB esteja rodando na porta padrão *27017*;
```sh
$ db-migrate up
```
O comando “$ db-migrate up” insere os dados no banco de dados, executando os scripts que estão na pasta **migrations**.
```sh
$ mocha
```
O comando “$ mocha” executa todos os testes com o sufixo “*.spec.js” em qualquer pasta do projeto, se tudo estiver certo todos os testes irão passar;

Em fim, o comando “$ npm start” vai iniciar a API na porta padrão *3000*
```sh
$ npm start 
```

## Organização do projeto:
```
API-NodeJS-Express/
  |- bin/
  |  |- www
  |- migrations/
  |- modules/
  |  |- edges/
  |  |  |- edges-controller.js
  |  |  |- edges-controller.spec.js
  |  |  |- edges-model.js
  |  |  |- edges-model.spec.js
  |  |  |- edges-service.js
  |  |  |- edges-service.spec.js
  |  |- nodes/
  |  |  |- nodes-controller.js
  |  |  |- nodes-controller.spec.js
  |  |  |- nodes-service.spec.js
  |  |  |- nodes-service.spec.js
  |  |  |- nodes-model.js
  |  |  |- nodes-model.spec.js
  |- test/
  |  |- mocha.opts
  |- .env
  |- app.js
  |- database.json
  |- package.json
```
## Descrição da organização do projeto
 ```
 |- bin/
  |  |- www
```
### Contém os arquivos de inicialização do servidor.

```
|- migrations/
```
### Contém os arquivos migração do banco de dados mongoDB.
```
  |- modules/
  |  |- edges/
  |  |  |- edges-controller.js
  |  |  |- edges-controller.spec.js
  |  |  |- edges-model.js
  |  |  |- edges-model.spec.js
  |  |  |- edges-service.js
  |  |  |- edges-service.spec.js
  |  |- nodes/
  |  |  |- nodes-controller.js
  |  |  |- nodes-controller.spec.js
  |  |  |- nodes-service.spec.js
  |  |  |- nodes-service.spec.js
  |  |  |- nodes-model.js
  |  |  |- nodes-model.spec.js
```
### Os módulos Nodes e Edges:
#### Modulo Edges contém todas as camadas usadas neste desenvolvimento:
* edges-controller.js: contém metodos para resolver pedidos do usuario, lida com parâmetros e valida pedidos http.
* edges-service.js: camanda entre a controller e a model, lida com a lógica pesada e faz a ponte entre a Controller-Model
* edges-model.js: contém Esquema (Schema) do documento e também executa a comunicação entre a camada serviço e o MongoDB.

Cada camada tem seu respectivo teste escrito, identificados pelo sufixo “*.spec.js” que são executados pelo “mocha”.

Seguindo a teoria dos grafos, o modulo edges representam *arestas* do grafo.

#### Modulo Nodes contém todas as camadas usadas neste desenvolvimento:
* node-controller.js: contém metodos para resolver pedidos do usuário, lida com parâmetros e valida pedidos http.
* node-service.js: camanda entre a controller e a model, lida com a lógica pesada e faz a ponte entre a Controller-Model.
* node-model.js: contém Esquema (Schema) do documento e também executa a comunicação entre a camada serviço e o MongoDB.

Cada camada tem seu respectivo teste escrito, identificados pelo sufixo “*.spec.js” que são executados pelo “mocha”.

Seguindo a teoria dos grafos, o modulo nodes são nós ou vertices.
```
  |- test/
  |  |- mocha.opts
```
Contém arquivos de configuração do mocha usado para configurar os testes.
```
  |- .env    - *contém as configurações da ambiente*
  |- app.js   - contém código principal para execução do servidor como mapeamento dos “resources”( node-controller.js, edges-controller.js) e os filtros CORS e filtros de erros.
  |- database.json *contém as configurações do banco de dados MongoDB*
  |- package.json *contém as configurações necessárias para construir e executar o projeto*
```

teste
teste
teste
teste
teste
teste
teste
