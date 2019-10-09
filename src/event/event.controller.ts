import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Get,
    Delete,
} from '@nestjs/common';
import { CreateEventDTO, EditEventDTO } from './event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    createEvent(@Body() event: CreateEventDTO) {
        return this.eventService.createEvent(event);
    }

    @Patch(':id')
    editEvent(@Body() event: EditEventDTO, @Param('id') id: string) {
        return this.eventService.editEvent(id, event);
    }

    @Get(':id')
    getEvent(@Param('id') id: string) {
        return this.eventService.getEvent(id);
    }

    @Get()
    getAll() {
        return this.eventService.getAll();
    }

    @Delete(':id')
    deleteEvent(@Param('id') id: string) {
        return this.eventService.deleteEvent(id);
    }
}
