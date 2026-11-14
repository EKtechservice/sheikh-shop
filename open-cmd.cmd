@echo off
title Sheikh's Shop - Developer Command Center
cd /d "%~dp0"
color 0B
cls

echo ================================================================
echo             SHEIKH'S SHOP - COMMAND CENTER
echo ================================================================
echo.
echo  Project Path: %CD%
echo.
echo  Quick Commands you can type:
echo    npm run dev     - Start local development server (http://localhost:3000)
echo    npm run build   - Run full production build
echo    git status      - Check modified and staged files
echo    git push origin main - Push latest code to GitHub
echo.
echo ================================================================
echo.
cmd /k
