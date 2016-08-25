<?php
class Testing {

    public $modx;
    public $config = [];

    function __construct(modX &$modx, array $config = array()) {
        $this->modx =& $modx;

        $basePath = $this->modx->getOption('testing.core_path', $config, $this->modx->getOption('core_path') .
            'components/testing/');
        $assetsUrl = $this->modx->getOption('testing.assets_url', $config, $this->modx->getOption('assets_url') .
            'components/testing/');

        $this->config = array_merge([
            'basePath' => $basePath,
            'corePath' => $basePath,
            'modelPath' => $basePath . 'model/',
            'processorsPath' => $basePath . 'processors/',
            'templatesPath' => $basePath . 'templates/',
            'jsUrl' => $assetsUrl . 'js/',
            'cssUrl' => $assetsUrl . 'css/',
            'assetsUrl' => $assetsUrl,
            'managerUrl' => $managerUrl,
            'connectorUrl' => $assetsUrl . 'connector.php',
        ], $config);

        $this->modx->addPackage('testing', $this->config['modelPath']);
    }
}