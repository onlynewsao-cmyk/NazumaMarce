# 🔥 LISTA DE APIS E CHAVES INTEGRADAS — SYSTEM DARK BY KRAD 🔥

> **Bot Name:** System Dark  
> **Criador / Créditos:** KRAD  
> **Número do Bot:** `+244 949 926 074` (`244949926074`)  
> **Dono Principal:** `+244 945 280 380` (`244945280380`)  
> **Servidor Web / Uptime:** Ativo 24/7 na porta `PORT=3000` (`APP_URL=https://dark-bot-fqsn.onrender.com`)  
> **Persistência Cloud:** MongoDB Atlas Cloud + SQLite Local  

---

## 🌐 1. Tabela de APIs Principais do Sistema (Variáveis de Ambiente / Envs)

| # | Serviço / API | Variável de Ambiente (`process.env`) | Chave Configurada (Mascarada para Segurança Git) | Função e Aplicação no Bot |
|---|:---|:---|:---|:---|
| **01** | **API Free LLM** | `APIFREELLM_KEY` | `apf_lxor1g8l885...a40q2brd` | Inteligência Artificial, LLM & Respostas Automáticas |
| **02** | **Google Gemini AI** | `GEMINI_API_KEY` | `AQ.Ab8RN6LMMey1...0J9yx_uDQ` | IA Multimodal (Análise de imagem, código e chat) |
| **03** | **Groq AI Cloud** | `GROQ_API_KEY` | `gsk_BjXo2aQJ6Bz...L2Asi` | Respostas de IA com ultrabaixa latência |
| **04** | **ElevenLabs Speech** | `ELEVENLABS_API_KEY` | `sk_d0a9b2e8b5e9...659fe70d9` | Geração de Vozes Neurais e TTS no WhatsApp |
| **05** | **MongoDB Atlas Cloud** | `MONGODB_URI` | `mongodb+srv://darkbot:****@cluster0...` | Persistência de Dados 24/7 no Render Free Tier |
| **06** | **Cloudinary Media** | `CLOUDINARY_API_KEY` | `Key: 121927... / Secret: Drxz...` | Hospedagem de mídias, figurinhas, áudios e vídeos |
| **07** | **AssemblyAI Audio** | `ASSEMBLYAI_API_KEY` | `d23b7206fbfe...91b89e5` | Transcrição de áudios de voz enviados no WhatsApp |
| **08** | **Cerebras AI API** | `CEREBRAS_API_KEY` | `csk-jwpct336...phr` | Aceleração lógica e processamento LLM |
| **09** | **HuggingFace Hub** | `HUGGINGFACE_API_KEY` | `hf_jYdgjVghV...Ruabz` | Modelos open-source de IA de imagem e texto |
| **10** | **Tavily Search API** | `TAVILY_API_KEY` | `tvly-dev-yAXF...6UQ3xsmk` | Pesquisa na Web em tempo real para o bot |
| **11** | **SystemZone API** | `SYSTEMZONE_API_KEY` | `freekey` (`https://systemzone.store`) | APIs de consulta, downloads e utilitários gerais |
| **12** | **Invertexto API** | `INVERTEXTO_API_KEY` | `6117\|oJqDz5g3Uf9...rVEV` | Validações gramaticais, CEP, geradores de texto |
| **13** | **Facebook Graph API**| `FB_PAGE_ACCESS_TOKEN` | `EAAVzZB5ZAu...94hcBTM` | Integração com páginas FB (`v20.0`) |

---

## 🚀 2. Configuração para Render Free + UptimeRobot + MongoDB

O arquivo `server.js` do projeto foi programado com as seguintes proteções para rodar grátis **sem nunca dormir ou perder dados**:
1. **Express Server:** O servidor escuta na porta `process.env.PORT || 3000` e responde com status `200 OK` em `/` e `/ping`.
2. **UptimeRobot:** Cadastre o link `https://dark-bot-fqsn.onrender.com/ping` no [UptimeRobot](https://uptimerobot.com) configurando um ping a cada **5 minutos** (HTTP/s Monitor). Isso impede a inatividade de 15 minutos do Render Free.
3. **MongoDB Sync (`ARQUIVES/rpg/mongodb.js`):**
   * Ao ligar, o bot baixa automaticamente o último save da coleção `rpg_snapshot` no MongoDB Atlas.
   * A cada 15 minutos e após cada alteração importante, o estado do **RPG Multiverso Anime** é sincronizado de volta para a nuvem.

---

## ⛩️ 3. Módulos do RPG Multiverso Anime Integrados

* **`/despertar`**: Teste de Linhagem (Solo Leveling, Naruto, One Piece e Jujutsu Kaisen).
* **`/perfil`**: Exibe status, atributos, barras visuais e Sombras extraídas.
* **`/portal entering` / `/portal entrar`**: Dungeons PvE em tempo real contra chefes lendários (*Ryomen Sukuna*, *Kaido*, *Pain*) com **Expansão de Domínio (+40% dano)**, **Fulgor Negro (2.5x dano crítico)** e **Extração de Sombra ("Arise")**.
* **`/gacha` & `/cartas`**: Roleta de Cards (300 Berries) com raridades Mítico (3%), Lendário (12%), Épico (35%) e Raro (50%).
* **`/forja`**: Bigorna para refinar armas icônicas de `+0` até `+10`.
* **`/x1 @usuario [aposta]`**: Duelo PvP 1x1 apostando Berries e aumentando a **Recompensa ($ One Piece Bounty)**.
* **`/guilda`**: Criação de Clã ($ 5.000) com banco compartilhado e doações (`/guilda doar`).
* **`/raid atacar`**: Chefe Colossal (*Kaido Dragão de 100.000 HP*) em grupo.
* **`/loja` & `/mercado`**: Poções Sênzu, Chakra, Proteção de Forja e Leilão P2P de cartas.
