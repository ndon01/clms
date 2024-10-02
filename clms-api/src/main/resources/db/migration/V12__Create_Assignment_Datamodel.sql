create table if not exists assignments (
    id int primary key,
    name varchar(255),
    description text,

    start_date timestamp,
    due_date timestamp,
    created_at timestamp,
    updated_at timestamp
);

create table if not exists course_assignments (
    course_id int not null,
    assignment_id int not null,
    primary key (course_id, assignment_id),
    foreign key (course_id) references courses(id),
    foreign key (assignment_id) references assignments(id)
);

create table if not exists questions (
    id int primary key,
    question text,
    created_at timestamp,
    updated_at timestamp
);

create table if not exists assignment_questions (
    assignment_id int not null,
    question_id int not null,
    primary key (assignment_id, question_id),
    foreign key (assignment_id) references assignments(id),
    foreign key (question_id) references questions(id)
);

create table if not exists assignment_attempts (
    id int primary key,
    assignment_id int not null,
    user_id int not null,
    created_at timestamp,
    updated_at timestamp,
    foreign key (assignment_id) references assignments(id),
    foreign key (user_id) references users(id)
);

create table if not exists question_attempts (
    id int primary key,
    attempt_id int not null,
    question_id int not null,
    created_at timestamp,
    updated_at timestamp,
    foreign key (attempt_id) references assignment_attempts(id),
    foreign key (question_id) references questions(id)
);
