"use strict";
var ca_tree_mvc_model_1 = require('./ca-tree-mvc-model');
var CaTreeMvcModelBuilder = (function () {
    function CaTreeMvcModelBuilder() {
        this.model = new ca_tree_mvc_model_1.CaTreeMvcModel();
    }
    CaTreeMvcModelBuilder.prototype.addResource = function (resource) {
        this.model.resources.resource.push(resource);
        return this;
    };
    CaTreeMvcModelBuilder.prototype.addResources = function (resources) {
        this.model.resources.resource = resources;
        return this;
    };
    CaTreeMvcModelBuilder.prototype.addLinks = function (links) {
        this.model.resources.link = links;
        return this;
    };
    CaTreeMvcModelBuilder.prototype.build = function () {
        return this.model;
    };
    return CaTreeMvcModelBuilder;
}());
exports.CaTreeMvcModelBuilder = CaTreeMvcModelBuilder;
//# sourceMappingURL=ca-tree-mvc-model.builder.js.map