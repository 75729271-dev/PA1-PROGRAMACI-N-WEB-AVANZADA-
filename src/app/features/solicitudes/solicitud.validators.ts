import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** Mide el contenido útil para evitar que los espacios satisfagan mínimos de longitud. */
export const longitudUtil =
  (minimo: number): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const valor: unknown = control.value;
    return typeof valor === "string" && valor.trim().length >= minimo
      ? null
      : { longitudUtil: true };
  };
