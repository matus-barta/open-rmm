export function getInitials(fullName: string | null | undefined) {
	let initials = '';

	fullName?.split(' ').forEach((element) => {
		initials = initials + element[0];
	});
	return initials.toUpperCase();
}
