create table if not exists question_bank_questions(
    id serial primary key,
    question_name varchar(255) null
);
create table if not exists question_bank_categories(
    id serial primary key,
    category_name varchar(255) null
);
create table if not exists question_bank_question_category_mapping(
    question_bank_question_id int null,
    question_bank_category_id int null,
    primary key (question_bank_question_id, question_bank_category_id),
    foreign key (question_bank_question_id) references question_bank_questions(id),
    foreign key (question_bank_category_id) references question_bank_categories(id)
);
create table if not exists question_bank_category_children(
    parent_id int null,
    child_id int null,
    primary key (parent_id, child_id),
    foreign key (parent_id) references question_bank_categories(id)
);