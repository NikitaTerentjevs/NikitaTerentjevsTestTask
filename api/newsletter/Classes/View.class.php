<?php
include_once 'Model.class.php';

class View extends Model {
    public function showNewsletter($email = "") {
        $results = $this->getNewsletter($email);

        return $results;
    }

    public function showByEmailProvider($provider, $email = "")
    {
       $results = $this->getByEmailProvider($provider, $email);

       return $results;
    }
}