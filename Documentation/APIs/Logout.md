# API Documentation - Logout

## Summary

This call will be performed when user wants to logout

## Parameters

Parameter |Type |is mandatory |Description
user |int |true| User Id as Id
session |string |true| Session Token

## Returns

Parameter |Type |Description
validLogout |bool | States if a logout was sucessful. User will be logged out either way!

## Example of return

```
{
    valivalidLogout: true,
}
```

## More information

If a logout is performed with a wrong session token, the session time of the stated userId will be decreased to 5 minutes left, but token stays active.
The entity that performed the call will be logged out nevertheless.
That way the user the session of the logged in user stays active in the database for 5 more minutes, but the browser he is on is logged out.
If it was a mistake or a "hacked" logout, the actual user has the possibility to "stay logged in by performing tasks online".
