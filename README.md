# MODX Category CMP

Illustrating how to reuse ExtJS components for new functionality.

## Installation

Place the `assets/` and `core/` directories in your MODX installation similar to this structure.

### Create a new namespace

Do this under the settings menu in your MODX manager (the cog wheel) and Namespace. Press Create New.

Name: testing
Core path: {core_path}components/testing/
Assets path: {assets_path}components/testing/

### Create a new menu for the components

This is also in the settings menu and Menus. Press Create Menu.

Lexicon Key: testing
Action: home
Namespace: testing

Save and clear cache.

### Create database table

This can be done with the SQL query (for MySQL):

```
CREATE TABLE IF NOT EXISTS `testing_category` (
  `id` int(10) NOT NULL,
  `parent` int(10) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `menuindex` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `testing_category`
ADD PRIMARY KEY (`id`);

ALTER TABLE `testing_category`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
```
