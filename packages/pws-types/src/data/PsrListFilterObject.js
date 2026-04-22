"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsrListFilterObjectTriggerReadType = exports.PsrFilterOrganisationUnitType = exports.PsrFilterDirectoryServiceType = exports.PsrListFilterObjectSealType = exports.PsrListFilterObjectLogbookDatePeriod = exports.PsrListFilterObjectBindingType = exports.PsrListFilterObjectOrganisationUnit$Type = exports.PsrListFilterObjectLogbookEvent$Type = void 0;
const base_1 = require("../base");
const enum_constants_1 = require("../enum-constants");
const PsrContainer_1 = require("./PsrContainer");
const PsrTag_1 = require("./PsrTag");
// Logbook event filter object
exports.PsrListFilterObjectLogbookEvent$Type = 'PsrDataLayer.FilterObjects.ListFilterObjectLogbookEvent, PsrDataLayer';
// Organisation unit filter object
exports.PsrListFilterObjectOrganisationUnit$Type = 'PsrDataLayer.FilterObjects.ListFilterObjectOrganisationUnit, PsrDataLayer';
// Enums used by filter objects
var PsrListFilterObjectBindingType;
(function (PsrListFilterObjectBindingType) {
    PsrListFilterObjectBindingType["Parent"] = "Parent";
    PsrListFilterObjectBindingType["Child"] = "Child";
    PsrListFilterObjectBindingType["Both"] = "Both";
})(PsrListFilterObjectBindingType || (exports.PsrListFilterObjectBindingType = PsrListFilterObjectBindingType = {}));
var PsrListFilterObjectLogbookDatePeriod;
(function (PsrListFilterObjectLogbookDatePeriod) {
    PsrListFilterObjectLogbookDatePeriod["Today"] = "Today";
    PsrListFilterObjectLogbookDatePeriod["Yesterday"] = "Yesterday";
    PsrListFilterObjectLogbookDatePeriod["ThisWeek"] = "ThisWeek";
    PsrListFilterObjectLogbookDatePeriod["LastWeek"] = "LastWeek";
    PsrListFilterObjectLogbookDatePeriod["ThisMonth"] = "ThisMonth";
    PsrListFilterObjectLogbookDatePeriod["LastMonth"] = "LastMonth";
    PsrListFilterObjectLogbookDatePeriod["Custom"] = "Custom";
})(PsrListFilterObjectLogbookDatePeriod || (exports.PsrListFilterObjectLogbookDatePeriod = PsrListFilterObjectLogbookDatePeriod = {}));
var PsrListFilterObjectSealType;
(function (PsrListFilterObjectSealType) {
    PsrListFilterObjectSealType["Open"] = "Open";
    PsrListFilterObjectSealType["Closed"] = "Closed";
    PsrListFilterObjectSealType["All"] = "All";
})(PsrListFilterObjectSealType || (exports.PsrListFilterObjectSealType = PsrListFilterObjectSealType = {}));
var PsrFilterDirectoryServiceType;
(function (PsrFilterDirectoryServiceType) {
    PsrFilterDirectoryServiceType[PsrFilterDirectoryServiceType["FilterDirectoryServiceTypeActiveDirectory"] = 0] = "FilterDirectoryServiceTypeActiveDirectory";
    PsrFilterDirectoryServiceType[PsrFilterDirectoryServiceType["FilterDirectoryServiceTypeEntraId"] = 1] = "FilterDirectoryServiceTypeEntraId";
})(PsrFilterDirectoryServiceType || (exports.PsrFilterDirectoryServiceType = PsrFilterDirectoryServiceType = {}));
var PsrFilterOrganisationUnitType;
(function (PsrFilterOrganisationUnitType) {
    PsrFilterOrganisationUnitType[PsrFilterOrganisationUnitType["FilterOrganisationUnitTypeUser"] = 0] = "FilterOrganisationUnitTypeUser";
    PsrFilterOrganisationUnitType[PsrFilterOrganisationUnitType["FilterOrganisationUnitTypeGroup"] = 1] = "FilterOrganisationUnitTypeGroup";
})(PsrFilterOrganisationUnitType || (exports.PsrFilterOrganisationUnitType = PsrFilterOrganisationUnitType = {}));
var PsrListFilterObjectTriggerReadType;
(function (PsrListFilterObjectTriggerReadType) {
    PsrListFilterObjectTriggerReadType[PsrListFilterObjectTriggerReadType["ListFilterObjectTriggerReadTypeRead"] = 0] = "ListFilterObjectTriggerReadTypeRead";
    PsrListFilterObjectTriggerReadType[PsrListFilterObjectTriggerReadType["ListFilterObjectTriggerReadTypeNotRead"] = 1] = "ListFilterObjectTriggerReadTypeNotRead";
})(PsrListFilterObjectTriggerReadType || (exports.PsrListFilterObjectTriggerReadType = PsrListFilterObjectTriggerReadType = {}));
