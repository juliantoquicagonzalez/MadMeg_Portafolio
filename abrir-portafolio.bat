@echo off
title Madmeg Portfolio - servidor local
cd /d "%~dp0"
echo Abriendo el portafolio en http://localhost:5511
echo Deja esta ventana abierta mientras veas la pagina. Cierrala para apagarla.
start "" "http://localhost:5511"
python serve.py 5511
