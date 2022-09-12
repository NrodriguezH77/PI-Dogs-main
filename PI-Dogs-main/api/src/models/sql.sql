create database dogs;
drop database dogs;

insert into "Temperamentos" (name) values('Sociable'); 
insert into "Temperamentos" (name) values('Introvertido'); 

insert into "Razas" (name, weight, height, life_span) values('Pincher', '5-7 kg', '10-20 cm', '10-12 years'); 

select * from "Razas";
select * from "Temperamentos";
select * from "Raza_Temperamento";