@echo off
setlocal EnableExtensions DisableDelayedExpansion
cd /d "%~dp0"
chcp 65001 >nul
where node >nul 2>nul
if errorlevel 1 goto :missing
where npm >nul 2>nul
if errorlevel 1 goto :missing
if not exist "node_modules\vite\bin\vite.js" (
  call npm install
  if errorlevel 1 goto :failed
)
call npm run build
if errorlevel 1 goto :failed
echo Build thanh cong. Xem trong thu muc dist.
pause
exit /b 0
:missing
echo Can cai Node.js LTS va npm.
pause
exit /b 1
:failed
echo Build that bai. Doc thong bao phia tren.
pause
exit /b 1
