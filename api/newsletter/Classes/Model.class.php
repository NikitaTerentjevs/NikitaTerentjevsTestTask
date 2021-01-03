<?php
include_once 'Dbh.class.php';

class Model extends Dbh{

    protected function setNewsletter($email) {
        $sql = "Insert Into newsletter (email) Values (?)";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([$email]);
    }

    protected function removeByEmail($email) {
        $sql = "Delete From newsletter Where email = ?";
        $stmt = $this->connect()->prepare($sql);
        return $stmt->execute([$email]);
    }

    protected function getNewsletter($email) {
        $sql = "Select * from newsletter where email like ?";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute(["%". $email ."%"]);
        $results = $stmt->fetchAll();

        return $results;
    }

    protected function getByEmailProvider($provider, $email) {

        $sql = "Select * from newsletter Where email like ?";


        $sql = $sql . " And email like ?";

        $stmt = $this->connect()->prepare($sql);
        $preparedArray = array();

        $provider = str_replace("@", "", $provider);
        array_push($preparedArray, '%@' . $provider . '%');

        array_push($preparedArray, '%' . $email . '%');

        $stmt->execute($preparedArray);
        $results = $stmt->fetchAll();

        return $results;
    }
}