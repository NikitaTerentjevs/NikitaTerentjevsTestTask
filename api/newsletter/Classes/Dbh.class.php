<?php

class Dbh {
    //change these values to match your db
    private $host = "localhost";        //should be the same
    private $user = "root";             //Mysql username
    private $pwd = "";                  //Mysql password
    private $dbName = "magebit_task";   //Should be the same if you imported db from file

    protected function connect() {
        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbName;
        $pdo = new PDO($dsn, $this->user, $this->pwd);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        return $pdo;
    }
}