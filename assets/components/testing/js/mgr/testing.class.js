var Testing = function(config) {
    config = config || {};
    Testing.superclass.constructor.call(this, config);
};
Ext.extend(Testing, Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config:{}
});
Ext.reg('testing', Testing);

Testing = new Testing();