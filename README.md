# Modelo de Arquitetura Limpa

Este projeto aborda exclusivamente a organização de arquivos seguindo a estrutura da Arquitetura Limpa como modelo para outros projetos. Vou explicar por que escolhi definir neste modelo. É apenas uma representação da estrutura (sem código).

![clean_archi](/imagens/Screenshot_148.png)

## Regras e Fluxos Básicos

### Regra de Dependência

As classes de uma camada X não devem conhecer nenhuma classe de uma camada Y mais externa. Isso mantém as camadas centrais mais estáveis, menos sujeitas a mudanças, ao contrário das camadas externas. Por exemplo, as entidades de um sistema raramente precisam ser modificadas. Sobre os casos de uso, é verdade que eles, às vezes, precisam ser modificados.

### Invertendo o Fluxo de Controle

Em uma Arquitetura Limpa, fluxos de controle de fora para dentro são implementados de forma natural, pois seguem o mesmo sentido da Regra de Dependência. Por exemplo, uma camada mais externa Y pode criar um objeto de um tipo mais interno X e então chamar um método desse objeto.

### Organização da Arquitetura

A nossa organização será feita de modo que as camadas mais externas não sejam chamadas pelas mais internas e vice-versa, conforme mencionado acima. Vamos começar definindo quatro principais arquivos.

## Core

É a camada mais interna da aplicação, onde se concentra a camada de maior valor do software, ou seja, toda a regra de negócio se concentra nela. Dentro dela vamos ter:

- **Entities**: Onde ficará a modelagem das nossas tabelas.

- **Ports**: Responsável por desacoplar o nosso caso de uso com as camadas mais externas. Aqui teremos uma interface que fará um contrato com o repository do nosso projeto. Ou seja, ela conterá todos os métodos utilizados para fazer persistência/busca no banco de dados. Assim, nosso caso de uso não acessará diretamente uma camada mais externa, mas consumirá a interface que faz a comunicação com o banco de dados, utilizando-a através de injeção de dependência. Um bom exemplo da independência que utilizaremos esse contrato nos dá é pensar em alterarmos a tecnologia do banco de dados; neste caso, só vamos precisar alterar a conexão com o banco de dados.

- **UseCases**: Aqui ficará toda nossa regra de negócio. Será o coração da nossa aplicação. Nesse design, podemos criar os testes unitários aqui dentro e também as interfaces dos nossos casos de uso que irão assim o contrato com o arquivo ports.

- **Exceptions**: Ficarão todas as exceções lançadas pelos nossos casos de uso.

- **Value Objects**: Ficará toda a validação de objetos.

## Infra

Aqui ficará a camada mais externa. Essa camada é responsável pelas integrações, consultas no banco, cache, cron-jobs...Como citado acima, ela é responsável por deixar nosso software totalmente independente de uma tecnologia de banco de dados, por exemplo.

## Controller

Responsável por controlar as entradas e saídas dos dados do sistema além de fazer as validações dos mesmos (schema).

## Main

Responsável pela infraestrutura do projeto.

## Shared

Tudo que é relevante para o sistema como um todo, por exemplo, helpers.

Observação: Cada design pode conter uma organização em relação a alguns itens. Alguns casos que podemos nos atentar:

- **Testes**: Podemos deixar junto a suas respectivas camadas.

- **Tipos/Enum**: Podemos deixar junto com suas respectivas camadas.

- **Exceptions**: Podemos deixar junto com suas respectivas camadas.

Ao implementar uma aplicação, pense nas suas Entidades, que são classes que armazenam principalmente dados e que poderão ser reusadas em outros sistemas que você vai construir no futuro. Depois, pense nos Casos de Uso, que vão implementar regras de negócio relacionadas com as Entidades de seu sistema. Mas torne as classes que representam Entidades e Casos de Uso limpas de qualquer tecnologia. Lembre-se a Web é um detalhe; o banco de dados é um detalhe. Por fim, pense nas classes Adaptadoras, que vão funcionar como tradutores que viabilizam a comunicação entre as classes internas e o mundo externo.


## Análise da Estrutura de Pastas e Design de Domínio Dirigido (DDD)

Ao analisar a estrutura de pastas, também podemos fazer uma análise sobre o Design de Domínio Dirigido (DDD). Com a seguinte imagem:

![DDD](/imagens/Screenshot_166.png)

### Core
Como mencionado anteriormente, é a camada mais interna da aplicação, onde se concentra a camada de maior valor do software.

### Supporting
Supporting, algo que dá suporte ao Core e é de grande valor para o negócio.

### Generic 
É o que demanda muito trabalho; podemos tentar evitá-lo e deixá-lo para uma possível integração ou para que outra empresa forneça.

Se pararmos para analisar o Supporting e o Generic, podemos ver que a organização de arquitetura que criamos nos trará muita independência caso nos deparemos com uma situação que necessite de muito tempo de trabalho da equipe e complexidade. Isso nos dará independência para contratarmos um serviço de terceiros ou criar uma integração para consumir uma API. Nos deixará livres para trabalhar no core do negócio e fazer uma entrega de maior valor para nosso cliente.

Também é interessante analisarmos essa imagem para termos uma ideia da estruturação do todo, arquitetura, micro serviços e a liberdade de integração sem comprometer nossa estrutura:

![DDD_1](/imagens/Screenshot_167.png)

Podemos focar na imagem B, onde teríamos um subdomínio (sistema) com vários Bounded Contexts (core, serviços terceiros, consumo de APIs). Todos eles conversando entre si.

Se analisarmos a nível de equipe, também nos dá a liberdade para escalarmos squads/pessoas para trabalharem em diferentes módulos dentro do nosso sistema, de fato, criando uma grande entrega de valor.


**Desconsiderar a pasta imagens