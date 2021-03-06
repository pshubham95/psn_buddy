#PSN Buddy

#Pre-requisites

## Node JS
#### Download: https://nodejs.org/en/download/

## Postgres SQL
#### Download: http://www.enterprisedb.com/products-services-training/pgdownload

## Cordova & Ionic Framework
#### In command prompt type

```sh
npm install -g cordova ionic
```
If you are behind proxy then set proxy
Run the following commands:
  ```sh
  > set HTTP_PROXY=http://3.28.29.241:88
  > set HTTPS_PROXY=http://3.28.29.241:88
  > set NO_PROXY=".sw.ge.com, openge.ge.com, github.sw.ge.com, .swcoe.ge.com, localhost"
  > npm config set proxy http://3.28.29.241:88
  > npm config set https-proxy http://3.28.29.241:88
  > npm config set strict-ssl false
  > npm config set registry http://registry.npmjs.org/
  ```

#Application Set Up
Follow below steps:

##1. Clone repository
```sh
$ git clone https://github.com/psngit/psn_buddy.git
```
##2. Start the Postgres DB
>Open the Postgres App
>The Postgres Database should have the DB name as "PSN_BUDDY_DB" and the schema name should be 'psn'
>Run the database.js file with command  ```sh $ node database ``` to create all the tables and insert default data (Should run only for the first time)

##3. Start Backend Node Server
Go inside "PSN Buddy Web Services" folder and run below command
```sh
$ npm install
$ node server
```
##4. Start Ionic App
Go inside "PSN Buddy" folder and run the following command
> To watch the SCSS files and convert them automatically to CSS file run ```sh $ gulp watch ```
> To install all the app dependencies run ```sh $ ionic prepare ```
> To Launch the app in Livereload mode run ```sh $ ionic serve ```




