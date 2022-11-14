import { UsuariosService } from './usuarios.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Meu grupo para armazenar meu formulário
  form!: FormGroup

  // Variável pra guardar minha lista de elementos
  listaUsuarios: any;

  title = 'crud';

  // Serviço - Classe que vai guardar métodos
  // Serviço - CRUD - Cliente (fetch)

  constructor(private servicoUsuario: UsuariosService, private formBuilder: FormBuilder) { }

  // ngOnInit = quando seu componente carrega
  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: '',
      email: ''
    });

    // Dar log no formulário sempre que algum valor muda
    this.form.valueChanges.subscribe(console.log);

    this.lerUsuarios()
  }


  lerUsuarios() {
    // Busca os usuários e mostra no console
    this.servicoUsuario.getUsuarios().subscribe({
      next: (dados: any) => {
        // Preencher minha variável com os dados
        this.listaUsuarios = dados;
        console.log(dados);
      },
      error: (erro) => {
        console.log(erro);
      }
    })
  }

  enviarDados() {
    let dados = {
      // Pegar último id e somar um para ter o próximo id
      id: this.listaUsuarios[this.listaUsuarios.length - 1].id + 1,
      nome: this.form.controls["nome"].value,
      email: this.form.controls["email"].value
    }

    // Cadastra um usuário e dá console.log
    this.servicoUsuario.postUsuarios(dados)
      .subscribe(
        {
          next: (dados) => {
            console.log(dados);
            this.lerUsuarios();
          },
          error: (erro) => {
            console.log("Erro ao cadastrar\n" + erro);
          }
        })
  }
}
