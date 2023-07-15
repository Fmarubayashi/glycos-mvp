import Image from "next/image";
import { Inter } from "next/font/google";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { User } from "@/types/User";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Sistema Glycos</h1>
    </main>
  );
}
