import { useEffect, useRef } from "react";



export  const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Function to start the webcam
    const startWebcam = async () => {
      try {
        // Request access to the user's camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        //   audio: true 
        });

        // Set the stream as the video source
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startWebcam();

    // Cleanup function to stop the webcam when component unmounts
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video 
        ref={videoRef}
        autoPlay
        className=" draggable  rounded-full aspect-video border-2 border-white h-screen  object-cover relative    "
      ></video>
    </div>
  );
};

export default Webcam;
