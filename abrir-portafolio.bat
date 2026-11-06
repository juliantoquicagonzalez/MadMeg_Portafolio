@echo off
title Madmeg Portfolio - vista local
cd /d "%~dp0"

rem If the local viewer is already running, just open the page.
powershell -NoProfile -Command "try { Invoke-WebRequest -UseBasicParsing http://localhost:5511 -TimeoutSec 1 | Out-Null; exit 0 } catch { exit 1 }"
if %errorlevel%==0 (
  start "" "http://localhost:5511"
  exit /b
)

echo.
echo   Madmeg Portfolio - vista local
echo   http://localhost:5511
echo.
echo   Los cambios en los archivos se ven con solo recargar la pagina (F5).
echo   Deja esta ventana abierta mientras la veas. Cierrala para apagarla.
echo.

rem open the browser once the server has had a moment to start
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:5511"
python serve.py 5511
