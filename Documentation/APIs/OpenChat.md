# API Documentation - Open Chat

## Summary

This API is used for opening a chat

## Parameters

Parameter |Type |is mandatory |Description
user |int |true| User Id as Id
session |string |true |Session Token
partner |int |true |Id of user with whom a chat should be opened

## Returns

Parameter |Type |Description
validChatRequest |bool | Tells the software if a login was sucessful
errors| Array| An Array with an object stating the errormessage (Errormessage has ID (int) and Message (string))

## Example of valid return

> {
> validChatRequest: true, // Will force a reload of message window, opens new chat window
> errors: null
> }

## Example of invalid Token request

> {
> validChatRequest: false,
> errors: [
>
> > {
> > id: 100,
> > message: "Chat already opened"
> > params: {
> > chatId: 3 //Params can be null. This chatId is only returned when id 100 is sent
> > }
> > }
> > ]
> > }

## Error Codes

Code |Meaning
100 |Chat already existing => If chat is already opened jump to open chat window
200 |Account and token are not matching
900 |Some error in the backend occured
