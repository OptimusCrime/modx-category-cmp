<?php
class TestingCategoryUpdateProcessor extends modProcessor {
    public $classKey = 'WhoppCategory';
    public $languageTopics = array('whopp:default');
    public $objectType = 'whopp.category';

    public function process() {
        $obj = $this->modx->getObject('TestingCategory', $this->getProperty('id'));
        
        if (!$obj) {
            return $this->failure();
        }

        // Update category
        $obj->set('name', $this->getProperty('name'));
        $obj->set('parent', $this->getProperty('parent'));
        $obj->save();

        return $this->success();
    }
}
return 'TestingCategoryUpdateProcessor';