# API Documentation - Chat Message

## Summary

If a user clicks on an active Chat the chat should be opened in a second window. The API will call all chat messages of the active Chat.
The Active Chat Messages are ordered by time in the backend.

## Parameters

Parameter |Type |is mandatory |Description
user |int |true| User Id as Id
session |string |true| Session Token
chat |int |true |Id of chat that should be loaded

## Returns

Parameter |Type |Description
validCall |bool | Tells the software if a valid Call was performed
chatMessages| Array| An Array with all messages (including messageIds, userId, UserNames, LastTimeAndDate and a state)
errors| Array| An Array with an object stating the errormessage (Errormessage has ID (int) and Message (string))

## Example of valid return

Example is called by user with Id 200

```
{
    validCall: true,
    chatMessages: [
        {
            messageId: 1000,
            userId: 100,
            message: "Hallo.",
            lastTimeAndDate: 18.09.2019 - 09:54,
            state: 1
        },
        {
            messageId: 1001,
            userId: 200,
            message: "Hey!",
            lastTimeAndDate: 18.09.2019 - 09:55,
            state: 2
        },
    ],
    error: null
}
```

## Example of an error

```
{
    validCall: false,
    chats: null,
    errors: [
        {
        id: 100,
        message: "Oops! It seems you've not written any message yet."
        }
    ]
}
```

## Error Codes

Code |Meaning
100: No active message available (Message: Oops! It seems you've not written any message yet.)
900: Session Token was not valid =This should perform a autologout in the future (Message: There was a problem with loading message.)
