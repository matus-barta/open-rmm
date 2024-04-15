<script lang="ts">
	import formatIsoDateTime from '$lib/utils/formatDateTime';

	type Computer = {
		IsAllowed: boolean | null;
		Uuid: string | null;
		IsAdded: boolean | null;
		SystemInfo:
			| {
					ComputerName: string | null | undefined;
					PendingReboot: boolean | null | undefined;
					LastBootupTime: string | null | undefined;
					OsName: string | null | undefined;
					Type: string | null | undefined;
			  }
			| null
			| undefined;
	};

	export let computer: Computer | undefined;
</script>

<div class="w-full h-full px-2 py-4 flex flex-col justify-between">
	<div class="flex flex-col gap-2">
		<label>
			UUID
			<input
				class="rounded-lg w-full border-[0.5px] font-mono text-xs h-6 p-1"
				type="text"
				disabled
				value={computer?.Uuid}
			/>
		</label>
		<label>
			Is Added
			<input type="checkbox" disabled checked={computer?.IsAdded} />
		</label>
		<label>
			Is Allowed
			<input type="checkbox" disabled checked={computer?.IsAllowed} />
		</label>
		<label>
			Computer Name
			<input
				class="rounded-lg w-full border-[0.5px] font-mono text-xs h-6 p-1"
				type="text"
				disabled
				value={computer?.SystemInfo?.ComputerName}
			/>
		</label>
		<label>
			Last BootUp Time
			<input
				class="rounded-lg w-full border-[0.5px] font-mono text-xs h-6 p-1"
				type="text"
				disabled
				value={formatIsoDateTime(computer?.SystemInfo?.LastBootupTime)}
			/>
		</label>
		<label>
			OS Name
			<input
				class="rounded-lg w-full border-[0.5px] font-mono text-xs h-6 p-1"
				type="text"
				disabled
				value={computer?.SystemInfo?.OsName}
			/>
		</label>
		<label>
			Pending Reboot
			<input type="checkbox" disabled checked={computer?.SystemInfo?.PendingReboot} />
		</label>
		<label>
			Type
			<input
				class="rounded-lg w-full border-[0.5px] font-mono text-xs h-6 p-1"
				type="text"
				disabled
				value={computer?.SystemInfo?.Type}
			/>
		</label>
	</div>
</div>
