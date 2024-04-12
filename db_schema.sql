create table users (
	id serial not null primary key,
	name varchar(32) not null,
	newsletter boolean default(false),
	reply_mailing boolean default(false),
	tg_id int not null unique,
	chat_id int not null,
	rating int
);

create table question (
	id serial primary key not null unique,
	title text not null,
	body text not null,
	trust boolean default(false),
	likes int,
	main_tags varchar(64),
	author_id int references users(tg_id)
);

create table answer (
	id serial primary key not null,
	body text not null,
	trust boolean default(false),
	likes int,
	author_id int references users(tg_id),
	question_id int references question(id)
)