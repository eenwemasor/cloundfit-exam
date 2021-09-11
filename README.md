### Docs


- ` git clone git@github.com:enwemasor1995/cloundfit-exam.git`
- ` npm install`
-  to run migration `npx sequelize db:migrate` ensure the you have a database name exam on your local mysql setup
- ` npm run start` to run the serve on port 8080


## Available routes

- view all question ordered by category

    ```
    curl --request GET \
    --url http://localhost:8080/questions
    ```

- create category
```
curl --request POST \
  --url http://localhost:8080/categories/create \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"technical"
}'

```

- update category
```
curl --request PUT \
  --url http://localhost:8080/categories/update/:id \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"aptitude alone"
}'

```

- delete category
```
curl --request DELETE \
  --url http://localhost:8080/categories/destroy/:id

```



- create question
```
curl --request POST \
  --url http://localhost:8080/questions/create \
  --header 'Content-Type: application/json' \
  --data '{
	"body": "What is your name 1",
	"CategoryId":1,
	"options":[
        {	    
            "value": "Body",
		    "isTheAnswer":false
        },
		{			
            "value": "Body",
			"isTheAnswer":false
        }
	]
}'

```



- update question
```
curl --request PUT \
  --url http://localhost:8080/questions/update/:id \
  --header 'Content-Type: application/json' \
  --data '{
	"body": "What is your name again",
	"CategoryId":1
}'

```



- delete question
```
curl --request DELETE \
  --url http://localhost:8080/questions/destroy/:id \
  --header 'Content-Type: application/json'

```



- create question options
```
curl --request POST \
  --url http://localhost:8080/questions/options/create \
  --header 'Content-Type: application/json' \
  --data '{
	"QuestionId":1,
	"value": "Node Body",
	"isTheAnswer": false
}'

```



- update question option
```
curl --request PUT \
  --url http://localhost:8080/questions/options/update/:id \
  --header 'Content-Type: application/json' \
  --data '{
	"questionId":14,
	"value": "Node Body again",
	"isTheAnswer": false
}'

```



- delete question option
```
curl --request DELETE \
  --url http://localhost:8080/questions/options/destroy/:id

```