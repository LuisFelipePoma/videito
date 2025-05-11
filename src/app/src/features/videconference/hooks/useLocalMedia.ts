import { useEffect, useState, useCallback } from "react";

export function useLocalMedia(
	constraints: MediaStreamConstraints
) {
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const getMedia = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia(
				constraints
			);
			setStream(mediaStream);
		} catch (err: any) {
			setError(err.message || "No se pudo acceder a la cámara/micrófono");
		} finally {
			setLoading(false);
		}
	}, [constraints]);

	useEffect(() => {
		getMedia();
		return () => {
			stream?.getTracks().forEach((track) => track.stop());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { stream, loading, error, refetch: getMedia };
}
