<?php
require_once dirname(__FILE__) . '/model/testing/testing.class.php';

abstract class TestingManagerController extends modManagerController {
    public $testing;

    public function initialize() {
        $this->testing = new Testing($this->modx);

        $this->addJavascript($this->testing->config['jsUrl'].'mgr/testing.class.js');
        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            Testing.config = '.$this->modx->toJSON($this->testing->config).';
        });
        </script>');
        return parent::initialize();
    }

    public function getLanguageTopics() {
        return array('testing:default');
    }

    public function checkPermissions() {
        return true;
    }

    public function process(array $scriptProperties = array()) {

    }
}