# API Documentation - Active Chats

## Summary

This call will return a list of all active Chats with the last written message and a state.

## Parameters

Parameter |Type |is mandatory |Description
user |int |true| User Id as Id
session |string |true| Session Token

## Returns

Parameter |Type |Description
validCall |bool | Tells the software if a valid Call was performed
chats| Array| An Array with all active chats (including chat Ids, userIds, UserNames, LastTimeAndDate and a state)
errors| Array| An Array with an object stating the errormessage (Errormessage has ID (int) and Message (string))

## Example of valid return

Example is called by user with Id 200

```
{
    validCall: true,
    chats: [
        {
            chatId: 1,
            userId1: 100
            userId2: 200
            userName1: Name of First User of conversation
            userName2: Name of Call User
            lastTimeAndDate: 18.09.2019 - 09:43
            state: 1
        },
        {
            chatId: 4,
            userId1: 200
            userId2: 400
            userName1: Name of Call User of conversation
            userName2: Name of User with Id 400
            lastTimeAndDate: 18.09.2019 - 09:43
            state: 2
        }
    ],
errors: null
}
```

## Example of an error

```
{
    validCall: false,
    chats: null,
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
100: No active chats available (Message: No active chats available)
900: Session Token was not valid => This should perform a autologout in the future (Message: There was a problem with loading chats.)
