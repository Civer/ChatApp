# API Documentation - Login

## Summary

This call will be used when a login with username and password is performed
The password will be provided as SHA256 hash
The login name will be passed als normal string of username

## Parameters

Parameter |Type |is mandatory |Description
user |string |true| Username in plain text
pass |string |true| Password as Hash256

## Returns

Parameter |Type |Description
validLogin |bool | Tells the software if a login was sucessful
token| string| This is the sessiontoken for the active user session
errors| Array| An Array with an object stating the errormessage (Errormessage has ID (int) and Message (string))

## Example of valid return

```
{
    validLogin: true,
    token: ABCDEFGH123456,
    errors: null
}
```

## Example of invalid login

```
{
    validLogin: false,
    token: null,
    errors: [
        {
        id: 100,
        message: "Login failed. Login is invalid or password is wrong.
        }
    ]
}
```

## Error Codes

Code |Meaning
100 |Username is not known
200 |Password is wrong
300 |Some error in the backend occured
