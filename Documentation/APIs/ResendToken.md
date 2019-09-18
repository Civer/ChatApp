# API Documentation - ResendToken

## Summary

If the mail was lost in space and the user wants to send a new one, this API is called

## Parameters

Parameter |Type |is mandatory |Description
user |string |true| Username in plain text
email |string |true | Email of user in plain text

## Returns

Parameter |Type |Description
validRegistration |bool | Tells the software if a login was sucessful
successMessage| Array| This is an Array including the success Message (ID (int) and Message (string))
errors| Array| An Array with an object stating the errormessage (Errormessage has ID (int) and Message (string))

## Example of valid return

```
{
    validRegistration: true,
    successMessage: {
        id: 100
        message: "The Mail was send a second time. Be aware the token from the first mail is now invalid."
    },
    errors: null
}
```

## Example of an error

```
{
    validRegistration: false,
    successMessage: null,
    errors: [
        {
            id: 100,
            message: "Your account is already activated."
        }
    ]
}
```

## Error Codes

Code |Meaning
100 |Account is already activated
200 |Account is unknown
300 |E-Mail is wrong
900 |Some error in the backend occured
