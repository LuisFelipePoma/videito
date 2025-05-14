import { BadgeUser } from '@components/ui/Badge/BadgeUser'
import { Button } from '@components/ui/Buttons/Button';
import { useUserStore } from '@core/context/userStore';
import { Eye, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

export const Navbar = () => {
	const { user, forgetUserInfo } = useUserStore(
		useShallow((s) => ({
			forgetUserInfo: s.forgetUserInfo,
			user: s.user,
		}))
	);
	const navigate = useNavigate();

	function handleLogout() {
		forgetUserInfo();
		navigate("/");
	}
	return (
		<header className="border-b border-lightborder bg-white px-6 py-4 shadow-sm">
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<div className="flex items-center space-x-2">
					<Eye className="h-8 w-8 text-primary" />
					<h1 className="text-xl font-medium text-lighttext">FocusTrack</h1>
				</div>
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2">
						<BadgeUser />
						<span className="text-sm font-medium text-lighttext capitalize">
							{user?.firstName.split(" ")[0]} {user?.lastName.split(" ")[0]} (
							{user?.role === "student" ? "Estudiante" : "Docente"})
						</span>
					</div>
					<Button size="sm" color="destructive" onClick={handleLogout}>
						<LogOut className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</header>
	)
}
