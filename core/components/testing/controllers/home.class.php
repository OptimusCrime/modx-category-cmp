<?php

require_once dirname(dirname(__FILE__)) . '/model/testing/testing.class.php';

class TestingHomeManagerController extends modExtraManagerController {
    public $testing;

    public function initialize() {
        $this->testing = new Testing($this->modx);

        $this->addJavascript($this->testing->config['jsUrl'] . 'mgr/testing.class.js');
        $this->addHtml('<script type="text/javascript">
            Ext.onReady(function() {
                Testing.config = ' . $this->modx->toJSON($this->testing->config) . ';
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

    public function getPageTitle() {
        return $this->modx->lexicon('testing');
    }
    
    public function loadCustomCssJs() {
        $this->addJavascript($this->testing->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->testing->config['jsUrl'] . 'mgr/widgets/home.tree.js');
        $this->addLastJavascript($this->testing->config['jsUrl'] . 'mgr/sections/home.js');
    }

    public function getTemplateFile() {
        return $this->testing->config['templatesPath'] . 'home.tpl';
    }
}