$Root = Split-Path -Parent $PSScriptRoot
$LogDir = Join-Path $Root "logs"
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

& "$PSScriptRoot\stop_all.ps1"
Start-Sleep -Seconds 2

function Start-SecurePlanProcess {
    param(
        [string]$Name,
        [string]$Command
    )

    Start-Process powershell -ArgumentList @(
        "-NoExit",
        "-ExecutionPolicy",
        "Bypass",
        "-Command",
        $Command
    ) -WorkingDirectory $Root

    Write-Host "Started $Name"
}

Start-SecurePlanProcess -Name "SecurePlan backend" -Command "Set-Location '$Root'; `$env:PYTHONPATH='$Root\backend'; & '$Root\.venv\Scripts\python.exe' -m uvicorn backend.main:app --host 127.0.0.1 --port 8012 --reload"

Start-Sleep -Seconds 2

Start-SecurePlanProcess -Name "SecurePlan frontend" -Command "Set-Location '$Root\frontend'; `$env:VITE_API_BASE='http://127.0.0.1:8012/api'; npm run dev -- --host 127.0.0.1 --port 5174"

Start-Sleep -Seconds 2

Start-SecurePlanProcess -Name "Demo ecommerce target" -Command "Set-Location '$Root\demo-targets\sample-ecommerce'; & '$Root\.venv\Scripts\python.exe' -m http.server 9000"

Start-Sleep -Seconds 3
Start-Process "http://127.0.0.1:5174"

Write-Host ""
Write-Host "SecurePlan AI should open in your browser."
Write-Host "Frontend:    http://127.0.0.1:5174"
Write-Host "Backend API: http://127.0.0.1:8012"
Write-Host "Demo target: http://127.0.0.1:9000"
Write-Host ""
Write-Host "Paste this target into the app: http://127.0.0.1:9000"
