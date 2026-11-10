@echo off
set "NODE_DIR=%~dp0.tools\node\node-v26.13.0-win-x64"
if not exist "%NODE_DIR%\node.exe" (
  echo Prenosny Node.js sa nenasiel v priecinku .tools\node.
  pause
  exit /b 1
)
set "PATH=%NODE_DIR%;%PATH%"
call "%NODE_DIR%\npm.cmd" start
