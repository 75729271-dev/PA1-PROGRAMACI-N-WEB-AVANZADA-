import { test as base, expect, Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const endpoint = "https://jsonplaceholder.typicode.com/users";
const storageKey = "campus.solicitudes.v1";
const usuarioPrueba = {
  id: 1,
  name: "Contacto de prueba",
  username: "prueba",
  email: "contacto@example.com",
  website: "example.com",
  company: { name: "Organización de prueba" },
};
mkdirSync("evidencias/capturas", { recursive: true });

const test = base.extend<{ erroresPagina: void }>({
  erroresPagina: [
    async ({ page }, use) => {
      const errores: string[] = [];
      page.on("pageerror", (error) => errores.push(error.message));
      await use();
      expect(
        errores,
        "La aplicación no debe producir excepciones sin controlar",
      ).toEqual([]);
    },
    { auto: true },
  ],
});

async function completar(page: Page): Promise<void> {
  await page.getByLabel("Nombre completo").fill("Andrea Ejemplo");
  await page.getByLabel("Código de estudiante").fill("A20261234");
  await page.getByLabel("Correo electrónico").fill("andrea@example.com");
  await page
    .getByLabel("Tipo de trámite")
    .selectOption("Constancia de estudios");
  await page
    .getByLabel("Asunto", { exact: true })
    .fill("Constancia para prácticas profesionales");
  await page
    .getByLabel("Descripción", { exact: true })
    .fill(
      "Solicito una constancia de estudios para adjuntar a mi postulación de prácticas profesionales.",
    );
}

test("01 · Inicio, resumen y seis registros ficticios", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/solicitudes$/);
  await expect(
    page.getByRole("heading", { name: "Solicitudes", exact: true }),
  ).toBeVisible();
  await expect(page.locator("tbody tr")).toHaveCount(6);
  await expect(page.locator(".stat strong")).toHaveText([
    "06",
    "02",
    "02",
    "02",
  ]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "evidencias/capturas/01-solicitudes.png",
    fullPage: true,
  });
});

test("02 · Búsqueda sin acentos, filtro combinado y estado vacío", async ({
  page,
}) => {
  await page.goto("/solicitudes");
  await page.getByLabel("Buscar solicitudes").fill("lucia");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page.getByLabel("Filtrar por estado").selectOption("Resuelta");
  await expect(page.getByText("No encontramos coincidencias")).toBeVisible();
  await page.getByRole("button", { name: "Limpiar filtros" }).click();
  await page.getByLabel("Filtrar por estado").selectOption("Resuelta");
  await expect(page.locator("tbody tr")).toHaveCount(2);
});

test("03 · Formulario vacío bloquea el registro y muestra errores", async ({
  page,
}) => {
  await page.goto("/solicitudes/nueva");
  await page.getByRole("button", { name: "Registrar solicitud" }).click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(6);
  await expect(page).toHaveURL(/\/nueva$/);
  expect(
    await page.evaluate((key) => localStorage.getItem(key), storageKey),
  ).toBeNull();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "evidencias/capturas/02-validaciones.png",
    fullPage: true,
  });
});

test("04 · Rechaza espacios, correo inválido, código incorrecto y mínimos", async ({
  page,
}) => {
  await page.goto("/solicitudes/nueva");
  await completar(page);
  await page.getByLabel("Nombre completo").fill("   ");
  await page.getByLabel("Código de estudiante").fill("123");
  await page.getByLabel("Correo electrónico").fill("correo@");
  await page.getByLabel("Asunto", { exact: true }).fill("abcd");
  await page
    .getByLabel("Descripción", { exact: true })
    .fill("                    ");
  await page.getByRole("button", { name: "Registrar solicitud" }).click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(5);
  await expect(page).toHaveURL(/\/nueva$/);
});

test("05 · Registro válido, detalle, resumen y persistencia tras recarga", async ({
  page,
}) => {
  await page.goto("/solicitudes/nueva");
  await completar(page);
  await page.getByRole("button", { name: "Registrar solicitud" }).click();
  await expect(
    page.getByText("Solicitud registrada correctamente."),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Constancia para prácticas profesionales",
    }),
  ).toBeVisible();
  await expect(page.locator("app-status-badge")).toHaveText("Pendiente");
  await expect(page.locator(".request-id")).toHaveText(/^SA-[A-F0-9-]{36}$/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "evidencias/capturas/03-registro-exitoso.png",
    fullPage: true,
  });
  await page.reload();
  await expect(page.getByText("andrea@example.com")).toBeVisible();
  await page.getByRole("link", { name: "Volver a solicitudes" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(7);
  await expect(page.locator(".stat strong")).toHaveText([
    "07",
    "03",
    "02",
    "02",
  ]);
  await page.reload();
  await expect(page.locator("tbody tr")).toHaveCount(7);
});

test("06 · Navegación a detalle, atrás y rutas inexistentes", async ({
  page,
}) => {
  await page.goto("/solicitudes");
  await page
    .getByRole("link", {
      name: "Constancia para prácticas preprofesionales",
      exact: true,
    })
    .click();
  await expect(page.getByText("lucia@example.com")).toBeVisible();
  await page.goBack();
  await expect(page.locator("tbody tr")).toHaveCount(6);
  await page.goto("/solicitudes/SA-NO-EXISTE");
  await expect(
    page.getByRole("heading", { name: "Solicitud no encontrada" }),
  ).toBeVisible();
  await page.goto("/ruta-inexistente");
  await expect(
    page.getByRole("heading", { name: "Página no encontrada" }),
  ).toBeVisible();
});

test("07 · Cancelar no guarda información", async ({ page }) => {
  await page.goto("/solicitudes/nueva");
  await completar(page);
  await page.getByRole("link", { name: "Cancelar" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(6);
  expect(
    await page.evaluate((key) => localStorage.getItem(key), storageKey),
  ).toBeNull();
});

test("08 · Almacenamiento corrupto muestra aviso sin romper la aplicación", async ({
  page,
}) => {
  await page.addInitScript(
    (key) => localStorage.setItem(key, "JSON roto"),
    storageKey,
  );
  await page.goto("/solicitudes");
  await expect(page.getByRole("alert")).toContainText(
    "No se pudieron recuperar",
  );
  await expect(
    page.getByRole("heading", { name: "Tu primera solicitud empieza aquí" }),
  ).toBeVisible();
});

test("09 · Almacenamiento bloqueado no confirma un registro inexistente", async ({
  page,
}) => {
  await page.goto("/solicitudes/nueva");
  await completar(page);
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Sin espacio", "QuotaExceededError");
    };
  });
  await page.getByRole("button", { name: "Registrar solicitud" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "El navegador no permitió guardar",
  );
  await expect(page).toHaveURL(/\/nueva$/);
  await page.getByRole("link", { name: "Cancelar" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(6);
});

test("10 · HTTP simulado: respuesta válida y filtro del directorio", async ({
  page,
}) => {
  await page.route(endpoint, (route) =>
    route.fulfill({ json: [usuarioPrueba] }),
  );
  await page.goto("/directorio");
  await expect(
    page.getByRole("heading", { name: usuarioPrueba.name }),
  ).toBeVisible();
  await expect(page.getByText("HTTP 200", { exact: true })).toBeVisible();
  await page.getByLabel("Buscar contactos").fill("inexistente");
  await expect(
    page.getByRole("heading", { name: "No encontramos contactos" }),
  ).toBeVisible();
});

test("11 · HTTP simulado: error 503 y reintento exitoso", async ({ page }) => {
  let intentos = 0;
  await page.route(endpoint, (route) => {
    intentos++;
    return intentos === 1
      ? route.fulfill({
          status: 503,
          json: { error: "Simulación de servicio no disponible" },
        })
      : route.fulfill({ json: [usuarioPrueba] });
  });
  await page.goto("/directorio");
  await expect(page.getByRole("alert")).toContainText("HTTP 503");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "evidencias/capturas/05-error-api-simulado.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Reintentar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: usuarioPrueba.name }),
  ).toBeVisible();
  expect(intentos).toBe(2);
});

test("12 · HTTP simulado: formato inesperado y respuesta vacía", async ({
  page,
}) => {
  await page.route(endpoint, (route) =>
    route.fulfill({ json: [{ id: "incorrecto" }] }),
  );
  await page.goto("/directorio");
  await expect(page.getByRole("alert")).toContainText("formato inesperado");
  await page.unroute(endpoint);
  await page.route(endpoint, (route) => route.fulfill({ json: [] }));
  await page.getByRole("button", { name: "Reintentar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "El directorio está vacío" }),
  ).toBeVisible();
});

test("13 · HTTP simulado: estado de carga y cancelación al navegar", async ({
  page,
}) => {
  let liberar: () => void = () => {};
  const espera = new Promise<void>((resolve) => {
    liberar = resolve;
  });
  await page.route(endpoint, async (route) => {
    await espera;
    await route.fulfill({ json: [usuarioPrueba] }).catch(() => {});
  });
  await page.goto("/directorio");
  await expect(
    page.getByRole("heading", { name: "Cargando directorio" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Consultando…" }),
  ).toBeDisabled();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Solicitudes", exact: true })
    .click();
  liberar();
  await expect(page.locator("tbody tr")).toHaveCount(6);
});

test("14 · API REAL: GET desde HttpClient, datos y evidencia HTTP", async ({
  page,
}) => {
  const respuestaPendiente = page.waitForResponse(
    (response) =>
      response.url() === endpoint && response.request().method() === "GET",
  );
  await page.goto("/directorio");
  const respuesta = await respuestaPendiente;
  expect(respuesta.status()).toBe(200);
  const datos = await respuesta.json();
  expect(Array.isArray(datos)).toBe(true);
  expect(datos.length).toBeGreaterThan(0);
  await expect(page.locator(".contact-card")).toHaveCount(datos.length);
  await expect(page.getByText("HTTP 200", { exact: true })).toBeVisible();
  writeFileSync(
    "evidencias/consumo-api-real.json",
    JSON.stringify(
      {
        fecha: new Date().toISOString(),
        origen:
          "Petición real del navegador desde Angular HttpClient. Sin interceptar ni sustituir la respuesta.",
        metodo: respuesta.request().method(),
        url: respuesta.url(),
        estado: respuesta.status(),
        tipoContenido: respuesta.headers()["content-type"],
        cantidad: datos.length,
        primerRegistro: datos[0],
      },
      null,
      2,
    ),
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "evidencias/capturas/04-api-real.png",
    fullPage: true,
  });
});

test("15 · Vista móvil: navegación, formulario y sin desbordamiento de página", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/solicitudes");
  await expect(
    page.getByRole("heading", { name: "Solicitudes", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "evidencias/capturas/06-movil.png",
    fullPage: true,
  });
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Nueva solicitud" })
    .click();
  await completar(page);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Registrar solicitud" }).click();
  await expect(
    page.getByText("Solicitud registrada correctamente."),
  ).toBeVisible();
});

test("16 · Respuesta de red fallida permite reintentar", async ({ page }) => {
  await page.route(endpoint, (route) => route.abort("internetdisconnected"));
  await page.goto("/directorio");
  await expect(page.getByRole("alert")).toContainText("Revisa tu conexión");
  await expect(
    page.getByRole("button", { name: "Reintentar", exact: true }),
  ).toBeEnabled();
});

test("17 · Contenido de usuario se muestra como texto, sin ejecutar HTML", async ({
  page,
}) => {
  await page.goto("/solicitudes/nueva");
  await completar(page);
  await page
    .getByLabel("Descripción", { exact: true })
    .fill('<img src=x onerror="window.inyectado=true"> Solicitud de ejemplo.');
  await page.getByRole("button", { name: "Registrar solicitud" }).click();
  await expect(page.locator(".description-text")).toContainText("<img src=x");
  await expect(page.locator(".description-text img")).toHaveCount(0);
});

test("18 · Un listado guardado vacío se conserva sin reinsertar ejemplos", async ({
  page,
}) => {
  await page.addInitScript(
    (key) =>
      localStorage.setItem(
        key,
        JSON.stringify({ version: 1, solicitudes: [] }),
      ),
    storageKey,
  );
  await page.goto("/solicitudes");
  await expect(page.locator(".stat strong")).toHaveText([
    "00",
    "00",
    "00",
    "00",
  ]);
  await expect(
    page.getByRole("heading", { name: "Tu primera solicitud empieza aquí" }),
  ).toBeVisible();
});
