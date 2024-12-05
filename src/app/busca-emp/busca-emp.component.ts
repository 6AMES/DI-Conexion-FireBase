import { Component } from '@angular/core';
import { Database, ref, push } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-ofrece-emp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './busca-emp.component.html',
  styleUrl: './busca-emp.component.css',
  providers: [FormBuilder]
})

export class BuscaEmpComponent {
  form: FormGroup

  constructor(private db: Database, private fb: FormBuilder){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      habilidades: ['', Validators.required],
      experiencia: ['', Validators.required],
    })
  }

  meter(){
    const { nombre, email, telefono, habilidades, experiencia } = this.form.value
    const usersRef = ref(this.db, 'Solicitudes');
    push(usersRef ,{ nombre, email, telefono, habilidades, experiencia })
    .then(() =>{
      console.log("Metido")
    })
    
  }
}
