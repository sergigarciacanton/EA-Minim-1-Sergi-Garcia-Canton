import { Component, OnInit } from '@angular/core';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-listar-events',
  templateUrl: './listar-events.component.html',
  styleUrls: ['./listar-events.component.css'],
})
export class ListarEventsComponent implements OnInit {
  listEvents: Event[] = [];

  constructor(
    private _eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this._eventService.getEvents().subscribe(
      (data) => {
        console.log(data);
        this.listEvents = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteEvent(_id: string) {
    this._eventService.deleteEvent(_id).subscribe(
      (data) => {
        this.toastr.error(
          'El user ha estat eliminat amb exit',
          'User eliminat'
        );
        this.getEvents();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
