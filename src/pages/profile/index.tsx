import api from "@/services/api";
import { Measure } from "@/types/Measure";
import { User, UserRole, UserRoleLabel } from "@/types/User";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUser() {
      try {
        const data = await api.getUserById("2");
        if (data) setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center pt-12">
      <h2 className="text-2xl">Dados do usuário</h2>
      <div className="flex flex-col items-center pt-12 w-full justify-between">
        <span>Nome: {fullName()}</span>
        <span>Email: {user?.email}</span>
        <span>CPF: {cpfMask()}</span>
        <span>Tipo de usuário: {UserRoleLabel[user?.role as UserRole]}</span>
      </div>
    </main>
  );

  function fullName() {
    return user?.firstName + " " + user?.lastName;
  }
  function cpfMask() {
    return user?.CPF.replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }
};

export default Profile;
