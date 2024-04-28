Vamos praticar!
Chegou a hora de aplicar o conhecimento adquirido em nosso encontro.
Lembrando sempre que os exercícios e desafios serão nossos principais
indicadores sobre o conhecimento de vocês, tanto para ajudá-los como
na hora do direcionamento para as vagas.

1. Deve ser desenvolvido um programa que realize um CRUD de carros,
porém dessa vez no backend .

Utilizando o express, realize as seguintes ações :

1 - Crie um Endpoint para Criar veículo
-> Seu carro deve ter os seguintes dados : modelo, marca,
ano, cor e preço.
-> O veículo deve ser adicionado na lista de veículos que
armazena todos os veículos cadastrados
-> Todo veículo deve ter um identificador único. Este
identificador deve ser gerado de forma automática

2 - Crie um Endpoint o para ler todos os veículos
->O sistema deve listar os veículos com o seguinte layout:
ID: 1 | Modelo: Civic| Marca: Honda | Ano: 2014/2015 | Cor: Azul |
Preço: R$40.000
ID: 1 | Modelo: Civic| Marca: Honda | Ano: 2014/2015 | Cor: Azul |
Preço: R$40.000

3 - Crie um Endpoint filtrar veículos por marca
-> O sistema deve pedir para o usuário digitar a marca que
quer filtrar
-> Deve ser listado os veículos que forem da mesma marca
-> A lista deve ter o seguinte layout:
ID: 1 | Modelo: Civic| Cor: Azul | Preço: R$40.000

ID: 1 | Modelo: Civic| Cor: Azul | Preço: R$40.000

4 - Crie um Endpoint para Atualizar veículo
-> O usuário deve digitar o IDENTIFICADOR do veículo
-> O Sistema deve verificar se o veículo existe ou não e
mostrar a seguinte mensagem caso o veículo não exista:
"Veículo, não encontrado. O usuário deve voltar para o menu
inicial depois"
-> Se o veículo existir, o sistema deve permitir que o usuário
atualize somente a cor e o preço.

5 - Crie um Endpoint Remover veículo
->O usuário digitar o IDENTIFICADOR do veículo
-> O Sistema deve verificar se o veículo existe ou não e
mostrar a seguinte mensagem caso o veículo não exista:
"Veículo, não encontrado. O usuário deve voltar para o menu
inicial depois"
-> Se o veículo existir, o sistema deve remover o veículo

6 - Crie um Endpoint Criar uma pessoa usuária

-> Deve conter as seguintes informações : Nome , email ,
senha
-> Verificar se está sendo passado os dados ;
-> A senha deve ser criptografada utilizando o bcrypt ;
-> Exibir a mensagem "Usuário criado com sucesso"

7 - Crie um Endpoint logar uma pessoa usuária

->Login deve ser feito usando email e senha ;
-> Fazer as verificações caso a pessoa usuária não colocar os
dados;
-> A senha precisa ser comparada com a criptografada e se
forem iguais, logar no sistema.

8 - Realizar o deploy no render e a documentação da API no
postman e enviar juntamente no classroom .

Regras Gerais :
- Os dados de um veículo são: identificador, modelo, marca,
ano, cor, preço
- Só deve ser possível atualizar a cor e o preço do veículo.

