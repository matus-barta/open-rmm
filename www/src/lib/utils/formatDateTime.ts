import dayjs from 'dayjs';

export default function formatIsoDateTime(dateTime: string | null) {
	return dayjs(dateTime).format('DD. MMM. HH:mm');
}
