const express = require("express");
const router = express.Router();
const userModel = require("../models/users");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET Users page. */
// Little trick to add representativness in the orginal DB
router.get("/update-gender", async function (req, res, next) {
  const users = await userModel.find({ status: "customer" });

  let pronoun1 = '';
  let pronoun2 = '';
  console.log('ID :',users[0].id)
for( let i = 0; i < users.length; i++){
  if(users[i].gender === 'male'){
    pronoun1 =  Math.random() > 0.7 ? 'they' : 'he';
    
  }else if(users[i].gender === 'female'){
    pronoun1 = Math.random() > 0.7 ? 'they' : 'she';
    
  }
  let chance = Math.random()
  if(pronoun1 === 'they' && users[i].gender === 'male'){
    pronoun2 = chance > 0.7 ? 'them' : 'he';
  }else if(pronoun1 === 'he' && users[i].gender === 'male'){
    pronoun2 = chance > 0.7 ? 'them' : 'him';
  }else if(pronoun1 === 'they' && users[i].gender === 'female'){
    pronoun2 = chance > 0.7 ? 'them' : 'she';
  }else{
    pronoun2 = chance > 0.7 ? 'them' : 'her';
  };

  await userModel.updateOne({_id: users[i].id}, {pronoun1: pronoun1, pronoun2: pronoun2});
}
  
  res.redirect("/users-page");
});

module.exports = router;
