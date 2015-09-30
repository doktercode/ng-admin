/*global angular,inject,describe,it,expect,beforeEach*/
describe('directive: ma-field', function () {
    'use strict';

    var directive = require('../../../../ng-admin/Crud/field/maField');
    var Field = require('admin-config/lib/Field/Field');
    angular.module('testapp_Field', [])
        .directive('maField', directive)
        .service('FieldViewConfiguration', function() {
            return { string: { getWriteWidget: function() { return 'DUMMY'; } } }
        });

    var $compile,
        scope,
        directiveUsage = '<ma-field field="::field" entry="entry" entity="::entity" form="form" datastore="::dataStore"></ma-field>';

    beforeEach(angular.mock.module('testapp_Field'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        scope = _$rootScope_;
    }));

    it("should render the WriteWidget from the fieldView Configuration for that type", function () {
        scope.field = new Field('foo');
        scope.entity = {};
        scope.entry = { values: [] };
        scope.form = { foo: {} };
        scope.dataStore = {};
        var element = $compile(directiveUsage)(scope);
        scope.$digest();
        expect(element.html().indexOf('DUMMY')).not.toBe(-1);
    });

    it("should render the Field template instead of the WriteWidget when set", function () {
        scope.field = new Field('foo').template('YOPLA');
        scope.entity = {};
        scope.entry = { values: [] };
        scope.form = { foo: {} };
        scope.dataStore = {};
        var element = $compile(directiveUsage)(scope);
        scope.$digest();
        expect(element.html().indexOf('DUMMY')).toBe(-1);
        expect(element.html().indexOf('YOPLA')).not.toBe(-1);
    });

});
