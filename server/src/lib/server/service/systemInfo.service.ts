export async function createSystemInfo() {
	try {
		//return await SystemInfoModel.create(input);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		throw new Error(e);
	}
}

export async function getSystemInfo(UUID: string) {
	///return SystemInfoModel.findOne({ UUID: UUID });
}
