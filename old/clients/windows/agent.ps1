$ApiUrl = "http://192.168.1.10:5005/api/" #TODO: need some more clever way to set dev and prod address

#Get UUID
$UUID = (Get-WmiObject -class Win32_ComputerSystemProduct).UUID
#$UUID_JSON = "{`"UUID`": `"$UUID`"}"
Write-Host "Got UUID"

function SendJsonData {
    param (
        $Route,
        $DataJSON
    )
    Invoke-WebRequest -Uri ($ApiUrl + $Route) -Method POST -Body $DataJSON -Headers @{"Device-UUID" = $UUID } -ContentType "application/json"
    Write-Host "Sent "$Route" status"
}

#Getting Volume information
$AllVolumesJSON = Get-Volume | Where-Object { $_.drivetype -eq 'Fixed' } | Select-Object -Property DriveLetter, HealthStatus, SizeRemaining, Size, UniqueID | ConvertTo-Json
$AllVolumesNamesJSON = Get-CimInstance -ClassName Win32_LogicalDisk | Where-Object { $_.drivetype -eq '3' } | Select-Object -Property DeviceID, VolumeName | ConvertTo-Json
$CombinedVolumesJSON = $AllVolumesJSON.Substring(0, $AllVolumesJSON.Length - 1) + "," + $AllVolumesNamesJSON.Substring(1, $AllVolumesNamesJSON.Length - 1)
Write-Host "Got Drive information"
SendJsonData "volumes" $CombinedVolumesJSON

#Getting AV Status
$AV = Get-WmiObject -Namespace root\SecurityCenter2 -Class AntiVirusProduct 
switch ($AV.productState) { 
    "262144" { $UpdateStatus = "Up to date" ; $RealTimeProtectionStatus = "Disabled" } 
    "262160" { $UpdateStatus = "Out of date" ; $RealTimeProtectionStatus = "Disabled" } 
    "266240" { $UpdateStatus = "Up to date" ; $RealTimeProtectionStatus = "Enabled" } 
    "266256" { $UpdateStatus = "Out of date" ; $RealTimeProtectionStatus = "Enabled" } 
    "393216" { $UpdateStatus = "Up to date" ; $RealTimeProtectionStatus = "Disabled" } 
    "393232" { $UpdateStatus = "Out of date" ; $RealTimeProtectionStatus = "Disabled" } 
    "393488" { $UpdateStatus = "Out of date" ; $RealTimeProtectionStatus = "Disabled" } 
    "397312" { $UpdateStatus = "Up to date" ; $RealTimeProtectionStatus = "Enabled" } 
    "397328" { $UpdateStatus = "Out of date" ; $RealTimeProtectionStatus = "Enabled" } 
    "397584" { $UpdateStatus = "Out of date" ; $RealTimeProtectionStatus = "Enabled" } 
    "397568" { $UpdateStatus = "Up to date"; $RealTimeProtectionStatus = "Enabled" }
    "393472" { $UpdateStatus = "Up to date" ; $RealTimeProtectionStatus = "Disabled" }
    default { $UpdateStatus = "Unknown" ; $RealTimeProtectionStatus = "Unknown" } 
}
$AVName = $AV.displayname
$AVStatusJSON = "{`"AVName`": `"$AVName`" ,`"UpdateStatus`": `"$UpdateStatus`" ,`"RealTimeProtectionStatus`": `"$RealTimeProtectionStatus`"}"
Write-Host "Got AV status"
$AVStatusJSON
SendJsonData "AV" $AVStatusJSON

#Get Pending Reboot
#Adapted from https://gist.github.com/altrive/5329377
#Based on <http://gallery.technet.microsoft.com/scriptcenter/Get-PendingReboot-Query-bdb79542>
function Test-PendingReboot {
    if (Get-ChildItem "HKLM:\Software\Microsoft\Windows\CurrentVersion\Component Based Servicing\RebootPending" -EA Ignore) { return $true }
    if (Get-Item "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsUpdate\Auto Update\RebootRequired" -EA Ignore) { return $true }
    if (Get-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager" -Name PendingFileRenameOperations -EA Ignore) { return $true }
    try { 
        $util = [wmiclass]"\\.\root\ccm\clientsdk:CCM_ClientUtilities"
        $status = $util.DetermineIfRebootPending()
        if (($null -ne $status) -and $status.RebootPending) {
            return $true
        }
    }
    catch {}
        
    return $false
}
$PendingReboot = Test-PendingReboot
$LastBootTimeJSON = Get-CimInstance -ClassName Win32_OperatingSystem | Select-Object LastBootUpTime | ConvertTo-JSON
$OSVersionJSON = Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsHardwareAbstractionLayer | ConvertTo-Json
Write-Host "Got Pending Reboot, Computer Name, Last Bootime, Windows Version"

$LastBootTime = $LastBootTimeJSON.Substring(1, $LastBootTimeJSON.Length - 2)
$OSVersion = $OSVersionJSON.Substring(1, $OSVersionJSON.Length - 2)

$SystemInfoJSON = "{`n    `"PendingReboot`": `"$PendingReboot`",`n    `"ComputerName`": `"$env:computername`","
$SystemInfo2 = $LastBootTime + "," + $OSVersion + "}"
$SystemInfoJSON = $SystemInfoJSON + $SystemInfo2

SendJsonData "systemInfo" $SystemInfoJSON

#Check windows updates
#$UpdateSession = New-Object -ComObject Microsoft.Update.Session
#$UpdateSearcher = $UpdateSession.CreateupdateSearcher()
#$Updates = @($UpdateSearcher.Search("IsHidden=0 and IsInstalled=0").Updates)
#$UpdatesJSON = $Updates | Select-Object Title | ConvertTo-Json
#Write-Host "Got Missing Patches"

Write-Host "Done!"