import { Cliente } from "./Cliente";

export class PaginaCliente{
    content: Cliente[] = [];
    totalElements: number = 0;
    size: number = 10;
    number: number = 0;
    totalPages: number = 0;
}