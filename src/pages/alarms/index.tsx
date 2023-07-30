import SoundPlayer from "@/components/SoundPlayer";
import { AlertSounds } from "@/types/AlertSounds";
import { Card } from "antd";

const Alarms: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col px-12 pt-4 items-center md:pt-8">
      <h4 className="text-xl">
        Frases de alarmes e seus respectivos efeitos sonoros
      </h4>
      <div className="flex flex-wrap justify-evenly mt-2">
        <Card title="Aguardando Gota de Sangue" className="w-80 mt-8">
          <div className="flex flex-col justify-between h-44">
            <p>
              O glicosímeto estará aguardando a coleta da gota de sangue do
              paciente.
            </p>
            <SoundPlayer audioPath={AlertSounds.alert1} />
          </div>
        </Card>
        <Card title="Está em jejum?" className="w-80 mt-8 ">
          <div className="flex flex-col justify-between h-44">
            <p>
              O paciente deverá pressionar o botão no glicosímetro para
              responder SIM caso esteja de jejum. Se a resposta for NÃO apenas
              aguarde a próxima mensagem.
            </p>
            <SoundPlayer audioPath={AlertSounds.alert1} />
          </div>
        </Card>
        <Card
          title="Pratica exercícios físicos regularmente?"
          className="w-80 mt-8 "
        >
          <div className="flex flex-col justify-between h-44">
            <p>
              O paciente deverá pressionar o botão no glicosímetro para
              responder SIM caso esteja praticamente exercícios físicos
              regularmente. Se a resposta for NÃO apenas aguarde a próxima
              mensagem.
            </p>
            <SoundPlayer audioPath={AlertSounds.alert1} />
          </div>
        </Card>
        <Card
          title="Passou por algum estresse físico ou mental recentemente?"
          className="w-80 mt-8 "
        >
          <div className="flex flex-col justify-between h-44">
            <p>
              O paciente deverá pressionar o botão no glicosímetro para
              responder SIM caso tenha passado por algum estresse físico ou
              mental recentemente. Se a resposta for NÃO apenas aguarde a
              próxima mensagem.
            </p>
            <SoundPlayer audioPath={AlertSounds.alert1} />
          </div>
        </Card>
        <Card
          title="Está utilizando corretamente a medicação?"
          className="w-80 mt-8 "
        >
          <div className="flex flex-col justify-between h-44">
            <p>
              O paciente deverá pressionar o botão no glicosímetro para
              responder SIM caso esteja utilizando a medicação corretamente. Se
              a resposta for NÃO apenas aguarde a próxima mensagem.
            </p>
            <SoundPlayer audioPath={AlertSounds.alert1} />
          </div>
        </Card>
        <Card
          title="Atenção! Seu açúcar está muito baixo! Procure ajuda!"
          className="w-80 mt-8 "
        >
          <div className="flex flex-col justify-between h-44">
            <p>
              Está mensagem será exibida caso o nível glicêmico do paciente
              esteja a baixo do seu limite mínimo. O paciente deverá buscar
              ajuda médica.
            </p>
            <SoundPlayer audioPath={AlertSounds.alert1} />
          </div>
        </Card>
        <Card
          title="Atenção! Seu açúcar está muito alto! Procure ajuda!"
          className="w-80 mt-8 "
        >
          <div className="flex flex-col justify-between h-44">
            <p>
              Está mensagem será exibida caso o nível glicêmico do paciente
              esteja a cima do seu limite máximo. O paciente deverá buscar ajuda
              médica.
            </p>
            <SoundPlayer audioPath={AlertSounds.alert1} />
          </div>
        </Card>
        <Card title="Erro na leitura!" className="w-80 mt-8 ">
          <div className="flex flex-col justify-between h-44">
            <p>
              Está mensagem será exibida caso ocorra um erro na leitura da
              amostra de sangue. Será necessário trocar a fita e repetir o
              exame.
            </p>
            <SoundPlayer audioPath={AlertSounds.alert2} />
          </div>
        </Card>
      </div>
    </main>
  );
};
export default Alarms;
