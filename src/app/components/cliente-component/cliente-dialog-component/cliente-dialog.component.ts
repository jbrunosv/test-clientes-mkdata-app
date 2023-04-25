import { Cliente } from '../../model/Cliente';
import { TipoClienteEnum } from '../../model/TipoClienteEnum';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-dialog-component',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.css'],
})
export class ClienteDialogComponent implements OnInit {
  cliente: Cliente;
  TipoClienteEnum = TipoClienteEnum;

  constructor(
    private _snackBar: MatSnackBar,
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {

    this.cliente = new Cliente(0, '', new Date, true, TipoClienteEnum.PESSOA_FISICA, '', '', '', '', [{id: 0, ddd: '', numeroTelefone: ''}]);
  }

  ngOnInit(): void {
    if(this.data.id != 0){
      this.clienteService.getClientePorId(this.data.id)
      .subscribe(
        response => {
        this.cliente = response;
      },
      error => {
        this.openSnackBar(error.error.message);
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  isPessoaFisica(): boolean {
    if (this.cliente.tipoCliente.toString() == 'PESSOA_FISICA') {
      this.cliente.inscricaoEstadual = '';
      this.cliente.cnpj = '';
      return true;
    }
    return false;
  }

  isPessoaJuridica(): boolean {    
    if (this.cliente.tipoCliente.toString() == "PESSOA_JURIDICA") {
      this.cliente.cpf = '';
      this.cliente.registroGeral = '';
      return true;
    }
    return false;
  }  

  atualizar(cliente: Cliente) {
    this.clienteService.atualizarCliente(cliente).subscribe(
      response => {
        this.openSnackBar("Cliente atualizado com sucesso!")
        this.dialogRef.close();
      },
      error => {
        console.log(error);
        this.openSnackBar(error.error.message);
      }
    );
  }

  salvar(cliente: Cliente) {
    this.clienteService.salverCliente(cliente)
    .subscribe(
      response => {
        this.openSnackBar("Cliente salvo com sucesso!")
        this.dialogRef.close();
      },
      error => {
        this.openSnackBar(error.error.message)
      }
    )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "fechar");
  }
}
