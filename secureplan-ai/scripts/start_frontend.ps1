$Root = Split-Path -Parent $PSScriptRoot
Set-Location "$Root\frontend"
$env:VITE_API_BASE = "http://127.0.0.1:8012/api"
npm run dev -- --host 127.0.0.1 --port 5174
