import SoundPlayer from "@/components/SoundPlayer";
import { AlertSounds } from "@/types/AlertSounds";

const Alarms: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12">
      <h4 className="text-xl">
        Frases de alarmes e seus respectivos efeitos sonoros
      </h4>
      <SoundPlayer audioPath={AlertSounds.alert1} />
      <b> Aguardando Gota de Sangue:</b> O glicosímeto estará aguardando a
      coleta da gota de sangue do paciente.
      <SoundPlayer audioPath={AlertSounds.alert2} />
    </main>
  );
};
export default Alarms;
