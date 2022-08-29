# javascript-task

## How to run the server
1. cd ./server
2. npm start

The server consists of 2 endpoints:

`GET /words` => returns a list of 10 random words with at least 1 word from each pos present in the wordsList

`POST /rank` => takes an exam score and returns its corresponding rank compared to other students scores (rounded to the nearest hundredth) 

`GET /pos` => returns all available POS found in the list so React knows which answer buttons to display