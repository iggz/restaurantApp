# Week 8, Day 2 Assignment - Let's build Yelp...

We're going to create an app to save business reviews.

## The Assignment

For the first version, we're going to simply create an app that lists a variety of businesses. Users can leave reviews for the businesses. 

_This is the first version of this app, we will be adding more things to this in future projects._

The requirements for this version are:

* A route that GETS ALL businesses and lists them on a page
    * Think: `getALL()` function
* A route that GETS ONE business
    * Think: `getOne()` or `getById()` function 
    * You click on a business name and see the details on that business
    * This will require a wildcard route, i.e. `business/:business_id`
* The ability to add a review for a specific business
    * This requires a review -> business relationship
    * Think: INSERT INTO...
* The reviews are visible on the business details page
    * Think: `getReviewsByBusinessId()`

### Stretch Goals

* Have a "star" ranking value that renders an asterisk (or star image) based on the value. For example, if a business has a rating of 5, render a star 5 times. 