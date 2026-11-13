@echo off
title Sheikh Shop - Dev Terminal
cd /d "%~dp0"
echo ==============================================
echo   Sheikh's Shop - Menswear Next.js Project
echo   Path: %CD%
echo ==============================================
echo.
echo Starting development server...
echo Press Ctrl+C to stop.
echo.
npm run dev
cmd /k
