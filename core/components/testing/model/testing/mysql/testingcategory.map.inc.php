<?php
/**
 * @package testing
 */
$xpdo_meta_map['TestingCategory']= array (
  'package' => 'testing',
  'version' => '1.1',
  'table' => 'testing_category',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'id' => NULL,
    'parent' => 0,
    'name' => NULL,
    'menuindex' => 0,
    'deleted' => 0,
  ),
  'fieldMeta' => 
  array (
    'id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => false,
    ),
    'parent' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
    ),
    'menuindex' => 
    array (
      'dbtype' => 'int',
      'precision' => '2',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
    'deleted' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
  ),
);
