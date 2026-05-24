@echo off
title Compilar CMS — Dr. Marlon Inácio
cd /d "%~dp0"
echo.
echo  ============================================
echo   Compilando CMS-Marlon.exe
echo  ============================================
echo.

if not exist node_modules (
    echo  Instalando dependencias...
    npm install
    echo.
)

echo  Instalando compilador pkg (pode demorar na primeira vez)...
npm install
echo.

echo  Gerando CMS-Marlon.exe ...
echo  (o Node.js sera embutido — arquivo ficara com ~50-80 MB)
echo.
npx pkg . --compress GZip --output CMS-Marlon.exe

echo.
if exist CMS-Marlon.exe (
    echo  [OK] CMS-Marlon.exe gerado com sucesso!
    echo.
    echo  Como usar:
    echo    - Copie CMS-Marlon.exe para qualquer pasta
    echo    - Coloque o config.json na mesma pasta (sera criado ao configurar)
    echo    - De dois cliques para abrir o CMS
) else (
    echo  [ERRO] Falha ao gerar o executavel.
)
echo.
pause
