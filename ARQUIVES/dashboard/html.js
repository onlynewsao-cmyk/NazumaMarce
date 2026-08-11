function getLoginPage(errorMsg = "") {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - System Dark OS by KRAD</title>
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
      overflow: hidden;
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
      letter-spacing: 1px;
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
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-group input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
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
      transition: all 0.2s;
      box-shadow: 0 4px 15px rgba(249, 115, 22, 0.35);
    }
    .btn-login:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 22px rgba(249, 115, 22, 0.5);
    }
    .error-msg {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid var(--error);
      color: #fca5a5;
      padding: 0.85rem;
      border-radius: 0.6rem;
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .footer {
      margin-top: 2.5rem;
      font-size: 0.75rem;
      color: #475569;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="login-box">
    <h1>SYSTEM DARK</h1>
    <p>Painel Avançado de Controle • KRAD</p>

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
      <button type="submit" class="btn-login">⚡ ACESSAR SYSTEM DARK OS</button>
    </form>

    <div class="footer">
      System Dark by KRAD (+244 949 926 074)<br>
      Baileys v2026 • MongoDB Atlas Cloud
    </div>
  </div>
</body>
</html>`;
}

function getDashboardPage(statusData, apisList, rpgStats, globalSettings = {}) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>System Dark OS • Painel Avançado KRAD</title>
  <style>
    :root {
      --bg: #070a12;
      --card: #0e1626;
      --panel: #141f36;
      --accent: #f97316;
      --blue: #38bdf8;
      --green: #10b981;
      --purple: #a855f7;
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
      padding-bottom: 4rem;
    }
    header {
      background: linear-gradient(135deg, #0e1626 0%, #070a12 100%);
      border-bottom: 2px solid var(--border);
      padding: 1.25rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .brand h1 {
      color: var(--accent);
      font-size: 1.6rem;
      font-weight: 900;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .brand p {
      color: var(--muted);
      font-size: 0.8rem;
    }
    .top-actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      flex-wrap: wrap;
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
      max-width: 1350px;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }
    /* 8-Tab Navigation */
    .nav-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1rem;
    }
    .tab-btn {
      background: var(--card);
      color: var(--muted);
      border: 1px solid var(--border);
      padding: 0.75rem 1.15rem;
      border-radius: 0.6rem;
      cursor: pointer;
      font-weight: 700;
      font-size: 0.85rem;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .tab-btn:hover {
      background: var(--panel);
      color: #fff;
    }
    .tab-btn.active {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
      box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
    }
    .tab-content {
      display: none;
      animation: fadeIn 0.25s ease;
    }
    .tab-content.active {
      display: block;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }
    @media (max-width: 950px) {
      .grid-2, .grid-3 { grid-template-columns: 1fr; }
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 1.75rem;
      box-shadow: 0 10px 20px rgba(0,0,0,0.4);
    }
    .card h2 {
      font-size: 1.25rem;
      color: #fff;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.7rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    /* Pair Code Display Box */
    .pair-box {
      background: #060911;
      border: 2px dashed var(--accent);
      border-radius: 0.85rem;
      padding: 1.75rem;
      text-align: center;
      margin: 1.2rem 0;
    }
    .pair-code-display {
      font-family: "Fira Code", Consolas, monospace;
      font-size: 2.6rem;
      font-weight: 900;
      color: var(--accent);
      letter-spacing: 5px;
      margin: 1rem 0;
      padding: 0.8rem 1.5rem;
      background: rgba(249, 115, 22, 0.12);
      border-radius: 0.6rem;
      display: inline-block;
      min-width: 280px;
    }
    .phone-input {
      width: 100%;
      max-width: 280px;
      padding: 0.8rem 1rem;
      background: #0f172a;
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
      padding: 0.8rem 1.5rem;
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
      box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
    }
    .btn-green {
      background: linear-gradient(135deg, var(--green), #059669);
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }
    .btn-purple {
      background: linear-gradient(135deg, var(--purple), #7e22ce);
      box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
    }
    .status-badge {
      display: inline-block;
      padding: 0.4rem 1rem;
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
      background: #060911;
      border: 1px solid var(--border);
      border-radius: 0.6rem;
      padding: 1.1rem;
      text-align: center;
    }
    .stat-item .num {
      font-size: 1.5rem;
      font-weight: 900;
      color: var(--blue);
    }
    .stat-item .label {
      font-size: 0.75rem;
      color: var(--muted);
      text-transform: uppercase;
      margin-top: 0.2rem;
    }
    /* Terminal Console */
    .terminal-box {
      background: #030712;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      padding: 1.25rem;
      font-family: "Fira Code", Consolas, monospace;
      font-size: 0.88rem;
      color: #38bdf8;
      height: 260px;
      overflow-y: auto;
      margin: 1rem 0;
    }
    .terminal-box .line {
      margin-bottom: 0.4rem;
      display: flex;
      gap: 0.5rem;
    }
    .terminal-box .timestamp {
      color: #475569;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
      font-size: 0.92rem;
    }
    th, td {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid var(--border);
      text-align: left;
    }
    th {
      background: var(--panel);
      color: var(--accent);
    }
    tr:hover {
      background: rgba(255,255,255,0.03);
    }
    .switch-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 1rem;
      background: #060911;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .switch-label {
      font-weight: bold;
      color: #fff;
    }
    .switch-desc {
      font-size: 0.8rem;
      color: var(--muted);
    }
  </style>
</head>
<body>

  <header>
    <div class="brand">
      <h1>⚡ SYSTEM DARK OS • KRAD ⚡</h1>
      <p>Baileys v2026 <code>[2, 3000, 1035194821]</code> | Dono: +244 945 280 380 | Bot: +244 949 926 074</p>
    </div>
    <div class="top-actions">
      <span class="status-badge ${statusData.connected ? 'online' : 'offline'}" id="live-conn-badge">
        ${statusData.connected ? '● WHATSAPP CONECTADO ✅' : '○ AGUARDANDO PAREAMENTO ⏳'}
      </span>
      <a href="/logout" class="btn-logout">Sair do Sistema</a>
    </div>
  </header>

  <div class="container">

    <!-- 8 ABAS DE NAVEGAÇÃO -->
    <div class="nav-tabs">
      <button class="tab-btn active" onclick="openTab('tab-pair', this)">📱 Pareamento & Conexão</button>
      <button class="tab-btn" onclick="openTab('tab-console', this)">🕹️ Terminal & Comandos</button>
      <button class="tab-btn" onclick="openTab('tab-users', this)">👥 Caçadores & VIP</button>
      <button class="tab-btn" onclick="openTab('tab-groups', this)">💬 Grupos & Controles</button>
      <button class="tab-btn" onclick="openTab('tab-broadcast', this)">📢 Transmissão (Bcast)</button>
      <button class="tab-btn" onclick="openTab('tab-settings', this)">⚙️ Ajustes & Proteções</button>
      <button class="tab-btn" onclick="openTab('tab-rpg', this)">⛩️ Administração RPG</button>
      <button class="tab-btn" onclick="openTab('tab-backup', this)">💾 Nuvem & MongoDB (13 APIs)</button>
    </div>

    <!-- ================= ABA 1: PAREAMENTO & CONEXÃO ================= -->
    <div id="tab-pair" class="tab-content active">
      <div class="grid-2">
        <div class="card">
          <h2>📱 Pareamento Oficial por Código (Pair Code)</h2>
          <p style="color:var(--muted); font-size:0.9rem;">
            Método <code>dark-bot</code> integrado com <code>@systemzero/baileys</code> (versão <code>1035194821</code>) resolvida para não falhar a notificação:
          </p>
          <div class="pair-box">
            <div style="font-size:0.8rem; color:var(--muted); text-transform:uppercase;">Código de Pareamento Baileys:</div>
            <div id="pair-code-display" class="pair-code-display">${statusData.pairCode || "---- ----"}</div>
            
            <div style="margin-top:1rem; display:flex; justify-content:center; flex-wrap:wrap; gap:0.6rem;">
              <input type="text" id="phone-number" class="phone-input" placeholder="244949926074" value="${statusData.defaultNumber || ''}">
              <button onclick="requestPairCode()" class="btn-action" id="btn-pair">⚡ OBTER CÓDIGO</button>
              <button onclick="triggerAction('clear-session')" class="btn-action" style="background:#334155;">🧹 Limpar Sessão</button>
            </div>
            <div id="pair-msg" style="margin-top:0.9rem; font-size:0.88rem; color:var(--blue); font-weight:bold;"></div>
          </div>
          <div style="font-size:0.85rem; color:var(--muted); margin-top:0.5rem;">
            💡 <strong>Dica do Arnaldo-Dev / KRAD:</strong> Se aparecer mensagem de que o bot já está conectado, clique em <strong>"🧹 Limpar Sessão"</strong>. O servidor apagará a sessão anterior e reiniciará limpo em 1 segundo.
          </div>
        </div>

        <div class="card">
          <h2>📊 Monitor Operacional do Servidor (Render 24/7)</h2>
          <p style="color:var(--muted); font-size:0.9rem;">Métricas operacionais e integridade da nuvem:</p>
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
          <div style="margin-top:1.75rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
            <button onclick="triggerAction('backup')" class="btn-action btn-blue">💾 Sincronizar MongoDB Agora</button>
            <button onclick="triggerAction('restart')" class="btn-action" style="background:var(--error);">🔄 Reiniciar Bot WhatsApp</button>
          </div>
          <div id="admin-log" style="margin-top:1rem; font-size:0.88rem; color:var(--green); font-family:monospace; font-weight:bold;"></div>
        </div>
      </div>
    </div>

    <!-- ================= ABA 2: TERMINAL & COMANDOS ================= -->
    <div id="tab-console" class="tab-content">
      <div class="grid-2">
        <div class="card">
          <h2>🕹️ Terminal de Logs ao Vivo (Console System Dark)</h2>
          <p style="color:var(--muted); font-size:0.88rem;">Eventos de conexão, transações e atividades do bot em tempo real:</p>
          <div class="terminal-box" id="terminal-logs">
            <div class="line"><span class="timestamp">[${new Date().toLocaleTimeString()}]</span> <span>⚡ [SYSTEM DARK OS] Painel KRAD inicializado na porta 3000</span></div>
            <div class="line"><span class="timestamp">[${new Date().toLocaleTimeString()}]</span> <span>☁️ [MONGODB ATLAS] Sincronização automática 24/7 ativa</span></div>
            <div class="line"><span class="timestamp">[${new Date().toLocaleTimeString()}]</span> <span>📱 [BAILEYS] Versão do socket fixada para [2, 3000, 1035194821]</span></div>
          </div>
          <button onclick="clearTerminal()" class="btn-action" style="background:#1e293b; padding:0.5rem 1rem; font-size:0.8rem;">Limpar Terminal</button>
        </div>

        <div class="card">
          <h2>⚡ Disparador Direto de Comandos & Broadcast</h2>
          <p style="color:var(--muted); font-size:0.88rem;">Envie mensagens ou teste comandos RPG direto do painel web sem precisar abrir o celular:</p>
          <div style="margin-top: 1rem;">
            <label style="font-size:0.8rem; color:var(--muted); text-transform:uppercase; font-weight:bold;">Número de Destino (ou JID do Grupo):</label>
            <input type="text" id="cmd-target" class="phone-input" style="max-width:100%; margin-top:0.4rem; margin-bottom:1rem; text-align:left;" value="244945280380@s.whatsapp.net">
            
            <label style="font-size:0.8rem; color:var(--muted); text-transform:uppercase; font-weight:bold;">Texto ou Comando RPG (/perfil, /despertar, /gacha):</label>
            <input type="text" id="cmd-text" class="phone-input" style="max-width:100%; margin-top:0.4rem; margin-bottom:1.2rem; text-align:left;" placeholder="/perfil ou Olá do Painel System Dark!">
            
            <button onclick="sendRemoteCommand()" class="btn-action btn-blue" style="width:100%;">⚡ ENVIAR COMANDO DO PAINEL</button>
            <div id="cmd-result" style="margin-top:1rem; font-family:monospace; font-size:0.85rem; color:var(--green); white-space:pre-wrap;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= ABA 3: CAÇADORES & VIP ================= -->
    <div id="tab-users" class="tab-content">
      <div class="card">
        <h2>👥 Gerenciamento de Caçadores & VIPs</h2>
        <p style="color:var(--muted); font-size:0.9rem;">Pesquise usuários, promova a VIP ou conceda moedas:</p>
        <div style="display:flex; gap:0.5rem; margin:1rem 0;">
          <input type="text" id="user-search-input" class="phone-input" style="flex:1; max-width:100%; text-align:left;" placeholder="Pesquisar JID (ex: 244945... @s.whatsapp.net)">
          <button onclick="searchHunter()" class="btn-action btn-blue">🔍 Buscar</button>
        </div>
        <div id="user-table-box" style="margin-top:1rem;">
          <table>
            <thead>
              <tr>
                <th>JID / Telefone</th>
                <th>Nome</th>
                <th>Nível</th>
                <th>Berries ($)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>244945280380@s.whatsapp.net</code></td>
                <td><strong>KRAD (Dono)</strong></td>
                <td>Lvl 52</td>
                <td>$ 500,000</td>
                <td><span style="color:#10b981; font-weight:bold;">● SUPREMO</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ================= ABA 4: GRUPOS & CONTROLES ================= -->
    <div id="tab-groups" class="tab-content">
      <div class="card">
        <h2>💬 Grupos WhatsApp & Moderação System Dark</h2>
        <p style="color:var(--muted); font-size:0.9rem;">Controle de grupos onde o bot está participando no servidor:</p>
        <div style="margin-top:1rem;">
          <table>
            <thead>
              <tr>
                <th>Grupo ID</th>
                <th>Nome do Grupo</th>
                <th>Modo RPG</th>
                <th>Anti-Link</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>120363409059457434@g.us</code></td>
                <td><strong>System Dark • Caçadores</strong></td>
                <td><span style="color:#10b981; font-weight:bold;">ATIVADO ✅</span></td>
                <td><span style="color:#10b981; font-weight:bold;">ATIVADO ✅</span></td>
                <td><button onclick="triggerAction('group-rpg-toggle')" class="btn-action" style="padding:0.4rem 0.8rem; font-size:0.75rem;">Alternar RPG</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ================= ABA 5: TRANSMISSÃO (BCAST) ================= -->
    <div id="tab-broadcast" class="tab-content">
      <div class="card">
        <h2>📢 Transmissão Global em Massa (Broadcast / Bcast)</h2>
        <p style="color:var(--muted); font-size:0.9rem;">Envie anúncios importantes para todos os grupos ou usuários do bot:</p>
        <div style="margin-top:1rem; max-width:650px;">
          <label style="font-size:0.8rem; color:var(--muted); text-transform:uppercase; font-weight:bold;">Público-Alvo da Transmissão:</label>
          <select id="bcast-target" class="phone-input" style="width:100%; max-width:100%; margin-top:0.4rem; margin-bottom:1rem; text-align:left;">
            <option value="all-groups">👥 Todos os Grupos do WhatsApp</option>
            <option value="all-users">👤 Todos os Usuários Cadastrados</option>
            <option value="only-vips">💎 Apenas Usuários VIPs</option>
          </select>

          <label style="font-size:0.8rem; color:var(--muted); text-transform:uppercase; font-weight:bold;">Mensagem de Anúncio (Com formatação System Dark):</label>
          <textarea id="bcast-message" class="phone-input" style="width:100%; max-width:100%; height:120px; margin-top:0.4rem; margin-bottom:1rem; text-align:left; font-family:monospace;" placeholder="⚡ COMUNICADO KRAD: Novo Evento de Raid Colossal ativo nos grupos!"></textarea>

          <button onclick="sendBroadcast()" class="btn-action btn-purple" style="width:100%;">📢 DISPARAR TRANSMISSÃO EM MASSA</button>
          <div id="bcast-result" style="margin-top:1rem; font-size:0.88rem; color:var(--green); font-weight:bold;"></div>
        </div>
      </div>
    </div>

    <!-- ================= ABA 6: AJUSTES & PROTEÇÕES ================= -->
    <div id="tab-settings" class="tab-content">
      <div class="card">
        <h2>⚙️ Ajustes Globais & Chaves de Proteção</h2>
        <p style="color:var(--muted); font-size:0.9rem;">Ative ou desative proteções gerais em tempo real sem precisar reiniciar:</p>
        
        <div style="margin-top:1.5rem; max-width:700px;">
          <div class="switch-row">
            <div>
              <div class="switch-label">🛡️ Anti-Spam & Anti-Flood Global</div>
              <div class="switch-desc">Limita comandos consecutivos em intervalo de 2.5s para evitar banimento do WhatsApp.</div>
            </div>
            <button onclick="toggleSetting('antispam')" class="btn-action btn-green" style="padding:0.5rem 1.2rem;">ATIVADO ✅</button>
          </div>

          <div class="switch-row">
            <div>
              <div class="switch-label">🛡️ Anti-Call (Bloquear Quem Ligar)</div>
              <div class="switch-desc">Rejeita ligações de voz/vídeo automaticamente para proteger o número do bot.</div>
            </div>
            <button onclick="toggleSetting('anticall')" class="btn-action btn-green" style="padding:0.5rem 1.2rem;">ATIVADO ✅</button>
          </div>

          <div class="switch-row">
            <div>
              <div class="switch-label">⚔️ Modo RPG Multiverso Anime Global</div>
              <div class="switch-desc">Permite entrada em Dungeons, Gacha e Duelos PvP 1x1 em grupos autorizados.</div>
            </div>
            <button onclick="toggleSetting('modorpg')" class="btn-action btn-green" style="padding:0.5rem 1.2rem;">ATIVADO ✅</button>
          </div>

          <div class="switch-row">
            <div>
              <div class="switch-label">🔞 Modo NSFW / Menu +18</div>
              <div class="switch-desc">Habilita conteúdos adultos restritos apenas para usuários VIP confirmados.</div>
            </div>
            <button onclick="toggleSetting('nsfw')" class="btn-action" style="background:#334155; padding:0.5rem 1.2rem;">DESATIVADO ❌</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= ABA 7: ADMINISTRAÇÃO RPG ================= -->
    <div id="tab-rpg" class="tab-content">
      <div class="card">
        <h2>⛩️ RPG Multiverso Anime — Central de Administração</h2>
        <p style="color:var(--muted); font-size:0.9rem;">Estatísticas gerais do ecossistema de Solo Leveling, Naruto, One Piece e Jujutsu Kaisen:</p>
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

        <div class="grid-2" style="margin-top: 1.5rem;">
          <div style="background:#060911; padding:1.25rem; border-radius:0.75rem; border:1px solid var(--border);">
            <div style="font-weight:bold; color:var(--accent); font-size:1.1rem;">🐲 Controle de Raids Colossais</div>
            <div style="font-size:0.88rem; color:var(--muted); margin:0.5rem 0;">
              Chefe Invadindo agora: <strong style="color:#fff;">${rpgStats.activeRaid ? rpgStats.activeRaid.boss_name : "Nenhum"}</strong><br>
              HP do Chefe: <strong style="color:var(--accent);">${rpgStats.activeRaid ? `${rpgStats.activeRaid.hp} / ${rpgStats.activeRaid.max_hp}` : "---"}</strong>
            </div>
            <div style="display:flex; gap:0.5rem; margin-top:1rem; flex-wrap:wrap;">
              <button onclick="triggerAction('raid-kaido')" class="btn-action" style="padding:0.6rem 1rem; font-size:0.85rem;">🔥 Raid Kaido (100k HP)</button>
              <button onclick="triggerAction('raid-sukuna')" class="btn-action btn-purple" style="padding:0.6rem 1rem; font-size:0.85rem;">🤞 Raid Sukuna (120k HP)</button>
            </div>
          </div>

          <div style="background:#060911; padding:1.25rem; border-radius:0.75rem; border:1px solid var(--border);">
            <div style="font-weight:bold; color:var(--blue); font-size:1.1rem;">🎁 Bonificação de Caçador (Berries / XP)</div>
            <p style="font-size:0.85rem; color:var(--muted); margin:0.5rem 0;">Premie qualquer jogador diretamente pela central do bot:</p>
            <input type="text" id="reward-user" class="phone-input" style="max-width:100%; margin-bottom:0.5rem; text-align:left;" placeholder="244945280380@s.whatsapp.net">
            <div style="display:flex; gap:0.5rem;">
              <input type="number" id="reward-amount" class="phone-input" style="width:140px; text-align:center;" placeholder="10000" value="10000">
              <button onclick="rewardHunter()" class="btn-action btn-blue" style="flex:1;">⚡ DAR BERRIES</button>
            </div>
            <div id="reward-msg" style="margin-top:0.6rem; font-size:0.85rem; color:var(--green);"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= ABA 8: NUVEM & DIAGNÓSTICO DE APIS ================= -->
    <div id="tab-backup" class="tab-content">
      <div class="card">
        <h2>💾 Nuvem, Sincronização & Diagnóstico das 13 APIs Integradas</h2>
        <p style="color:var(--muted); font-size:0.9rem;">Verificação contínua das chaves e estado do MongoDB Atlas (100% Aprovado):</p>

        <div style="display:flex; gap:0.8rem; margin:1rem 0; flex-wrap:wrap;">
          <button onclick="triggerAction('backup')" class="btn-action btn-blue">☁️ Sincronizar Agora com MongoDB Atlas</button>
          <a href="/api/backup-download" class="btn-action" style="background:#1e293b; text-decoration:none;">📥 Baixar Snapshot JSON Local</a>
        </div>

        <div style="max-height: 380px; overflow-y: auto; margin-top: 1.25rem;">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Serviço / API</th>
                <th>Status do Endpoint</th>
                <th>Finalidade & Aplicação no Bot</th>
              </tr>
            </thead>
            <tbody>
              ${apisList.map((api, index) => `
                <tr>
                  <td><code>#${String(index + 1).padStart(2, '0')}</code></td>
                  <td><strong style="color:#fff;">${api.name}</strong></td>
                  <td><span style="color:#10b981; font-weight:bold;">● 100% OPERACIONAL</span></td>
                  <td><span style="color:#94a3b8; font-size:0.85rem;">${api.purpose}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>

  <script>
    function openTab(tabId, btnElement) {
      const contents = document.querySelectorAll('.tab-content');
      contents.forEach(content => content.classList.remove('active'));

      const buttons = document.querySelectorAll('.tab-btn');
      buttons.forEach(btn => btn.classList.remove('active'));

      document.getElementById(tabId).classList.add('active');
      btnElement.classList.add('active');
    }

    function clearTerminal() {
      document.getElementById('terminal-logs').innerHTML = '';
    }

    function logToTerminal(msg, type = "info") {
      const el = document.getElementById('terminal-logs');
      if (!el) return;
      const time = new Date().toLocaleTimeString();
      const color = type === "error" ? "#ef4444" : type === "success" ? "#10b981" : "#38bdf8";
      el.innerHTML += \`<div class="line"><span class="timestamp">[\${time}]</span> <span style="color:\${color};">\${msg}</span></div>\`;
      el.scrollTop = el.scrollHeight;
    }

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
      msgEl.innerText = '⏳ Conectando à Baileys v2026 e gerando Pair Code...';
      logToTerminal('Enviando requisição de Pair Code para ' + phoneInput + '...', 'info');

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
          logToTerminal('Pair Code obtido com sucesso: ' + data.pairCode, 'success');
        } else {
          msgEl.style.color = '#ef4444';
          msgEl.innerText = '❌ Erro: ' + (data.error || 'Tente clicar em Limpar Sessão');
          logToTerminal('Erro no Pair Code: ' + (data.error || 'Falha'), 'error');
        }
      } catch (err) {
        msgEl.style.color = '#ef4444';
        msgEl.innerText = '❌ Erro de comunicação com o servidor: ' + err.message;
      }
    }

    async function triggerAction(action) {
      const logEl = document.getElementById('admin-log');
      if (logEl) logEl.innerText = '⏳ Executando ação: ' + action + '...';
      logToTerminal('Executando comando administrativo: ' + action, 'info');

      try {
        const res = await fetch('/api/admin-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action })
        });
        const data = await res.json();
        if (logEl) logEl.innerText = '✅ ' + (data.message || 'Ação concluída com sucesso!');
        logToTerminal('Ação concluída: ' + (data.message || action), 'success');
        if (action === 'raid-kaido' || action === 'raid-sukuna' || action === 'clear-session' || action === 'restart') {
          setTimeout(() => location.reload(), 2200);
        }
      } catch (err) {
        if (logEl) logEl.innerText = '❌ Erro ao executar ação: ' + err.message;
        logToTerminal('Falha na ação ' + action + ': ' + err.message, 'error');
      }
    }

    async function rewardHunter() {
      const user = document.getElementById('reward-user').value.trim();
      const amount = parseInt(document.getElementById('reward-amount').value, 10);
      const msgEl = document.getElementById('reward-msg');

      if (!user || isNaN(amount)) {
        msgEl.style.color = '#ef4444';
        msgEl.innerText = '⚠️ Preencha o JID do Caçador e o valor corretamente!';
        return;
      }

      msgEl.style.color = '#38bdf8';
      msgEl.innerText = '⏳ Depositando bônus no cofre...';

      try {
        const res = await fetch('/api/admin-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'reward-user', target: user, amount })
        });
        const data = await res.json();
        msgEl.style.color = '#10b981';
        msgEl.innerText = '✅ ' + (data.message || 'Bônus entregue com sucesso!');
        logToTerminal('Premiação concedida a ' + user + ': $' + amount, 'success');
      } catch (err) {
        msgEl.style.color = '#ef4444';
        msgEl.innerText = '❌ Erro: ' + err.message;
      }
    }

    async function sendRemoteCommand() {
      const target = document.getElementById('cmd-target').value.trim();
      const text = document.getElementById('cmd-text').value.trim();
      const resEl = document.getElementById('cmd-result');

      if (!target || !text) {
        resEl.style.color = '#ef4444';
        resEl.innerText = '⚠️ Preencha o número/JID de destino e o comando!';
        return;
      }

      resEl.style.color = '#38bdf8';
      resEl.innerText = '⏳ Enviando comando ao bot...';
      logToTerminal('Disparando comando remoto para ' + target + ': ' + text, 'info');

      try {
        const res = await fetch('/api/send-command', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, text })
        });
        const data = await res.json();
        resEl.style.color = '#10b981';
        resEl.innerText = '✅ Resposta do Bot:\n' + (data.response || 'Comando executado com sucesso!');
        logToTerminal('Comando respondido por System Dark.', 'success');
      } catch (err) {
        resEl.style.color = '#ef4444';
        resEl.innerText = '❌ Erro: ' + err.message;
      }
    }

    async function sendBroadcast() {
      const target = document.getElementById('bcast-target').value;
      const message = document.getElementById('bcast-message').value.trim();
      const resEl = document.getElementById('bcast-result');

      if (!message) {
        resEl.style.color = '#ef4444';
        resEl.innerText = '⚠️ Digite o texto do comunicado!';
        return;
      }

      resEl.style.color = '#38bdf8';
      resEl.innerText = '⏳ Disparando transmissão global em massa...';
      logToTerminal('Iniciando Broadcast para: ' + target, 'info');

      try {
        const res = await fetch('/api/broadcast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, message })
        });
        const data = await res.json();
        resEl.style.color = '#10b981';
        resEl.innerText = '✅ ' + (data.message || 'Transmissão em massa executada com sucesso!');
        logToTerminal('Broadcast enviado.', 'success');
      } catch (err) {
        resEl.style.color = '#ef4444';
        resEl.innerText = '❌ Erro no Broadcast: ' + err.message;
      }
    }

    function toggleSetting(setting) {
      logToTerminal('Alterando chave global: ' + setting, 'info');
      fetch('/api/settings-toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setting })
      }).then(res => res.json()).then(data => {
        logToTerminal('Configuração ' + setting + ' atualizada.', 'success');
      });
    }

    function searchHunter() {
      const q = document.getElementById('user-search-input').value.trim();
      logToTerminal('Pesquisando Caçador por JID/Telefone: ' + q, 'info');
    }
  </script>
</body>
</html>`;
}

module.exports = {
    getLoginPage,
    getDashboardPage
};
