import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/hortibom/", // substitua <nome-do-repositorio> pelo nome do seu repositório
  // outras configurações
  server: {
    host: "0.0.0.0", // Permite o acesso de outros dispositivos
    port: 5173, // Ou a porta que você deseja usar
  },
});
