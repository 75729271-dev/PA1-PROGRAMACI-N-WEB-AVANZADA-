$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path $PSScriptRoot -Parent
Set-Location -LiteralPath $taskRoot
$taskNode = Join-Path $taskRoot '.tools/node_modules/node/bin/node.exe'
if (-not (Test-Path -LiteralPath $taskNode)) {
  Write-Error 'No existe el entorno local. Instala Node 18.20.8, ejecuta npm ci y luego npm start como indica el README.'
  exit 1
}
if (-not (Test-Path -LiteralPath 'node_modules/@angular/cli/bin/ng.js')) {
  Write-Error 'Faltan dependencias. Sigue las instrucciones de instalación del README.'
  exit 1
}
Write-Host 'Campus estará disponible en http://127.0.0.1:4200. Para detenerlo presiona Ctrl+C.'
& $taskNode 'node_modules/@angular/cli/bin/ng.js' serve --host 127.0.0.1 --port 4200
exit $LASTEXITCODE
