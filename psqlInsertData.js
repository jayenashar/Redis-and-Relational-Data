var pg = require('./psqlSetup'),
    createData = require('./createData');

var client = pg.client;

var data = createData.getData()


function insertPost(post){
  return ["INSERT INTO posts(title) VALUES('",
    post.title,
    "');"].join('');
}

function insertComment( comment ){
  return [
    "INSERT INTO comments(post_id, comment) VALUES(",
    comment.post_id + 1,
    ",'",
    comment.comment,
    "');"
  ].join('')
}


for (var i = 0; i < data.posts.length; i++) {

  client.query( insertPost(data.posts[i]) );
};

for (var i = 0; i < data.comments.length; i++) {

  client.query( insertComment(data.comments[i]));
};


