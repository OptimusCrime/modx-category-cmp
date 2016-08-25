Testing.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+_('testing')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,defaults: { border: false ,autoHeight: true }
            ,border: true
            ,items: [{
                title: _('testing')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+_('testing.desc')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'modx-tree-menu'
                    ,cls: 'main-wrapper'
                    ,preventRender: true
                }]
            }]
        }]
    });
    Testing.panel.Home.superclass.constructor.call(this,config);
};

Ext.extend(Testing.panel.Home,MODx.Panel);
Ext.reg('testing-panel-home',Testing.panel.Home);
