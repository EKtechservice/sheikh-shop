@echo off
title Sheikh's Shop - Merge Admin Changes to Main
cd /d "%~dp0"

echo ========================================================
echo   Sheikh's Shop - Merge & Deploy to Main
echo ========================================================
echo.
echo 1. Switching to main branch...
git checkout main

echo.
echo 2. Merging feature/admin-from-public into main...
git merge feature/admin-from-public

echo.
echo 3. Pushing merged code to GitHub main...
git push origin main

echo.
echo ========================================================
echo   MERGE COMPLETE!
echo   Vercel will now automatically redeploy your changes.
echo ========================================================
echo.
pause
