
#Getting Volume information
$AllVolumesJSON = Get-Volume | Where-Object { $_.drivetype -eq 'Fixed' } | Select-Object -Property DriveLetter, HealthStatus, SizeRemaining, Size | ConvertTo-Json
$AllVolumesNamesJSON = Get-CimInstance -ClassName Win32_LogicalDisk | Where-Object { $_.drivetype -eq '3' } | Select-Object -Property DeviceID, VolumeName | ConvertTo-Json
Write-Host "?? Got Drive information"

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
Write-Host "?? Got AV status"

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
        if (($status -ne $null) -and $status.RebootPending) {
            return $true
        }
    }
    catch {}
        
    return $false
}
$PendingReboot = Test-PendingReboot
$PendingRebootJSON = "{`"PendingReboot`": `"$PendingReboot`"}"
Write-Host "?? Got Pending updates"

#Get computer name
$ComputerNameJSON = "{`"ComputerName`": `"$env:computername`"}"
Write-Host "?? Got Computer Name"

#Windows version
$OSVersionJSON = Get-ComputerInfo | Select WindowsProductName, WindowsVersion, OsHardwareAbstractionLayer | ConvertTo-Json
Write-Host "?? Got Windows Version"

#Last boot time
$LastBootTimeJSON = Get-CimInstance -ClassName Win32_OperatingSystem | Select LastBootUpTime | ConvertTo-JSON
Write-Host "?? Got Last Bootime"

#Get UUID
$UUID = (Get-WmiObject -class Win32_ComputerSystemProduct).UUID
$UUID_JSON = "{`"UUID`": `"$UUID`"}"
Write-Host "?? Got UUID"

#Check windows updates
$UpdateSession = New-Object -ComObject Microsoft.Update.Session
$UpdateSearcher = $UpdateSession.CreateupdateSearcher()
$Updates = @($UpdateSearcher.Search("IsHidden=0 and IsInstalled=0").Updates)
$UpdatesJSON = $Updates | Select-Object Title | ConvertTo-Json
Write-Host "?? Got Missing Patches"

Write-Host "Done! ??????"