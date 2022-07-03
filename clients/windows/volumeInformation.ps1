#Getting Volume information
$AllVolumesJSON = Get-Volume | Where-Object { $_.drivetype -eq 'Fixed' } | Select-Object -Property DriveLetter, HealthStatus, SizeRemaining, Size, UniqueID | ConvertTo-Json
$AllVolumesNamesJSON = Get-CimInstance -ClassName Win32_LogicalDisk | Where-Object { $_.drivetype -eq '3' } | Select-Object -Property DeviceID, VolumeName | ConvertTo-Json
$CombinedVolumesJSON = $AllVolumesJSON.Substring(0, $AllVolumesJSON.Length - 1) + "," + $AllVolumesNamesJSON.Substring(1, $AllVolumesNamesJSON.Length - 1)
$CombinedVolumesJSON