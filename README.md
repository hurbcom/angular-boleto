# angular-boleto
[pt-BR]

Directive de angularjs para campo de boleto bancário com validação de dígitos verificadores e valor

[/pt-BR]

[en-US]

Angularjs directive for bank boleto* field with digit validation and value.

\* Boleto is a brazilian way to pay bills of any bank to any bank. Summarizing, is a simple digit sequence that informs a bank, who to pay, value, due date and others.

[/en-US]


## Instalação (Ubuntu Linux) do ambiente para desenvolvimento, teste e geração de versão de distribuição

Instalar node:

`curl -sL https://deb.nodesource.com/setup | sudo bash -`

`sudo apt-get install nodejs`

Instalar pacotes globais via npm:

> Importante, não instalar o node-gyp do apt-get

`sudo npm install -g gulp bower node-gyp`

Dentro da pasta do projeto, instalar os pacotes do mesmo:

`npm install`

Inslatar os pacotes do bower

`bower install`

Para rodar o projeto em modo desenvolvimento, executar:

`gulp serve`

Para rodar os testes, executar:

`gulp test`


### Nota da instalação

Caso encontre a mensagem abaixo durante a instalação:

```
Unable to find a suitable version for angular, please choose one:
    1) angular#~1.2.28 which resolved to 1.2.28 and is required by angular-boleto
    2) angular#~1.2.9 which resolved to 1.2.28 and is required by angular-input-masks#1.4.2
    3) angular#>=1 <1.3.0 which resolved to 1.2.28 and is required by angular-bootstrap#0.12.1
    4) angular#>= 1.0.2 which resolved to 1.2.28 and is required by angular-ui-utils#944109c262
    5) angular#1.3.15 which resolved to 1.3.15 and is required by angular-mocks#1.3.15

Prefix the choice with ! to persist it to bower.json

? Answer: 
```

Escolha a opção requerida pelo **angular-boleto**, no exemplo, a opção 1 (um).


## Uso

O modelo deve ser passado para directive como $parent.nomeDoModelo porque a directive possui um scope próprio e o $parent (scope) será por consequência o scope do controller onde a directive foi chamada.
