create database mydb;
use mydb;


/******** Table user *********/
drop table if exists user;
create table user (
	name varchar(255),
    email varchar(255) not null,
    password varchar(16) not null,
    primary key (name)
);

truncate user;
select * from user;
describe user;


/******** Table todo *********/
drop table if exists todo;
create table todo (
	id int auto_increment,
	activity varchar(255) not null,
    priority varchar(10) not null,
    fromX timestamp not null,
	created timestamp not null,
	updated timestamp not null,
    status boolean not null,
    primary key (id)
);

truncate todo;
select * from todo;
describe todo;


/******** Trigger to check the priority data and set created/updated dates *********/
drop trigger if exists check_priority;
delimiter //
create trigger check_priority before insert on todo for each row
begin
	declare prio varchar(10);
	set prio = lower(new.priority); /* Change the string to lowercase */

	if (prio != "low" and prio != "medium" and prio != "high") then
		signal sqlstate '45000' set message_text = "You can only set low, medium or high in priority space"; /* Throw error */
	else
		set new.created = now();
		set new.updated = now();
		set new.priority = prio;
	end if;
end;//


/******** Trigger to update updated date when a row gets changed *********/
drop trigger if exists refresh_updated;
delimiter //
create trigger refresh_updated before update on todo for each row set new.updated = now();


/******** Some execute statement *********/

insert into todo (activity, priority, fromX, status) values ("Study", "high", "2017-04-27 9:00", 0);

update todo set activity = "Do exercise" where id = 1;

select * from user where name like "m%";

select * from user where email like "%.com";
