<?php
class TestingCategoryGetParentsProcessor extends modObjectGetListProcessor {
    public $classKey = 'TestingCategory';
    public $languageTopics = array('testing:default');
    public $objectType = 'testing.category';
    public $defaultSortField = 'menuindex';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $c->where([
            'parent' => null
        ]);

        return parent::prepareQueryBeforeCount($c);
    }
}
return 'TestingCategoryGetParentsProcessor';