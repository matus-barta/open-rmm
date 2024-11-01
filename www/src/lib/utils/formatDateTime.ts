import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export default function formatIsoDateTime(dateTime: string | null | undefined) {
	dayjs.extend(utc);
	if (dateTime) return dayjs(dateTime).utc().format('DD. MMM. HH:mm');
	else return 'N/A';
}
