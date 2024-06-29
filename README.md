# Introduction

This is a demo application built using Express.js with TypeScript. It includes features for account creation, funding, withdrawing, and transferring funds, with database transactions managed using Knex.js.

# Installation

To get started, clone the repository and install the dependencies:
create a .env file and fill with the .env.example key=value

-      $  git clone https://github.com/AkinbodeBams/demoCredit.git
-       $ cd demoCredit
      $ create a mysql database with suitable credentials
- create a .env file and fill with the .env.example key=value

### NPM

    $ npm install
    $ npm run dev

### DOCKER

    $ docker compose up

# Stacks

## Server

- NodeJs LTS (ExpressJs)
  -

## Database

- Mysql
- Orm ⇒ KnexJs

## ERD

<img width="527" alt="image" src="https://github.com/AkinbodeBams/demoCredit/assets/53081200/050d9d74-3319-4ee3-aeb1-db798c0948ee">


# Postman Url

[Akinbode-bamigboye-postman-documenation](https://documenter.getpostman.com/view/23775911/2sA3duFYDu)

# Implementation

- **Routes (Routing Layer)**

  #### User

  This route is a post method route that takes payload
  from user : checks , BVN, email or phoneNumber against
  the adjuntor karma blacklist api , and returns a forbidden
  error if any of the clients provided information are found
  to be blacklisted or creates user if all validations are valid.

      - Create User
      	- Post {{baseUrl}}/api/user/create
      	- Takes no Authentication
      	- payload:
      		- firstName *required*
      		- lastName *required*
      		- bvn *required*
      		- email *optional*
      		- phoneNumber *optional*
      		- domain *optional*
      			- one of either email or phone number must be provided
      		- Validations:
      			- email:
      				- optional
      				- must be of email format (e.g example.com)
      				- must be a string
      			- Phone Number:
      				- optional
      				- must be a nigerian fomated number +234XXXXXXX
      				- must be a string
      			-Bvn
      				- Required
      				- must be 11 length
      				- must be a string
      Errors
      	- ACCOUNT_CREATION_ERROR
      	- ForbiddenError -- if user is blacklisted
      	- ValidationError -- if any of the validation constraints is violated


  #### Account

      	This api can only work with an authenticated user ,
      		- To get an authenticated user , you can call
      		- the generate token api
       - Fund Account
      	 - Post {{baseUrl}}/api/account/fund
      	 - Authentication token (userBvn-epoch * 20 mins)
      		 -example  22345470931-1719606011070
      	- Payload
      		- amount: *required*
      			- Must be of type number
      			- must be bigger than 50
      			- must be less than 10,000,000
      		- source *required*
      			- value must be either "loan" | "transfer" | "others"
      			- must be a string
      	Errors
      	- FUND_ERROR
      		- UnauthorizedError -- if token is invalid or expired
      		- ValidationError -- if any of the validation constraints is violated

       - Withdraw Fund
      	 - Post {{baseUrl}}/api/account/withdraw-fund
      	 - Authentication token (userBvn-epoch * 20 mins)
      	 - payload
      		 - amount: *required*
      			- Must be of type number
      			- must be bigger than 50
      			- must be less than 10,000,000
       Errors
      	- WITHDRAW_ERROR
      		- UnauthorizedError -- if token is invalid or expired
      		- INSUFFICIENT_BALANCE_ERROR -- if balance is less than amount
      		- ValidationError -- if any of the validation constraints is violated
      		-

- **Controllers (Controller Layer)**
  - Controllers handle incoming HTTP requests, process them through the service layer, and return appropriate HTTP responses. Each controller in relation with Route layer
- **Services (Service Layer)**

  - Services encapsulate the core business logic of the application. They process data and perform operations necessary to fulfill the requests made to the controllers.

- **Data Access Objects (DAO) (Data Access Layer)**
  - UserDao:
    - createUser
      - takes data transfer object:
        - validated data
      - creates users and return partial infomation , excluding bvn
    - findUserWithAccountByUserId
      - takes data transfer object:
        - validated data in this case just userId
    - findById
    - findByEmail
    - findByPhoneNumber
    - findByBvn
    - findByUserAccountNumber
  - AccountDao:
    - createAccount
    - getAccountByUserId
    - getAccountByAccountNumber
    - updateAccount
- **Models (Model Layer)**
  - one to many Relation (user -> Account) see ERD
  - Account
  - User
- **DTOs (Data Transfer Objects)**
  - They help in validating and transferring data in a structured way. Each DTO represents the expected structure of the request payload for different API endpoints.

## Separation of Responsibility

The application follows a well-defined separation of responsibilities to ensure maintainability, scalability, and testability. Each layer has a specific role and interacts with adjacent layers:

- **Routing Layer**: Defines the API endpoints and maps them to corresponding controllers.
- **Controller Layer**: Handles incoming HTTP requests, validates inputs, calls the service layer, and returns HTTP responses.
- **Service Layer**: Contains the core business logic, processes data, and performs necessary operations.
- **Data Access Layer (DAO)**: Abstracts the database operations and provides a clean interface for data access.
- **Model Layer**: Defines the structure and relationships of the data.
- **DTOs**: Ensure data consistency and validation across the application.
- **Middleware**: Provides reusable processing logic for requests and responses.
