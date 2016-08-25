Ext.onReady(function() {
    MODx.load({ xtype: 'testing-page-home'});
});
Testing.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: 'testing-panel-home'
            ,renderTo: 'testing-panel-home-div'
        }]
    });
    Testing.page.Home.superclass.constructor.call(this,config);
};

Ext.extend(Testing.page.Home,MODx.Component);
Ext.reg('testing-page-home',Testing.page.Home);