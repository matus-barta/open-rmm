import dayjs from 'dayjs';

export default function formatIsoDateTime(dateTime: string | undefined) {
	return dayjs(dateTime).format('DD. MMM. HH:mm');
}
