## Projeto Publicado

(ainda não publicado)

## Ambiente de desenvolvimento

- Angular: 18.2.0
- Node: v20.17.0
- NPM: 10.8.2

### Rodando o projeto

1. instale o projeto usando o comanto ``npm i``
2. Rode o projeto: ``npm start``

## Arquitetura e Design

#### ESTRUTURA DE DIRETÓRIOS E COMPONENTES

**/SHARED:** Cada recurso pode ser importado separadamente isso quer dizer que não necessáriamente a aplicação compartilha tudo que está em Shared o tempo todo, mas sim os modulos internos neste diretório, isso quer dizer que não existe um "shared.module" que carrega todos os recursos, portanto cada recurso tem seu proprio modulo. Teoricamente, deve funcionar de forma independente, podendo ser compartilhada com outros projetos, apenas respeitando as configurações globais e biblitoecas que precisa para funcionar.

**/CORE:** Recursos altamente acomplados a solução de dominio da aplicação. Estando diretamente relacionados a função da aplicação, não faz sentido exportar em outro projeto que não esteja no mesmo dominio. Apesar de compartilhado como a Shared em modulos, geralmente o carregamento ocorre somente no "app.module", não sendo necessário injetar em modulos internos.

**/MODULES:** São os modulos angular que separam as rotas da aplicação com: "lazy loading", geralmente devem separar a aplicação por contexto de uso, mas pode ser flexibilizado como neste aplicação que apenas demonstra o conceito.

**/SASS:** Todo o estilo da aplicacao fica neste repositório

### CSS e SASS

Eu escolhi fazer todo css na mão, ao invés de usar: Bootstra, PrimeNg, Angular Material, etc.

Projeto segue as orientações do modelo ITCSS para a organização dos diretórios CSS. Para os padrões de nomenclatura, convencionou-se usar uma mistura de BEEM e SUITCSS. Usamos o conceito do BEM: Bloco, Elemento, Modificador, com a convenção de nomes de descendentes, e também para modificadores de estado do SUITCSS.

Para facilitar este processo e agilizar o desenvolvimento, usei como base o meu projeto [CODA.css](https://github.com/evertonthepaula/coda-css).

Obs.: Este não pôde ser instalado via NPM, pois está desatualizado, "sad but true".

### ANGULAR - DIRETÓRIOS E COMPONENTES - BASE TEÓRICA

Objetivo é criar uma arquiterua de diretórios clean.

Eu costumo usar uma solução para os diretórios Angular que, eu acredito, deixa o compartilhamento dos recursos na aplicação mais claros. Crio um padrão de diretórios globais, que é replicado dentros dos módulos. O interessante deste modelo, é que ele foi criado nas versões do Angular anteriores aos "Stand Alone Components", mas se adaptou perfeitamente a este modelo.

Para manter a coesão de design, o sistema de organizção dos componentes, se baseia(mas não segue a risca completamente) o Atomic Design, desta forma, os componentes conseguem se comunicar com a arquitetura CSS sem grandes conflitos e a manipulação dos elementos fica mais fluída.

Esta organização pode ser melhor explicada nesta minha publicação no Medium: [Meu modelo atual para organizar a estrutura de diretórios usando Angular](https://evertonthepaula.medium.com/meu-modelo-atual-de-estrutura-de-diret%C3%B3rios-usando-angular-3e7538360d16)
