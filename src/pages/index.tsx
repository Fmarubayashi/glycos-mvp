import Image from "next/image";
import { Inter } from "next/font/google";
import api from "@/services/api";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function getData() {
      try {
        const data = await api.getData();
        if (data) setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  console.log(data);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Sistema Glycos</h1>
    </main>
  );
}
