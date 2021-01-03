<?php
include_once 'Model.class.php';

class Controller extends Model {

    public function saveNewsletter($email) {
        $this->setNewsletter($email);
    }

    /**
     * @param array $emails
     */
    public function deleteEmails($emails) {
        $success = true;
        foreach($emails as $email) {
            $action = $this->removeByEmail($email);
            $success = $action ? true : false;
        }
        return $success;
    }
}