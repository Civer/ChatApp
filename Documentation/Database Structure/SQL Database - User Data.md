## SQL Database

### user

- userId (INT PRIMARY, AI)
- loginName (VARCHAR-100)
- password (VARCHAR-100)
- mail (VARCHAR-150)
- lastLoginDate (TIMESTAMP)
- creationDate (CURRENT TIMESTAMP at Creation)
- isVerified (BOOLEAN)

### userSession

- sessionId (INT PRIMARY, AI)
- sessionKey (VARCHAR-100)
- userId (INT)
- isActive (BOOLEAN) //Maybe ommitable
- creationDate (CURRENT TIMESTAMP at Creation)
- lastUpdate (TIMESTAMP on Update CURRENT_TIMESTAMP)
- expirationDate (TIMESTAMP)

### verificationToken

- tokenId (INT PRIMARY, AI)
- token (VARCHAR-100)
- userId (INT) //Maybe ommitable
- isActive (book) //Maybe ommitable
- creationDate (CURRENT TIMESTAMP at Creation)
- expirationDate (TIMESTAMP)

Actual Version of Database Dump can be found in Database Structure Folder under name: dbs.sql
