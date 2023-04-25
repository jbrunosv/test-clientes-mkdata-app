import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogComponent } from './cliente-dialog-component/cliente-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'tipo', 'cpf', "cnpj", 'registroGeral', 'inscricaoEstadual', 'dataCadastro', 'ativo', 'telefones', 'acoes'];
  clientes!: Cliente[];
  nome:string = '';
  isAtivo!: boolean;

  mensagemErro: string = '';
  mensagemSucesso: string = '';

  totalPages = 0;
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [10];
  voltarPagina: boolean = false;

  constructor(private clienteService: ClienteService, public dialog: MatDialog, private _snackBar: MatSnackBar){
  }

  openDialog( id: number ): void {
    const dialogRef = this.dialog.open(ClienteDialogComponent, { data: {id: id } });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    
    this.listarClientes(this.pagina, this.tamanho);

  }

  novoCadastro(){
    this.openDialog(0);
  }

  pesquisar(){
    this.clienteService.getClientesPorFiltro(0, 5,this.nome, this.isAtivo)
    .subscribe(
      response => {
        this.totalPages = response.totalPages;
        this.clientes = response.content;
        this.totalElementos = response.totalElements;
        this.pagina = response.number;
      }
    )
  }

  listarClientes(pagina = 0, tamanho = 5){
    this.clienteService.getClientesPaginado(pagina, tamanho)
    .subscribe(
      response => {
        this.totalPages = response.totalPages;
        this.clientes = response.content;
        this.totalElementos = response.totalElements;
        this.pagina = response.number;
      }
    )
  }

  paginaAnterior(){
    if (this.pagina > 0) {
      this.pagina -= 1;
      this.ngOnInit();
    }
  }

  proximaPagina(){
    if ((this.totalPages - 1) > this.pagina) {
      this.pagina += 1;
      this.voltarPagina = true;
      this.ngOnInit();
    }
  }

  deletarClientePorId(id: number){
    this.clienteService.deletarClientePorId(id)
    .subscribe(
      response => {
        this.openSnackBar('Cliente deletado com sucesso!');
        this.ngOnInit();
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "fechar");
  }
}
