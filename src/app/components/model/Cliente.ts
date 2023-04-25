import { TipoClienteEnum } from "./TipoClienteEnum";
import { Telefone } from "./Telefone";

export class Cliente{

    constructor(id: number,
        nome: string, 
        dataCadastro: Date, 
        ativo: boolean, 
        tipoCliente: TipoClienteEnum, 
        cpf: string,
        cnpj: string,
        registroGeral: string,
        inscricaoEstadual: string,
        telefones: Telefone[]){
            this.id = id;
            this.nome = nome;
            this.dataCadastro = dataCadastro;
            this.ativo = ativo;
            this.tipoCliente = tipoCliente;
            this.cpf = cpf;
            this.cnpj = cnpj;
            this.registroGeral = registroGeral;
            this.inscricaoEstadual = inscricaoEstadual;
            this.telefones = telefones;
        };

    id: number;
    nome: string|undefined;
    dataCadastro: Date|undefined;
    ativo: boolean|undefined;
    tipoCliente: TipoClienteEnum;
    cpf: string|undefined;
    cnpj: string|undefined;
    registroGeral: string|undefined;
    inscricaoEstadual: string|undefined;
    telefones: Telefone[]|undefined;
}

