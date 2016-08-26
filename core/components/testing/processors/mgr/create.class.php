<?php
class TestingCategoryCreateProcessor extends modProcessor {
    public $classKey = 'WhoppCategory';
    public $languageTopics = array('whopp:default');
    public $objectType = 'whopp.category';

    public function process() {
        // Parent
        $parent = null;
        if (is_numeric($this->getProperty('parent'))) {
            $parent = $this->getProperty('parent');
        }

        // Menu index
        $menu_index = 0;
        $c = $this->modx->newQuery('TestingCategory');
        $c->where([
            'parent' => $parent
        ]);
        $c->sortby('menuindex', 'DESC');
        $c->limit(1);
        
        $last_menu_index_object = $this->modx->getObject('TestingCategory', $c);
        if ($last_menu_index_object) {
            $menu_index = $last_menu_index_object->get('menuindex') + 1;
        }

        // Create object
        $obj = $this->modx->newObject('TestingCategory');
        $obj->set('name', $this->getProperty('name'));
        $obj->set('parent', $parent);
        $obj->set('menuindex', $menu_index);
        $obj->save();

        return $this->success();
    }
}
return 'TestingCategoryCreateProcessor';