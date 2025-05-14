import { useRoomStore } from '../store/useRoomStore';
import { useShallow } from 'zustand/react/shallow';
import { Mic, MicOff, Video, VideoOff, ScreenShare, MessageSquare, BarChart, Users } from 'lucide-react';

export const ControlsRoom = () => {


	const {
		activeTab,
		toggleSidebarOpen,
		audioEnabled,
		toggleAudio,
		videoEnabled,
		toggleVideo,
		screenShareEnabled,
		toggleScreenShare,

	}
		= useRoomStore(useShallow(s => ({
			toggleSidebarOpen: s.toggleSidebarOpen,
			activeTab: s.activeTab,
			audioEnabled: s.audioEnabled,
			toggleAudio: s.toggleAudio,
			videoEnabled: s.videoEnabled,
			toggleVideo: s.toggleVideo,
			screenShareEnabled: s.screenShareEnabled,
			toggleScreenShare: s.toggleScreenShare,
		})))
	return (
		<div className='flex gap-2.5'>
			<button
				className={`rounded-full p-2 border ${audioEnabled ? "bg-white" : "bg-error/10 text-error border-error/40"}`}
				onClick={toggleAudio}
			>
				{audioEnabled ? <Mic className="h-5 w-5 text-lighttextsec" /> : <MicOff className="h-5 w-5" />}
			</button>
			<button
				className={`rounded-full p-2 border ${videoEnabled ? "bg-white" : "bg-error/10 text-error border-error/40"}`}
				onClick={toggleVideo}
			>
				{videoEnabled ? <Video className="h-5 w-5 text-lighttextsec" /> : <VideoOff className="h-5 w-5" />}
			</button>
			<button
				className={`rounded-full p-2 border ${screenShareEnabled ? "bg-primary/10 text-primary border-primary/40" : "bg-white"
					}`}
				onClick={toggleScreenShare}
			>
				<ScreenShare className={`h-5 w-5 ${screenShareEnabled ? "" : "text-lighttextsec"}`} />
			</button>
			<button className="rounded-full p-2 border bg-white md:hidden" onClick={toggleSidebarOpen}>
				{activeTab === "chat" ? (
					<MessageSquare className="h-5 w-5 text-lighttextsec" />
				) : activeTab === "analytics" ? (
					<BarChart className="h-5 w-5 text-lighttextsec" />
				) : (
					<Users className="h-5 w-5 text-lighttextsec" />
				)}
			</button>
		</div>
	)
}
