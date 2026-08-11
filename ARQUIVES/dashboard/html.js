// ============================================================================
// SYSTEM DARK OS • DASHBOARD CRIADO DO ZERO (KRAD - 244949926074)
// ============================================================================

function getLoginPage(errorMsg = "") {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - System Dark</title>
  <style>
    :root {
      --bg: #090d16;
      --card: #111827;
      --accent: #f97316;
      --text: #f8fafc;
      --muted: #94a3b8;
      --border: #1f2937;
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
    .box {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 2.5rem;
      width: 100%;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.7);
    }
    h1 { color: var(--accent); font-size: 1.8rem; margin-bottom: 0.3rem; font-weight: 900; }
    p { color: var(--muted); font-size: 0.9rem; margin-bottom: 2rem; }
    .input-group { margin-bottom: 1.2rem; text-align: left; }
    label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--muted); margin-bottom: 0.4rem; text-transform: uppercase; }
    input {
      width: 100%; padding: 0.85rem 1rem; background: #060911;
      border: 1px solid var(--border); border-radius: 0.5rem; color: #fff; font-size: 1rem; outline: none;
    }
    input:focus { border-color: var(--accent); }
    .btn {
      width: 100%; background: linear-gradient(135deg, #f97316, #ea580c);
      color: #fff; border: none; padding: 0.9rem; font-size: 1rem; font-weight: 800;
      border-radius: 0.5rem; cursor: pointer; margin-top: 1rem;
    }
    .error {
      background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444;
      color: #fca5a5; padding: 0.8rem; border-radius: 0.5rem; margin-bottom: 1.5rem; font-size: 0.85rem;
    }
    .footer { margin-top: 2rem; font-size: 0.75rem; color: #475569; }
  </style>
</head>
<body>
  <div class="box">
    <h1>SYSTEM DARK</h1>
    <p>Painel de Controle • KRAD</p>
    ${errorMsg ? `<div class="error">${errorMsg}</div>` : ""}
    <form method="POST" action="/login">
      <div class="input-group">
        <label>Usuário</label>
        <input type="text" name="username" placeholder="darknet ou krad" required autocomplete="off">
      </div>
      <div class="input-group">
        <label>Senha</label>
        <input type="password" name="password" placeholder="••••••••••••" required>
      </div>
      <button type="submit" class="btn">⚡ ENTRAR NO PAINEL</button>
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
  <title>System Dark • Dashboard KRAD</title>
  <style>
    :root {
      --bg: #090d16;
      --card: #111827;
      --accent: #f97316;
      --blue: #38bdf8;
      --green: #10b981;
      --error: #ef4444;
      --text: #f8fafc;
      --muted: #94a3b8;
      --border: #1f2937;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 2rem 1rem;
    }
    .container { max-width: 1100px; margin: 0 auto; }
    header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 2rem; border-bottom: 2px solid var(--border); padding-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;
    }
    h1 { color: var(--accent); font-size: 1.7rem; font-weight: 900; }
    .badge {
      display: inline-block; padding: 0.45rem 1.1rem; border-radius: 9999px; font-weight: bold; font-size: 0.85rem;
    }
    .badge.online { background: rgba(16, 185, 129, 0.2); color: var(--green); border: 1px solid var(--green); }
    .badge.offline { background: rgba(239, 68, 68, 0.2); color: var(--error); border: 1px solid var(--error); }
    .card {
      background: var(--card); border: 1px solid var(--border); border-radius: 1rem;
      padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }
    .card h2 { font-size: 1.3rem; color: #fff; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.7rem; }
    .pair-box {
      background: #060911; border: 2px dashed var(--accent); border-radius: 0.85rem;
      padding: 2rem; text-align: center; margin: 1.2rem 0;
    }
    .code-display {
      font-family: "Fira Code", Consolas, monospace; font-size: 3rem; font-weight: 900;
      color: var(--accent); letter-spacing: 6px; margin: 1.5rem 0; padding: 1rem 2rem;
      background: rgba(249, 115, 22, 0.12); border-radius: 0.75rem; display: inline-block;
    }
    .input-field {
      width: 100%; max-width: 300px; padding: 0.85rem 1rem; background: #0e1626;
      border: 1px solid var(--border); border-radius: 0.5rem; color: #fff; font-size: 1.05rem; text-align: center; margin: 0.4rem;
    }
    .btn {
      background: linear-gradient(135deg, var(--accent), #ea580c); color: #fff; border: none;
      padding: 0.85rem 1.6rem; font-size: 0.95rem; font-weight: 800; border-radius: 0.5rem; cursor: pointer; margin: 0.4rem;
    }
    .btn-red { background: linear-gradient(135deg, var(--error), #dc2626); }
    .btn-blue { background: linear-gradient(135deg, var(--blue), #0284c7); }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0; }
    .stat-item { background: #060911; border: 1px solid var(--border); border-radius: 0.6rem; padding: 1.1rem; text-align: center; }
    .stat-item .num { font-size: 1.5rem; font-weight: 900; color: var(--blue); }
    .stat-item .label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; }
    @media (max-width: 850px) { .grid-2, .stat-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1>⚡ SYSTEM DARK • PAINEL KRAD ⚡</h1>
        <p style="color:var(--muted); font-size:0.85rem;">Baileys v2026 | Dono: +244 945 280 380 | Bot: +244 949 926 074</p>
      </div>
      <div>
        <span class="badge ${statusData.connected ? 'online' : 'offline'}">
          ${statusData.connected ? '● CONECTADO AO WHATSAPP ✅' : '○ AGUARDANDO PAREAMENTO ⏳'}
        </span>
        <a href="/logout" class="btn btn-red" style="text-decoration:none; padding:0.5rem 1rem; font-size:0.85rem;">Sair</a>
      </div>
    </header>

    <!-- CARD PAIR CODE CRIADO DO ZERO -->
    <div class="card">
      <h2>📱 GERADOR DE CÓDIGO DE PAREAMENTO (PAIR CODE)</h2>
      <p style="color:var(--muted); font-size:0.95rem;">
        Insira seu WhatsApp com DDI (ex: <code>244949926074</code>) para gerar o código oficial e vincular ao bot:
      </p>
      <div class="pair-box">
        <div style="font-size:0.8rem; color:var(--muted); text-transform:uppercase; font-weight:800;">CÓDIGO DE PAREAMENTO:</div>
        <div id="pair-code-display" class="code-display">${statusData.pairCode || "---- ----"}</div>
        <div>
          <input type="text" id="phone-number" class="input-field" placeholder="244949926074" value="${statusData.defaultNumber || ''}">
          <button onclick="requestPairCode()" class="btn" id="btn-pair">⚡ GERAR PAIR CODE</button>
          <button onclick="triggerAction('clear-session')" class="btn btn-red">🧹 LIMPAR SESSÃO</button>
        </div>
        <div id="pair-msg" style="margin-top:1rem; font-size:0.95rem; color:var(--blue); font-weight:bold;"></div>
      </div>
      <div style="font-size:0.85rem; color:var(--muted);">
        💡 <strong>Como usar:</strong> Ao clicar em <strong>"GERAR PAIR CODE"</strong>, o servidor chamará a Baileys. Em 2 a 3 segundos, a notificação aparecerá no seu WhatsApp no celular e o código de 8 dígitos surgirá na tela!
      </div>
    </div>

    <!-- CARD STATUS & RPG -->
    <div class="grid-2">
      <div class="card">
        <h2>🛠️ Status Operacional (Render 24/7)</h2>
        <div class="stat-grid">
          <div class="stat-item"><div class="num">${statusData.uptimeFormatted || "0h 0m"}</div><div class="label">Uptime</div></div>
          <div class="stat-item"><div class="num">${statusData.ramUsage || "0 MB"}</div><div class="label">RAM</div></div>
          <div class="stat-item"><div class="num">${statusData.mongoStatus || "Online ☁️"}</div><div class="label">MongoDB Cloud</div></div>
        </div>
        <div style="margin-top:1.5rem; text-align:center;">
          <button onclick="triggerAction('restart')" class="btn btn-red" style="width:100%;">🔄 REINICIAR BOT WHATSAPP</button>
        </div>
      </div>

      <div class="card">
        <h2>⛩️ RPG Multiverso Anime — Administração</h2>
        <div class="stat-grid">
          <div class="stat-item"><div class="num">${rpgStats.totalUsers || 0}</div><div class="label">Caçadores</div></div>
          <div class="stat-item"><div class="num">$ ${(rpgStats.totalBerries || 0).toLocaleString()}</div><div class="label">Berries</div></div>
          <div class="stat-item"><div class="num">${rpgStats.totalGuilds || 0}</div><div class="label">Guildas</div></div>
        </div>
        <div style="margin-top:1.5rem; text-align:center;">
          <button onclick="triggerAction('raid-kaido')" class="btn btn-blue" style="width:100%;">🔥 DISPARAR RAID MUNDIAL KAIDO (100k HP)</button>
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
        msgEl.innerText = '⚠️ Digite um número de WhatsApp válido com código do país (ex: 244949926074)';
        return;
      }

      msgEl.style.color = '#38bdf8';
      msgEl.innerText = '⏳ Gerando Pair Code oficial com o WhatsApp Web...';

      try {
        const res = await fetch('/api/paircode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: phoneInput })
        });
        if (res.status === 401) {
          window.location.href = '/login';
          return;
        }
        const data = await res.json();

        if (data.success && data.pairCode) {
          displayEl.innerText = data.pairCode;
          msgEl.style.color = '#10b981';
          msgEl.innerText = '✅ PAIR CODE GERADO! Digite agora no seu WhatsApp no celular.';
        } else {
          msgEl.style.color = '#ef4444';
          msgEl.innerText = '❌ Erro: ' + (data.error || 'Clique em Limpar Sessão para resetar');
        }
      } catch (err) {
        msgEl.style.color = '#ef4444';
        msgEl.innerText = '❌ Erro de conexão ao servidor: ' + err.message;
      }
    }

    async function triggerAction(action) {
      try {
        const res = await fetch('/api/admin-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action })
        });
        const data = await res.json();
        alert('✅ ' + (data.message || 'Ação concluída com sucesso!'));
        if (action === 'clear-session' || action === 'restart') {
          setTimeout(() => location.reload(), 1500);
        }
      } catch (err) {
        alert('❌ Erro: ' + err.message);
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
