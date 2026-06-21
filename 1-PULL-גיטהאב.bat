@echo off
setlocal

set TOKEN=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
set USERNAME=DanielMalul
set REPO=DanielProtfolio
set REMOTE=https://%TOKEN%@github.com/%USERNAME%/%REPO%.git

echo.
echo ========================================
echo   PULL - Download from GitHub
echo ========================================
echo.

git remote remove origin 2>nul
git remote add origin %REMOTE%

git pull origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS - Local code is up to date.
) else (
    echo ERROR - Check internet connection.
)
echo.
pause
