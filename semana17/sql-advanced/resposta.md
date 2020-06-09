# exercício 1

a) Deletaria a coluna de salary
b) Muda o nome e o tipo de dados e uma coluna
c) Muda o tipo de dados de uma coluna

d `alter table Actor change gender gender varchar(100);`

# exercícios 2

a) `UPDATE Actor SET name = "Moacyr Franco", birth_date = "2200-01-21" WHERE id = "003";`

b) `UPDATE Actor SET name = "JULIANA PÃES" WHERE name = "Juliana Paes";`

c) `UPDATE Actor SET name = "Moacyr Franco", birth_date = "2020-02-10", salary = 600000, gender = "male" WHERE id = "005";`

d) 0 row(s) affected Rows matched: 0 Changed: 0 Warnings: 0

nada foi alterado por ele não ter encontrado nenhuma correspondência no WHERE.

# exercício 3

a) `DELETE FROM Actor WHERE name = "Fernanda Montenegro"`
b) `DELETE FROM Actor WHERE gender = "male" && salary >= 1000000;`

# exercicio 4

a) `SELECT max(salary) from Actor`
b) `SELECT min(salary) from Actor where gender="female"`
c) `SELECT count(*) from Actor where gender="female"`
d) `SELECT sum(salary) from Actor`

# exercicio 5

a) Esta query retorna a contagem de tods os elementos, e os agrupa de acordo com o gênero, e motra tbm a colona de genero.

b) `SELECT id, name FROM Actor order by name desc`

c) `SELECT * FROM Actor order by salary desc`

d) `SELECT * FROM Actor order by salary desc limit 3`

e) `SELECT avg(salary), gender FROM Actor group by gender`

# exercicio 6

a)`alter table Actor add playing_limit_date varchar(255);`
b) `alter table Movie change rating rating float;`
c) `UPDATE Movie SET playing_limit_date = "2020-12-31" WHERE id = "001";`

`UPDATE Movie SET playing_limit_date = "2010-101-31" WHERE id = "003";`

d) `delete from Movie where id = "001";`

nada acontece poir não foi encontrar uma linha com id igual a 001;

# exercicio 7

a)`select count(*) from Movie where rating > 7.5;`
b) `select avg(rating) from Movie;`
c) `select count(*) from Movie where playing_limit_date >= curdate();`
d) `select count(*) from Movie where release_date >= curdate();`
e) `select max(rating) from Movie;`
f) `select min(rating) from Movie;`

# exercicio 8

a) `select * from Movie order by title desc;`

b) `select * from Movie order by title desc limit 5;`

c) `select * from Movie where release_date <curdate() order by release_date desc limit 3;`

d) `SELECT * FROM Movie ORDER BY rating DESC LIMIT 3;`
