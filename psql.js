var pg = require('./psqlSetup');
var client = pg.client;



var completed = 0, queries = [], start = Date.now();


for (var i = 1; i < 10001; i++) {
  (function(i){
   queries[i] = client.query("select * from posts, comments where posts.id=$1 AND posts.id=comments.post_id;", [i])
   queries[i].on('row', function(row){ });
   
   queries[i].on('end', function(){ 
    completed += 1 
    if(completed === 10000){
      client.end();
      console.log("End: " + (Date.now() - start))
    }
  })

 })(i)
};





