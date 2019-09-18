# API Documentation - Registration

## Summary

This call will be performed if a user registers

## Parameters

Parameter |Type |is mandatory |Description
user |string |true| Username in plain text
pass |string |true| Password as Hash256
email |string |true | Email of user in plain text

## Returns

Parameter |Type |Description
validRegistration |bool | Tells the software if a login was sucessful
successMessage| Array| This is an Array including the success Message (ID (int) and Message (string))
errors| Array| An Array with an object stating the errormessage (Errormessage has ID (int) and Message (string))

## Example of valid return

> {
> validRegistration: true,
> successMessage: {
> id: 100
> message: "Registration completed. Please confirm your Account via Mail before you login."
> },
> errors: null
> }

## Example of an error

> {
> validRegistration: false,
> successMessage: null,
> errors: [
>
> > {
> > id: 100,
> > message: "Username is already taken."
> > }
> > ]
> > }

## Error Codes

Code |Meaning
100 |Username is already taken
200 |E-Mail is already taken
300 |E-Mail is not a valid adress
900 |Some error in the backend occured
