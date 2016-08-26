/**
 * This is the part of the code the creates the actual tree by extending MODX.tree.Tree
 */
Testing.tree.Categories = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        root_id: null
        ,root_name: _('menu_top')
        ,rootVisible: false
        ,expandFirst: true
        ,enableDrag: true
        ,enableDrop: true
        ,url: Testing.config.connectorUrl
        ,action: 'mgr/getNodes'
        ,sortAction: 'mgr/sort'
        ,primaryKey: 'text'
        ,useDefaultToolbar: false
        ,ddGroup: 'modx-menu'
        ,tbar: [{
            text: _('testing.category_create')
            ,cls:'primary-button'
            ,handler: this.createCategory
            ,scope: this
        }]
    });
    Testing.tree.Categories.superclass.constructor.call(this,config);
};
Ext.extend(Testing.tree.Categories, MODx.tree.Tree, {
    windows: {}

    ,createCategory: function(n,e) {
        var r = {
            parent: null
        };
        if (this.cm && this.cm.activeNode && this.cm.activeNode.attributes && this.cm.activeNode.attributes.data) {
            r['parent'] = this.cm.activeNode.attributes.data.id;
        }
        if (!this.windows.create_category) {
            this.windows.create_category = MODx.load({
                xtype: 'testing-window-category-create'
                ,record: r
                ,listeners: {
                    'success': {
                        fn: function(r) {
                            this.refresh(); 
                        }
                        ,scope:this
                    }
                }
            });
        }
        this.windows.create_category.reset();
        this.windows.create_category.setValues(r);
        this.windows.create_category.show(e.target);
    }

    ,updateCategory: function(n,e) {
        var r = this.cm.activeNode.attributes.data;
        Ext.apply(r, {
            id: r.id
            ,text: r.text
        });
        
        this.windows.update_category = MODx.load({
            xtype: 'testing-window-category-update'
            ,record: r
            ,listeners: {
                'success': {
                    fn:function(r) {
                        this.refresh(); 
                    }
                    ,scope:this
                }
            }
        });
        this.windows.update_category.setValues(r);
        this.windows.update_category.show(e.target);
    }

    ,removeCategory: function(n, e) {
        MODx.msg.confirm({
            title: _('warning')
            ,text: _('testing.category_remove_text')
            ,url: Testing.config.connectorUrl
            ,params: {
                action: 'mgr/remove'
                ,id: this.cm.activeNode.attributes.pk
            }
            ,listeners: {
                'success':{
                    fn: this.refresh
                    ,scope: this
                }
            }
        });
    }

    ,getMenu: function(n, e) {
        var m = [];
        
        // If the node we right click on has no parent, allow to create a category here
        if (n.attributes.data.parent == null) {
            m.push({
                text: _('testing.category_create')
                ,handler: this.createCategory
            });
        }
        
        // We're always going to allow updating a category
        m.push({
            text: _('testing.category_update')
            ,handler: this.updateCategory
        });
        
        // This is simply a separator in the menu
        m.push('-');
        
        // At the bottom we'll have the "dangerous" stuff
        m.push({
            text: _('testing.category_remove')
            ,handler: this.removeCategory
        });
        
        return m;
    }
    
    ,_handleDrop: function(dropEvent) {
        // Let's shortcut things
        var drop_node = dropEvent.dropNode;
        var traget_node = dropEvent.target;
        
        // If the event is "append" we are just adding a new child in a list, not ON a parent, hence we can ignore it
        if (dropEvent.point == 'append') {
            return false;
        }
        
        // If our drop node has children AND the target node's parent is not the "root" we are attempting to drop at
        // another node, which results in too many levels of categories. Simply returning false here will disable dropping
        // in this position
        if (traget_node.parentNode.id != 'root' && drop_node.childNodes.length > 0) {
            return false;
        }
        
        // This is just the code from modx.tree.js to implement some basic functionality
        if (!Ext.isEmpty(drop_node.attributes.treeHandler)) {
            var h = Ext.getCmp(drop_node.attributes.treeHandler);
            if (h) {
                return h.handleDrop(this, dropEvent);
            }
        }
    }
});
Ext.reg('testing-tree-categories', Testing.tree.Categories);

/**
 * This code creates the popup window that allows us to create new categories
 */
Testing.window.CreateCategory = function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
        title: _('testing.category_create')
        ,url: Testing.config.connectorUrl
        ,action: 'mgr/create'
        ,fields: [{
            fieldLabel: _('testing.parent')
            ,name: 'parent'
            ,xtype: 'testing-combo-categories'
            ,anchor: '100%'
        },{
            fieldLabel: _('testing.name')
            ,name: 'name'
            ,xtype: 'textfield'
            ,allowBlank: false
            ,anchor: '100%'
        }]
    });
    
    Testing.window.CreateCategory.superclass.constructor.call(this,config);
};
Ext.extend(Testing.window.CreateCategory, MODx.Window);
Ext.reg('testing-window-category-create', Testing.window.CreateCategory);

/**
 * This code overrides the window used to create a new category.
 */
Testing.window.UpdateCategory = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        title: _('testing.category_update')
        ,baseParams: {
            action: 'mgr/update'
            ,id: config.record.id
        }
    });
    Testing.window.UpdateCategory.superclass.constructor.call(this, config);
};
Ext.extend(Testing.window.UpdateCategory, Testing.window.CreateCategory);
Ext.reg('testing-window-category-update', Testing.window.UpdateCategory);

/**
 * This code creates the combobox/dropdown menu for selecting
 * parent categories.
 */
Testing.combo.Categories = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        hiddenName: 'parent'
        ,url: Testing.config.connectorUrl
        ,baseParams: {
            action: 'mgr/getParents'
            ,combo: true
            ,limit: 0
            ,showNone: true
        }
        ,fields: ['id','name']
        ,displayField: 'name'
        ,valueField: 'id'
        ,editable: false
        ,emptyText: _('testing.no_parents')
    });
    Testing.combo.Categories.superclass.constructor.call(this, config);
};
Ext.extend(Testing.combo.Categories, MODx.combo.ComboBox);
Ext.reg('testing-combo-categories', Testing.combo.Categories);