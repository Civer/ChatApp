# API Documentation - PostMessage

## Summary

This API is used for posting a message

## Parameters

Parameter |Type |is mandatory |Description
user |int |true| User Id as Id
session |string |true |Session Token
chatId |int |true |Id of Chat that the message should be posted to
message |string |true | Message Body

## Returns

Parameter |Type |Description
validPost |bool | Tells the software if a login was sucessful
errors| Array| An Array with an object stating the errormessage (Errormessage has ID (int) and Message (string))

## Example of valid return

```
{
    validPost: true, // Will force a reload of message window
    errors: null
}
```

## Example of invalid Token request

```
{
    validPost: false,
    errors: [
        {
            id: 100,
            message: "Message sending failed."
        }
    ]
}
```

## Error Codes

Code |Meaning
100 |Token is not valid anymore
200 |Account and token are not matching
300 |No access to given chat
900 |Some error in the backend occured
