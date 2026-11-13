@echo off
title Sheikh's Shop - Push to GitHub
cd /d "%~dp0"

echo ========================================================
echo        Sheikh's Shop - GitHub Push Assistant
echo ========================================================
echo.
echo 1. Staging all store and admin files...
git add .

echo.
echo 2. Creating release commit...
git commit -m "Production release: Public store, owner admin portal, mobile optimization, and Supabase backend"

echo.
echo ========================================================
echo Step 2: Connect to your GitHub Repository
echo.
echo If you haven't created one yet:
echo   1. Go to https://github.com/new
echo   2. Name it (e.g. sheikh-shop) and leave it Public or Private
echo   3. Do NOT check README, .gitignore, or license
echo   4. Click "Create repository"
echo ========================================================
echo.
set /p REPO_URL="Paste your GitHub Repository URL: "

if "%REPO_URL%"=="" (
    echo.
    echo [Notice] No repository URL entered. Your local changes are committed.
    echo When you have your URL, you can run this script again or run:
    echo   git remote add origin YOUR_URL
    echo   git branch -M main
    echo   git push -u origin main
    echo.
    pause
    exit /b
)

echo.
echo Configuring remote 'origin' to: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo.
echo Pushing codebase to GitHub (main branch)...
git push -u origin main

echo.
echo ========================================================
echo PUSH COMPLETE! Your code is now live on GitHub.
echo Next step: Connect this repo to Vercel (vercel.com).
echo ========================================================
pause
