# API Documentation - Verification

## Summary

This link is called from the email that is send to the user

## Parameters

Parameter |Type |is mandatory |Description
userId |Id |true| UserId
token |string |true | An SHA256 token generated while registering

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
        id: 100,
        message: "Congratulations. You may now log in to the application!"
    },
    errors: null
}
```

## Example of invalid Token request

```
{
    validRegistration: false,
    successMessage: null,
    errors: [
        {
            id: 100,
            message: "Something went wrong. Try to resend the token by pressing the link below."
        }
    ]
}
```

## Error Codes

Code |Meaning
100 |Token is not valid anymore
200 |Account and token are not matching
900 |Some error in the backend occured
