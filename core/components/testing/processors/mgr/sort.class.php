<?php
class TestingCategorySortProcessor extends modProcessor {
    public function process() {
        $data = $this->getProperty('data');

        if (empty($data)) {
            return $this->failure();
        }

        $data = urldecode($data);
        $data = $this->modx->fromJSON($data);

        $nodes = [];
        foreach ($data as $k => $v) {
            $children = [];
            foreach ($v as $ik => $iv) {
                $children[] = explode('_', $ik)[1];
            }

            $nodes[] = [
                'parent' => explode('_', $k)[1],
                'children' => $children
            ];
        }

        for ($i = 0; $i < count($nodes); $i++) {
            $parent_obj = $this->modx->getObject('TestingCategory', $nodes[$i]['parent']);
            $parent_obj->set('parent', null);
            $parent_obj->set('menuindex', $i);
            $parent_obj->save();

            for ($j = 0; $j < count($nodes[$i]['children']); $j++) {
                $child_obj = $this->modx->getObject('TestingCategory', $nodes[$i]['children'][$j]);
                $child_obj->set('parent', $nodes[$i]['parent']);
                $child_obj->set('menuindex', $j);
                $child_obj->save();
            }
        }

        return $this->success();
    }
}
return 'TestingCategorySortProcessor';