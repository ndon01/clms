create table if not exists courses(
    id serial primary key,
    name varChar(225) not null,
    description varChar(225) not null
);

create table if not exists course_members (
    user_id int not null,
    course_id int not null,
    primary key (user_id, course_id),
    foreign key (user_id) references users(id),
    foreign key (course_id) references courses(id)
);