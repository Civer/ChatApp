# API Documentation - All Users

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
            id: 100,
            name: "Christian"
        },
        {
            id: 200,
            name: "Martin"
        },
        {
            id: 300,
            name: "Peter"
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
