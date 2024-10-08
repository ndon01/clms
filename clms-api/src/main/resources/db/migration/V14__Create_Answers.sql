create table if not exists answers
(
    id         serial primary key,
    question_id integer not null,
    answer_text text not null,
    is_correct  boolean not null,
    created_at  timestamp,
    updated_at  timestamp,
    foreign key (question_id) references questions (id) on delete cascade /* if a question is deleted, delete all answers associated with it */
);