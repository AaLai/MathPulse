# MathPulse

A quiz application built to assess the math abilities of grade 10 students. Results are shown in real time to the test administrator.

## Version 1.0.0

Base build

### Features

* One assessment can be run at a time
* Teachers can see students login and answer in real time
* Teachers can pause and continue the test
* Teachers can send message icons to student
* A results summary is generated at the end of the assessment

## Screenshots
!["Teacher Scoreboard"](https://github.com/67millwood/grade10math/blob/development/frontend/src/images/teacherScoreBoard.png?raw=true)
!["Student Question"](https://github.com/67millwood/grade10math/blob/development/frontend/src/images/studentQuestion.png?raw=true)

## Setup

1. Fork & Clone

#### Backend

2. Change to backend directory
3. Run `bundle install` to install dependencies
4. Run `bin/rake db:reset` to create, load and seed db
5. Run `bin/rails s` to start the server

#### Frontend

6. Change to frontend directory
7. Run `npm install` to install dependencies
8. Run `npm start` to start server

9. Visit `localhost:3000` on your browser to access site


## Dependencies

#### Backend

* Rails 5.2.2 [Rails Guide](http://guides.rubyonrails.org/v4.2/)
* PostgreSQL 9.x
* Puma 3.11
* Redis 4.0
* Faker 1.9.1

#### Frontend

* React 16.6.3
* React-dom 16.6.3
* React-actioncable-provider 1.0.3
* React-scripts 2.1.1
* Bootstrap
