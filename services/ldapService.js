/*update the url according to your ldap address*/
const LdapAuth = require('ldapauth-fork')
const { authenticate } = require('./ldap')

/*
var client = ldap.createClient({
    url: 'ldap://18.119.11.224/:389'
});
*/

const options = {
    'url': 'ldap://18.119.11.224:389/',
    'bindDN': 'cn=admin,dc=parkinspace,dc=com',
    'bindCredentials': 'admin',
    'searchFilter': 'mail={{username}}'
}


function makeAuthenticateDN(username, password, group) {
    return new Promise((resolve, reject) => {
        options['searchBase']= `ou=${group},dc=parkinspace,dc=com`
        client = new LdapAuth(options)
        client.authenticate(username, password, function (err) {
          if (err){
              resolve(false)
          }else{
                resolve(true)
          };
    });
});
}



/*
makeAuthenticateDN(username, password, group ) {
    bind use for authentication
    
    options['searchBase']= `ou=${group},dc=parkinspace,dc=com`
    console.log(options)
    client = new LdapAuth(options)
    console.log(password)
    authenticated = false
    client.authenticate(username, password, function (err) {
        if (err) {
            console.log("Error in new connetion " + err)
        } else {
            /*if connection is success then go for any operation
            console.log("Success"); 
            authenticated=true  
            return 

        }
    });

    return authenticated
    
}

*/


async function makeAddUser(user) {
    var newUser = {
        sn: 'generico',
        mail: user.email,
        objectClass: 'inetOrgPerson',
        userPassword: user.password
    }

    return client.bind("cn=admin,dc=parkinspace,dc=com", "admin", function (err) {
        if (err) {
            console.log("Error in new connetion " + err)
        } else {
            /*if connection is success then go for any operation*/
            console.log("Success");
            client.add(`cn=${user.email},ou=users,dc=parkinspace,dc=com`, newUser, function (err) {
                if (err) {
                    console.log("err in new user " + err);
                } else {
                    console.log("added user")
                    
                }
                client.destroy()
            });

        }

        
    });

}


async function makeAddParkingUser(user) {
    var newUser = {
        sn: 'generico',
        mail: user.email,
        objectClass: 'inetOrgPerson',
        userPassword: user.password
    }

    return client.bind("cn=admin,dc=parkinspace,dc=com", "admin", function (err) {
        if (err) {
            console.log("Error in new connetion " + err)
        } else {
            /*if connection is success then go for any operation*/
            console.log("Success");
            client.add(`cn=${user.email},ou=parkingUser,dc=parkinspace,dc=com`, newUser, function (err) {
                if (err) {
                    console.log("err in new user " + err);
                } else {
                    console.log("added user")
                    
                }
                //client.destroy()
            });

        }

        
    });

}


exports.addUser = (user) =>{
    return makeAddUser(user)
 }

 exports.addParkingUser = (user) =>{
    return makeAddParkingUser(user)
 }

 exports.authenticateDN = (user,password,group) =>{
    return makeAuthenticateDN(user,password,group)
 }