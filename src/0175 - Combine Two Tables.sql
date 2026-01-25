SELECT  Person.firstName AS firstName
       ,Person.lastName  AS lastName
       ,Address.city as city
       ,Address.state as state
FROM Person
LEFT JOIN Address
ON Person.personId = Address.personId;
