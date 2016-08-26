<?php
class TestingCategoryGetNodesProcessor extends modObjectGetListProcessor {
    public $classKey = 'TestingCategory';
    public $languageTopics = array('testing:default');
    public $objectType = 'testing.category';
    public $defaultSortField = 'menuindex';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $parent = null;
        if ($_POST['node'] != 'root') {
            $parent = explode('_', $_POST['node'])[1];
        }

        $c->where([
            'parent' => $parent
        ]);

        return parent::prepareQueryBeforeCount($c);
    }

    public function prepareRow(xPDOObject $object) {
        $c = $this->modx->newQuery('TestingCategory');
        $c->where([
            'parent' => $object->get('id')
        ]);
        $childrenCount = $this->modx->getCount('TestingCategory', $c);

        $objectArray = [
            'text' => $object->get('name'),
            'id' => 'n_' . $object->get('id'),
            'cls' => 'icon-menu',
            'iconCls' => 'icon icon-' . ( $object->get('parent') != null ? 'navicon' : 'folder' ),
            'type' => 'menu',
            'pk' => $object->get('id'),
            'leaf' => ($object->get('parent') != null),
            'data' => $object->toArray()
        ];

        if ($childrenCount < 1) {
            // Workaround for leaf record not to display "arrows"
            $objectArray['loaded'] = true;
        }

        return $objectArray;
    }

    public function outputArray(array $array, $count = false) {
        return $this->modx->toJSON($array);
    }
}
return 'TestingCategoryGetNodesProcessor';