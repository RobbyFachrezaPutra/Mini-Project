"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventController = CreateEventController;
exports.GetEventController = GetEventController;
exports.GetAllEventController = GetAllEventController;
exports.UpdateEventController = UpdateEventController;
exports.DeleteEventController = DeleteEventController;
exports.SearchEventController = SearchEventController;
exports.GetEventsByOrganizerController = GetEventsByOrganizerController;
exports.GetAttendeesByEventController = GetAttendeesByEventController;
const event_service_1 = require("../services/event.service");
function CreateEventController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = req.file;
            const data = yield (0, event_service_1.CreateEventService)(req.body, file);
            res.status(200).send({
                message: "Event successfully saved ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetAllEventController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, event_service_1.GetAllEventService)();
            res.status(200).send({
                message: "Get All Event",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function SearchEventController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const keyword = req.query.keyword || "";
            const data = yield (0, event_service_1.SearchEventService)(keyword);
            res.status(200).send({
                message: "Get All Event",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetEventController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, event_service_1.GetEventService)(Number(req.params.id));
            res.status(200).send({
                message: `Get Event with id ${req.params.id}`,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateEventController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, event_service_1.UpdateEventService)(Number(req.params.id), req.body);
            res.status(200).send({
                message: "Event successfully updated ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function DeleteEventController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, event_service_1.DeleteEventService)(Number(req.params.id));
            res.status(200).send({
                message: "Event successfully deleted ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetEventsByOrganizerController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const organizerId = Number(req.params.organizerId);
            if (isNaN(organizerId)) {
                res.status(400).json({ message: "Invalid organizerId" });
                return;
            }
            const data = yield (0, event_service_1.GetEventsByOrganizerService)(organizerId);
            res.status(200).json({
                message: `Events for organizer ${organizerId} retrieved successfully`,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetAttendeesByEventController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventId = Number(req.params.eventId);
            if (isNaN(eventId) || eventId <= 0) {
                res.status(400).json({
                    success: false,
                    error: "Invalid event ID",
                });
                return;
            }
            const data = yield (0, event_service_1.getEventWithAttendees)(eventId);
            res.status(200).json({
                success: true,
                message: `Attendees for event '${data.name}' retrieved successfully`,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
