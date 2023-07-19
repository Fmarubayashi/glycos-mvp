import api from "@/services/api";
import { Measure } from "@/types/Measure";
import { Observation } from "@/types/Observation";
import { User, UserRole, UserRoleLabel } from "@/types/User";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const Observations: React.FC = () => {
  const [observations, setObservations] = useState<Observation[]>([]);
  useEffect(() => {
    async function getObservations() {
      try {
        const data = await api.getObservationsById("2");
        if (data) setObservations(data);
      } catch (error) {
        console.error(error);
      }
    }
    getObservations();
  }, []);
  return (
    <main className="flex flex-col min-h-screen px-4 py-2 md:px-12 md:py-8 items-center">
      <h1 className="text-2xl my-4">Observações médicas</h1>

      {observations[0]?.observation ? (
        <Card className="w-full max-w-[900px] flex flex-col h-fit">
          <p className="sm:text-lg text-sm flex-grow h-full">
            {observations[0]?.observation}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            -
            {observations[0]?.doctor.firstName +
              " " +
              observations[0]?.doctor.lastName}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {observations[0]?.created_at &&
              format(
                new Date(observations[0]?.created_at?.replace(" ", "T")),
                "dd/MM/yy | HH:mm"
              )}
          </p>
        </Card>
      ) : (
        <span className="text-lg">Nenhuma observação médica no momento</span>
      )}
    </main>
  );
};

export default Observations;
