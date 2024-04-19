export class ScreenshotTaker {
	async take(delay_number : number) {
		try {
			// Obtener el stream de la pantalla usando la API de mediaDevices
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: { deviceId: 'screen' },
			});

			// Crear un elemento de video para reproducir el stream
			const videoElement = document.createElement('video');
			videoElement.srcObject = stream;
			videoElement.play();

			// Esperar a que el elemento de video cargue
			await new Promise((resolve) => {
				videoElement.onloadedmetadata = resolve;
			});

			setTimeout(async () => {
                console.log(delay_number);

                // Crear un canvas del mismo tamaño que el video
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                // Dibujar el video en el canvas
                const context = canvas.getContext('2d')!;

                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                // Convertir el canvas a una URL de datos (data URL)
                const screenshotDataUrl = canvas.toDataURL('image/png');

                // Crear un enlace temporal para descargar la captura de pantalla
                const downloadLink = document.createElement('a');
                downloadLink.href = screenshotDataUrl;
                downloadLink.download = 'screenshot.png';

                // Simular un clic en el enlace para iniciar la descarga
                downloadLink.click();

                // Detener el stream para liberar recursos
                stream.getTracks().forEach((track) => track.stop());
            }, delay_number);
		} catch (error) {
			console.error('Error al tomar la captura de pantalla:', error);
		}
	}
}
