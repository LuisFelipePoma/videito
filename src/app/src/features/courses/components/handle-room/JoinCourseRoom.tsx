import React from 'react';
import { Clock, Calendar, Video } from 'lucide-react';

import { Room } from '@features/courses/services/types';
import { Link } from 'react-router';
import { formatDate, getTimeDiff } from '@core/utils/formats';
import { Button } from '@components/ui/Buttons/Button';


interface Props {
	room: Room
}
export const JoinCourseRoom: React.FC<Props> = ({ room }) => {
	return (

		<article className="border border-warmgray bg-warmblack p-6 rounded-lg overflow-hidden">
			<header className="flex justify-between">
				<div className="flex items-center gap-2.5 flex-1">
					<div className="w-3 h-3 rounded-full bg-success"></div>
					<h3 className="text-lighttext font-medium">Clase activa ahora</h3>
				</div>
				<Link to={`/app/room/${room.accessCode}`} className="">
					<Button className="flex gap-2.5">
						<Video className="h-4 w-4" />
						Unirse a la clase
					</Button>
				</Link>
			</header>

			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="bg-warmgray/30 p-3 rounded-lg">
						<div className="flex items-center space-x-2 mb-1">
							<Clock className="h-4 w-4 text-secondarytext" />
							<span className="text-sm text-secondarytext">Inicio</span>
						</div>
						<p className="text-lighttext">{formatDate(room.createdAt)}</p>
					</div>
					<div className="bg-warmgray/30 p-3 rounded-lg">
						<div className="flex items-center space-x-2 mb-1">
							<Calendar className="h-4 w-4 text-secondarytext" />
							<span className="text-sm text-secondarytext">Duración</span>
						</div>
						<p className="text-lighttext">{getTimeDiff(room.createdAt, new Date())}</p>
					</div>
				</div>
			</div>

		</article>
	);
};