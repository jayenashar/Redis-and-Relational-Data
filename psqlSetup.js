// connection parameters if they were created with:
//   sudo -u postgres createuser -DRS `whoami`
//   sudo -u postgres createdb -O `whoami` `whoami`
var cs = '/var/run/postgresql';
var pg = require('pg');
var client = new pg.Client(cs);

exports.cs = cs;
exports.client = client;

if (require.main === module) {
    client.connect();

    client.query('create table posts ( \
        id serial primary key,\
        title varchar(100)\
    );');

    client.query('create table comments (\
        id serial primary key,\
        post_id integer not null,\
        comment varchar(100),\
        foreign key(post_id) references posts(id)\
    );');
}
