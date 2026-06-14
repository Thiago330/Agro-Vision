// CONFIGURAÇÕES GERAIS E BANCO DE DADOS LOCAL SIMULADO
const state = {
    theme: 'dark',
    lang: 'pt',
    user: null,
    commodities: [
        { name: 'Soja (Saca 60kg)', price: 138.40, change: 1.25 },
        { name: 'Milho (Saca 60kg)', price: 58.20, change: -0.45 },
        { name: 'Café Arábica (sc)', price: 1045.00, change: 2.10 },
        { name: 'Boi Gordo (@)', price: 234.15, change: 0.85 },
        { name: 'Leite (Litro)', price: 2.12, change: -1.15 },
        { name: 'Dólar Comercial', price: 4.96, change: 0.32 }
    ],
    translations: {
        pt: { brand: 'AgroVision', heroTitle: 'Tecnologia, produtividade e sustentabilidade no campo.' },
        en: { brand: 'AgroVision Global', heroTitle: 'Technology, productivity and sustainability in the field.' },
        es: { brand: 'AgroVision Latam', heroTitle: 'Tecnología, productividad y sostenibilidad en el campo.' }
    }
};

// CONTROLE DO MODO CLARO / ESCURO (THEME SWITCHER)
function toggleTheme() {
    const body = document.getElementById('app-body');
    const header = document.getElementById('main-header');
    
    if (state.theme === 'dark') {
        body.classList.remove('bg-agro-dark', 'text-gray-100');
        body.classList.add('bg-gray-50', 'text-gray-900');
        header.classList.remove('bg-agro-dark/80');
        header.classList.add('bg-white/90', 'border-gray-200');
        state.theme = 'light';
    } else {
        body.classList.remove('bg-gray-50', 'text-gray-900');
        body.classList.add('bg-agro-dark', 'text-gray-100');
        header.classList.remove('bg-white/90', 'border-gray-200');
        header.classList.add('bg-agro-dark/80');
        state.theme = 'dark';
    }
}

// SISTEMA MULTILÍNGUE (INTERNACIONALIZAÇÃO)
function changeLang(lang) {
    state.lang = lang;
    ['pt', 'en', 'es'].forEach(l => document.getElementById(`lang-${l}`).classList.remove('text-agro-neon'));
    document.getElementById(`lang-${lang}`).classList.add('text-agro-neon');
    
    document.getElementById('brand-title').innerHTML = state.translations[lang].brand;
}

// CONTROLE DE MODAIS (ABRIR / FECHAR)
function openModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('opacity-0');
    setTimeout(() => { 
        modal.classList.add('hidden'); 
        modal.classList.remove('flex'); 
    }, 300);
}

// SISTEMA DE LOGIN DO PRODUTOR
function handleLogin() {
    const user = document.getElementById('login-user').value;
    state.user = user;
    document.getElementById('nav-login-btn').innerText = `🟢 ${user}`;
    closeModal('login-modal');
    alert(`Acesso biométrico autorizado para o terminal ${user}!`);
}

// REFRESH AUTOMÁTICO DA BOLSA DO AGRO (Simulador de oscilação do mercado)
function renderBolsa() {
    const container = document.getElementById('ticker-container');
    if (!container) return;
    
    container.innerHTML = '';
    state.commodities.forEach(item => {
        item.price += (Math.random() - 0.5) * (item.price * 0.005);
        const isPositive = item.change >= 0;
        container.innerHTML += `
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4 font-mono">
                <span class="text-xs text-gray-400 block truncate">${item.name}</span>
                <span class="text-lg font-bold text-white block mt-1">R$ ${item.price.toFixed(2)}</span>
                <span class="text-xs ${isPositive ? 'text-agro-neon' : 'text-red-400'} font-semibold">
                    ${isPositive ? '▲' : '▼'} ${item.change.toFixed(2)}%
                </span>
            </div>
        `;
    });
}
setInterval(renderBolsa, 3000); // Atualiza os preços a cada 3 segundos

// NAVEGAÇÃO DO MAPA INTERATIVO DO BRASIL
function updateMapLayer(layer, info) {
    document.getElementById('map-status-badge').innerText = layer.toUpperCase();
    document.getElementById('map-telemetry-text').innerText = info;
}

// IA DETECTORA DE DOENÇAS NAS PLANTAS (Visão Computacional Simulada)
function triggerAIDiagnosis() {
    const reportContent = document.getElementById('report-content');
    const statusBadge = document.getElementById('report-status');
    statusBadge.innerText = "PROCESSANDO VISÃO COMPUTACIONAL...";
    statusBadge.classList.add('text-agro-gold');
    
    reportContent.innerHTML = `<p class="text-center py-12 animate-pulse">Analisando pigmentação foliar com banco fitossanitário AgroVision Brain...</p>`;
    
    setTimeout(() => {
        statusBadge.innerText = "ANÁLISE CONCLUÍDA";
        statusBadge.classList.remove('text-agro-gold');
        statusBadge.classList.add('text-agro-neon');
        
        reportContent.innerHTML = `
            <div class="space-y-2">
                <p class="text-white font-bold text-sm">🍁 Patologia: Ferrugem Asiática (Phakopsora pachyrhizi)</p>
                <p class="text-red-400 font-bold">⚠️ Risco de Perda Potencial: 78% se não tratada</p>
                <hr class="border-white/10 my-2">
                <p><strong class="text-white">Causas:</strong> Alta umidade noturna detectada pelos sensores de campo.</p>
                <p><strong class="text-white">Tratamento:</strong> Aplicação cirúrgica de fungicidas sistêmicos protetores.</p>
                <p><strong class="text-white">Fertilizante:</strong> Reforço com Potássio para aumentar imunidade da planta.</p>
            </div>
        `;
    }, 2000);
}

// MOTOR RENDER DO SIMULADOR DE FAZENDA 3D
function runSimulation(type, icon, title, desc) {
    const viewport = document.getElementById('sim-viewport');
    viewport.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        document.getElementById('sim-icon').innerText = icon;
        document.getElementById('sim-title').innerText = title;
        document.getElementById('sim-desc').innerText = desc;
        viewport.classList.remove('opacity-0', 'scale-95');
    }, 300);
}

// ABAS DO DASHBOARD DE GESTÃO RURAL E PECUÁRIA
function switchDashTab(tab) {
    const view = document.getElementById('dashboard-viewport');
    const btnFin = document.getElementById('tab-financeiro');
    const btnPec = document.getElementById('tab-pecuaria');
    
    if (!view || !btnFin || !btnPec) return;

    btnFin.className = "bg-transparent text-gray-400 px-3 py-1.5 rounded-lg font-medium";
    btnPec.className = "bg-transparent text-gray-400 px-3 py-1.5 rounded-lg font-medium";

    if (tab === 'financeiro') {
        btnFin.className = "bg-agro-neon text-agro-dark px-3 py-1.5 rounded-lg font-bold";
        view.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div class="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span class="text-gray-400 block">Lucro Estimado por Hectare</span>
                    <span class="text-2xl font-bold text-white block mt-1">R$ 4.250,00 <span class="text-xs text-agro-neon">/ha</span></span>
                </div>
                <div class="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span class="text-gray-400 block">Combustível / Frota de Tratores</span>
                    <span class="text-2xl font-bold text-agro-gold block mt-1">12.400 Litros</span>
                </div>
                <div class="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span class="text-gray-400 block">Investimento Mensal em Insumos</span>
                    <span class="text-2xl font-bold text-red-400 block mt-1">R$ 312.450,00</span>
                </div>
            </div>
            <div class="mt-6 p-4 bg-white/5 border border-white/5 rounded-2xl">
                <h4 class="text-xs font-bold text-white mb-2 font-mono">Rotas Logísticas e Rastreamento de Transporte</h4>
                <p class="text-xs text-gray-400 font-mono">Rota de escoamento monitorada por satélite via BR-163 ativa. Consumo de combustível otimizado automaticamente por IA.</p>
            </div>
        `;
    } else {
        btnPec.className = "bg-agro-neon text-agro-dark px-3 py-1.5 rounded-lg font-bold";
        view.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
                <div class="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span class="text-gray-400 block">Gado Rastreado (Chips RFID)</span>
                    <span class="text-xl font-bold text-white block mt-1">1.420 Cabeças</span>
                </div>
                <div class="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span class="text-gray-400 block">Ganho de Peso Médio</span>
                    <span class="text-xl font-bold text-agro-neon block mt-1">18.4 @</span>
                </div>
                <div class="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span class="text-gray-400 block">Controle Leiteiro Diário</span>
                    <span class="text-xl font-bold text-white block mt-1">28.5 L/Vaca</span>
                </div>
                <div class="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span class="text-gray-400 block">Vacinação e Histórico Veterinário</span>
                    <span class="text-xl font-bold text-agro-neon block mt-1">100% OK</span>
                </div>
            </div>
            <div class="mt-6 p-4 bg-white/5 border border-white/5 rounded-2xl font-mono text-xs text-gray-400">
                <strong>Melhoramento Genético Bovino:</strong> Algoritmo preditivo de cruzamento direcionado executado com sucesso para máxima eficiência na conversão alimentar.
            </div>
        `;
    }
}

// INICIALIZAÇÃO AUTOMÁTICA DA APLICAÇÃO
window.onload = function() {
    renderBolsa();
    switchDashTab('financeiro');
};// Controle de Contagem do Carrinho do Marketplace
let cartItems = 0;
function addToCart(productName) {
    cartItems++;
    document.getElementById('cart-count').innerText = cartItems;
    alert(`Sucesso! ${productName} foi adicionado ao seu lote de compras de insumos.`);
}

// Mecanismo Interativo de Troca de Regiões do Mapa do Brasil
function changeRegion(id, title, description) {
    const badge = document.getElementById('region-badge');
    const titleEl = document.getElementById('region-title');
    const descEl = document.getElementById('region-description');

    badge.innerText = id.toUpperCase();
    titleEl.innerText = title;
    descriptionText = description;

    // Efeito de digitação/atualização rápida
    descEl.innerText = "Sincronizando telemetria de satélite...";
    setTimeout(() => {
        descEl.innerText = description;
    }, 400);
}

// Simulação Avançada de Diagnóstico por Inteligência Artificial
function simulateAIAnalysis() {
    const status = document.getElementById('report-status');
    const content = document.getElementById('report-content');

    status.innerText = "PROCESSANDO REDE NEURAL...";
    status.className = "text-xs font-mono text-agro-gold animate-pulse";
    
    content.innerHTML = `
        <div class="space-y-2 py-4">
            <p class="text-agro-neon font-bold">⚡ EXECUTANDO VISÃO COMPUTACIONAL...</p>
            <p class="text-gray-500">Mapeando pigmentações e vetores celulares na folha...</p>
        </div>
    `;

    setTimeout(() => {
        status.innerText = "ANÁLISE CONCLUÍDA";
        status.className = "text-xs font-mono text-agro-neon font-bold";
        
        content.innerHTML = `
            <div class="space-y-3 bg-agro-green/10 border border-agro-lightgreen/30 p-4 rounded-xl">
                <p class="text-white font-bold"><span class="text-agro-neon">✓ Espécime Detectado:</span> Folhagem de Soja</p>
                <p class="text-white font-bold"><span class="text-agro-neon">✓ Diagnóstico:</span> Saudável (Risco Biológico < 2%)</p>
                <hr class="border-white/5">
                <p class="text-[11px] text-gray-400 leading-relaxed">Recomendação: Manter a rotina de irrigação atual. Nenhuma anomalia fúngica ou infestação de lagarta foi detectada nos pixels da imagem.</p>
            </div>
        `;
    }, 1800);
}

// Captação de Leads e Form de Contato
function handleContact(event) {
    event.preventDefault();
    alert("Excelente! Seus dados corporativos foram recebidos pela mesa de operações da AgroVision. Nosso Pitch Deck Executivo e dados financeiros consolidados serão enviados no e-mail informado em até 15 minutos.");
    event.target.reset();
}

// Modais - Fluxo de Abertura e Fechamento
function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.remove('opacity-0');
    }, 10);
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Integração de Login via Google Auth (Simulado em Nível de Sistema Real)
function handleGoogleLogin() {
    closeModal('login-modal');
    alert("AgroVision solicitando autorização segura via oAuth2 da Google API...\n\nConexão estabelecida com sucesso! Bem-vindo ao Painel de Controle de Operações Rurais Enterprise.");
}