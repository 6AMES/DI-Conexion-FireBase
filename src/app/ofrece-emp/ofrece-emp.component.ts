import { Component } from '@angular/core';
import { Database, ref, push } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-ofrece-emp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ofrece-emp.component.html',
  styleUrl: './ofrece-emp.component.css',
  providers: [FormBuilder]
})

export class OfreceEmpComponent {
  form: FormGroup

  constructor(private db: Database, private fb: FormBuilder){
    this.form = this.fb.group({
      empresa: ['', Validators.required],
      contacto: ['', Validators.required],
      vacante: ['', Validators.required],
      requisitos: ['', Validators.required],
      ubicacion: ['', Validators.required],
      salario: ['', Validators.required],
    })
  }

  meter(){
    const { empresa, contacto, vacante, requisitos, ubicacion, salario } = this.form.value
    const usersRef = ref(this.db, 'Ofertas');
    push(usersRef ,{ empresa, contacto, vacante, requisitos, ubicacion, salario })
    .then(() =>{
      console.log("Metido")
      this.form.reset();
    })
    
  }
}
