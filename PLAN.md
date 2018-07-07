# Plan for this app

This app is essentially a rating app. You rate people 1-10, and others do the same

# Users and likes

Each user has a set of data. The data includes race, height, self-ratings, age, education

The data will be related to the user via a table that includes that plus their id (this will be the userinfo table)

When a user rates someone, it's added to their own ratings as well as the other user's ratings. This will be in the ratings table, it'll include the user id, who has rated them, who they've rated, and a total of who they've rated as well as who's rated them

ratings stored will look like this: 
```
{
	0: [],
	0.5: [],
	1: [],
	1.5: [],
	2: [],
	2.5: [],
	3: [],
	3.5: [],
	4: [],
	4.5: [],
	5: [],
	5.5: [],
	6: [],
	6.5: [],
	7: [],
	7.5: [],
	8: [],
	8.5: [],
	9: [],
	9.5: [],
	10: []
}
```

It'll be an array of user ids, and this will be the same for both for where they're the ratee and rater

the overall rating schema will look like this (the word ratings will be what was defined above):

```
{
	hasRated: ratings,
	ratedBy: ratings,
	ratee: [],
	rater: []
}

```

the real question is if SQL will simplify this with with it's relationships or if it's just simpler to include a races table 

I'm thinking the SQL could be easier because a statment like this could simplify the process:

SELECT * FROM ratings WHERE (logic that checks the users race, age, height, etc)

