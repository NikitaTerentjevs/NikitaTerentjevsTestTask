## Requirements

You have to have installed:
npm (check if installed with npm -v), 
node.js (check if installed with node -v), 
any server (xampp, apache, etc)

## Setup

1. Clone this repo into your server docroot

2. Start server

3. Import Data Base into your mysql from `/<project-folder>/magebit_task.sql` file

4. Change Information in ` /<project-folder>/api/newsletter/Classes/Dbh.class.php` according to 
comments in that file 

5. Open project folder in console/command line and run scripts:
`npm install`, `npm start`

6. Open [http://localhost:3000](http://localhost:3000) to view project in the browser.\
The page will reload if you make edits.\
You will also see any lint errors in the console.

### Routes 

[http://localhost:3000](http://localhost:3000) Project FE\
[http://localhost:3000/admin](http://localhost:3000/admin) Table of Emails 
