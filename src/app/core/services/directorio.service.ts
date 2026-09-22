import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, timeout } from "rxjs";
import { ConsultaDirectorio, esUsuarioApi } from "../models/usuario-api.model";

@Injectable({ providedIn: "root" })
export class DirectorioService {
  readonly endpoint = "https://jsonplaceholder.typicode.com/users";
  constructor(private readonly http: HttpClient) {}

  consultar(): Observable<ConsultaDirectorio> {
    // unknown obliga a validar el JSON real: una interfaz no valida respuestas en ejecución.
    return this.http.get<unknown>(this.endpoint, { observe: "response" }).pipe(
      timeout(12000),
      map((respuesta) => {
        const usuarios = respuesta.body;
        if (!Array.isArray(usuarios) || !usuarios.every(esUsuarioApi))
          throw new Error("La API devolvió datos con un formato inesperado.");
        return {
          usuarios,
          status: respuesta.status,
          url: respuesta.url ?? this.endpoint,
          consultadoEn: new Date().toISOString(),
        };
      }),
    );
  }
}
