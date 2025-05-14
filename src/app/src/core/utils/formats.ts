import moment from 'moment';

export const formatDate = (date: string | Date) => {
	// Parse the date with moment, works with ISO strings like 2025-05-14T15:55:05.400Z
	return moment(date).format('DD/MM/YYYY');
}

export const getTimeDiff = (start: string | Date, end: string | Date) => {
	// Parse dates with moment
	const startMoment = moment(start);
	const endMoment = moment(end);

	// Calculate duration between dates
	const duration = moment.duration(endMoment.diff(startMoment));

	const hours = Math.floor(duration.asHours());
	const minutes = duration.minutes();
	const seconds = duration.seconds();

	return `${hours}h ${minutes}m ${seconds}s`;
}