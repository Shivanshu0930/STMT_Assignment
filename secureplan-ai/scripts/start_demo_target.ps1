$Root = Split-Path -Parent $PSScriptRoot
Set-Location "$Root\demo-targets\sample-ecommerce"
& "$Root\.venv\Scripts\python.exe" -m http.server 9000
