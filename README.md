# Error Handling

Error handling is done centrally in express middleware

There are different status codes used

## 2xx Request was handled successfully

200 - OK
201 - Created

## 4xx Request failed because of user

These are errors because of users

## 5xx Request failed because of Offsett

These are operational errors

We distinguish between two types of errors

## Operational Errors

These are errors that can't be avoided. Databases for examples don't connect sometimes

## Programmatic Errors

These are errors due to programming mistakes
