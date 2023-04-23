#https://stackoverflow.com/questions/59489885/identify-if-windows-hosted-on-physical-or-virtual-machine-powershell

function GetMachineType {
    $ComputerSystemInfo = Get-WmiObject -Class Win32_ComputerSystem
    switch ($ComputerSystemInfo.Model) { 

        # Check for VMware Machine Type 
        "VMware Virtual Platform" { 
            Write-Output "VMware"
            Break 
        } 

        # Check for Oracle VM Machine Type 
        "VirtualBox" { 
            Write-Output "VirtualBox"
            Break 
        } 
        default { 

            switch ($ComputerSystemInfo.Manufacturer) {

                # Check for Xen VM Machine Type
                "Xen" {
                    Write-Output "Xen"
                    Break
                }

                # Check for KVM VM Machine Type
                "QEMU" {
                    Write-Output "KVM"
                    Break
                }
                # Check for Hyper-V Machine Type 
                "Microsoft Corporation" { 
                    if (get-service WindowsAzureGuestAgent -ErrorAction SilentlyContinue) {
                        Write-Output "Azure"
                    }
                    else {
                        Write-Output "Hyper-V"
                    }
                    Break
                }
                # Check for Google Cloud Platform
                "Google" {
                    Write-Output "GoogleCloud"
                    Break
                }

                # Check for AWS Cloud Platform
                default { 
                    if ((((Get-WmiObject -query "select uuid from Win32_ComputerSystemProduct" | Select-Object UUID).UUID).substring(0, 3) ) -match "EC2") {
                        Write-Output "AWS"
                    }
                    # Otherwise it is a physical Box 
                    else {
                        Write-Output "Physical"
                    }
                } 
            }                  
        } 
    } 

}

GetMachineType