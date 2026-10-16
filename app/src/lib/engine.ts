// Reexporta o motor do FitApp (engine/, na raiz do monorepo — fora da raiz deste
// projeto Expo). Funciona porque engine/data.js carrega as regras via require()
// (não fs.readFileSync, trocado out/2026 justamente pra isso), e porque este
// workspace npm (ver package.json raiz: "workspaces": ["app"]) deixa o Metro
// (SDK 58+) detectar e observar o monorepo automaticamente — sem metro.config.js
// customizado, sem watchFolders manual.
//
// generateProtocol(persona) é a mesma função usada em test/simulate-engine.js —
// o motor rodando dentro do app é literalmente o mesmo código, não uma cópia.
export { generateProtocol } from "../../../engine";
