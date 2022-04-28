import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Denuncia } from 'src/app/models/denuncia';
import { DenunciaService } from 'src/app/service/denuncia.service';

@Component({
  selector: 'app-crear-denuncia',
  templateUrl: './crear-denuncia.component.html',
  styleUrls: ['./crear-denuncia.component.css'],
})
export class CrearDenunciaComponent implements OnInit {
  denunciaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _denunciaService: DenunciaService,
    private aRouter: ActivatedRoute
  ) {
    this.denunciaForm = this.fb.group({
      name: ['', Validators.required],
      delito: [''],
      userDenunciat: ['', Validators.required],
      creationDate: [''],
    });
  }

  ngOnInit(): void {}

  addDenuncia() {
    const denuncia: Denuncia = {
      name: this.denunciaForm.get('name')?.value,
      delito: this.denunciaForm.get('delito')?.value,
      userDenunciat: this.denunciaForm.get('userDenunciat')?.value,
      creationDate: this.denunciaForm.get('creationDate')?.value,
    };

    console.log(denuncia);
    this._denunciaService.addDenuncia(denuncia).subscribe(
      (data) => {
        this.toastr.success(
          'La denuncia ha estat creada amb èxit!',
          'Denuncia creada'
        );
        this.router.navigate(['/denuncia']);
      },
      (error) => {
        console.log(error);
        this.denunciaForm.reset();
      }
    );
  }
}
