import { Injectable } from '@nestjs/common';
import { EVENT_MODEL, EventModel, Event } from './event.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(EVENT_MODEL) private readonly eventModel: EventModel,
    ) {}

    async createEvent(event: Event) {
        const newEvent = new this.eventModel(event);
        return await newEvent.save();
    }

    editEvent(id: string, event: Partial<Event>) {
        return this.eventModel.findByIdAndUpdate(id, event);
    }

    getEvent(id: string) {
        return this.eventModel.findById(id).exec();
    }

    getAll() {
        return this.eventModel.find().exec();
    }

    async deleteEvent(id: string) {
        return this.eventModel.findByIdAndDelete(id);
    }
}
