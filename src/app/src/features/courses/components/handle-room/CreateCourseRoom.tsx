import { Button } from '@components/ui/Buttons/Button'
import { useUserStore } from '@core/context/userStore'
import { Role } from '@core/types/user'
import { Video } from 'lucide-react'

import { Link } from 'react-router'

export const CreateCourseRoom = () => {
	const user = useUserStore(s => s.user)


	return (

		user?.role === Role.DOCENT ?
			<article className="border border-warmgray bg-warmblack rounded-lg">
				<div className="p-4">
					<h3 className="text-lg font-medium text-lighttext">
						Iniciar videoconferencia
					</h3>
					<p className="text-secondarytext text-sm">
						Crea una nueva sala para este curso
					</p>
				</div>
				<div className="px-4 pb-2 space-y-4">
					<h3 className="text-sm font-medium text-secondary-foreground">
						Título de la clase
					</h3>
					<div className="flex gap-2.5">
						<input
							type="text"
							placeholder="Ej: Introducción a Derivadas"
							className="w-full flex-1 rounded-md border border-warmgray/70 bg-warmgray p-2 text-sm h-10"
						/>
						<Link to="/app/room/123">
							<Button color="primary" className="flex gap-2.5">
								<Video className="h-4 w-4" />
								Iniciar Clase
							</Button>
						</Link>
					</div>
				</div>
			</article> :
			<article className="border border-warmgray bg-warmblack mb-8 rounded-lg overflow-hidden">
				<header className="p-6">
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 rounded-full bg-secondarytext"></div>
						<h3 className="text-lighttext font-medium">No hay clases activas</h3>
					</div>
					<p className="text-secondarytext text-sm">
						El profesor no ha iniciado ninguna clase en este momento
					</p>
				</header>

				<div className="px-6 pb-6">
					<p className="text-secondarytext">Cuando el profesor inicie una clase, podrás unirte desde aquí.</p>
				</div>
			</article>
	)
}
