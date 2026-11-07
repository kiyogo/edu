@echo off
setlocal EnableExtensions DisableDelayedExpansion
cd /d "%~dp0"
chcp 65001 >nul

echo ========================================
echo   KIYOEDU - CONTINUOUS SCROLL V5
echo ========================================
where node >nul 2>nul
if errorlevel 1 goto :missing_node
where npm >nul 2>nul
if errorlevel 1 goto :missing_node
if not exist "node_modules\vite\bin\vite.js" (
  echo Dang cai cac thu vien lan dau...
  call npm install
  if errorlevel 1 goto :install_failed
)
echo Website se mo tai http://127.0.0.1:5173/
start "KiyoEdu Browser" /min powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\open-browser.ps1" -Url "http://127.0.0.1:5173/" -TimeoutSeconds 60
call npm run dev -- --strictPort
if errorlevel 1 goto :server_failed
exit /b 0
:missing_node
echo Loi: Chua cai Node.js hoac npm. Cai Node.js LTS tai https://nodejs.org/
pause
exit /b 1
:install_failed
echo Loi: npm install that bai. Kiem tra Internet va Node.js.
pause
exit /b 1
:server_failed
echo Loi: Khong khoi dong duoc website. Co the cong 5173 dang duoc su dung.
pause
exit /b 1
