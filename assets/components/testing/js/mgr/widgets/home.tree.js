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
            r['parent'] = this.cm.activeNode.attributes.data.text;
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

    ,removeMenu: function(n,e) {
        MODx.msg.confirm({
            title: _('warning')
            ,text: _('menu_confirm_remove')
            ,url: this.config.url
            ,params: {
                action: 'system/menu/remove'
                ,text: this.cm.activeNode.attributes.pk
            }
            ,listeners: {
                'success':{fn:this.refresh,scope:this}
            }
        });
    }

    ,getMenu: function(n,e) {
        var m = [];
        switch (n.attributes.type) {
            case 'menu':
                m.push({
                    text: _('testing.category_update')
                    ,handler: this.updateCategory
                });
                m.push('-');
                m.push({
                    text: _('menu_remove')
                    ,handler: this.removeMenu
                });
                break;
            default:
                m.push({
                    text: _('testing.category_create')
                    ,handler: this.createCategory
                });
                break;
        }
        return m;
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