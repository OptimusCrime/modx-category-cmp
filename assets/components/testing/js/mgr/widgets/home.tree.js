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
            parent: ''
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

    ,updateMenu: function(n,e) {
        var r = this.cm.activeNode.attributes.data;
        Ext.apply(r,{
            action_id: r.action
            ,new_text: r.text
        });
        this.windows.update_menu = MODx.load({
            xtype: 'modx-window-menu-update'
            ,record: r
            ,listeners: {
                'success': {fn:function(r) { this.refresh(); },scope:this}
            }
        });
        this.windows.update_menu.setValues(r);
        this.windows.update_menu.show(e.target);
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
                    text: _('menu_update')
                    ,handler: this.updateMenu
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
        ,url: MODx.config.connector_url
        ,action: 'system/menu/create'
        ,fields: [{
            fieldLabel: _('testing.parent')
            ,name: 'parent'
            ,xtype: 'modx-combo-menu'
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
 * Generates the Update Menu window
 *
 * @class MODx.window.UpdateMenu
 * @extends MODx.window.CreateMenu
 * @constructor
 * @param {Object} config An object of options.
 * @xtype window-menu-update
 */
MODx.window.UpdateMenu = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('menu_update')
        ,action: 'system/menu/update'
    });
    MODx.window.UpdateMenu.superclass.constructor.call(this,config);
};
Ext.extend(MODx.window.UpdateMenu,MODx.window.CreateCategory);
Ext.reg('modx-window-menu-update',MODx.window.UpdateMenu);

/**
 * Displays a dropdown of modMenus
 *
 * @class MODx.combo.Menu
 * @extends MODx.combo.ComboBox
 * @param {Object} config An object of options.
 * @xtype modx-combo-menu
 */
MODx.combo.Menu = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'menu'
        ,hiddenName: 'menu'
        ,url: MODx.config.connector_url
        ,baseParams: {
            action: 'system/menu/getlist'
            ,combo: true
            ,limit: 0
            ,showNone: true
        }
        ,fields: ['text','text_lex']
        ,displayField: 'text_lex'
        ,valueField: 'text'
        // ,listWidth: 300
        ,editable: false
    });
    MODx.combo.Menu.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.Menu,MODx.combo.ComboBox);
Ext.reg('modx-combo-menu',MODx.combo.Menu);