import { BadgeUser } from '@components/ui/Badge/BadgeUser';
import { useLocalMedia } from '../hooks/useLocalMedia';

interface Props {
	videoEnabled: boolean
}
export const LocalCamera: React.FC<Props> = ({ videoEnabled }) => {
	const { stream, loading, error } = useLocalMedia({
		video: {
			facingMode: "user",
			width: { ideal: 1280 },
			height: { ideal: 720 },
		},
		audio: true,
	});
	if (!videoEnabled) return <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted">
		<BadgeUser size='xl' />
	</div>
	return (

		<div>{loading && <div>Cargando cámara...</div>}
			{error && <div style={{ color: "red" }}>{error}</div>}
			{stream && (
				<>
					<video
						autoPlay
						muted
						playsInline
						ref={(video) => {
							if (video && stream) video.srcObject = stream;
						}}
						style={{ width: 320, height: 240, background: "#000" }}
					/>
				</>
			)}</div>
	)
}
