<?php
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/config.core.php';
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';

$corePath = $modx->getOption('testing.core_path', null, $modx->getOption('core_path') . 'components/testing/');
require_once $corePath . 'model/testing/testing.class.php';
$modx->testing = new Testing($modx);

$modx->lexicon->load('testing:default');

$path = $modx->getOption('processorsPath', $modx->testing->config, $corePath . 'processors/');
$modx->request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));
