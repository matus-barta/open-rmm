#Check windows updates
$UpdateSession = New-Object -ComObject Microsoft.Update.Session
$UpdateSearcher = $UpdateSession.CreateupdateSearcher()
$Updates = @($UpdateSearcher.Search("IsHidden=0 and IsInstalled=0").Updates)
$UpdatesJSON = $Updates | Select-Object Title | ConvertTo-Json

$UpdatesJSON