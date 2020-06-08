# exercício 1

a) Utilizamos o Varchar(255) para representarmos umas string com no máximo 255 caracteres.
primary key para diz que aquela coluna deve guardar um identificador único para cada elemento da tabela.
O DATE representa uma data no formato YYYY-MM-DD
O NOT NULL obriga que a quela coluna não possa ter valores nulos.

b) Show databases motra todos os bancos de dados que eu estou conectado, e show tables mostra todas as tabelas criadas nesses banco de dados.

c) Mostra todas as propiedades de uma tabela, bem como o tipo de cada coluna.

# exercicio 2

a)`insert into Actor values("002", "Glória Pires", 1200000, "1963-08-23", "female");`

b)Error Code: 1062. Duplicate entry '002' for key 'PRIMARY'

O erro 1062 indica que tentamos adicionar um elemento com uma primary key ja existente.

c) Error Code: 1136. Column count doesn't match value count at row 1

O erro 1136 indica que foi passado um numero de argumentos diferente do esperado.

`INSERT INTO Actor (id, name, salary, birth_date, gender) VALUES( "003", "Fernanda Montenegro", 300000, "1929-10-19", "female" );`

d) Error Code: 1364. Field 'name' doesn't have a default value

O Erro 1364 indica que um campo que não foi passado não pode ser nulo e não pussui um valor padrão

`INSERT INTO Actor (id,name, salary, birth_date, gender) VALUES( "004", "Jame Bond", 400000, "1949-04-18", "male" );`

e) Error Code: 1292. Incorrect date value: '1950' for column 'birth_date' at row 1

O Erro 1292 indica que uma uma coluna está no formato errado.

INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
"005",
"Juliana Paes",
719333.33,
"1979-03-26",
"female"
);

f) `INSERT INTO Actor (id, name, salary, birth_date, gender) VALUES( "006", "Keira Knightley", 1000000, "1985-03-26", "female" );`

`INSERT INTO Actor (id, name, salary, birth_date, gender) VALUES( "007", "Samuel L. Jackson", 1000000, "1948-12-21", "Male" );`

# exercício 3

a) `select * from Actor where gender="female"`
b) `select salary from Actor where name="Tony Ramos"`
c) `select * from Actor where gender="invalid"`
ele não retorna um resultado vazio já que tem nenhum gender preenchido como 'invalid'

d) `select id, name, salary from Actor where salary <= 500000`

e) Error Code: 1054. Unknown column 'nome' in 'field list'

O erro 1054 indica que está tentando obter resposta de uma coluna que não existe.

`SELECT id, name from Actor WHERE id = "002"`

# exercicios 4

a) A quey está buscando todos os dados dentro da table Actor onde o nome começa com "A" ou com "J" e possuem um salary acima de 300000

b) `SELECT * FROM Actor WHERE name NOT LIKE "A%" AND salary > 350000`

c) `SELECT * FROM Actor WHERE (name LIKE "%G%" OR name LIKE "%g%")`

d) `SELECT * FROM Actor WHERE (name LIKE "%G%" OR name LIKE "%g%" OR name LIKE "%a%" OR name LIKE "%A%") AND salary BETWEEN 350000 AND 900000`

# exercicios 5

a) `create table Movie ( id varchar(255) primary key, title varchar(255) not null, sinopse text not null, release_date date not null, rating int not null );`

Esta query cria uma table contendo uma coluna chamada id que guardará a primary key. Um coluna chamada Sinopse que será do tipo TExt, pois pode ser um texto mt longo. Rating é um int por ser um numero, release_date é uma DATE por ser uma data;

b) `insert Movie (id, title, sinopse, release_date, rating) values( "001", "Se Eu Fosse Você", "Cláudio e Helena são casados há muitos anos e enfrentam a rotina do casamento. Um dia eles são atingidos por um fenômeno inexplicável e trocam de corpos", "2006-01-26", 7 );`

c) `insert Movie (id, title, sinopse, release_date, rating) values( "002", "Doce de mãe", "Dona Picucha, uma animada senhora de 85 anos, sempre causa grandes confusões. A vida dela e dos seus quatro filhos sofre uma reviravolta depois que Zaida, empregada e amiga de Dona Picucha, anuncia que vai se casar e não poderá mais morar com ela", "2012-12-27", 10 );`

d)
`insert Movie (id, title, sinopse, release_date, rating) values( "003", "Dona Flor e Seus Dois Maridos", "Dona Flor é uma sedutora professora de culinária casada com Vadinho, que só quer saber de farras e jogatina nas boates. A vida de abusos acaba por acarretar sua morte precoce.", "2017-11-02", 8 );`

e)
`insert Movie (id, title, sinopse, release_date, rating) values( "004", "O Cheiro do Ralo", "Ambientado em São Paulo, O Cheiro do Ralo narra a história de Lourenço (Selton Mello), dono de uma loja que compra objetos usados de pessoas que passam por dificuldades financeiras. Dada a natureza de seu negócio - a aquisição sempre pelo menor preço possível -, Lourenço acaba por desenvolver um jogo perverso com seus clientes. Aos poucos, esse personagem substitui, em seu relacionamento com os clientes, a frieza pelo prazer que sente ao explorá-los em um momento de aflição financeira. Perturbado pelo simbólico e fedorento cheiro do ralo que existe na loja, Lourenço é colocado em confronto com o universo e os personagens que julgava controlar. Isso o obriga a uma reavaliação de sua visão de mundo e o conduz, de forma inexorável, para um trágico desfecho. De certo modo, sua coleção de tipos se rebela e se volta contra ele. Na loja, Lourenço acaba sendo confrontado pelos personagens que julgava controlar.", "2007-03-23", 7 );`

# exercicio 6

a) `select id, title, rating from Movie where id='002'`
b) `select * from Movie where title="O Cheiro do Ralo";`
c) `select id, title, sinopse from Movie where rating >= 7;`

# exercicio 7

a) `select * from Movie where title like "%vida%"`
b) `select * from Movie where title like "%vida%" || sinopse like "%vida%"`
c) `select * from Movie where release_date <= "2007-01-18"`
d) `select * from Movie where release_date <= "2020-06-08" && (title like "%vida%" || sinopse like "%vida%") && rating > 7;`
