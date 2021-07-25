const LdapAuth = require('ldapauth-fork')
//const pify = require('pify')



// https://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/



var username = ''
var password = ''
var group = ''

function makeData(email, pass, gp){
    username= email
    password= pass
    group= gp
}

const options = {
    'url': 'ldap://18.119.11.224:389/',
    'bindDN': 'cn=admin,dc=parkinspace,dc=com',
    'bindCredentials': 'admin',
    'searchBase': `ou=users,dc=parkinspace,dc=com`,
    'searchFilter': 'mail={{username}}'
  }

const makeAuthenticate = () => new Promise((resolve, reject) => {
  console.log(options)
  client = new LdapAuth(options)
  console.log(username)
  console.log(group)
  client.authenticate(username, password, (error, user) => {
    if (error) {
      return reject(error)
    }
    
    return resolve(user)
  })
})


const welcome = ({cn, mail,}) => {
  console.log(`Welcome, ${cn}!`)
  console.log(`Your e-mail address is "${mail}" according to the LDAP server.`)
}

console.log(`
=================================
Test LDAP authenticator with Node
=================================
Bind: ${options.bindDN}
Search base: ${options.searchBase}
Search filter: ${options.searchFilter}
Authenticating user "${username}" against "${options.url}"...
`)


exports.data = (email,pass,gp) =>{
    return makeData(email,pass,gp)
 }

 
exports.authenticate = () =>{
    return makeAuthenticate().then((r) => (welcome(r))).catch((e) => (console.error('Caught', e)))
 }