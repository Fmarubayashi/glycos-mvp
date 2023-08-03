import api from "@/services/api";
import { Measure } from "@/types/Measure";
import { User, UserRole, UserRoleLabel } from "@/types/User";
import { useEffect, useState } from "react";
import Image from "next/image";
import defaultIcon from "../../../public/default-user-icon.jpg";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    async function getUser() {
      try {
        const data = await api.getUserById("2");
        if (data) setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center px-4 md:px-12 md:pt-8 pt-4">
      <h2 className="text-2xl">Dados do usuário</h2>
      <div className="flex flex-col items-center pt-12 w-full justify-between">
        <div className="flex items-center justify-center rounded-full bg-gray-200 w-1/4 h-1/4">
          <Image
            src={defaultIcon}
            alt={"User Image"}
            className="rounded-full"
          />
        </div>
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
    return user?.CPF.replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }
};

export default Profile;
