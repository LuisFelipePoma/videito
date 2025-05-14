import { useMobile } from '@core/hooks/useMobile'
import { Eye, LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

interface Props {
	roomName: string
}
export const NavbarRoom: React.FC<Props> = ({ roomName }) => {

	const isMobile = useMobile()
	return (
		<header className="border-b border-lightborder bg-white px-4 py-2 shadow-sm">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Eye className="h-6 w-6 text-primary" />
					<h1 className="text-lg font-medium text-lighttext">{roomName}</h1>
				</div>
				<div className="flex items-center space-x-2">
					<Link to="/app/courses">
						<button className="flex items-center gap-1 px-2 py-1 text-lighttextsec hover:text-lighttext rounded-md hover:bg-warmgray/10">
							<LogOut className="h-4 w-4" />
							{!isMobile && "Salir"}
						</button>
					</Link>
				</div>
			</div>
		</header>
	)
}
