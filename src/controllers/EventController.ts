import {Controller, Param, Body, Get, Post, Put, Delete} from "routing-controllers";

@Controller()
export class EventController {

    @Get("/")
    getAll() {
        return "This action returns all users";
    }
}
