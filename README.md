
# Requirement 
install node js

# Installation dev
1.  clone from repository
2.  run  'npm  install --force' or 'npm  i --force'
3.  run 'npm start'

# api
* show list of user
GET http://localhost:3000/api/user
* add user 
POST http://localhost:3000/api/user/add
body: {
      
        "userName": "john2",
        "firstName": "John2",
        "lastName": "Doe",
        "email": "_doe@mail1.com2"
    }
* update user 
PUT http://localhost:3000/api/user/update/{id}-> user id
body: {
      
        "userName": "john2",
        "firstName": "John2",
        "lastName": "Doe",
        "email": "_doe@mail1.com2"
    }
* delete 
DELETE http://localhost:3000/api/user/delete/{id}-> user id

# RUN TEST
run 'npm run test'