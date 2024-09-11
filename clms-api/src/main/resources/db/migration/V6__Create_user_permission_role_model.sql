create table if not exists roles (
    id serial primary key,
    name varchar(255) not null,
    description varchar(255) not null
);

create table if not exists permissions (
    id serial primary key,
    name varchar(255) not null,
    description varchar(255) not null
);

create table if not exists role_permissions (
    role_id int not null,
    permission_id int not null,
    primary key (role_id, permission_id),
    foreign key (role_id) references roles(id),
    foreign key (permission_id) references permissions(id)
);

create table if not exists user_roles (
    user_id int not null,
    role_id int not null,
    primary key (user_id, role_id),
    foreign key (user_id) references users(id),
    foreign key (role_id) references roles(id)
);

create table if not exists user_permissions (
    user_id int not null,
    permission_id int not null,
    primary key (user_id, permission_id),
    foreign key (user_id) references users(id),
    foreign key (permission_id) references permissions(id)
    );