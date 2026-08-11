# 🚀 Guia Definitivo: Como Rodar o System Dark no Render.com (Plano Grátis 24/7)

Este é o passo a passo prático para hospedar o **System Dark by KRAD (`+244 949 926 074`)** na nuvem gratuita do [Render.com](https://render.com) e mantê-lo online **24 horas por dia, 7 dias por semana** com suporte a **MongoDB** e **UptimeRobot**.

---

## 📌 Como funciona a Arquitetura no Render Grátis

* **Por que o Render adormece?** No plano gratuito (*Free Tier*), se um serviço passar 15 minutos sem receber tráfego HTTP, o servidor entra em repouso (*sleep*) para economizar recursos.
* **A Solução integrada no Bot (`server.js`):** O bot inicia um servidor Web Express na porta `3000` respondendo em `/` e `/ping`.
* **Como manter 24h sem dormir:** O **UptimeRobot** fará um ping automático a cada **5 minutos** na rota `/ping`, impedindo que o Render adormeça!
* **Persistência sem perda de dados:** Como os discos no Render Grátis são apagados quando o servidor é reiniciado, nosso módulo `mongodb.js` salva o estado do **RPG Multiverso Anime** no **MongoDB Atlas Cloud** a cada 15 minutos e na inicialização.

---

## 🛠️ Passo 1: Criar o Web Service no Render.com

1. Acesse [https://render.com](https://render.com) e faça login (pode entrar com sua conta do GitHub).
2. Clique no botão azul **+ New** no topo da tela e selecione **Web Service**.
3. Conecte sua conta do GitHub e selecione o repositório do bot: `onlynewsao-cmyk/NazumaMarce`.
4. Preencha as configurações de build do serviço:
   * **Name:** `system-dark-bot` *(ou o nome da sua preferência, ex: `dark-bot-fqsn`)*
   * **Region:** `Frankfurt (EU Central)` ou `Ohio (US East)`
   * **Branch:** `main`
   * **Runtime:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `node server.js`
   * **Instance Type:** `Free ($0/month - 512 MB RAM)`

---

## 🔑 Passo 2: Configurar as Variáveis de Ambiente (Environment)

No painel de criação do Render, desça até a seção **Environment Variables** (ou acesse a aba **Environment** do serviço) e adicione as variáveis fundamentais:

| Chave (`Key`) | Valor Recomendado (`Value`) |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `MONGODB_URI` | `mongodb+srv://darkbot:Ik9499mVyRvpgRWt@cluster0.yzpwymq.mongodb.net/?appName=Cluster0` |
| `GEMINI_API_KEY` | `AQ.Ab8RN6...[SUA_CHAVE_GEMINI]` |
| `GROQ_API_KEY` | `gsk_BjXo...[SUA_CHAVE_GROQ]` |
| `ELEVENLABS_API_KEY` | `sk_d0a9b2e8b5e9f9b164754300fb8dd26d98efb54659fe70d9` |
| `HUGGINGFACE_API_KEY` | `hf_jYdgj...[SUA_CHAVE_HUGGINGFACE]` |
| `APIFREELLM_KEY` | `apf_lxor1g8l885fk8v5a40q2brd` |
| `CLOUDINARY_API_KEY` | `121927124459388` |
| `ASSEMBLYAI_API_KEY` | `d23b7206fbfe4f139c58c289591b89e5` |
| `INVERTEXTO_API_KEY` | `6117|oJqDz5g3Uf91zuiAo8FiZzXpHlLGrVEV` |
| `TOKITO_API_KEY` | `tokito_d013ba5edb4e63096ac75633da5691cbf3ba` |
| `SYSTEMZONE_API_KEY` | `freekey` |

Clique no botão **Create Web Service** para iniciar a primeira implantação!

---

## 📱 Passo 3: Conectar o WhatsApp através dos Logs

1. No painel do seu serviço no Render, clique na aba **Logs** (do lado esquerdo).
2. Aguarde cerca de 30 a 60 segundos enquanto o Node.js instala as dependências e inicia o arquivo `server.js`.
3. O terminal dos logs exibirá:  
   `⚡ [SYSTEM DARK] Iniciando o processo do WhatsApp Bot...`  
   Em seguida, um **QR Code em ASCII** será desenhado na tela de logs.
4. Abra o WhatsApp no seu celular ➔ **Aparelhos Conectados** ➔ **Conectar um aparelho** e escaneie o código na tela do Render.
5. Os logs confirmarão com a mensagem:  
   `✅ System Dark CONECTADO COM SUCESSO AO WHATSAPP!`

---

## ⏱️ Passo 4: Configurar o UptimeRobot (24h Sem Dormir)

Para garantir que o seu bot nunca desligue por inatividade no plano grátis:

1. Acesse [https://uptimerobot.com](https://uptimerobot.com) e crie uma conta gratuita (ou faça login).
2. Clique no botão verde **+ Add New Monitor** no topo do painel.
3. Preencha os campos:
   * **Monitor Type:** `HTTP(s)`
   * **Friendly Name:** `System Dark Bot 24h`
   * **URL / IP:** A URL do seu serviço no Render seguida de `/ping`  
     *(Exemplo: `https://dark-bot-fqsn.onrender.com/ping`)*
   * **Monitoring Interval:** `5 minutes` (ou 5 minutos)
4. Clique em **Create Monitor**.

---

## 🎉 Tudo Pronto!

Seu **System Dark by KRAD (`244949926074`)** agora está online, 100% gratuito, com backups automáticos no MongoDB Atlas e operando 24 horas por dia para todos os grupos no WhatsApp!
