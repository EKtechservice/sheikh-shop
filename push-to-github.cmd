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
set DEFAULT_URL=https://github.com/EKtechservice/sheikh-shop.git
echo Default URL: %DEFAULT_URL%
set /p REPO_URL="Paste your GitHub Repository URL (Press Enter for default): "

if "%REPO_URL%"=="" set REPO_URL=%DEFAULT_URL%

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
