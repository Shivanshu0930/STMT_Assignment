$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root
$env:PYTHONPATH = "$Root\backend"
& "$Root\.venv\Scripts\python.exe" -m uvicorn backend.main:app --host 127.0.0.1 --port 8012 --reload
