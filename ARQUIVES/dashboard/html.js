function getLoginPage(errorMsg = "") {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - System Dark by KRAD</title>
  <style>
    :root {
      --bg: #070a12;
      --card: #0e1626;
      --accent: #f97316;
      --text: #f8fafc;
      --muted: #94a3b8;
      --border: #23324f;
      --error: #ef4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: radial-gradient(circle at top, #131d33 0%, #070a12 100%);
      color: var(--text);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
    }
    .login-box {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 1.25rem;
      padding: 2.75rem;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);
      text-align: center;
      position: relative;
    }
    .login-box::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, #f97316, #eab308, #a855f7);
    }
    .login-box h1 {
      color: var(--accent);
      font-size: 2rem;
      margin-bottom: 0.4rem;
      font-weight: 900;
      letter-spacing: 2px;
    }
    .login-box p {
      color: var(--muted);
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }
    .input-group {
      margin-bottom: 1.3rem;
      text-align: left;
    }
    .input-group label {
      display: block;
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--muted);
      margin-bottom: 0.4rem;
      text-transform: uppercase;
    }
    .input-group input {
      width: 100%;
      padding: 0.9rem 1.1rem;
      background: #060911;
      border: 1px solid var(--border);
      border-radius: 0.6rem;
      color: #fff;
      font-size: 1rem;
      outline: none;
    }
    .input-group input:focus {
      border-color: var(--accent);
    }
    .btn-login {
      width: 100%;
      background: linear-gradient(135deg, #f97316, #ea580c);
      color: #fff;
      border: none;
      padding: 1rem;
      font-size: 1.05rem;
      font-weight: 800;
      border-radius: 0.6rem;
      cursor: pointer;
      margin-top: 1rem;
      box-shadow: 0 4px 15px rgba(249, 115, 22, 0.35);
    }
    .error-msg {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid var(--error);
      color: #fca5a5;
      padding: 0.85rem;
      border-radius: 0.6rem;
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
    }
    .footer {
      margin-top: 2.5rem;
      font-size: 0.75rem;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="login-box">
    <h1>SYSTEM DARK</h1>
    <p>Painel de Controle • KRAD</p>
    ${errorMsg ? `<div class="error-msg">⚠️ ${errorMsg}</div>` : ""}
    <form method="POST" action="/login">
      <div class="input-group">
        <label for="username">Usuário</label>
        <input type="text" id="username" name="username" placeholder="darknet ou krad" required autocomplete="off">
      </div>
      <div class="input-group">
        <label for="password">Senha</label>
        <input type="password" id="password" name="password" placeholder="••••••••••••" required>
      </div>
      <button type="submit" class="btn-login">⚡ ENTRAR NO PAINEL</button>
    </form>
    <div class="footer">System Dark by KRAD (+244 949 926 074)</div>
  </div>
</body>
</html>`;
}

function getDashboardPage(statusData, apisList, rpgStats) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard - System Dark by KRAD</title>
  <style>
    :root {
      --bg: #070a12;
      --card: #0e1626;
      --panel: #141f36;
      --accent: #f97316;
      --blue: #38bdf8;
      --green: #10b981;
      --error: #ef4444;
      --text: #f8fafc;
      --muted: #94a3b8;
      --border: #23324f;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 2rem 1rem;
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      border-bottom: 2px solid var(--border);
      padding-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .brand h1 {
      color: var(--accent);
      font-size: 1.8rem;
      font-weight: 900;
    }
    .brand p {
      color: var(--muted);
      font-size: 0.9rem;
    }
    .status-badge {
      display: inline-block;
      padding: 0.5rem 1.2rem;
      border-radius: 9999px;
      font-weight: bold;
      font-size: 0.9rem;
    }
    .status-badge.online {
      background: rgba(16, 185, 129, 0.2);
      color: var(--green);
      border: 1px solid var(--green);
    }
    .status-badge.offline {
      background: rgba(239, 68, 68, 0.2);
      color: var(--error);
      border: 1px solid var(--error);
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 1.25rem;
      padding: 2.25rem;
      margin-bottom: 2rem;
      box-shadow: 0 15px 30px rgba(0,0,0,0.5);
    }
    .card h2 {
      font-size: 1.4rem;
      color: #fff;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.75rem;
    }
    .pair-box {
      background: #060911;
      border: 2px dashed var(--accent);
      border-radius: 1rem;
      padding: 2.5rem;
      text-align: center;
      margin: 1.5rem 0;
    }
    .pair-code-display {
      font-family: "Fira Code", Consolas, monospace;
      font-size: 3rem;
      font-weight: 900;
      color: var(--accent);
      letter-spacing: 6px;
      margin: 1.5rem 0;
      padding: 1rem 2rem;
      background: rgba(249, 115, 22, 0.12);
      border-radius: 0.75rem;
      display: inline-block;
      min-width: 300px;
    }
    .phone-input {
      width: 100%;
      max-width: 320px;
      padding: 0.9rem 1.1rem;
      background: #0f172a;
      border: 1px solid var(--border);
      border-radius: 0.6rem;
      color: #fff;
      font-size: 1.1rem;
      text-align: center;
      margin: 0.4rem;
    }
    .btn-action {
      background: linear-gradient(135deg, var(--accent), #ea580c);
      color: #fff;
      border: none;
      padding: 0.9rem 1.8rem;
      font-size: 1rem;
      font-weight: 800;
      border-radius: 0.6rem;
      cursor: pointer;
      transition: all 0.2s;
      margin: 0.4rem;
    }
    .btn-action:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
    }
    .btn-blue {
      background: linear-gradient(135deg, var(--blue), #0284c7);
    }
    .btn-red {
      background: linear-gradient(135deg, var(--error), #dc2626);
    }
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin: 1rem 0;
    }
    .stat-item {
      background: #060911;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      padding: 1.25rem;
      text-align: center;
    }
    .stat-item .num {
      font-size: 1.6rem;
      font-weight: 900;
      color: var(--blue);
    }
    .stat-item .label {
      font-size: 0.8rem;
      color: var(--muted);
      text-transform: uppercase;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    @media (max-width: 900px) {
      .grid-2, .stat-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">
    
    <header>
      <div class="brand">
        <h1>⚡ SYSTEM DARK • PAINEL DE CONTROLE ⚡</h1>
        <p>Baileys v2026 <code>[2, 3000, 1035194821]</code> | KRAD (+244 945 280 380) | Bot: +244 949 926 074</p>
      </div>
      <div>
        <span class="status-badge ${statusData.connected ? 'online' : 'offline'}">
          ${statusData.connected ? '● WHATSAPP CONECTADO ✅' : '○ AGUARDANDO PAREAMENTO ⏳'}
        </span>
      </div>
    </header>

    <!-- CARD 1: GERADOR DE CÓDIGO DE PAREAMENTO (PAIR CODE) -->
    <div class="card">
      <h2>📱 PAREAMENTO OFICIAL WHATSAPP (PAIR CODE)</h2>
      <p style="color:var(--muted); font-size:0.95rem;">
        Insira seu número com código do país e DDD (ex: <code>244949926074</code>) para gerar o código e conectar seu WhatsApp ao bot sem câmera:
      </p>
      
      <div class="pair-box">
        <div style="font-size:0.85rem; color:var(--muted); text-transform:uppercase; font-weight:800;">SEU CÓDIGO DE PAREAMENTO:</div>
        <div id="pair-code-display" class="pair-code-display">${statusData.pairCode || "---- ----"}</div>
        
        <div>
          <input type="text" id="phone-number" class="phone-input" placeholder="244949926074" value="${statusData.defaultNumber || ''}">
          <button onclick="requestPairCode()" class="btn-action" id="btn-pair">⚡ OBTER CÓDIGO</button>
          <button onclick="triggerAction('clear-session')" class="btn-action btn-red">🧹 LIMPAR SESSÃO</button>
        </div>
        
        <div id="pair-msg" style="margin-top:1.2rem; font-size:1rem; color:var(--blue); font-weight:bold;"></div>
      </div>

      <div style="font-size:0.9rem; color:var(--muted);">
        💡 <strong>Como funciona:</strong> Ao clicar em <strong>"OBTER CÓDIGO"</strong>, o servidor solicita o código ao WhatsApp Web. Em 2 a 3 segundos, <strong>a notificação pop-up chegará no seu celular</strong> e o código de 8 dígitos aparecerá na tela acima!
      </div>
    </div>

    <!-- CARD 2: STATUS DO SERVIDOR & RPG -->
    <div class="grid-2">
      <div class="card">
        <h2>🛠️ Status do Servidor & Nuvem (Render 24/7)</h2>
        <div class="stat-grid">
          <div class="stat-item">
            <div class="num">${statusData.uptimeFormatted || "0h 0m"}</div>
            <div class="label">Uptime Servidor</div>
          </div>
          <div class="stat-item">
            <div class="num">${statusData.ramUsage || "0 MB"}</div>
            <div class="label">Uso de RAM</div>
          </div>
          <div class="stat-item">
            <div class="num">${statusData.mongoStatus || "Online ☁️"}</div>
            <div class="label">MongoDB Cloud</div>
          </div>
        </div>
        <div style="margin-top:1.5rem; text-align:center;">
          <button onclick="triggerAction('restart')" class="btn-action btn-red" style="width:100%;">🔄 REINICIAR SERVIDOR WHATSAPP</button>
        </div>
        <div id="admin-log" style="margin-top:1rem; font-size:0.9rem; color:var(--green); font-family:monospace; font-weight:bold; text-align:center;"></div>
      </div>

      <div class="card">
        <h2>⛩️ RPG Multiverso Anime — Administração</h2>
        <div class="stat-grid">
          <div class="stat-item">
            <div class="num">${rpgStats.totalUsers || 0}</div>
            <div class="label">Caçadores Ativos</div>
          </div>
          <div class="stat-item">
            <div class="num">$ ${(rpgStats.totalBerries || 0).toLocaleString()}</div>
            <div class="label">Berries no Mercado</div>
          </div>
          <div class="stat-item">
            <div class="num">${rpgStats.totalGuilds || 0}</div>
            <div class="label">Clãs / Guildas</div>
          </div>
        </div>
        <div style="margin-top:1.5rem; text-align:center;">
          <button onclick="triggerAction('raid-kaido')" class="btn-action btn-blue" style="width:100%;">🔥 DISPARAR RAID MUNDIAL KAIDO (100k HP)</button>
        </div>
      </div>
    </div>

  </div>

  <script>
    async function requestPairCode() {
      const phoneInput = document.getElementById('phone-number').value.trim();
      const msgEl = document.getElementById('pair-msg');
      const displayEl = document.getElementById('pair-code-display');

      if (!phoneInput || phoneInput.length < 8) {
        msgEl.style.color = '#ef4444';
        msgEl.innerText = '⚠️ Digite um número de WhatsApp válido (ex: 244949926074)';
        return;
      }

      msgEl.style.color = '#38bdf8';
      msgEl.innerText = '⏳ Conectando à Baileys v2026 e gerando Pair Code com a Meta...';

      try {
        const res = await fetch('/api/paircode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: phoneInput })
        });
        const data = await res.json();

        if (data.success && data.pairCode) {
          displayEl.innerText = data.pairCode;
          msgEl.style.color = '#10b981';
          msgEl.innerText = '✅ CÓDIGO OFICIAL GERADO! Verifique agora a notificação no seu celular.';
        } else {
          msgEl.style.color = '#ef4444';
          msgEl.innerText = '❌ Erro: ' + (data.error || 'Clique em Limpar Sessão para tentar novamente');
        }
      } catch (err) {
        msgEl.style.color = '#ef4444';
        msgEl.innerText = '❌ Erro de comunicação com o servidor: ' + err.message;
      }
    }

    async function triggerAction(action) {
      const logEl = document.getElementById('admin-log');
      if (logEl) logEl.innerText = '⏳ Executando: ' + action + '...';

      try {
        const res = await fetch('/api/admin-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action })
        });
        const data = await res.json();
        if (logEl) logEl.innerText = '✅ ' + (data.message || 'Ação concluída com sucesso!');
        if (action === 'clear-session' || action === 'restart' || action === 'raid-kaido') {
          setTimeout(() => location.reload(), 2000);
        }
      } catch (err) {
        if (logEl) logEl.innerText = '❌ Erro: ' + err.message;
      }
    }
  </script>
</body>
</html>`;
}

module.exports = {
    getLoginPage,
    getDashboardPage
};
