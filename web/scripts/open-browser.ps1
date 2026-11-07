param([string]$Url = 'http://127.0.0.1:5173/', [int]$TimeoutSeconds = 60)
$ErrorActionPreference = 'SilentlyContinue'
for ($i = 0; $i -lt $TimeoutSeconds; $i++) {
  try {
    $result = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
    if ($result.StatusCode -ge 200 -and $result.StatusCode -lt 400) {
      Start-Process $Url
      exit 0
    }
  } catch { }
  Start-Sleep -Seconds 1
}
exit 1
