@echo off
setlocal

set TOKEN=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
set USERNAME=DanielMalul
set REPO=DanielProtfolio
set REMOTE=https://%TOKEN%@github.com/%USERNAME%/%REPO%.git

echo.
echo ========================================
echo   PUSH - Upload to GitHub
echo ========================================
echo.

git remote remove origin 2>nul
git remote add origin %REMOTE%

git add .

for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set DT=%%I
set MSG=update %DT:~0,8%-%DT:~8,6%

git commit -m "%MSG%"
git branch -M main
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS - Onrender will auto-deploy now.
) else (
    echo ERROR - Check token and repo name.
)
echo.
pause
