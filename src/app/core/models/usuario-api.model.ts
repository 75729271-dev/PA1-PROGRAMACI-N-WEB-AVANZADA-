/** Contrato mínimo utilizado por el directorio, sin acoplarlo al modelo académico. */
export interface UsuarioApi {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  company: { name: string };
}

export interface ConsultaDirectorio {
  usuarios: UsuarioApi[];
  status: number;
  url: string;
  consultadoEn: string;
}

export const esObjeto = (dato: unknown): dato is Record<string, unknown> =>
  typeof dato === "object" && dato !== null && !Array.isArray(dato);

export function esUsuarioApi(dato: unknown): dato is UsuarioApi {
  if (!esObjeto(dato) || !esObjeto(dato["company"])) return false;
  return (
    typeof dato["id"] === "number" &&
    Number.isInteger(dato["id"]) &&
    typeof dato["name"] === "string" &&
    typeof dato["username"] === "string" &&
    typeof dato["email"] === "string" &&
    typeof dato["website"] === "string" &&
    typeof dato["company"]["name"] === "string"
  );
}
