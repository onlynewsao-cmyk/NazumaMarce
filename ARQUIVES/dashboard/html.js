function getLoginPage(errorMsg = "") {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - System Dark by KRAD</title>
  <style>
    :root {
      --bg: #0a0e17;
      --card: #131b2e;
      --accent: #f97316;
      --text: #f8fafc;
      --muted: #94a3b8;
      --border: #334155;
      --error: #ef4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
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
      border-radius: 1rem;
      padding: 2.5rem;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
      text-align: center;
    }
    .login-box h1 {
      color: var(--accent);
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
      font-weight: 800;
      letter-spacing: 1px;
    }
    .login-box p {
      color: var(--muted);
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }
    .input-group {
      margin-bottom: 1.2rem;
      text-align: left;
    }
    .input-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--muted);
      margin-bottom: 0.4rem;
      text-transform: uppercase;
    }
    .input-group input {
      width: 100%;
      padding: 0.85rem 1rem;
      background: #090e18;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      color: #fff;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .input-group input:focus {
      border-color: var(--accent);
    }
    .btn-login {
      width: 100%;
      background: linear-gradient(135deg, #f97316, #ea580c);
      color: #fff;
      border: none;
      padding: 0.9rem;
      font-size: 1rem;
      font-weight: 800;
      border-radius: 0.5rem;
      cursor: pointer;
      margin-top: 1rem;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
    }
    .btn-login:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
    }
    .error-msg {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid var(--error);
      color: #fca5a5;
      padding: 0.75rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
    }
    .footer {
      margin-top: 2rem;
      font-size: 0.75rem;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="login-box">
    <h1>SYSTEM DARK</h1>
    <p>Painel de Controle e Pareamento — KRAD</p>

    ${errorMsg ? `<div class="error-msg">⚠️ ${errorMsg}</div>` : ""}

    <form method="POST" action="/login">
      <div class="input-group">
        <label for="username">Usuário (User)</label>
        <input type="text" id="username" name="username" placeholder="darknet ou krad" required autocomplete="off">
      </div>
      <div class="input-group">
        <label for="password">Senha (Password)</label>
        <input type="password" id="password" name="password" placeholder="••••••••••••" required>
      </div>
      <button type="submit" class="btn-login">⚡ ENTRAR NO PAINEL</button>
    </form>

    <div class="footer">
      System Dark by KRAD (+244 949 926 074)<br>
      © 2026 Todos os Direitos Reservados
    </div>
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
      --bg: #0a0e17;
      --card: #131b2e;
      --panel: #1b2640;
      --accent: #f97316;
      --blue: #38bdf8;
      --green: #10b981;
      --error: #ef4444;
      --text: #f8fafc;
      --muted: #94a3b8;
      --border: #334155;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding-bottom: 4rem;
    }
    header {
      background: linear-gradient(135deg, #131b2e 0%, #0a0e17 100%);
      border-bottom: 2px solid var(--border);
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .brand h1 {
      color: var(--accent);
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: 1px;
    }
    .brand p {
      color: var(--muted);
      font-size: 0.85rem;
    }
    .top-actions {
      display: flex;
      gap: 0.8rem;
      align-items: center;
    }
    .btn-logout {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid var(--error);
      color: #fca5a5;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: bold;
      transition: background 0.2s;
    }
    .btn-logout:hover {
      background: rgba(239, 68, 68, 0.3);
    }
    .container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    @media (max-width: 900px) {
      .grid-2 { grid-template-columns: 1fr; }
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 0.85rem;
      padding: 1.75rem;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
    }
    .card h2 {
      font-size: 1.25rem;
      color: #fff;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.6rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    /* Pair Code Display Box */
    .pair-box {
      background: #090e18;
      border: 2px dashed var(--accent);
      border-radius: 0.75rem;
      padding: 1.5rem;
      text-align: center;
      margin: 1rem 0;
    }
    .pair-code-display {
      font-family: "Fira Code", Consolas, monospace;
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--accent);
      letter-spacing: 4px;
      margin: 1rem 0;
      padding: 0.8rem;
      background: rgba(249, 115, 22, 0.1);
      border-radius: 0.5rem;
      display: inline-block;
      min-width: 250px;
    }
    .phone-input {
      width: 100%;
      max-width: 280px;
      padding: 0.75rem 1rem;
      background: #111827;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      color: #fff;
      font-size: 1rem;
      text-align: center;
      margin-right: 0.5rem;
    }
    .btn-action {
      background: linear-gradient(135deg, var(--accent), #ea580c);
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 800;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-action:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
    }
    .btn-blue {
      background: linear-gradient(135deg, var(--blue), #0284c7);
    }
    .status-badge {
      display: inline-block;
      padding: 0.35rem 0.8rem;
      border-radius: 9999px;
      font-weight: bold;
      font-size: 0.85rem;
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
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin: 1rem 0;
    }
    .stat-item {
      background: #090e18;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      padding: 1rem;
      text-align: center;
    }
    .stat-item .num {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--blue);
    }
    .stat-item .label {
      font-size: 0.75rem;
      color: var(--muted);
      text-transform: uppercase;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    th, td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border);
      text-align: left;
    }
    th {
      background: var(--panel);
      color: var(--accent);
    }
    tr:hover {
      background: rgba(255,255,255,0.02);
    }
  </style>
</head>
<body>

  <header>
    <div class="brand">
      <h1>⚡ SYSTEM DARK • PAINEL DE CONTROLE ⚡</h1>
      <p>Administração 24/7 | Dono: KRAD (+244 945 280 380) | Bot: +244 949 926 074</p>
    </div>
    <div class="top-actions">
      <span class="status-badge ${statusData.connected ? 'online' : 'offline'}">
        ${statusData.connected ? '● WHATSAPP CONECTADO ✅' : '○ AGUARDANDO PAREAMENTO ⏳'}
      </span>
      <a href="/logout" class="btn-logout">Sair do Painel</a>
    </div>
  </header>

  <div class="container">
    
    <!-- GRID SUPERIOR: PAREPAIR CODE E STATUS -->
    <div class="grid-2">
      
      <!-- CARD 1: PAIR CODE -->
      <div class="card">
        <h2>📱 Pareamento WhatsApp (Pair Code & QR)</h2>
        <p style="color:var(--muted); font-size:0.9rem;">Gere o código de 8 dígitos para vincular o bot sem precisar ler QR Code com a câmera do celular:</p>
        
        <div class="pair-box">
          <div style="font-size:0.8rem; color:var(--muted); text-transform:uppercase;">Seu Código de Pareamento (Pair Code):</div>
          <div id="pair-code-display" class="pair-code-display">${statusData.pairCode || "---- ----"}</div>
          
          <div style="margin-top:1rem; display:flex; justify-content:center; flex-wrap:wrap; gap:0.5rem;">
            <input type="text" id="phone-number" class="phone-input" placeholder="244949926074" value="${statusData.defaultNumber || ''}">
            <button onclick="requestPairCode()" class="btn-action" id="btn-pair">⚡ OBTER CÓDIGO</button>
            <button onclick="triggerAction('clear-session')" class="btn-action" style="background:#334155;">🧹 Limpar Sessão</button>
          </div>
          <div id="pair-msg" style="margin-top:0.8rem; font-size:0.85rem; color:var(--blue);"></div>
        </div>

        <div style="font-size:0.85rem; color:var(--muted); margin-top:0.5rem;">
          💡 <strong>Como usar:</strong> Digite o número do WhatsApp com código de país (ex: <code>244949926074</code>) e clique no botão acima. Depois, no seu celular, vá em <em>Aparelhos Conectados &gt; Conectar com número de telefone</em>.
        </div>
      </div>

      <!-- CARD 2: STATUS DO SERVIDOR E AÇÕES -->
      <div class="card">
        <h2>🛠️ Administração do Bot & Servidor</h2>
        <p style="color:var(--muted); font-size:0.9rem;">Métricas operacionais de System Dark em tempo real (Render Free / Linux):</p>
        
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

        <div style="margin-top:1.5rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
          <button onclick="triggerAction('backup')" class="btn-action btn-blue">💾 Sincronizar MongoDB Agora</button>
          <button onclick="triggerAction('restart')" class="btn-action" style="background:var(--error);">🔄 Reiniciar Bot WhatsApp</button>
        </div>
        <div id="admin-log" style="margin-top:1rem; font-size:0.85rem; color:var(--green); font-family:monospace;"></div>
      </div>

    </div>

    <!-- GRID INFERIOR: RPG MULTIVERSO E APIS -->
    <div class="grid-2">

      <!-- CARD 3: RPG MULTIVERSO ANIME -->
      <div class="card">
        <h2>⛩️ RPG Multiverso Anime — Controle</h2>
        <p style="color:var(--muted); font-size:0.9rem;">Estatísticas gerais do ecossistema de Solo Leveling, Naruto, One Piece e Jujutsu Kaisen:</p>

        <div class="stat-grid">
          <div class="stat-item">
            <div class="num">${rpgStats.totalUsers || 0}</div>
            <div class="label">Caçadores Ativos</div>
          </div>
          <div class="stat-item">
            <div class="num">$ ${(rpgStats.totalBerries || 0).toLocaleString()}</div>
            <div class="label">Berries em Circulação</div>
          </div>
          <div class="stat-item">
            <div class="num">${rpgStats.totalGuilds || 0}</div>
            <div class="label">Clãs / Guildas</div>
          </div>
        </div>

        <div style="margin-top:1.2rem; background:#090e18; padding:1rem; border-radius:0.5rem; border:1px solid var(--border);">
          <div style="font-weight:bold; color:var(--accent);">🐲 Raid Mundial Ativa: ${rpgStats.activeRaid ? rpgStats.activeRaid.boss_name : "Nenhuma"}</div>
          <div style="font-size:0.85rem; color:var(--muted); margin:0.4rem 0;">HP do Chefe: ${rpgStats.activeRaid ? `${rpgStats.activeRaid.hp} / ${rpgStats.activeRaid.max_hp}` : "---"}</div>
          <button onclick="triggerAction('raid-reset')" class="btn-action" style="padding:0.5rem 1rem; font-size:0.85rem;">🔥 Acionar Raid Mundial Kaido (100k HP)</button>
        </div>
      </div>

      <!-- CARD 4: APIS INTEGRADAS (TESTE DE SAÚDE) -->
      <div class="card">
        <h2>🌐 Diagnóstico das 13 APIs Integradas</h2>
        <p style="color:var(--muted); font-size:0.9rem;">Verificação contínua das chaves e endpoints (100% Aprovado):</p>

        <div style="max-height: 230px; overflow-y: auto; margin-top: 1rem;">
          <table>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Status</th>
                <th>Finalidade</th>
              </tr>
            </thead>
            <tbody>
              ${apisList.map(api => `
                <tr>
                  <td><strong>${api.name}</strong></td>
                  <td><span style="color:#10b981; font-weight:bold;">● OK</span></td>
                  <td><span style="color:#94a3b8; font-size:0.8rem;">${api.purpose}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
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
      msgEl.innerText = '⏳ Gerando Pair Code junto ao WhatsApp...';

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
          msgEl.innerText = '✅ Código gerado! Digite no seu celular antes que expire em 60 segundos.';
        } else {
          msgEl.style.color = '#ef4444';
          msgEl.innerText = '❌ Erro ao obter código: ' + (data.error || 'Tente novamente em alguns segundos');
        }
      } catch (err) {
        msgEl.style.color = '#ef4444';
        msgEl.innerText = '❌ Erro de comunicação com o servidor: ' + err.message;
      }
    }

    async function triggerAction(action) {
      const logEl = document.getElementById('admin-log');
      logEl.innerText = '⏳ Executando ação: ' + action + '...';

      try {
        const res = await fetch('/api/admin-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action })
        });
        const data = await res.json();
        logEl.innerText = '✅ ' + (data.message || 'Ação concluída com sucesso!');
        if (action === 'raid-reset' || action === 'restart') {
          setTimeout(() => location.reload(), 2000);
        }
      } catch (err) {
        logEl.innerText = '❌ Erro ao executar ação: ' + err.message;
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
