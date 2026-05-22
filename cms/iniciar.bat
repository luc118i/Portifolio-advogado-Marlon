@echo off
title CMS — Dr. Marlon Inácio
cd /d "%~dp0"
echo.
echo  ================================
echo   CMS — Dr. Marlon Inácio
echo  ================================
echo.
if not exist node_modules (
    echo  Instalando dependencias pela primeira vez...
    npm install
    echo.
)
echo  Servidor iniciando em http://localhost:4000
echo  Se a porta 4000 estiver ocupada, o CMS usa a proxima livre.
echo  Feche esta janela para encerrar.
echo.
node server.js
pause
