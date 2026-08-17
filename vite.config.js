import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuração mínima — só o necessário para compilar App.jsx (JSX +
// React). Nenhuma variável de ambiente de build é usada aqui: a URL
// da API continua vindo de window.__MRAR_API_URL__ em tempo de
// execução, como pedido — não de import.meta.env.
export default defineConfig({
  plugins: [react()],
});
