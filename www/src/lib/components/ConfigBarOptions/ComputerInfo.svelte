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

	interface Props {
		computer: Computer | undefined;
	}

	let { computer }: Props = $props();
</script>

<div class="flex h-full w-full flex-col justify-between px-2 py-4">
	<div class="flex flex-col gap-2">
		<label>
			UUID
			<input
				class="h-6 w-full rounded-lg border-[0.5px] p-1 font-mono text-xs"
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
				class="h-6 w-full rounded-lg border-[0.5px] p-1 font-mono text-xs"
				type="text"
				disabled
				value={computer?.SystemInfo?.ComputerName}
			/>
		</label>
		<label>
			Last BootUp Time
			<input
				class="h-6 w-full rounded-lg border-[0.5px] p-1 font-mono text-xs"
				type="text"
				disabled
				value={formatIsoDateTime(computer?.SystemInfo?.LastBootupTime)}
			/>
		</label>
		<label>
			OS Name
			<input
				class="h-6 w-full rounded-lg border-[0.5px] p-1 font-mono text-xs"
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
				class="h-6 w-full rounded-lg border-[0.5px] p-1 font-mono text-xs"
				type="text"
				disabled
				value={computer?.SystemInfo?.Type}
			/>
		</label>
	</div>
</div>
