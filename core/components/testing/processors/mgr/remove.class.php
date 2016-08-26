<?php
class TestingCategoryRemoveProcessor extends modProcessor {
    public $classKey = 'TestingCategory';
    public $languageTopics = array('testing:default');
    public $objectType = 'testing.category';

    public function process() {
        $category = $this->modx->getObject('TestingCategory', $this->getProperty('id'));
        if (!$category) {
            return $this->failure();
        }

        if ($category->get('parent') == null) {
            $this->modx->removeCollection('TestingCategory', [
                'parent' => $category->get('id')
            ]);
        }
        
        $category->remove();

        return $this->success();
    }
}
return 'TestingCategoryRemoveProcessor';