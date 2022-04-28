import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Denuncia } from 'src/app/models/denuncia';
import { DenunciaService } from 'src/app/service/denuncia.service';

@Component({
  selector: 'app-listar-denuncias',
  templateUrl: './listar-denuncias.component.html',
  styleUrls: ['./listar-denuncias.component.css'],
})
export class ListarDenunciasComponent implements OnInit {
  listDenuncies: Denuncia[] = [];

  constructor(
    private _eventService: DenunciaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDenuncias();
  }

  getDenuncias() {
    this._eventService.getDenuncias().subscribe(
      (data) => {
        console.log(data);
        this.listDenuncies = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteDenuncia(_id: string) {
    this._eventService.deleteDenuncia(_id).subscribe(
      (data) => {
        this.toastr.error(
          'La denuncia ha estat eliminada amb exit',
          'Denuncia eliminada'
        );
        this.getDenuncias();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
