# API Documentation - Users

## Summary

Returns a list of all registered users with id and name

## Parameters

Parameter |Type |is mandatory |Description
user |int |true| User Id as Id
session |string |true| Session Token

## Returns

Parameter |Type |Description
validCall |bool | Tells the software if a valid Call was performed
users| Array| An Array with a list of all active users
errors| Array| An Array with an object stating the errormessage (Errormessage has ID (int) and Message (string))

## Example of valid return

Example is called by user with Id 200

```
{
    validCall: true,
    users: [
        {
            userid: 100,
            loginname: "Christian"
        },
        {
            userid: 200,
            loginname: "Michel"
        },
        {
            userid: 300,
            loginname: "Martin"
        },
        {
            userid: 400,
            loginname: "Peter"
        }
    ],
    errors: null
}
```

## Example of an error

```
{
    validCall: false,
    users: null,
    errors: [
        {
            id: 900,
            message: "There was a problem with loading chats."
        }
    ]
}

```

## Error Codes

Code |Meaning
100: No users found (Message: "It seems you are the only active person on this community... Poor fellow :(" )
900: Session Token was not valid => This should perform a autologout in the future (Message: There was a problem with loading chats.)
