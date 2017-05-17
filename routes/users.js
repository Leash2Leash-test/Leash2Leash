var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

function signedUpAt() {
  return dateFormat(this.createdAt, "dddd, mmmm dS, yyyy, h:MM TT");
}

function shortDescription(){ 
  return this.dog_type.length > 30 ? this.dog_type.substr(0, 30) + "..." : this.dog_type;
}

var users = [
  {
    id: 1,
    first_name: "peter",
    last_name: "jackson",
    dog_type: "pony",
    shortDescription: shortDescription
  },
  {
    id: 2,
    first_name: "barak",
    last_name: "chubaka",
    dog_type: "bulldog",
    signedUpAt: signedUpAt,
    shortDescription: shortDescription
  }
];


function find(id) {
  var matchedUsers = users.filter(function(user) { return user.id == id; });
  return matchedUsers[0];
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("users/index", {users: users, title: "Leash2Leash Users" });
});

/* POST create user. */
router.post('/', function(req, res, next) {
  var user = Object.assign({}, req.body, {
    id: users.length + 1,
    signedUpAt: signedUpAt,
    shortDescription: shortDescription
  });
  users.push(user);

  res.redirect("/users/" + user.id);
});

/* Create a new user form. */
router.get('/new', function(req, res, next) {
  res.render("users/new", {user: {}, title: "New User"});
});

/* Edit user form. */
router.get("/:id/edit", function(req, res, next){
  var user = find(req.params.id);  

  res.render("users/edit", {user: user, title: "Edit User"});
});


/* Delete user form. */
router.get("/:id/delete", function(req, res, next){
  var user = find(req.params.id);  
  
  res.render("users/delete", {user: user, title: "Delete User"});
});


/* GET individual user. */
router.get("/:id", function(req, res, next){
  var user = find(req.params.id);

  res.render("users/show", {user: user, title: user.title});
});

/* PUT update user. */
router.put("/:id", function(req, res, next){
  var user = find(req.params.id);
  user.first_name = req.body.first_name;
  user.dog_type = req.body.dog_type;
  user.last_name = req.body.last_name;
  
  res.redirect("/users/" + user.id);    
});

/* DELETE individual user. */
router.delete("/:id", function(req, res, next){
  var user = find(req.params.id);  
  var index = users.indexOf(user);
  users.splice(index, 1);

  res.redirect("/users");
});


module.exports = router;