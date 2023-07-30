import SoundPlayer from "@/components/SoundPlayer";
import { AlertSounds } from "@/types/AlertSounds";
import { Card } from "antd";

const Alarms: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col px-12 items-center pt-12">
      <h4 className="text-xl">
        Frases de alarmes e seus respectivos efeitos sonoros
      </h4>
      <div className="flex flex-wrap justify-evenly mt-2">
        <Card title="Aguardando Gota de Sangue" className="w-80 mt-8">
          <p className="mb-2">
            O glicosímeto estará aguardando a coleta da gota de sangue do
            paciente.
          </p>
          <SoundPlayer audioPath={AlertSounds.alert1} />
        </Card>
        <Card title="Está em jejum?" className="w-80 mt-8 ">
          <p className="mb-2">
            O paciente deverá pressionar o botão no glicosímetro para responder
            'sim' caso esteja de jejum. Se a resposta for 'não' apenas aguarde a
            próxima mensagem.
          </p>
          <SoundPlayer audioPath={AlertSounds.alert1} />
        </Card>
        <Card
          title="Pratica exercícios físicos regularmente?"
          className="w-80 mt-8 "
        >
          <p className="mb-2">
            O paciente deverá pressionar o botão no glicosímetro para responder
            'sim' caso esteja praticamente exercícios físicos regularmente. Se a
            resposta for 'não' apenas aguarde a próxima mensagem.
          </p>
          <SoundPlayer audioPath={AlertSounds.alert1} />
        </Card>
        <Card
          title="Passou por algum estresse físico ou mental recentemente?"
          className="w-80 mt-8 "
        >
          <p className="mb-2">
            O paciente deverá pressionar o botão no glicosímetro para responder
            'sim' caso tenha passado por algum estresse físico ou mental
            recentemente. Se a resposta for 'não' apenas aguarde a próxima
            mensagem.
          </p>
          <SoundPlayer audioPath={AlertSounds.alert1} />
        </Card>
        <Card
          title="Está utilizando corretamente a medicação?"
          className="w-80 mt-8 "
        >
          <p className="mb-2">
            O paciente deverá pressionar o botão no glicosímetro para responder
            'sim' caso esteja utilizando a medicação corretamente. Se a resposta
            for 'não' apenas aguarde a próxima mensagem.
          </p>
          <SoundPlayer audioPath={AlertSounds.alert1} />
        </Card>
        <Card
          title="Atenção! Seu açúcar está muito baixo! Procure ajuda!"
          className="w-80 mt-8 "
        >
          <p className="mb-2">
            Está mensagem será exibida caso o nível glicêmico do paciente esteja
            a baixo do seu limite mínimo. O paciente deverá buscar ajuda médica.
          </p>
          <SoundPlayer audioPath={AlertSounds.alert1} />
        </Card>
        <Card
          title="Atenção! Seu açúcar está muito alto! Procure ajuda!"
          className="w-80 mt-8 "
        >
          <p className="mb-2">
            Está mensagem será exibida caso o nível glicêmico do paciente esteja
            a cima do seu limite máximo. O paciente deverá buscar ajuda médica.
          </p>
          <SoundPlayer audioPath={AlertSounds.alert1} />
        </Card>
        <Card title="Erro na leitura!" className="w-80 mt-8 ">
          <p className="mb-2">
            Está mensagem será exibida caso ocorra um erro na leitura da amostra
            de sangue. Será necessário trocar a fita e repetir o exame.
          </p>
          <SoundPlayer audioPath={AlertSounds.alert2} />
        </Card>
      </div>
    </main>
  );
};
export default Alarms;
