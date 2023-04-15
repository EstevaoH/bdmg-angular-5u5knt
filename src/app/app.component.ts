import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  cepForm!: FormGroup;

  cep: any;

  constructor(private service: AppService, private formBuilder: FormBuilder) {
    this.cepForm = this.formBuilder.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      ibge: [{ value: '', disabled: true }],
      gia: [''],
      ddd: ['', Validators.required],
      siafi: [{ value: '', disabled: true }],
    });
  }
  ngOnInit(): void {}
  onGetCep() {
    this.service.getCep(this.cepForm.get('cep')?.value).subscribe({
      next: (data) => {
        this.cep = data;
        this.preencherFormulario(data);
      },
    });
  }

  handleSaveCep() {
    console.log(this.cepForm.value);
    localStorage.setItem('@Buscar-Cep', JSON.stringify(this.cepForm.value));
  }

  preencherFormulario(data: Endereco) {
    const complemento = data.complemento.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    this.cepForm.patchValue({
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      ibge: data.ibge,
      gia: data.gia,
      ddd: data.ddd,
    });
  }
}

interface Endereco{
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string

}