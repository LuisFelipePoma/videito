import { TabToggle } from '@components/ui/TabToggle';
import { useMobile } from '@core/hooks/useMobile';
import { useRoomStore } from '@features/videconference/store/useRoomStore';
import { BarChart, Users, MessageSquare, X, Play, StopCircle, Mic, Video, Send } from 'lucide-react';
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow';

export const SidebarRoom = () => {

	const toggleAnalysis = () => setAnalysisActive(!analysisActive);
	const [analysisActive, setAnalysisActive] = useState(false);
	const [messageText, setMessageText] = useState("");
	const handleSendMessage = () => {
		if (messageText.trim()) {
			setMessageText("");
		}
	};
	const isMobile = useMobile()
	const { sidebarOpen, toggleSidebarOpen, activeTab, setActiveTab } = useRoomStore(useShallow((s) => ({
		sidebarOpen: s.sidebarOpen,
		toggleSidebarOpen: s.toggleSidebarOpen,
		activeTab: s.activeTab,
		setActiveTab: s.setActiveTab,
	})));

	const participants = [
		{ name: "Juan Sánchez", isHost: true, audioEnabled: true, videoEnabled: true },
		{ name: "María García", attention: 85, audioEnabled: true, videoEnabled: true },
		{ name: "Pedro Ruiz", attention: 92, audioEnabled: true, videoEnabled: true },
		{ name: "Ana Martínez", attention: 42, audioEnabled: false, videoEnabled: true },
	];
	const chatMessages = [
		{
			name: "Juan Sánchez",
			message: "Bienvenidos a la clase",
			time: "10:00",
			isHost: true,
		},
		{ name: "María García", message: "Buenos días profesor", time: "10:01" },
	];

	return (
		(sidebarOpen || !isMobile) &&
		<aside
			className={`w-full md:w-80 border-l border-lightborder bg-white shadow-sm ${isMobile ? "fixed bottom-0 z-50 h-[50%] overflow-y-auto" : "relative"}`}
		>
			<div className="flex h-full flex-col">
				<div className="flex items-center justify-between border-b border-lightborder p-4">
					<div className="w-full">
						<div className="w-full">
							<div className="flex items-center justify-between">
								<div className="w-full text-sm">
									<TabToggle
										tabs={
											[
												{
													value: "analytics", label: <div className='flex gap-1'><BarChart className="h-4 w-4" />
														Análisis</div>
												},
												{
													value: "participants", label: <div className='flex gap-1'><Users className="mr-2 h-4 w-4" />
														Participantes</div>
												},
												{
													value: "chat", label: <div className='flex gap-1'><MessageSquare className="mr-2 h-4 w-4" />
														Chat </div>
												},
											]
										}
										//@ts-ignore
										setValue={setActiveTab}
										value={activeTab}
									/>
								</div>
								{isMobile && (
									<button className="ml-2 p-1" onClick={toggleSidebarOpen}>
										<X className="h-5 w-5 text-lighttextsec" />
									</button>
								)}
							</div>

							<div className="mt-4 flex-1 overflow-y-auto h-[calc(100vh-160px)]">
								{/* Analytics Tab */}
								{activeTab === "analytics" && (
									<div className="h-full flex flex-col">
										{!analysisActive ? (
											<div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
												<BarChart className="h-12 w-12 text-primary opacity-50 mb-4" />
												<h3 className="text-lg font-medium text-lighttext mb-2">Análisis de atención</h3>
												<p className="text-sm text-lighttextsec mb-6">
													Inicia el análisis de atención para recibir información en tiempo real sobre la
													participación de los estudiantes.
												</p>
												<button
													onClick={toggleAnalysis}
													className="flex items-center bg-primary text-white px-4 py-2 rounded-md"
												>
													<Play className="h-4 w-4 mr-2" />
													Iniciar análisis
												</button>
											</div>
										) : (
											<div className="flex-1 space-y-6 p-2 overflow-y-auto">
												{/* Análisis content - mantenemos el mismo contenido del ejemplo */}
												<div className="space-y-2">
													<div className="flex items-center justify-between">
														<h3 className="font-medium text-lighttext">Atención general</h3>
														<span className="text-lg font-medium text-lighttext">76%</span>
													</div>
													<div className="h-2 w-full bg-warmgray/20 rounded-full overflow-hidden">
														<div className="h-full bg-primary rounded-full" style={{ width: "76%" }}></div>
													</div>
													<div className="flex justify-between items-center">
														<p className="text-xs text-lighttextsec">Por encima del promedio de la clase (65%)</p>
														<button
															onClick={toggleAnalysis}
															className="h-8 text-xs bg-error text-white px-2 py-1 rounded"
														>
															<StopCircle className="h-3.5 w-3.5 mr-1 inline" />
															Detener
														</button>
													</div>
												</div>

												{/* Resto del contenido del análisis */}
												{/* ...mantener el mismo contenido de ejemplo */}
											</div>
										)}
									</div>
								)}

								{/* Participants Tab */}
								{activeTab === "participants" && (
									<div className="h-full flex flex-col">
										<div className="flex-1 space-y-4 overflow-y-auto">
											<div>
												<h3 className="mb-2 font-medium text-lighttextsec">Profesor (1)</h3>
												<div className="bg-white border border-warmgray/20 rounded-lg p-3">
													<div className="flex items-center justify-between">
														<div className="flex items-center space-x-3">
															<div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
																<span className="text-xs font-medium text-primary-foreground">JS</span>
															</div>
															<div>
																<p className="text-sm font-medium text-lighttext">Juan Sánchez</p>
																<p className="text-xs text-lighttextsec">Profesor</p>
															</div>
														</div>
														<div className="flex space-x-1">
															<div className="rounded-full bg-muted p-1">
																<Mic className="h-3 w-3 text-success" />
															</div>
															<div className="rounded-full bg-muted p-1">
																<Video className="h-3 w-3 text-success" />
															</div>
														</div>
													</div>
												</div>
											</div>

											<div>
												<h3 className="mb-2 font-medium text-lighttextsec">Estudiantes ({participants.length})</h3>
												{participants.map((participant, i) => (
													<div key={i} className="bg-white border border-warmgray/20 rounded-lg p-3 mb-2">
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-3">
																<div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
																	<span className="text-xs font-medium text-lighttext">
																		{participant.name.charAt(0)}
																	</span>
																</div>
																<div>
																	<p className="text-sm font-medium text-lighttext">{participant.name}</p>
																	{analysisActive && participant.attention !== undefined && (
																		<div className="flex items-center">
																			<div
																				className={`w-2 h-2 rounded-full mr-1.5 ${participant.attention > 75
																					? "bg-success"
																					: participant.attention > 60
																						? "bg-warning"
																						: "bg-error"
																					}`}
																			></div>
																			<p className="text-xs text-lighttextsec">
																				Atención: {participant.attention}%
																			</p>
																		</div>
																	)}
																</div>
															</div>
															<div className="flex space-x-1">
																<div className="rounded-full bg-muted p-1">
																	<Mic
																		className={`h-3 w-3 ${participant.audioEnabled === false ? "text-error" : "text-success"
																			}`}
																	/>
																</div>
																<div className="rounded-full bg-muted p-1">
																	<Video
																		className={`h-3 w-3 ${participant.videoEnabled === false ? "text-error" : "text-success"
																			}`}
																	/>
																</div>
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
										<div className="border-t border-lightborder p-4 mt-4">
											<input
												placeholder="Buscar estudiantes..."
												className="w-full px-3 py-2 rounded bg-warmgray/20"
											/>
										</div>
									</div>
								)}

								{/* Chat Tab */}
								{activeTab === "chat" && (
									<div className="h-full flex flex-col">
										<div className="flex-1 space-y-4 overflow-y-auto p-2">
											{chatMessages.map((chat, i) => (
												<div key={i} className="flex items-start space-x-3">
													<div
														className={`h-8 w-8 rounded-full ${chat.isHost ? "bg-primary" : "bg-muted"
															} flex items-center justify-center flex-shrink-0`}
													>
														<span
															className={`text-xs font-medium ${chat.isHost ? "text-primary-foreground" : "text-lighttext"
																}`}
														>
															{chat.name.charAt(0)}
														</span>
													</div>
													<div className="flex-1">
														<div className="flex items-center space-x-2">
															<p className="text-sm font-medium text-lighttext">{chat.name}</p>
															{chat.isHost && (
																<span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
																	Profesor
																</span>
															)}
															<span className="text-xs text-lighttextsec/70">{chat.time}</span>
														</div>
														<p className="text-sm text-lighttextsec">{chat.message}</p>
													</div>
												</div>
											))}
										</div>
										<div className="border-t border-lightborder p-4 mt-4">
											<div className="flex space-x-2">
												<textarea
													value={messageText}
													onChange={(e) => setMessageText(e.target.value)}
													placeholder="Escribe un mensaje..."
													className="min-h-[40px] resize-none bg-warmgray/20 rounded p-2 flex-1"
												/>
												<button
													onClick={handleSendMessage}
													className="bg-primary text-white p-2 rounded-full"
												>
													<Send className="h-4 w-4" />
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	)
}
