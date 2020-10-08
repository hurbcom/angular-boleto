# angular-boleto
- Usado em [fornecedor-web](https://github.com/hurbcom/fornecedor/blob/master/bower.json#L22)

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

## Uso

O modelo deve ser passado para directive como $parent.nomeDoModelo porque a directive possui um scope próprio e o $parent (scope) será por consequência o scope do controller onde a directive foi chamada.
