export default interface IComputer{
    OrgUnit: string;
	PendingReboot?: boolean;
	ComputerName?: string;
	LastBootUpTime?: string;
	OsVersion?: string;
	OsName?: string;
    LastUpdate: string;
}