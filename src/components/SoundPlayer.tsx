import { useState, useEffect, useRef } from "react";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

type SoundPlayerProps = {
  audioPath: string;
  autoplay?: boolean;
};

const SoundPlayer: React.FC<SoundPlayerProps> = ({
  audioPath,
  autoplay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.autoplay = autoplay;
      audioElement.addEventListener("ended", pauseSound);
      return () => {
        audioElement.removeEventListener("ended", pauseSound);
      };
    }
  }, [autoplay]);

  return (
    <div>
      <div>
        {isPlaying ? (
          <Button
            onClick={pauseSound}
            icon={<PauseCircleOutlined />}
            type="primary"
            className="bg-blue-500 flex items-center"
          >
            Pause
          </Button>
        ) : (
          <Button
            onClick={playSound}
            icon={<PlayCircleOutlined />}
            type="primary"
            className="bg-blue-500 flex items-center"
          >
            Play
          </Button>
        )}
      </div>
      <audio ref={audioRef} src={audioPath} />
    </div>
  );
};

export default SoundPlayer;
