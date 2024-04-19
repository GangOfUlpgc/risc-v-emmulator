export class MediaCombiner {
	streamsList: MediaStream[];

	constructor(streamsList: MediaStream[]) {
		this.streamsList = streamsList;
	}

	combine() {
		const audioStream = this.combineAudio();
		const videoStream = this.combineVideo();
		return this.combineVideoAudio(audioStream, videoStream);
	}

	private combineAudio(): MediaStream {
		const audioContext = new AudioContext();
		const audioStream = audioContext.createMediaStreamDestination();

		for (const stream of this.streamsList) {
			if (stream.getAudioTracks().length === 0) continue;
			const streamNode = audioContext.createMediaStreamSource(stream);
			streamNode.connect(audioStream);
		}

		return audioStream.stream;
	}

	private combineVideo() {
		const videoMedia = new MediaStream();
		this.streamsList.forEach(stream =>
			stream
				.getVideoTracks()
				.forEach((track) => videoMedia.addTrack(track))
		);
		return videoMedia;
	}

	private combineVideoAudio(audioStream: MediaStream, videoStream: MediaStream): MediaStream {
		const combinedMedia = new MediaStream();
		[...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]
			.forEach(track => combinedMedia.addTrack(track));
		return combinedMedia;
	}
}
