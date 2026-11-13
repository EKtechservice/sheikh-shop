@echo off
title Sheikh's Shop - Dev Server
cd /d "%~dp0"

echo ========================================================
echo        Sheikh's Shop - Local Development Server
echo ========================================================
echo.
echo Store URL:        http://localhost:3000
echo Owner Admin URL:  http://localhost:3000/admin/login
echo.
echo Press Ctrl + C to stop the server at any time.
echo ========================================================
echo.

npm run dev
pause
