import dayjs from 'dayjs';

export default function formatIsoDateTime(dateTime: string | null | undefined) {
	if(dateTime) return dayjs(dateTime).format('DD. MMM. HH:mm');
	else return "N/A"
}
