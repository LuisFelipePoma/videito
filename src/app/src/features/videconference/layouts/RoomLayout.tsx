import React from "react";
import { NavbarRoom } from "../components/NavbarRoom";
import { SidebarRoom } from "../components/sidebar/SidebarRoom";
import { useRoomStore } from "../store/useRoomStore";
import { useShallow } from "zustand/react/shallow";
import { LocalCamera } from "../components/LocalCamera";
import { ControlsRoom } from "../components/ControlsRoom";

interface RoomLayoutProps {
	roomName: string;
}

export const RoomLayout: React.FC<RoomLayoutProps> = ({
	roomName,
}) => {


	const participants = [
		{ name: "Juan Sánchez", isHost: true, audioEnabled: true, videoEnabled: true },
		{ name: "María García", attention: 85, audioEnabled: true, videoEnabled: true },
		{ name: "Pedro Ruiz", attention: 92, audioEnabled: true, videoEnabled: true },
		{ name: "Ana Martínez", attention: 42, audioEnabled: false, videoEnabled: true },
	];
	const { remoteStreams, videoEnabled } = useRoomStore(
		useShallow((s) => ({
			remoteStreams: s.remoteStreams,
			videoEnabled: s.videoEnabled,
		}))
	);

	return (
		<div className="flex h-full flex-col bg-lightbg w-full">
			<NavbarRoom roomName={roomName} />

			<div className="flex flex-1 overflow-hidden">
				<main className="flex-1 overflow-hidden bg-lightbg p-4">
					<div className="flex flex-col gap-4 h-full">
						<div className="relative rounded-lg bg-white overflow-hidden shadow-sm flex-1 h-full">
							{/* Main video area */}
							<div className="h-full w-full bg-lightcard flex items-center justify-center">
								<LocalCamera videoEnabled={videoEnabled} />
							</div>

							{/* Participant thumbnails */}
							<div className="flex space-x-2">
								{remoteStreams.map((stream, i) => (
									<div
										key={i}
										className="h-24 w-32 overflow-hidden rounded-lg border border-muted-foreground/20 bg-muted relative shadow-sm"
									>
										<video
											autoPlay
											playsInline
											ref={(video) => {
												if (video) video.srcObject = stream;
											}}
											className="h-full w-full object-cover"
										/>
										<div className="absolute bottom-0 left-0 right-0 bg-background/70 px-2 py-1 text-xs flex justify-between items-center">
											<span className="text-lighttext">
												{participants[i]?.name || `Estudiante ${i + 1}`}
											</span>
											<div className={`w-2 h-2 rounded-full ${i === 2 ? "bg-warning" : "bg-success"}`}></div>
										</div>
									</div>
								))}
							</div>

							{/* Attention alert */}
							{/* {analysisActive && (
								<div className="absolute top-4 left-4 bg-warning/20 border border-warning/40 text-warning px-3 py-2 rounded-md flex items-center">
									<AlertTriangle className="h-4 w-4 mr-2" />
									<span className="text-sm">Atención baja detectada en 3 estudiantes</span>
								</div>
							)} */}
						</div>
						{/* Controls */}
						<div className="flex items-center justify-center py-2">
							<ControlsRoom />
						</div>
					</div>
				</main>

				{/* Sidebar for chat, participants and analytics */}
				<SidebarRoom />
			</div>
		</div>
	);
};