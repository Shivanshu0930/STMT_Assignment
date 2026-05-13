$Ports = @(8010, 8012, 5174, 9000)

foreach ($Port in $Ports) {
    $Connections = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue
    foreach ($Connection in $Connections) {
        $ProcessId = $Connection.OwningProcess
        if ($ProcessId) {
            Write-Host "Stopping process $ProcessId on port $Port"
            Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue
        }
    }
}

$Root = Split-Path -Parent $PSScriptRoot
$Processes = Get-CimInstance Win32_Process | Where-Object {
    $_.ProcessId -ne $PID -and
    $_.CommandLine -and
    (
        $_.CommandLine -like "*$Root*" -or
        $_.CommandLine -like "*backend.main:app*" -or
        $_.CommandLine -like "*--port 5174*" -or
        $_.CommandLine -like "*http.server 9000*"
    )
}

foreach ($Process in $Processes) {
    Write-Host "Stopping SecurePlan process $($Process.ProcessId)"
    Stop-Process -Id $Process.ProcessId -Force -ErrorAction SilentlyContinue
}

Write-Host "SecurePlan local services stopped."
