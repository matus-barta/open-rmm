import dayjs from 'dayjs';

export default function formatIsoDateTime(dateTime: string) {
	return dayjs(dateTime).format('D. MMM H:mm');
}
