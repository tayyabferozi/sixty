/**
 * DevExtreme (ui/hierarchical_collection/ui.data_converter.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _extend = require("../../core/utils/extend");
var _ui = _interopRequireDefault(require("../../ui/widget/ui.errors"));
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DataConverter = _class.default.inherit({
    ctor: function() {
        this._dataStructure = [];
        this._itemsCount = 0;
        this._visibleItemsCount = 0
    },
    _indexByKey: {},
    _convertItemsToNodes: function(items, parentKey) {
        var that = this;
        (0, _iterator.each)(items, function(_, item) {
            var parentId = (0, _type.isDefined)(parentKey) ? parentKey : that._getParentId(item);
            var node = that._convertItemToNode(item, parentId);
            that._dataStructure.push(node);
            that._checkForDuplicateId(node.internalFields.key);
            that._indexByKey[node.internalFields.key] = that._dataStructure.length - 1;
            if (that._itemHasChildren(item)) {
                that._convertItemsToNodes(that._dataAccessors.getters.items(item), node.internalFields.key)
            }
        })
    },
    _checkForDuplicateId: function(key) {
        if ((0, _type.isDefined)(this._indexByKey[key])) {
            throw _ui.default.Error("E1040", key)
        }
    },
    _getParentId: function(item) {
        return "plain" === this._dataType ? this._dataAccessors.getters.parentKey(item) : void 0
    },
    _itemHasChildren: function(item) {
        if ("plain" === this._dataType) {
            return
        }
        var items = this._dataAccessors.getters.items(item);
        return items && items.length
    },
    _getUniqueKey: function(item) {
        var keyGetter = this._dataAccessors.getters.key;
        var itemKey = keyGetter(item);
        var isCorrectKey = keyGetter && (itemKey || 0 === itemKey) && (0, _type.isPrimitive)(itemKey);
        return isCorrectKey ? itemKey : this.getItemsCount()
    },
    _convertItemToNode: function(item, parentKey) {
        this._itemsCount++;
        false !== item.visible && this._visibleItemsCount++;
        var that = this;
        var node = {
            internalFields: {
                disabled: that._dataAccessors.getters.disabled(item, {
                    defaultValue: false
                }),
                expanded: that._dataAccessors.getters.expanded(item, {
                    defaultValue: false
                }),
                selected: that._dataAccessors.getters.selected(item, {
                    defaultValue: false
                }),
                key: that._getUniqueKey(item),
                parentKey: (0, _type.isDefined)(parentKey) ? parentKey : that._rootValue,
                item: that._makeObjectFromPrimitive(item),
                childrenKeys: []
            }
        };
        (0, _extend.extend)(node, item);
        delete node.items;
        return node
    },
    setChildrenKeys: function() {
        var that = this;
        (0, _iterator.each)(this._dataStructure, function(_, node) {
            if (node.internalFields.parentKey === that._rootValue) {
                return
            }
            var parent = that.getParentNode(node);
            parent && parent.internalFields.childrenKeys.push(node.internalFields.key)
        })
    },
    _makeObjectFromPrimitive: function(item) {
        if ((0, _type.isPrimitive)(item)) {
            var key = item;
            item = {};
            this._dataAccessors.setters.key(item, key)
        }
        return item
    },
    _convertToPublicNode: function(node, parent) {
        if (!node) {
            return null
        }
        var publicNode = {
            text: this._dataAccessors.getters.display(node),
            key: node.internalFields.key,
            selected: node.internalFields.selected,
            expanded: node.internalFields.expanded,
            disabled: node.internalFields.disabled,
            parent: parent || null,
            itemData: node.internalFields.item,
            children: [],
            items: []
        };
        if (publicNode.parent) {
            publicNode.parent.children.push(publicNode);
            publicNode.parent.items.push(publicNode)
        }
        return publicNode
    },
    convertToPublicNodes: function(data, parent) {
        if (!data.length) {
            return []
        }
        var that = this;
        var publicNodes = [];
        (0, _iterator.each)(data, function(_, node) {
            node = (0, _type.isPrimitive)(node) ? that._getByKey(node) : node;
            var publicNode = that._convertToPublicNode(node, parent);
            publicNode.children = that.convertToPublicNodes(node.internalFields.childrenKeys, publicNode);
            publicNodes.push(publicNode);
            node.internalFields.publicNode = publicNode
        });
        return publicNodes
    },
    setDataAccessors: function(accessors) {
        this._dataAccessors = accessors
    },
    _getByKey: function(key) {
        return this._dataStructure[this.getIndexByKey(key)] || null
    },
    getParentNode: function(node) {
        return this._getByKey(node.internalFields.parentKey)
    },
    getByKey: function getByKey(data, key) {
        if (null === key || void 0 === key) {
            return null
        }
        var result = null;
        var that = this;
        var getByKey = function(data, key) {
            (0, _iterator.each)(data, function(_, element) {
                var currentElementKey = element.internalFields && element.internalFields.key || that._dataAccessors.getters.key(element);
                if (currentElementKey.toString() === key.toString()) {
                    result = element;
                    return false
                }
            });
            return result
        };
        return getByKey(data, key)
    },
    getItemsCount: function() {
        return this._itemsCount
    },
    getVisibleItemsCount: function() {
        return this._visibleItemsCount
    },
    updateIndexByKey: function() {
        var that = this;
        this._indexByKey = {};
        (0, _iterator.each)(this._dataStructure, function(index, node) {
            that._checkForDuplicateId(node.internalFields.key);
            that._indexByKey[node.internalFields.key] = index
        })
    },
    updateChildrenKeys: function() {
        this._indexByKey = {};
        this.removeChildrenKeys();
        this.updateIndexByKey();
        this.setChildrenKeys()
    },
    removeChildrenKeys: function() {
        this._indexByKey = {};
        (0, _iterator.each)(this._dataStructure, function(index, node) {
            node.internalFields.childrenKeys = []
        })
    },
    getIndexByKey: function(key) {
        return this._indexByKey[key]
    },
    createPlainStructure: function(items, rootValue, dataType) {
        this._itemsCount = 0;
        this._visibleItemsCount = 0;
        this._rootValue = rootValue;
        this._dataType = dataType;
        this._indexByKey = {};
        this._convertItemsToNodes(items);
        this.setChildrenKeys();
        return this._dataStructure
    }
});
var _default = DataConverter;
exports.default = _default;
module.exports = exports.default;
