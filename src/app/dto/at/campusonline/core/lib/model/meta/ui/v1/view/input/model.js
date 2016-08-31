"use strict";
(function (InputFieldType) {
    InputFieldType[InputFieldType["text"] = 'TEXT'] = "text";
    InputFieldType[InputFieldType["number"] = 'NUMBER'] = "number";
    InputFieldType[InputFieldType["boolean"] = 'BOOLEAN'] = "boolean";
})(exports.InputFieldType || (exports.InputFieldType = {}));
var InputFieldType = exports.InputFieldType;
(function (InputType) {
    InputType[InputType["text"] = 'TEXT'] = "text";
    InputType[InputType["number"] = 'NUMBER'] = "number";
    InputType[InputType["checkbox"] = 'CHECKBOX'] = "checkbox";
})(exports.InputType || (exports.InputType = {}));
var InputType = exports.InputType;
(function (SelectFieldType) {
    SelectFieldType[SelectFieldType["text"] = 'TEXT'] = "text";
    SelectFieldType[SelectFieldType["number"] = 'NUMBER'] = "number";
})(exports.SelectFieldType || (exports.SelectFieldType = {}));
var SelectFieldType = exports.SelectFieldType;
(function (SelectType) {
    SelectType[SelectType["radio"] = 'RADIO'] = "radio";
    SelectType[SelectType["dropdown"] = 'DROPDOWN'] = "dropdown";
})(exports.SelectType || (exports.SelectType = {}));
var SelectType = exports.SelectType;
(function (MultiSelectType) {
    MultiSelectType[MultiSelectType["checkbox"] = 'CHECKBOX'] = "checkbox";
    MultiSelectType[MultiSelectType["list"] = 'LIST'] = "list";
})(exports.MultiSelectType || (exports.MultiSelectType = {}));
var MultiSelectType = exports.MultiSelectType;
//# sourceMappingURL=localModel.js.map
