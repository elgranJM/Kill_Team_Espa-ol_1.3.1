document.addEventListener('DOMContentLoaded', () => {
    initializeMatchData();
    
    // Ejemplo de asignación correcta
    const btnRandomAll = document.getElementById('btn-random-all');
    if (btnRandomAll) {
        btnRandomAll.addEventListener('click', randomizeAll);
    }
});

// Estado del Juego (Para la Selección Secreta, Ardides y Equipamiento)
let gameState = {
    p1: { primary: null, strategicPloys: { 1: [], 2: [], 3: [], 4: [] }, equipment: [] },
    p2: { primary: null, strategicPloys: { 1: [], 2: [], 3: [], 4: [] }, equipment: [] },
    revealed: false,
    currentPlayerSelecting: 1,
    currentPlayerSelectingEquip: 'p1',
    loading: false // <-- NUEVO: Bandera de control para evitar sobreescrituras en carga
};

// Tabla de umbrales para Kill Op (100% fiel al reglamento entregado)
const killOpThresholds = {
    5: [1, 2, 3, 4, 5],
    6: [1, 2, 4, 5, 6],
    7: [1, 3, 4, 6, 7],
    8: [2, 3, 5, 6, 8],
    9: [2, 4, 5, 7, 9],
    10: [2, 4, 6, 8, 10],
    11: [2, 4, 7, 9, 11],
    12: [2, 5, 7, 10, 12],
    13: [3, 5, 8, 10, 13],
    14: [3, 6, 8, 11, 14]
};

// --- SISTEMA DE SELECCIÓN SECRETA ---
function openSecretModal(playerNum) {
    if (gameState.revealed) {
        mostrarNotificacion("Acción no permitida: Las misiones ya fueron reveladas. Reinicia la partida para escoger nuevas.");
        return;
    }

    gameState.currentPlayerSelecting = playerNum;
    document.getElementById('modal-player-name').innerText = `Jugador ${playerNum}`;

    // Limpiar selección visual del modal
    document.querySelectorAll('input[name="secretPrimary"]').forEach(r => r.checked = false);

    // Si ya había seleccionado algo antes de revelar, volver a marcarlo en el modal
    let currentSelection = playerNum === 1 ? gameState.p1.primary : gameState.p2.primary;
    if (currentSelection) {
        document.querySelector(`input[name="secretPrimary"][value="${currentSelection}"]`).checked = true;
    }

    const modal = new bootstrap.Modal(document.getElementById('secretModal'));
    modal.show();
}

function saveSecretPrimary() {
    const selected = document.querySelector('input[name="secretPrimary"]:checked');
    if (!selected) {
        mostrarNotificacion("Falta selección: Debes seleccionar una operación primaria antes de confirmar.");
        return;
    }

    const playerNum = gameState.currentPlayerSelecting;
    const btnId = `p${playerNum}-btn-secret`;
    const btn = document.getElementById(btnId);

    if (playerNum === 1) {
        gameState.p1.primary = selected.value;
    } else {
        gameState.p2.primary = selected.value;
    }

    // Cambiar el botón a estado "Fijado"
    btn.classList.remove('btn-warning');
    btn.classList.add('btn-success');
    btn.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Fijada 🔒';

    // Cerrar el modal correctamente
    const modalEl = document.getElementById('secretModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();

    // NUEVO: Guardar el estado inmediatamente para no perder la selección secreta
    saveGameState();
}

// --- SISTEMA DE REVELADO DE PARTIDA ---
function revealPrimaries() {
    if (!gameState.p1.primary || !gameState.p2.primary) {
        // Cambiamos el 'alert' molesto por la notificación integrada en la interfaz
        mostrarNotificacion("Falta selección: Ambos jugadores deben fijar su Operación Primaria secreta antes de finalizar.");
        return;
    }

    // Abrir el modal de confirmación temático
    const modal = new bootstrap.Modal(document.getElementById('revealConfirmModal'));
    modal.show();
}

// Esta es la función real que se ejecuta cuando el usuario presiona "Confirmar" en el modal
function executeRevealPrimaries() {
    gameState.revealed = true;

    // Ocultar botones de selección y mostrar insignias
    document.getElementById('p1-btn-secret').classList.add('d-none');
    document.getElementById('p2-btn-secret').classList.add('d-none');

    const mapNames = { 'critop': 'Crit Op', 'tacop': 'Tac Op', 'killop': 'Kill Op' };

    let p1Badge = document.getElementById('p1-revealed-primary');
    p1Badge.innerText = mapNames[gameState.p1.primary];
    p1Badge.classList.remove('d-none');
    document.getElementById('p1-primary-bonus-display').classList.remove('d-none');

    let p2Badge = document.getElementById('p2-revealed-primary');
    p2Badge.innerText = mapNames[gameState.p2.primary];
    p2Badge.classList.remove('d-none');
    document.getElementById('p2-primary-bonus-display').classList.remove('d-none');

    // Ocultar botón global de revelar
    document.getElementById('btn-reveal-global').classList.add('d-none');

    calculateTotals();

    showMatchResult();
}

// --- SISTEMA DE DECLARACIÓN DE VICTORIA ---
function showMatchResult() {
    // Extraer los puntos finales desde la interfaz (ya calculados)
    const p1Score = parseInt(document.getElementById('p1-total-vp').innerText) || 0;
    const p2Score = parseInt(document.getElementById('p2-total-vp').innerText) || 0;

    // Extraer los nombres de los jugadores (Si está vacío, usamos nombres por defecto)
    let p1Name = document.querySelector('.player-1 .name-input').value.trim() || "Jugador 1";
    let p2Name = document.querySelector('.player-2 .name-input').value.trim() || "Jugador 2";

    // Referencias a los elementos del Modal de Resultado
    const modalHeader = document.getElementById('matchResultHeader');
    const resultMessage = document.getElementById('matchResultMessage');
    const resultScore = document.getElementById('matchResultScore');
    const resultIcon = document.getElementById('matchResultIcon');

    // Lógica de Victoria / Empate
    if (p1Score > p2Score) {
        // Gana Jugador 1 (Color Azul)
        modalHeader.className = "modal-header bg-primary text-white";
        resultIcon.innerHTML = '<i class="bi bi-trophy-fill text-primary" style="font-size: 5rem; text-shadow: 0px 4px 10px rgba(11, 107, 225, 0.4);"></i>';
        resultMessage.innerHTML = `¡Victoria para <span class="text-primary">${p1Name}</span>!`;
        resultScore.innerHTML = `Con un total de <b>${p1Score}</b> PV frente a los ${p2Score} PV del enemigo.`;
    } else if (p2Score > p1Score) {
        // Gana Jugador 2 (Color Rojo)
        modalHeader.className = "modal-header bg-danger text-white";
        resultIcon.innerHTML = '<i class="bi bi-trophy-fill text-danger" style="font-size: 5rem; text-shadow: 0px 4px 10px rgba(220, 53, 69, 0.4);"></i>';
        resultMessage.innerHTML = `¡Victoria para <span class="text-danger">${p2Name}</span>!`;
        resultScore.innerHTML = `Con un total de <b>${p2Score}</b> PV frente a los ${p1Score} PV del enemigo.`;
    } else {
        // Empate (Color Gris/Secundario)
        modalHeader.className = "modal-header bg-secondary text-white";
        resultIcon.innerHTML = '<i class="bi bi-shield-shaded text-secondary" style="font-size: 5rem; text-shadow: 0px 4px 10px rgba(108, 117, 125, 0.4);"></i>';
        resultMessage.innerHTML = "¡La escaramuza termina en EMPATE!";
        resultScore.innerHTML = `Ambos bandos lograron <b>${p1Score}</b> PV. ¡Una batalla reñida!`;
    }

    // Llamar a Bootstrap para mostrar el Modal
    const resultModal = new bootstrap.Modal(document.getElementById('matchResultModal'));
    resultModal.show();
}

// --- SISTEMA DE REINICIO DE PARTIDA ---
function resetGame() {
    // Abrir el modal de confirmación temático
    const modal = new bootstrap.Modal(document.getElementById('resetConfirmModal'));
    modal.show();
}

// Esta es la función real que se ejecuta cuando el usuario presiona "Confirmar" en el modal de reinicio
function executeResetGame() {
    // 1. Reset de Estado Lógico Interno
    gameState.p1.primary = null;
    gameState.p1.strategicPloys = { 1: [], 2: [], 3: [], 4: [] };
    gameState.p1.equipment = [];
    gameState.p2.primary = null;
    gameState.p2.strategicPloys = { 1: [], 2: [], 3: [], 4: [] };
    gameState.p2.equipment = [];
    gameState.revealed = false;

    // --- NUEVO: Reset de la Operación Crítica (CritOp) Global ---
    const globalCritOp = document.getElementById('global-critop');
    if (globalCritOp) {
        globalCritOp.value = ""; // Devuelve el selector a la opción por defecto ("Selecciona una CritOp...")
    }

    // 2. Reset de Elementos de Jugadores (Nombres, Facciones, TacOps e Interfaz)
    ['p1', 'p2'].forEach((p, index) => {
        const playerNum = index === 0 ? '1' : '2';

        // Reestablecer Nombres a vacío (o puedes poner 'Jugador 1' / 'Jugador 2')
        document.querySelector(`.player-${playerNum} .name-input`).value = "";

        // Reestablecer el selector de Facción al valor por defecto
        const factionSelect = document.getElementById(`${p}-faction`);
        if (factionSelect) factionSelect.value = "";

        // Forzar la actualización de TacOps para limpiar el listado y ocultar imágenes de facción antiguas
        if (typeof updateTacOps === 'function') {
            updateTacOps(p);
        }

        // Reestablecer el selector de TacOp al valor por defecto
        const tacopSelect = document.getElementById(`${p}-tacop`);
        if (tacopSelect) tacopSelect.value = "";

        // Restaurar visibilidad del contenedor de TacOps (por si estaba oculto/bloqueado)
        const tacopContainer = document.getElementById(`${p}-tacop-container`);
        if (tacopContainer) {
            tacopContainer.classList.remove('d-none');
            tacopContainer.classList.add('d-flex');
        }

        // Ocultar la insignia de TacOp revelada
        const revealedBadge = document.getElementById(`${p}-revealed-badge-container`);
        if (revealedBadge) {
            revealedBadge.classList.add('d-none');
        }

        // Reset de los botones de Operación Primaria Secreta UI
        let btnPrimary = document.getElementById(`${p}-btn-secret`);
        if (btnPrimary) {
            btnPrimary.className = 'btn btn-warning btn-sm fw-bold shadow-sm';
            btnPrimary.innerHTML = 'Fijar en Secreto 🔒';
            btnPrimary.classList.remove('d-none');
        }

        document.getElementById(`${p}-revealed-primary`).classList.add('d-none');
        document.getElementById(`${p}-primary-bonus-display`).classList.add('d-none');
    });

    // Mostrar el botón global de revelar primarias nuevamente
    document.getElementById('btn-reveal-global').classList.remove('d-none');

    // 3. Reset de Contadores Numéricos (Puntos de Victoria y Bajas)
    const idsToReset = ['p1-crit-vp', 'p1-tac-vp', 'p1-kills', 'p2-crit-vp', 'p2-tac-vp', 'p2-kills'];
    idsToReset.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = "0";
    });

    // Reset de Puntos de Mando (CP) iniciales
    const p1Cp = document.getElementById('p1-cp');
    const p2Cp = document.getElementById('p2-cp');
    if (p1Cp) p1Cp.innerText = "2";
    if (p2Cp) p2Cp.innerText = "2";

    // Volver el Punto de Inflexión (Turno) al TP1
    const tp1Radio = document.getElementById('tp1');
    if (tp1Radio) tp1Radio.checked = true;
    document.querySelectorAll('.current-tp-label').forEach(el => el.innerText = '1');

    // Actualizar vista de ardides activos y equipamiento
    updateActiveStrategicPloysDisplay('p1');
    updateActiveStrategicPloysDisplay('p2');
    updateSelectedEquipmentDisplay('p1');
    updateSelectedEquipmentDisplay('p2');

    // Recalcular los totales para que la UI muestre 0 puntos globales
    calculateTotals();

    // Limpiar el autoguardado del LocalStorage para que no recuerde la partida anterior
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('killTeamMatchState');
    }

    // Notificación flotante estética del sistema
    mostrarNotificacion("Partida reiniciada por completo. Tablero limpio.");
}

// --- SISTEMA DE CÁLCULO GENERAL ---

function updateCounter(elementId, amount, max = 99) {
    const el = document.getElementById(elementId);
    let current = parseInt(el.innerText);
    let newVal = current + amount;

    if (newVal >= 0 && newVal <= max) {
        el.innerText = newVal;
    }
}

function calculatePlayerKillScore(kills, enemySize) {
    const thresholds = killOpThresholds[enemySize];
    let score = 0;
    // Evaluamos la tabla: un punto por cada barrera superada
    for (let i = 0; i < thresholds.length; i++) {
        if (kills >= thresholds[i]) score++;
    }
    return score;
}

function calculateTotals() {
    // 1. Obtener valores de J1
    let p1Crit = parseInt(document.getElementById('p1-crit-vp').innerText);
    let p1Tac = parseInt(document.getElementById('p1-tac-vp').innerText);
    let p1EnemySize = parseInt(document.getElementById('p1-enemy-size').value);
    let p1Kills = parseInt(document.getElementById('p1-kills').innerText);
    let p1KillBase = calculatePlayerKillScore(p1Kills, p1EnemySize);

    // 2. Obtener valores de J2
    let p2Crit = parseInt(document.getElementById('p2-crit-vp').innerText);
    let p2Tac = parseInt(document.getElementById('p2-tac-vp').innerText);
    let p2EnemySize = parseInt(document.getElementById('p2-enemy-size').value);
    let p2Kills = parseInt(document.getElementById('p2-kills').innerText);
    let p2KillBase = calculatePlayerKillScore(p2Kills, p2EnemySize);

    // 3. Evaluar el Bono de Mayoría en Kill Op (+1 PV extra)
    let p1KillBonus = 0;
    let p2KillBonus = 0;
    document.getElementById('p1-kill-bonus').classList.add('d-none');
    document.getElementById('p2-kill-bonus').classList.add('d-none');

    if (p1KillBase > p2KillBase) {
        p1KillBonus = 1;
        document.getElementById('p1-kill-bonus').classList.remove('d-none');
    } else if (p2KillBase > p1KillBase) {
        p2KillBonus = 1;
        document.getElementById('p2-kill-bonus').classList.remove('d-none');
    }

    let p1KillTotal = Math.min(6, p1KillBase + p1KillBonus);
    let p2KillTotal = Math.min(6, p2KillBase + p2KillBonus);

    document.getElementById('p1-kill-base').innerText = p1KillBase;
    document.getElementById('p1-kill-total').innerText = p1KillTotal;
    document.getElementById('p2-kill-base').innerText = p2KillBase;
    document.getElementById('p2-kill-total').innerText = p2KillTotal;

    // 4. Calcular el Bono de Operación Primaria (Solo si ya fue revelado)
    let p1PrimaryBonus = 0;
    let p2PrimaryBonus = 0;

    if (gameState.revealed) {
        let p1PrimaryType = gameState.p1.primary;
        let p2PrimaryType = gameState.p2.primary;

        let p1PrimaryScore = (p1PrimaryType === 'critop') ? p1Crit : (p1PrimaryType === 'tacop' ? p1Tac : p1KillTotal);
        let p2PrimaryScore = (p2PrimaryType === 'critop') ? p2Crit : (p2PrimaryType === 'tacop' ? p2Tac : p2KillTotal);

        // Mitad redondeada al alza (Math.ceil)
        p1PrimaryBonus = Math.ceil(p1PrimaryScore / 2);
        p2PrimaryBonus = Math.ceil(p2PrimaryScore / 2);

        document.getElementById('p1-primary-bonus-display').innerText = `+${p1PrimaryBonus} PV (Bono Primaria)`;
        document.getElementById('p2-primary-bonus-display').innerText = `+${p2PrimaryBonus} PV (Bono Primaria)`;
    }

    // 5. Total Final de Puntos de Victoria
    let p1GrandTotal = p1Crit + p1Tac + p1KillTotal + p1PrimaryBonus;
    let p2GrandTotal = p2Crit + p2Tac + p2KillTotal + p2PrimaryBonus;

    document.getElementById('p1-total-vp').innerText = p1GrandTotal;
    document.getElementById('p2-total-vp').innerText = p2GrandTotal;

    saveGameState();
}

function validateKills(playerPrefix) {
    // Obtenemos los elementos HTML según el jugador (p1 o p2)
    let enemySize = parseInt(document.getElementById(playerPrefix + '-enemy-size').value);
    let killsDisplay = document.getElementById(playerPrefix + '-kills');
    let currentKills = parseInt(killsDisplay.innerText);

    // Si las muertes actuales superan el nuevo tamaño rival, las reducimos al tope
    if (currentKills > enemySize) {
        killsDisplay.innerText = enemySize;
    }
}

// 1. Diccionario de Traducciones de Facciones
const factionTranslations = {
    'intercessors': 'Ángeles de la Muerte',
    'battleclade': 'Clado de Batalla',
    'deathwatch': 'Vigias de la Muerte',
    'elucidian-starstrider': 'Recorrestrellas Elucidianos',
    'hunter-clade': 'Clado de Caza',
    'imperial-navy-breachers': 'Abordadores de la Armada Imperial',
    'inquisitorial-agent': 'Operativos Inquisitoriales',
    'kasrkin': 'Kasrkin',
    'novitiates': 'Novicias',
    'phobos': 'Asaltantes Phobos',
    'ratling': 'Rátido',
    'sanctifiers': 'Santificadores',
    'scouts': 'Escuadra de Exploradores',
    'tempestus-aquilons': 'Tempestus Aquilons',
    'wolf-scouts': 'Exploradores Lobo',
    'strike-force-variel': 'Fuerza de Ataque Variel',
    'exaction-squad': 'Escuadra de Exacción',
    'veteran-guardsmen': 'Korps de la Muerte',
    'celestian-insidiants': 'Insidiadora Celeste',
    'blooded': 'Ungidos',
    'chaos-cult': 'Culto del Caos',
    'fellgor-ravagers': 'Expoliagores Impíos',
    'gellerpox': 'Infectados Geller',
    'goremongers': 'Siembrasangres',
    'legionary': 'Legionarios',
    'nemesis-claw': 'Garra Némesis',
    'plague-marines': 'Marines de Plaga',
    'warpcoven': 'Aquelarre Disforme',
    'murderwing': 'Ala Asesina',
    'blades-of-khaine': 'Filos de Khaine',
    'brood-brothers': 'Hermanos de Progenie',
    'canoptek': 'Círculo Canóptico',
    'corsair-voidscarred': 'Corsarios del Vacío',
    'farstalker-kinband': 'Bandaestirpe Acechante',
    'hearthkyn-salvager': 'Sucesores Recuperadores',
    'hierotek': 'Círculo de Hierotecnólogos',
    'kabalite': 'Mano del Arconte',
    'kommandos': 'Orkomandos',
    'mandrakes': 'Mandrágoras',
    'pathfinders': 'Rastreadores T\'au',
    'raveners': 'Mantifex',
    'vespid-stingwings': 'Aguijones Alados Véspid',
    'void-dancer-troupe': 'Compañia de Bailarines del Vacío',
    'wrecka-krew': 'Demoledorez',
    'wyrmblade': 'FiloSierpe',
    'yaegirs': 'Yaegirs Hernkyn',
    'xv26-battlesuits': 'Exoarmaduras XV26 Sigilo'
};

// Traducciones visuales para los arquetipos
const archetypeTranslations = {
    'recon': 'Reconocimiento',
    'security': 'Seguridad',
    'infiltration': 'Infiltración',
    'seek-destroy': 'Búsqueda y Destrucción'
};

// Variables para almacenar los datos en memoria
let dataFactions = {};
let dataTacOps = {};
let dataCritOps = {};
let dataWeapons = {};
let dataRacial = {};
let dataPloys = [];
let dataEquipment = [];
let dataMaps = {};

// 2. Carga Asíncrona de ambos JSON
async function initializeMatchData() {
    try {
        // Agregamos reglasArmas.json, racial.json, ploys.json y equipment.json a nuestra promesa concurrente
        const [factionsRes, tacopsRes, critopsRes, weaponsRes, racialRes, ploysRes, equipRes, mapsRes] = await Promise.all([
            fetch('tacops.json'),
            fetch('tacopsgenerales.json'),
            fetch('CritsOps.json'),
            fetch('reglasArmas.json'),
            fetch('racial.json').catch(e => { console.warn('racial.json error', e); return null; }),
            fetch('ploys.json').catch(e => { console.warn('ploys.json error', e); return null; }),
            fetch('equipment.json').catch(e => { console.warn('equipment.json error', e); return null; }),
            fetch('maps.json').catch(e => { console.warn('maps.json error', e); return null; })
        ]);

        dataFactions = await factionsRes.json();
        dataTacOps = await tacopsRes.json();
        dataCritOps = await critopsRes.json();
        dataWeapons = await weaponsRes.json();
        if (racialRes) dataRacial = await racialRes.json();
        if (ploysRes) dataPloys = await ploysRes.json();
        if (equipRes) dataEquipment = await equipRes.json();
        if (mapsRes) dataMaps = await mapsRes.json();

        populateFactions();
        populateCritOps();
        populateKillzonesDropdown();
        populateWeaponRules();

        loadGameState();
        calculateTotals();
        updateActiveStrategicPloysDisplay('p1');
        updateActiveStrategicPloysDisplay('p2');
        updateSelectedEquipmentDisplay('p1');
        updateSelectedEquipmentDisplay('p2');
        onTurningPointChange();

    } catch (error) {
        console.error("Error cargando los datos del juego:", error);
    }
}

// Función para llenar el selector global de CritOps
function populateCritOps() {
    const select = document.getElementById('global-critop');
    if (!select) return;

    for (const [key, op] of Object.entries(dataCritOps)) {
        const option = document.createElement('option');
        option.value = key; // La llave (ej. "secure", "loot")
        option.textContent = op.name_es || key; // El nombre en español
        select.appendChild(option);
    }
}

// 3. Llenar los selectores de facción ordenados alfabéticamente en español
function populateFactions() {
    // Obtenemos las llaves del JSON y las ordenamos según su traducción
    const sortedFactionKeys = Object.keys(dataFactions).sort((a, b) => {
        const nameA = factionTranslations[a] || a;
        const nameB = factionTranslations[b] || b;
        return nameA.localeCompare(nameB);
    });

    ['p1', 'p2'].forEach(playerPrefix => {
        const select = document.getElementById(`${playerPrefix}-faction`);
        if (!select) return;

        sortedFactionKeys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = factionTranslations[key] || key;
            select.appendChild(option);
        });
    });
}

// 4. Lógica de filtrado cuando se elige una facción
function updateTacOps(playerPrefix) {
    const factionKey = document.getElementById(`${playerPrefix}-faction`).value;
    const tacopSelect = document.getElementById(`${playerPrefix}-tacop`);
    const archetypesDisplay = document.getElementById(`${playerPrefix}-archetypes-display`);
    const factionRulesBtn = document.getElementById(`${playerPrefix}-btn-faction-rules`);

    // --- RESET DE SEGURIDAD PARA TACOPS SECRETAS ---
    document.getElementById(`${playerPrefix}-tacop-container`)?.classList.remove('d-none');
    document.getElementById(`${playerPrefix}-tacop-container`)?.classList.add('d-flex');
    document.getElementById(`${playerPrefix}-tacop-status`)?.classList.add('d-none');
    document.getElementById(`${playerPrefix}-tacop-status`)?.classList.remove('d-flex');
    document.getElementById(`${playerPrefix}-secret-badge`)?.classList.remove('d-none');
    document.getElementById(`${playerPrefix}-btn-reveal-tacop`)?.classList.remove('d-none');
    document.getElementById(`${playerPrefix}-revealed-badge`)?.classList.add('d-none');
    let lockBtn = document.getElementById(`${playerPrefix}-btn-lock-tacop`);
    if (lockBtn) lockBtn.disabled = true;

    let infoBtn = document.getElementById(`${playerPrefix}-btn-info-tacop`);
    if (infoBtn) infoBtn.disabled = true;

    if (factionRulesBtn) {
        factionRulesBtn.disabled = !factionKey || !dataFactions[factionKey];
    }

    const stratBtn = document.getElementById(`${playerPrefix}-btn-strat-ploys`);
    if (stratBtn) {
        stratBtn.disabled = !factionKey || !dataFactions[factionKey];
    }

    const equipBtn = document.getElementById(`${playerPrefix}-btn-select-equip`);
    if (equipBtn) {
        equipBtn.disabled = !factionKey || !dataFactions[factionKey];
    }

    document.getElementById(`${playerPrefix}-revealed-badge-container`)?.classList.remove('d-flex');
    document.getElementById(`${playerPrefix}-revealed-badge-container`)?.classList.add('d-none');

    updateActiveStrategicPloysDisplay(playerPrefix);

    // Filtrar equipamientos que ya no pertenezcan a la nueva facción (conservando universales)
    if (gameState[playerPrefix] && Array.isArray(gameState[playerPrefix].equipment)) {
        gameState[playerPrefix].equipment = gameState[playerPrefix].equipment.filter(id => {
            const item = dataEquipment.find(e => e.id_equip === id);
            return item && (item.faction === 'universal' || item.faction === factionKey);
        });
    }
    updateSelectedEquipmentDisplay(playerPrefix);

    if (!factionKey || !dataFactions[factionKey]) return;

    // Actualización visual de la imagen
    const imgEl = document.getElementById(`${playerPrefix}-faction-img`);
    if (imgEl) imgEl.src = `./resources/facciones/${factionKey}.png`;

    const allowedArchetypes = dataFactions[factionKey].archetypes;
    const translatedArchs = allowedArchetypes.map(a => archetypeTranslations[a] || a).join(' / ');
    archetypesDisplay.innerHTML = `Arquetipos permitidos: <strong>${translatedArchs}</strong>`;

    tacopSelect.innerHTML = '<option value="" selected disabled>Selecciona tu TacOp...</option>';

    for (const [tacopName, tacopData] of Object.entries(dataTacOps)) {
        if (allowedArchetypes.includes(tacopData.archetype)) {
            const option = document.createElement('option');
            option.value = tacopName;
            option.textContent = `${tacopName} (${archetypeTranslations[tacopData.archetype] || tacopData.archetype})`;
            tacopSelect.appendChild(option);
        }
    }

    // NUEVO: Guardar estado tras cambiar la facción de forma activa
    saveGameState();
}

// 1. Habilita el botón de bloqueo e información al seleccionar TacOp
function enableTacOpLock(playerPrefix) {
    const lockBtn = document.getElementById(`${playerPrefix}-btn-lock-tacop`);
    const infoBtn = document.getElementById(`${playerPrefix}-btn-info-tacop`);
    if (lockBtn) lockBtn.disabled = false;
    if (infoBtn) infoBtn.disabled = false;

    // NUEVO: Guardar estado tras cambiar la selección del menú de TacOp
    saveGameState();
}

// 2. Fija la TacOp en secreto (Oculta selectores y muestra estado)
function lockTacOp(playerPrefix) {
    document.getElementById(`${playerPrefix}-tacop-container`).classList.remove('d-flex');
    document.getElementById(`${playerPrefix}-tacop-container`).classList.add('d-none');

    document.getElementById(`${playerPrefix}-tacop-status`).classList.remove('d-none');
    document.getElementById(`${playerPrefix}-tacop-status`).classList.add('d-flex');

    // NUEVO: Guardar estado cuando el jugador confirma el bloqueo secreto
    saveGameState();
}

// 3. Transición del Estado 2 al Estado 3 (Revelar en la partida)
function revealTacOp(playerPrefix) {
    const selectEl = document.getElementById(`${playerPrefix}-tacop`);
    const selectedText = selectEl.options[selectEl.selectedIndex].text;

    document.getElementById(`${playerPrefix}-secret-badge`).classList.add('d-none');
    document.getElementById(`${playerPrefix}-btn-reveal-tacop`).classList.add('d-none');

    const revealedBadge = document.getElementById(`${playerPrefix}-revealed-badge`);
    revealedBadge.innerText = selectedText;

    const revealedContainer = document.getElementById(`${playerPrefix}-revealed-badge-container`);
    revealedContainer.classList.remove('d-none');
    revealedContainer.classList.add('d-flex');

    // NUEVO: Guardar estado cuando la misión secundaria se hace pública
    saveGameState();
}

// --- SISTEMA DE GESTIÓN Y ACTIVACIÓN DE ARDIDES ESTRATÉGICOS ---

function getCurrentTurn() {
    const checked = document.querySelector('input[name="tpRadio"]:checked');
    if (!checked) return 1;
    return parseInt(checked.id.replace('tp', '')) || 1;
}

function calculateDynamicLimit(type, key, turn) {
    if (type === 'crit' && dataCritOps[key]) {
        const op = dataCritOps[key];
        if (Array.isArray(op.limite_puntos) && op.limite_puntos[turn - 1] !== undefined) {
            return op.limite_puntos[turn - 1];
        }
    }
    return 6;
}

function onTurningPointChange() {
    const currentTP = getCurrentTurn();
    document.querySelectorAll('.current-tp-label').forEach(el => el.innerText = currentTP);
    updateActiveStrategicPloysDisplay('p1');
    updateActiveStrategicPloysDisplay('p2');
    validateAllScores();
    saveGameState();
}

function getPlayerPloysForTP(playerPrefix, tp) {
    if (!gameState[playerPrefix]) {
        gameState[playerPrefix] = { primary: null, strategicPloys: { 1: [], 2: [], 3: [], 4: [] } };
    }
    if (!gameState[playerPrefix].strategicPloys) {
        gameState[playerPrefix].strategicPloys = { 1: [], 2: [], 3: [], 4: [] };
    }
    if (!Array.isArray(gameState[playerPrefix].strategicPloys[tp])) {
        gameState[playerPrefix].strategicPloys[tp] = [];
    }
    return gameState[playerPrefix].strategicPloys[tp];
}

function openStrategicPloysModal(playerPrefix) {
    const factionSelect = document.getElementById(`${playerPrefix}-faction`);
    const factionKey = factionSelect ? factionSelect.value : "";

    if (!factionKey) {
        mostrarNotificacion("Falta selección: Por favor, selecciona primero tu facción para ver sus ardides de estrategia.");
        return;
    }

    gameState.currentPlayerSelecting = playerPrefix === 'p1' ? 1 : 2;
    renderStrategicPloysModal(playerPrefix);

    const modal = new bootstrap.Modal(document.getElementById('strategicPloysModal'));
    modal.show();
}

function renderStrategicPloysModal(playerPrefix) {
    const factionKey = document.getElementById(`${playerPrefix}-faction`).value;
    const currentTP = getCurrentTurn();
    const currentCP = parseInt(document.getElementById(`${playerPrefix}-cp`).innerText) || 0;
    const playerName = document.querySelector(`.player-${playerPrefix === 'p1' ? '1' : '2'} .name-input`).value.trim() || (playerPrefix === 'p1' ? 'Jugador 1' : 'Jugador 2');
    const factionName = factionTranslations[factionKey] || factionKey;

    // Actualizar cabecera del modal
    const imgEl = document.getElementById('stratModalFactionImg');
    if (imgEl) imgEl.src = `./resources/facciones/${factionKey}.png`;

    const titleEl = document.getElementById('stratModalTitle');
    if (titleEl) titleEl.innerHTML = `<i class="bi bi-hourglass-split text-warning me-1"></i>Ardides Estratégicos — ${factionName}`;

    const subTitleEl = document.getElementById('stratModalSubtitle');
    if (subTitleEl) subTitleEl.innerText = `Fase de Estrategia (Gambito) — Punto de Inflexión ${currentTP}`;

    const playerEl = document.getElementById('stratModalPlayerName');
    if (playerEl) playerEl.innerText = playerName;

    const cpEl = document.getElementById('stratModalCP');
    if (cpEl) cpEl.innerText = `${currentCP} PM`;

    const modalBody = document.getElementById('stratModalBody');
    if (!modalBody) return;

    // Filtrar ardides estratégicos de esta facción
    let stratPloys = [];
    if (Array.isArray(dataPloys)) {
        stratPloys = dataPloys.filter(p => p.faction === factionKey && (p.type === 'strategic' || p.typename?.toLowerCase().includes('estrategia')));
    }

    if (stratPloys.length === 0) {
        modalBody.innerHTML = '<div class="alert alert-light text-center p-4">No se encontraron ardides de estrategia para esta facción en la base de datos.</div>';
        return;
    }

    const activeList = getPlayerPloysForTP(playerPrefix, currentTP);
    let html = '<div class="row g-3">';

    stratPloys.forEach(ploy => {
        const costMatch = String(ploy.cps || '1').match(/\d+/);
        const cost = costMatch ? parseInt(costMatch[0]) : 1;
        const isActive = activeList.includes(ploy.id_ploy);
        const canAfford = currentCP >= cost;

        let actionButtonHtml = '';
        if (isActive) {
            actionButtonHtml = `
                        <div class="d-flex align-items-center gap-2">
                            <span class="badge bg-success py-2 px-3 fw-bold"><i class="bi bi-check-circle-fill me-1"></i>Activo en TP ${currentTP}</span>
                            <button type="button" class="btn btn-outline-danger btn-sm fw-bold" onclick="deactivateStrategicPloy('${playerPrefix}', ${ploy.id_ploy})" title="Desactivar y reembolsar PM">
                                <i class="bi bi-arrow-counterclockwise me-1"></i>Desactivar (+${cost} PM)
                            </button>
                        </div>
                    `;
        } else if (canAfford) {
            actionButtonHtml = `
                        <button type="button" class="btn btn-warning btn-sm fw-bold px-3 shadow-sm" onclick="activateStrategicPloy('${playerPrefix}', ${ploy.id_ploy})">
                            <i class="bi bi-lightning-charge-fill me-1"></i>Activar (${cost} PM)
                        </button>
                    `;
        } else {
            actionButtonHtml = `
                        <button type="button" class="btn btn-secondary btn-sm fw-bold px-3 disabled" disabled title="Puntos de Mando insuficientes">
                            <i class="bi bi-x-circle me-1"></i>PM Insuficiente (${cost} PM)
                        </button>
                    `;
        }

        html += `
                    <div class="col-12">
                        <div class="card ploy-modal-card ${isActive ? 'is-active border-success' : 'border-secondary border-opacity-25'} shadow-sm">
                            <div class="card-header ${isActive ? 'bg-success text-white' : 'bg-dark text-white'} d-flex justify-content-between align-items-center py-2">
                                <span class="fw-bold text-uppercase small"><i class="bi bi-shield-shaded me-1"></i>${ploy.name}</span>
                                <span class="badge ${isActive ? 'bg-light text-success' : 'bg-warning text-dark'} fw-bold">${ploy.cps || '1 PM'}</span>
                            </div>
                            <div class="card-body bg-white p-3">
                                <div class="card-text small lh-sm text-dark mb-3">${ploy.description}</div>
                                <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                                    <small class="text-muted fst-italic">Ardid de Estrategia (Inicio de TP)</small>
                                    ${actionButtonHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    });

    html += '</div>';
    modalBody.innerHTML = html;
}

function activateStrategicPloy(playerPrefix, ployId) {
    const currentTP = getCurrentTurn();
    const activeList = getPlayerPloysForTP(playerPrefix, currentTP);
    if (activeList.includes(ployId)) return;

    const ploy = dataPloys.find(p => p.id_ploy === ployId);
    if (!ploy) return;

    const costMatch = String(ploy.cps || '1').match(/\d+/);
    const cost = costMatch ? parseInt(costMatch[0]) : 1;

    const cpEl = document.getElementById(`${playerPrefix}-cp`);
    let currentCP = parseInt(cpEl.innerText) || 0;

    if (currentCP < cost) {
        mostrarNotificacion("Puntos de Mando insuficientes: No tienes suficientes PM para activar este ardid.");
        return;
    }

    // Deducir Puntos de Mando
    updateCounter(`${playerPrefix}-cp`, -cost);

    // Registrar en el estado del jugador para este TP
    activeList.push(ployId);

    // Actualizar interfaz del tablero y del modal
    updateActiveStrategicPloysDisplay(playerPrefix);
    renderStrategicPloysModal(playerPrefix);
    saveGameState();

    mostrarNotificacion(`Ardid "${ploy.name}" activado para el TP ${currentTP} (-${cost} PM).`);
}

function deactivateStrategicPloy(playerPrefix, ployId) {
    const currentTP = getCurrentTurn();
    const activeList = getPlayerPloysForTP(playerPrefix, currentTP);
    const index = activeList.indexOf(ployId);
    if (index === -1) return;

    const ploy = dataPloys.find(p => p.id_ploy === ployId);
    const costMatch = ploy ? String(ploy.cps || '1').match(/\d+/) : null;
    const cost = costMatch ? parseInt(costMatch[0]) : 1;

    // Retirar del estado
    activeList.splice(index, 1);

    // Reembolsar Puntos de Mando
    updateCounter(`${playerPrefix}-cp`, cost);

    // Actualizar interfaz del tablero y del modal
    updateActiveStrategicPloysDisplay(playerPrefix);
    renderStrategicPloysModal(playerPrefix);
    saveGameState();

    mostrarNotificacion(`Ardid "${ploy ? ploy.name : ''}" desactivado (+${cost} PM reembolsado).`);
}

function syncStratSectionsHeight() {
    const c1 = document.getElementById('p1-active-strategic-ploys');
    const c2 = document.getElementById('p2-active-strategic-ploys');
    if (!c1 || !c2) return;

    // En dispositivos móviles (menor a 768px), las columnas van apiladas
    if (window.innerWidth < 768) {
        c1.style.minHeight = 'auto';
        c2.style.minHeight = 'auto';
        return;
    }

    // Resetear para medir altura natural
    c1.style.minHeight = 'auto';
    c2.style.minHeight = 'auto';

    requestAnimationFrame(() => {
        const h1 = c1.scrollHeight || c1.offsetHeight;
        const h2 = c2.scrollHeight || c2.offsetHeight;
        const maxH = Math.max(h1, h2, 52);

        c1.style.minHeight = `${maxH}px`;
        c2.style.minHeight = `${maxH}px`;
    });
}

function updateActiveStrategicPloysDisplay(playerPrefix) {
    const currentTP = getCurrentTurn();
    const activeContainer = document.getElementById(`${playerPrefix}-active-strategic-ploys`);
    const countBadge = document.getElementById(`${playerPrefix}-active-ploys-count`);
    const factionBtn = document.getElementById(`${playerPrefix}-btn-strat-ploys`);
    const factionKey = document.getElementById(`${playerPrefix}-faction`)?.value;

    if (factionBtn) {
        factionBtn.disabled = !factionKey || !dataFactions[factionKey];
    }

    if (!activeContainer) return;

    const activeList = getPlayerPloysForTP(playerPrefix, currentTP);

    if (countBadge) {
        countBadge.innerText = activeList.length;
    }

    if (activeList.length === 0) {
        activeContainer.innerHTML = '<div class="d-flex align-items-center justify-content-center h-100 py-2"><small class="text-muted fst-italic text-center">Ningún ardid estratégico activo en este TP.</small></div>';
        syncStratSectionsHeight();
        return;
    }

    let html = '';
    activeList.forEach(ployId => {
        const ploy = dataPloys.find(p => p.id_ploy === ployId);
        if (!ploy) return;

        html += `
                    <div class="active-ploy-card p-2 bg-white rounded border border-warning shadow-sm">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="fw-bold text-dark small">
                                <i class="bi bi-lightning-charge-fill text-warning me-1"></i>${ploy.name}
                            </span>
                            <div class="d-flex align-items-center gap-1">
                                <span class="badge bg-dark" style="font-size: 0.7rem;">${ploy.cps || '1 PM'}</span>
                                <button type="button" class="btn btn-outline-danger btn-sm p-0 px-1 border-0" 
                                    onclick="deactivateStrategicPloy('${playerPrefix}', ${ploy.id_ploy})" 
                                    title="Desactivar ardid y recuperar PM">
                                    <i class="bi bi-x-circle-fill"></i>
                                </button>
                            </div>
                        </div>
                        <div class="text-dark small lh-sm" style="font-size: 0.82rem;">
                            ${ploy.description}
                        </div>
                    </div>
                `;
    });

    activeContainer.innerHTML = html;
    syncStratSectionsHeight();
}

// --- SISTEMA DE GESTIÓN Y SELECCIÓN DE EQUIPAMIENTO ---

function getPlayerEquipment(playerPrefix) {
    if (!gameState[playerPrefix]) {
        gameState[playerPrefix] = { primary: null, strategicPloys: { 1: [], 2: [], 3: [], 4: [] }, equipment: [] };
    }
    if (!Array.isArray(gameState[playerPrefix].equipment)) {
        gameState[playerPrefix].equipment = [];
    }
    return gameState[playerPrefix].equipment;
}

function openEquipmentSelectModal(playerPrefix) {
    const factionSelect = document.getElementById(`${playerPrefix}-faction`);
    const factionKey = factionSelect ? factionSelect.value : "";

    if (!factionKey) {
        mostrarNotificacion("Falta selección: Por favor, selecciona primero tu facción para elegir equipamiento.");
        return;
    }

    gameState.currentPlayerSelectingEquip = playerPrefix;
    renderEquipmentSelectModal(playerPrefix);

    const modal = new bootstrap.Modal(document.getElementById('equipmentSelectModal'));
    modal.show();
}

function buildEquipmentCardInnerHtml(item) {
    let descHtml = Array.isArray(item.description)
        ? item.description.map(line => `<p class="mb-2">${line}</p>`).join('')
        : `<p class="mb-2">${item.description}</p>`;

    let weaponHtml = '';
    if (item.weapon && item.weapon.length > 0) {
        const rowsHtml = item.weapon.map(w => `
                    <tr>
                        <td class="fw-bold text-start">${w.w_name}</td>
                        <td class="text-center">${w.ATK}</td>
                        <td class="text-center">${w.HIT}</td>
                        <td class="text-center">${w.DMG}</td>
                        <td class="text-start fst-italic">${w.rules || '-'}</td>
                    </tr>
                `).join('');

        weaponHtml = `
                <div class="equip-weapon-table mt-2 mb-2 shadow-sm rounded overflow-hidden">
                    <table class="table table-sm table-dark table-bordered mb-0">
                        <thead>
                            <tr class="text-center">
                                <th class="text-start">NOMBRE</th>
                                <th>ATAQ.</th>
                                <th>IMP.</th>
                                <th>DAÑO</th>
                                <th class="text-start">REGLAS DE ARMAS</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>`;
    }

    let actionHtml = '';
    if (item.action && item.action.length > 0) {
        actionHtml = item.action.map(a => {
            const descYes = Array.isArray(a.action_yes)
                ? a.action_yes.map(line => `
                            <div class="equip-action-yes p-2 mb-2 d-flex align-items-start">
                                <span class="icon icon-yes flex-shrink-0 mt-1 me-2"></span>
                                <div>${line}</div>
                            </div>`).join('')
                : (a.action_yes ? `
                            <div class="equip-action-yes p-2 mb-2 d-flex align-items-start">
                                <span class="icon icon-yes flex-shrink-0 mt-1 me-2"></span>
                                <div>${a.action_yes}</div>
                            </div>` : '');

            const descNo = Array.isArray(a.action_no)
                ? a.action_no.map(line => `
                            <div class="equip-action-no p-2 d-flex align-items-start">
                                <span class="icon icon-no flex-shrink-0 mt-1 me-2"></span>
                                <div>${line}</div>
                            </div>`).join('')
                : (a.action_no ? `
                            <div class="equip-action-no p-2 d-flex align-items-start">
                                <span class="icon icon-no flex-shrink-0 mt-1 me-2"></span>
                                <div>${a.action_no}</div>
                            </div>` : '');

            return `
                    <div class="equip-action-box shadow-sm mb-2">
                        <div class="equip-action-header d-flex justify-content-between align-items-center">
                            <span class="fw-bold text-uppercase">${a.action_name}</span>
                            <span class="badge bg-dark">${a.action_cost}</span>
                        </div>
                        <div class="content bg-white p-2">
                            ${descYes}
                            ${descNo}
                        </div>
                    </div>`;
        }).join('');
    }

    let imgHtml = '';
    if (item.img && item.img.length > 0) {
        imgHtml = `
                    <div class="d-flex flex-wrap gap-2 mt-2 justify-content-center">
                        ${item.img.map(src => `<img src="${src}" class="img-fluid rounded border shadow-sm" style="max-height: 160px;" alt="Ejemplo de equipo">`).join('')}
                    </div>
                `;
    }

    return `
                <div class="small lh-base text-dark">${descHtml}</div>
                ${weaponHtml}
                ${actionHtml}
                ${imgHtml}
            `;
}

function renderEquipmentSelectModal(playerPrefix) {
    const factionKey = document.getElementById(`${playerPrefix}-faction`).value;
    const playerName = document.querySelector(`.player-${playerPrefix === 'p1' ? '1' : '2'} .name-input`).value.trim() || (playerPrefix === 'p1' ? 'Jugador 1' : 'Jugador 2');
    const factionName = factionTranslations[factionKey] || factionKey;
    const currentEquipList = getPlayerEquipment(playerPrefix);

    // Actualizar cabecera del modal
    const imgEl = document.getElementById('equipModalFactionImg');
    if (imgEl) imgEl.src = `./resources/facciones/${factionKey}.png`;

    const titleEl = document.getElementById('equipModalTitle');
    if (titleEl) titleEl.innerHTML = `<i class="bi bi-tools text-primary me-1"></i>Selección de Equipamiento — ${factionName}`;

    const subTitleEl = document.getElementById('equipModalSubtitle');
    if (subTitleEl) subTitleEl.innerText = `${playerName} — Selección Previa a la Batalla`;

    const playerEl = document.getElementById('equipModalPlayerName');
    if (playerEl) playerEl.innerText = playerName;

    const countEl = document.getElementById('equipModalSelectedCount');
    if (countEl) countEl.innerText = currentEquipList.length;

    const badgeEl = document.getElementById('equipModalCounterBadge');
    if (badgeEl) {
        if (currentEquipList.length === 4) {
            badgeEl.className = 'badge bg-success text-white fs-6 fw-bold shadow-sm';
        } else if (currentEquipList.length > 0) {
            badgeEl.className = 'badge bg-warning text-dark fs-6 fw-bold shadow-sm';
        } else {
            badgeEl.className = 'badge bg-secondary text-white fs-6 fw-bold shadow-sm';
        }
    }

    // Filtrar opciones
    let factionItems = [];
    let universalItems = [];
    if (Array.isArray(dataEquipment)) {
        factionItems = dataEquipment.filter(item => item.faction === factionKey);
        universalItems = dataEquipment.filter(item => item.faction === 'universal');
    }

    const factionTabCount = document.getElementById('equipTabFactionCount');
    if (factionTabCount) factionTabCount.innerText = factionItems.length;

    const universalTabCount = document.getElementById('equipTabUniversalCount');
    if (universalTabCount) universalTabCount.innerText = universalItems.length;

    // Renderizar pestaña de Facción
    const factionPane = document.getElementById('equip-tab-faction');
    if (factionPane) {
        if (factionItems.length === 0) {
            factionPane.innerHTML = '<div class="alert alert-light text-center p-4">No se encontró equipamiento de facción en la base de datos.</div>';
        } else {
            factionItems.sort((a, b) => a.name.localeCompare(b.name));
            factionPane.innerHTML = renderEquipmentGridHtml(factionItems, playerPrefix, currentEquipList, false);
        }
    }

    // Renderizar pestaña Universal
    const universalPane = document.getElementById('equip-tab-universal');
    if (universalPane) {
        if (universalItems.length === 0) {
            universalPane.innerHTML = '<div class="alert alert-light text-center p-4">No se encontró equipamiento universal en la base de datos.</div>';
        } else {
            universalItems.sort((a, b) => a.name.localeCompare(b.name));
            universalPane.innerHTML = renderEquipmentGridHtml(universalItems, playerPrefix, currentEquipList, true);
        }
    }
}

function renderEquipmentGridHtml(items, playerPrefix, currentList, isUniversal) {
    let html = '<div class="row g-3">';
    const reachedLimit = currentList.length >= 4;

    items.forEach(item => {
        const isSelected = currentList.includes(item.id_equip);
        let btnHtml = '';

        if (isSelected) {
            btnHtml = `
                        <button type="button" class="btn btn-success btn-sm fw-bold px-3 shadow-sm" onclick="toggleEquipmentSelection('${playerPrefix}', ${item.id_equip})">
                            <i class="bi bi-check-circle-fill me-1"></i>Seleccionado (Quitar)
                        </button>
                    `;
        } else if (reachedLimit) {
            btnHtml = `
                        <button type="button" class="btn btn-secondary btn-sm fw-bold px-3 disabled" disabled title="Límite de 4 equipamientos alcanzado">
                            <i class="bi bi-slash-circle me-1"></i>Límite 4/4
                        </button>
                    `;
        } else {
            btnHtml = `
                        <button type="button" class="btn btn-outline-primary btn-sm fw-bold px-3 shadow-sm" onclick="toggleEquipmentSelection('${playerPrefix}', ${item.id_equip})">
                            <i class="bi bi-plus-circle me-1"></i>Seleccionar
                        </button>
                    `;
        }

        html += `
                    <div class="col-12 col-lg-6">
                        <div class="card h-100 equip-select-card ${isSelected ? 'is-selected border-success' : 'border-secondary border-opacity-25'} shadow-sm">
                            <div class="card-header ${isSelected ? 'bg-success text-white' : 'bg-dark text-white'} d-flex justify-content-between align-items-center py-2">
                                <span class="fw-bold text-uppercase small"><i class="bi bi-tools me-1"></i>${item.name}</span>
                                <span class="badge ${isSelected ? 'bg-light text-success' : 'bg-secondary text-white'} fw-bold">${isUniversal ? 'Universal' : 'Facción'}</span>
                            </div>
                            <div class="card-body bg-light p-3 d-flex flex-column justify-content-between">
                                <div class="mb-3">
                                    ${buildEquipmentCardInnerHtml(item)}
                                </div>
                                <div class="d-flex justify-content-between align-items-center pt-2 border-top bg-light mt-auto">
                                    <small class="text-muted fst-italic">${isUniversal ? 'Equipo Global' : 'Exclusivo Facción'}</small>
                                    ${btnHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    });

    html += '</div>';
    return html;
}

function toggleEquipmentSelection(playerPrefix, equipId) {
    const list = getPlayerEquipment(playerPrefix);
    const index = list.indexOf(equipId);
    const item = dataEquipment.find(e => e.id_equip === equipId);
    const itemName = item ? item.name : 'Equipamiento';

    if (index !== -1) {
        // Deseleccionar
        list.splice(index, 1);
        updateSelectedEquipmentDisplay(playerPrefix);
        renderEquipmentSelectModal(playerPrefix);
        saveGameState();
        mostrarNotificacion(`"${itemName}" eliminado de la selección.`);
    } else {
        // Seleccionar
        if (list.length >= 4) {
            mostrarNotificacion("Límite alcanzado: Máximo 4 opciones de equipamiento por comando.");
            return;
        }
        list.push(equipId);
        updateSelectedEquipmentDisplay(playerPrefix);
        renderEquipmentSelectModal(playerPrefix);
        saveGameState();
        mostrarNotificacion(`"${itemName}" seleccionado (${list.length}/4).`);
    }
}

function syncEquipSectionsHeight() {
    const c1 = document.getElementById('p1-selected-equipment-container');
    const c2 = document.getElementById('p2-selected-equipment-container');
    if (!c1 || !c2) return;

    if (window.innerWidth < 768) {
        c1.style.minHeight = 'auto';
        c2.style.minHeight = 'auto';
        return;
    }

    c1.style.minHeight = 'auto';
    c2.style.minHeight = 'auto';

    requestAnimationFrame(() => {
        const h1 = c1.scrollHeight || c1.offsetHeight;
        const h2 = c2.scrollHeight || c2.offsetHeight;
        const maxH = Math.max(h1, h2, 44);

        c1.style.minHeight = `${maxH}px`;
        c2.style.minHeight = `${maxH}px`;
    });
}

function updateSelectedEquipmentDisplay(playerPrefix) {
    const container = document.getElementById(`${playerPrefix}-selected-equipment-container`);
    const countBadge = document.getElementById(`${playerPrefix}-selected-equip-count`);
    const selectBtn = document.getElementById(`${playerPrefix}-btn-select-equip`);
    const factionKey = document.getElementById(`${playerPrefix}-faction`)?.value;

    if (selectBtn) {
        selectBtn.disabled = !factionKey || !dataFactions[factionKey];
    }

    if (!container) return;

    const list = getPlayerEquipment(playerPrefix);

    if (countBadge) {
        countBadge.innerText = list.length;
    }

    if (list.length === 0) {
        container.innerHTML = '<div class="d-flex align-items-center justify-content-center h-100 py-2"><small class="text-muted fst-italic text-center">Ningún equipamiento seleccionado (hasta 4).</small></div>';
        syncEquipSectionsHeight();
        return;
    }

    let html = '';
    list.forEach(equipId => {
        const item = dataEquipment.find(e => e.id_equip === equipId);
        if (!item) return;

        const isUniversal = item.faction === 'universal';
        const hasWeapons = item.weapon && item.weapon.length > 0;
        const hasActions = item.action && item.action.length > 0;

        html += `
                <!-- Indexador: Equipamiento Helper v1.0 -->
                    <div class="active-equip-card p-2 bg-white rounded border ${playerPrefix === 'p1' ? 'border-primary' : 'border-danger'} border-opacity-50 shadow-sm">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-1 overflow-hidden">
                                <button type="button" class="btn btn-outline-danger btn-sm py-0 px-1 border-0" 
                                    onclick="toggleEquipmentSelection('${playerPrefix}', ${item.id_equip})" title="Quitar equipamiento">
                                    <i class="bi bi-x-circle-fill"></i>
                                </button>
                                <span class="badge ${isUniversal ? 'bg-secondary' : (playerPrefix === 'p1' ? 'bg-primary' : 'bg-danger')} text-white" style="font-size: 0.7rem;">
                                    ${isUniversal ? 'Universal' : 'Facción'}
                                </span>
                                <span class="fw-bold text-dark small text-truncate" style="font-size: 1rem;" title="${item.name}">${item.name}</span>
                                ${hasWeapons ? '<span class="badge bg-dark" style="font-size: 0.85rem;" title="Armas"><i class="bi bi-crosshair"></i></span>' : ''}
                                ${hasActions ? '<span class="badge bg-warning text-dark" style="font-size: 0.6rem;" title="Acción Única"><i class="bi bi-lightning-fill"></i></span>' : ''}
                            </div>
                            <div class="d-flex align-items-center gap-1 flex-shrink-0">
                                <button type="button" class="btn btn-outline-dark btn-sm py-0 px-4" style="font-size: 1.15rem;" 
                                    onclick="showEquipmentDetails(${item.id_equip})" title="Ver detalles y reglas completas">
                                    <i class="bi bi-eye-fill"></i>
                                </button>
                                
                            </div>
                        </div>
                    </div>
                `;
    });

    container.innerHTML = html;
    syncEquipSectionsHeight();
}

function showEquipmentDetails(equipId) {
    const item = dataEquipment.find(e => e.id_equip === equipId);
    if (!item) return;

    const modalTitleEl = document.getElementById('equipDetailModalTitle');
    const modalBodyEl = document.getElementById('equipDetailModalBody');

    const isUniversal = item.faction === 'universal';
    const factionName = isUniversal ? 'Equipamiento Universal' : (factionTranslations[item.faction] || item.faction);

    if (modalTitleEl) {
        modalTitleEl.innerHTML = `<i class="bi bi-tools text-primary me-2"></i>${item.name} <span class="badge ${isUniversal ? 'bg-secondary' : 'bg-primary'} fs-6 ms-2">${isUniversal ? 'Universal' : factionName}</span>`;
    }

    if (modalBodyEl) {
        modalBodyEl.innerHTML = `
                    <div class="p-2 bg-white rounded">
                        ${buildEquipmentCardInnerHtml(item)}
                    </div>
                `;
    }

    const modal = new bootstrap.Modal(document.getElementById('equipmentDetailModal'));
    modal.show();
}

// 4. (Opcional pero recomendado) Función de validación masiva si el usuario cambia de turno hacia atrás
function validateAllScores() {
    ['p1', 'p2'].forEach(playerPrefix => {
        let currentTurn = getCurrentTurn();

        // Revisar CritOp
        let critEl = document.getElementById(`${playerPrefix}-crit-vp`);
        let critKey = document.getElementById('global-critop').value;
        if (critEl && critKey) {
            let limit = calculateDynamicLimit('crit', critKey, currentTurn);
            if (parseInt(critEl.innerText) > limit) critEl.innerText = limit;
        }

        // Revisar TacOp
        let tacEl = document.getElementById(`${playerPrefix}-tac-vp`);
        let tacKey = document.getElementById(`${playerPrefix}-tacop`)?.value;
        if (tacEl && tacKey) {
            let limit = calculateDynamicLimit('tac', tacKey, currentTurn);
            if (parseInt(tacEl.innerText) > limit) tacEl.innerText = limit;
        }
    });
    calculateTotals();
}

// --- SISTEMA DE NOTIFICACIONES ---
function mostrarNotificacion(mensaje) {
    const toastEl = document.getElementById('limitToast');
    const toastMessage = document.getElementById('toastMessage');

    // Cambiamos el texto de la notificación
    toastMessage.innerText = mensaje;

    // Inicializamos y mostramos el Toast usando Bootstrap
    const toast = new bootstrap.Toast(toastEl, { delay: 4000 }); // Desaparece en 4 segundos
    toast.show();
}

// --- SISTEMA DE VISUALIZACIÓN DE REGLAS (TARJETA CRITOP) ---
function showCritOpDetails() {
    const selectEl = document.getElementById('global-critop');
    const critKey = selectEl.value;

    // Si el jugador intenta ver info sin seleccionar misión
    if (!critKey) {
        mostrarNotificacion("Falta selección: Por favor, selecciona primero la Misión Crítica (CritOp) para leer sus detalles.");
        return;
    }

    const op = dataCritOps[critKey];
    if (!op) return;

    // 1. Manejo de Reglas Adicionales (Opcional)
    let additionalRulesHtml = '';
    if (op.aditional_rules) {
        additionalRulesHtml = `
                    <div class="victory-points mb-3">
                        <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Reglas Adicionales</div>
                        <div class="small text-start text-muted lh-sm">${op.aditional_rules}</div>
                    </div>
                `;
    }

    // 2. Manejo de las Acciones de Misión
    let actionHtml = '';
    if (op.action_mission && op.action_mission.length > 0) {
        // Iteramos por si hay más de una acción (como en la misión "Datos")
        op.action_mission.forEach(am => {
            if (am.action_mission_name) {
                actionHtml += `
                            <div class="sub-header mt-3 text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Acción de Misión</div>
                            <div class="unique-actions-section mb-3 shadow-sm rounded">
                                <div class="header d-flex justify-content-between align-items-center bg-dark text-white p-2 rounded-top">
                                    <div class="fw-bold">${am.action_mission_name}</div>
                                    <div class="ap-box bg-secondary px-2 rounded small">${am.action_mission_cost}</div>
                                </div>
                                <div class="content p-3 border border-top-0 rounded-bottom text-start small bg-white">
                                    ${am.action_mission_yes ? `
                                    <p class="mb-2 d-flex align-items-start">
                                        <span class="icon icon-yes flex-shrink-0 mt-1"></span> 
                                        <span>${am.action_mission_yes}</span>
                                    </p>` : ''}
            
                                    ${am.action_mission_no ? `
                                    <p class="mb-0 d-flex align-items-start">
                                        <span class="icon icon-no flex-shrink-0 mt-1"></span> 
                                        <span>${am.action_mission_no}</span>
                                    </p>` : ''}
                                </div>
                            </div>
                        `;
            }
        });
    }

    // 3. Manejo de los Puntos de Victoria (Ojo con el nombre de la variable en tu JSON: victoy_points)
    let vpHtml = '';
    if (op.victoy_points) {
        vpHtml = `
                    <div class="victory-points mt-auto">
                        <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Puntos de Victoria</div>
                        <div class="small text-start lh-sm">${op.victoy_points}</div>
                    </div>
                `;
    }

    // 4. Armar el título del Modal (Simple, ya que la tarjeta lleva el título principal)
    document.getElementById('critOpModalTitle').innerHTML = `
                <i class="bi bi-info-circle-fill text-warning me-2"></i>Detalles de Misión
            `;

    // 5. Inyectar la Tarjeta idéntica a critops.html en el cuerpo del Modal
    const bodyEl = document.getElementById('critOpModalBody');
    bodyEl.innerHTML = `
                <div class="card shadow border-0 bg-light mx-auto" style="max-width: 600px;">
                    <div class="position-relative text-white p-2 rounded-top fw-bold d-flex align-items-center justify-content-center shadow-sm" style="background-color: #ff5418; font-size: 1.1rem;">
                        <div class="ap-box bg-dark px-2 rounded small">${op.id}</div>
                        <span>&nbsp&nbspCRIT OP</span>
                    </div>
            
                    <div class="p-4 d-flex flex-column h-100 bg-white border border-top-0 rounded-bottom text-center">
                        <h4 class="name fw-bold text-dark mb-4 text-uppercase">${op.name_es}</h4>
                        <div class="mission-container pt-0 flex-grow-1 d-flex flex-column text-start">
                            ${additionalRulesHtml}
                            ${actionHtml}
                            ${vpHtml}
                        </div>
                    </div>
                </div>
            `;

    // 6. Mostrar el Modal
    const modal = new bootstrap.Modal(document.getElementById('critOpInfoModal'));
    modal.show();
}

// --- SISTEMA DE VISUALIZACIÓN DE REGLAS DE FACCIÓN, ARDIDES Y EQUIPAMIENTO ---
function showFactionRules(playerPrefix) {
    const selectEl = document.getElementById(`${playerPrefix}-faction`);
    const factionKey = selectEl ? selectEl.value : "";

    if (!factionKey) {
        mostrarNotificacion("Falta selección: Por favor, selecciona primero tu Facción.");
        return;
    }

    const factionName = factionTranslations[factionKey] || factionKey;
    const modalTitleEl = document.getElementById('factionModalTitle');
    const modalImgEl = document.getElementById('factionModalImg');
    const modalArchetypesEl = document.getElementById('factionModalArchetypes');

    if (modalTitleEl) modalTitleEl.textContent = factionName;
    if (modalImgEl) modalImgEl.src = `./resources/facciones/${factionKey}.png`;

    // 1. Arquetipos
    const allowedArchetypes = dataFactions[factionKey]?.archetypes || [];
    const translatedArchs = allowedArchetypes.map(a => archetypeTranslations[a] || a).join(' • ');
    if (modalArchetypesEl) modalArchetypesEl.textContent = `Arquetipos: ${translatedArchs || 'N/A'}`;

    // 2. Tab: Reglas y Habilidades
    const rulesPane = document.getElementById('faction-tab-rules');
    if (rulesPane) {
        const teamItems = dataRacial[factionKey] || [];
        let htmlRules = '';

        if (Array.isArray(teamItems) && teamItems.length > 0) {
            // Roster / Composición de equipo
            teamItems.filter(item => item.type === "team").forEach(item => {
                htmlRules += `
                            <div class="card mb-3 border-dark shadow-sm">
                                <div class="card-header bg-dark text-white fw-bold d-flex align-items-center">
                                    <i class="bi bi-people-fill me-2"></i>Composición de Equipo: ${item.name || 'Agentes'}
                                </div>
                                <div class="card-body bg-white small lh-base">
                                    ${item.description}
                                </div>
                            </div>
                        `;
            });

            // Habilidades raciales / de facción
            const racialAbilities = teamItems.filter(item => item.type === "racial" && item.name !== "Arquetipos");
            if (racialAbilities.length > 0) {
                racialAbilities.forEach(rule => {
                    htmlRules += `
                                <div class="card mb-3 border-success border-opacity-50 shadow-sm">
                                    <div class="card-header bg-success text-white fw-bold d-flex align-items-center">
                                        <i class="bi bi-shield-shaded me-2"></i>${rule.name}
                                    </div>
                                    <div class="card-body bg-white small lh-base">
                                        ${rule.description}
                                    </div>
                                </div>
                            `;
                });
            }
        }

        if (!htmlRules) {
            htmlRules = '<div class="alert alert-light text-center p-4">No hay reglas especiales registradas para esta facción.</div>';
        }
        rulesPane.innerHTML = htmlRules;
    }

    // 3. Tab: Ardides (Ploys)
    const ploysPane = document.getElementById('faction-tab-ploys');
    if (ploysPane) {
        let ploysList = [];
        if (Array.isArray(dataPloys)) {
            ploysList = dataPloys.filter(p => p.faction === factionKey);
        }

        if (ploysList.length === 0) {
            ploysPane.innerHTML = '<div class="alert alert-light text-center p-4">No hay ardides registrados para esta facción.</div>';
        } else {
            // Ordenar: Estratégicos primero, luego Tiroteo
            ploysList.sort((a, b) => (a.type || '').localeCompare(b.type || ''));

            let strategicHtml = '';
            let tacticalHtml = '';

            ploysList.forEach(ploy => {
                const isStrat = ploy.type === 'strategic';
                const cardHtml = `
                            <div class="col-12 col-md-6 mb-3">
                                <div class="card h-100 shadow-sm border ${isStrat ? 'border-warning' : 'border-info'}">
                                    <div class="card-header ${isStrat ? 'bg-dark text-white' : 'bg-secondary text-white'} d-flex justify-content-between align-items-center py-2">
                                        <span class="fw-bold text-uppercase small">${ploy.name}</span>
                                        <span class="badge ${isStrat ? 'bg-warning text-dark' : 'bg-info text-dark'} fw-bold">${ploy.cps || '1 PM'}</span>
                                    </div>
                                    <div class="card-body bg-white p-3">
                                        <span class="badge ${isStrat ? 'bg-warning-subtle text-warning-emphasis border border-warning' : 'bg-info-subtle text-info-emphasis border border-info'} mb-2 small">
                                            ${isStrat ? 'Ardid de Estrategia' : 'Ardid de Tiroteo'}
                                        </span>
                                        <div class="card-text small lh-sm text-dark">${ploy.description}</div>
                                    </div>
                                </div>
                            </div>
                        `;
                if (isStrat) strategicHtml += cardHtml;
                else tacticalHtml += cardHtml;
            });

            ploysPane.innerHTML = `
                        <div class="mb-3">
                            <h6 class="fw-bold text-warning-emphasis border-bottom pb-1"><i class="bi bi-hourglass-split me-1"></i>Ardides de Estrategia (Fase de Estrategia / Gambito)</h6>
                            <div class="row">${strategicHtml || '<p class="small text-muted ps-3">Ninguno</p>'}</div>
                        </div>
                        <div>
                            <h6 class="fw-bold text-info-emphasis border-bottom pb-1"><i class="bi bi-crosshair me-1"></i>Ardides de Tiroteo (Fase de Tiroteo / Activaciones)</h6>
                            <div class="row">${tacticalHtml || '<p class="small text-muted ps-3">Ninguno</p>'}</div>
                        </div>
                    `;
        }
    }

    // 4. Tab: Equipamiento
    const equipPane = document.getElementById('faction-tab-equip');
    if (equipPane) {
        let equipList = [];
        if (Array.isArray(dataEquipment)) {
            equipList = dataEquipment.filter(item => item.faction === factionKey);
        } else if (dataEquipment && dataEquipment[factionKey]) {
            equipList = dataEquipment[factionKey];
        }

        if (!equipList || equipList.length === 0) {
            equipPane.innerHTML = '<div class="alert alert-light text-center p-4">Esta facción no posee equipamiento registrado en la base de datos.</div>';
        } else {
            equipList.sort((a, b) => a.name.localeCompare(b.name));
            let htmlEquip = '<div class="row">';

            equipList.forEach(item => {
                let descHtml = Array.isArray(item.description)
                    ? item.description.map(line => `<p class="mb-1">${line}</p>`).join('')
                    : `<p class="mb-1">${item.description}</p>`;

                // Armas (si el arreglo 'weapon' existe y tiene elementos)
                let weaponHtml = '';
                if (item.weapon && item.weapon.length > 0) {
                    const rowsHtml = item.weapon.map(w => `
                                <tr>
                                    <td class="fw-bold text-start">${w.w_name}</td>
                                    <td class="text-center">${w.ATK}</td>
                                    <td class="text-center">${w.HIT}</td>
                                    <td class="text-center">${w.DMG}</td>
                                    <td class="text-start fst-italic">${w.rules || '-'}</td>
                                </tr>
                            `).join('');

                    weaponHtml = `
                            <div class="equip-weapon-table mt-3">
                                <table class="table table-sm table-dark table-bordered mb-0">
                                    <thead>
                                        <tr class="text-center">
                                            <th class="text-start">NOMBRE</th>
                                            <th>ATAQ.</th>
                                            <th>IMP.</th>
                                            <th>DAÑO</th>
                                            <th class="text-start">REGLAS DE ARMAS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${rowsHtml}
                                    </tbody>
                                </table>
                            </div>`;
                }

                const actionHtml = item.action?.length ?
                    item.action.map(a => {
                        const descYes = Array.isArray(a.action_yes)
                            ? a.action_yes.map(line => `
                                    <p class="mb-1 d-flex align-items-start">
                                        <span class="icon icon-yes flex-shrink-0 mt-1"></span> 
                                        <span>${line}</span>
                                    </p>`).join('')
                            : `<p class="mb-1 d-flex align-items-start"><span class="icon icon-yes flex-shrink-0 mt-1"></span> <span>${a.action_yes}</span></p>`;

                        const descNo = a.action_no ? `
                                <p class="mb-0 d-flex align-items-start">
                                    <span class="icon icon-no flex-shrink-0 mt-1"></span> 
                                    <span>${a.action_no}</span>
                                </p>` : '';

                        return `
                            <div class="crit-op mt-3" data-type="action">
                                <div class="header">
                                    <div>${a.action_name}</div>
                                    <div class="ap-box">${a.action_cost}</div>
                                </div>
                                <div class="content bg-white">
                                    ${descYes}
                                    ${descNo}
                                </div>
                            </div>`;
                    }).join('') : '';

                htmlEquip += `
                            <div class="col-12 col-md-6 mb-4">
                                <div class="equipment-card h-100 shadow-sm border border-danger rounded overflow-hidden">
                                    <div class="p-2 bg-danger text-white text-center">
                                        <h6 class="mb-0 fw-bold text-uppercase">${item.name}</h6>
                                    </div>
                                    <div class="p-3 bg-light text-dark">
                                        <div class="equipment-description small">
                                            ${descHtml}
                                        </div>
                                        ${weaponHtml}
                                        ${actionHtml}
                                    </div>
                                </div>
                            </div>
                        `;
            });

            htmlEquip += '</div>';
            equipPane.innerHTML = htmlEquip;
        }
    }

    // Resetear a la primera pestaña de Reglas
    const firstTabBtn = document.getElementById('faction-tab-rules-btn');
    if (firstTabBtn) {
        const tabInstance = new bootstrap.Tab(firstTabBtn);
        tabInstance.show();
    }

    // Mostrar el Modal
    const modal = new bootstrap.Modal(document.getElementById('factionRulesModal'));
    modal.show();
}

// --- SISTEMA DE VISUALIZACIÓN DE REGLAS (TARJETA TACOP) ---
function showTacOpDetails(playerPrefix) {
    const selectEl = document.getElementById(`${playerPrefix}-tacop`);
    const tacKey = selectEl.value;

    if (!tacKey) {
        mostrarNotificacion("Falta selección: Por favor, selecciona primero tu Operación Táctica.");
        return;
    }

    const op = dataTacOps[tacKey];
    if (!op) return;

    // Colores e iconos por arquetipo (Misma lógica de tacops.html)
    const archName = archetypeTranslations[op.archetype] || op.archetype;

    function getCustomColor(archetype) {
        switch (archetype) {
            case 'recon': return '#f05c22';
            case 'security': return '#0b6be1';
            case 'infiltration': return '#5f5f5f';
            case 'seek-destroy': return '#bd0003';
            default: return '#6c757d';
        }
    }

    function getArchetypeIcon(archetype) {
        switch (archetype) {
            case 'recon': return './resources/game_rules_files/recon.svg';
            case 'security': return './resources/game_rules_files/security.svg';
            case 'infiltration': return './resources/game_rules_files/infiltration.svg';
            case 'seek-destroy': return './resources/game_rules_files/seek-destroy.svg';
            default: return '';
        }
    }

    // 1. Manejo de Reglas Adicionales
    let additionalRulesHtml = '';
    if (op.additional_rules) {
        if (Array.isArray(op.additional_rules)) {
            additionalRulesHtml = `
                        <div class="victory-points mb-3">
                            <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Reglas Adicionales</div>
                            <ul class="small text-start text-muted ps-3 mb-0">${op.additional_rules.map(r => `<li>${r}</li>`).join('')}</ul>
                        </div>`;
        } else {
            additionalRulesHtml = `
                        <div class="victory-points mb-3">
                            <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Reglas Adicionales</div>
                            <p class="text-muted small text-start mb-0">${op.additional_rules}</p>
                        </div>`;
        }
    }

    // 2. Manejo de Acción de Misión
    let actionHtml = '';
    if (op.action_mission_name) {
        actionHtml = `
                    <div class="sub-header mt-3 text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Acción de Misión</div>
                    <div class="unique-actions-section mb-3 shadow-sm rounded">
                        <div class="header d-flex justify-content-between align-items-center bg-dark text-white p-2 rounded-top">
                            <div class="fw-bold">${op.action_mission_name}</div>
                            <div class="ap-box bg-secondary px-2 rounded small">${op.action_mission_cost}</div>
                        </div>
                        <div class="content p-3 border border-top-0 rounded-bottom text-start small bg-white">
                            ${op.action_mission_yes ? `
                            <p class="mb-2 d-flex align-items-start">
                                <span class="icon icon-yes flex-shrink-0 mt-1"></span> 
                                <span>${op.action_mission_yes}</span>
                            </p>` : ''}
    
                            ${op.action_mission_no ? `
                            <p class="mb-0 d-flex align-items-start">
                                <span class="icon icon-no flex-shrink-0 mt-1"></span> 
                                <span>${op.action_mission_no}</span>
                            </p>` : ''}
                        </div>
                    </div>
                `;
    }

    // 3. Manejo de Puntos de Victoria (Soporta Arrays)
    let vpHtml = '';
    if (op.victoy_points) {
        if (Array.isArray(op.victoy_points)) {
            const vpList = [...op.victoy_points];
            let limitText = '';
            // Si el último elemento es un límite de texto, lo separamos para pintarlo rojo
            if (vpList[vpList.length - 1] && vpList[vpList.length - 1].includes("No puedes obtener más de")) {
                limitText = `<p class="fst-italic text-danger small mt-2 mb-0 text-start">${vpList.pop()}</p>`;
            }
            vpHtml = `
                        <div class="victory-points mt-auto">
                            <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Puntos de Victoria</div>
                            <ul class="text-start small mb-1 ps-3 text-muted">${vpList.map(vp => `<li>${vp}</li>`).join('')}</ul>
                            ${limitText}
                        </div>`;
        } else {
            vpHtml = `
                        <div class="victory-points mt-auto">
                            <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Puntos de Victoria</div>
                            <p class="small mb-0 text-start text-muted">${op.victoy_points}</p>
                        </div>`;
        }
    }

    // 4. Armar Modal
    document.getElementById('tacOpModalTitle').innerHTML = `
                <i class="bi bi-bookmark-star-fill text-primary me-2"></i>Detalles de TacOp
            `;

    const bodyEl = document.getElementById('tacOpModalBody');
    bodyEl.innerHTML = `
                <div class="card shadow border-0 bg-light mx-auto" style="max-width: 600px;">
                    <div class="position-relative text-white p-2 rounded-top fw-bold d-flex align-items-center justify-content-center shadow-sm" style="background-color: ${getCustomColor(op.archetype)}; font-size: 1.1rem;">
                        <img src="${getArchetypeIcon(op.archetype)}" class="svg-white" alt="Icono" style="width: 1.5rem; height: 1.5rem; margin-right: 8px; filter: brightness(0) invert(1);">
                        <span>${archName.toUpperCase()}</span>
                    </div>
    
                    <div class="p-4 d-flex flex-column h-100 bg-white border border-top-0 rounded-bottom text-center">
                        <h4 class="name fw-bold text-dark mb-3 text-uppercase">${op.name}</h4>
                        <div class="mission-container pt-0 flex-grow-1 d-flex flex-column text-start">
                            <div class="victory-points mb-3">
                                <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Revelar</div>
                                <div class="small text-start text-muted">${op.Reveal}</div>
                            </div>
                            ${additionalRulesHtml}
                            ${actionHtml}
                            ${vpHtml}
                        </div>
                    </div>
                </div>
            `;

    // 5. Mostrar Modal
    const modal = new bootstrap.Modal(document.getElementById('tacOpInfoModal'));
    modal.show();
}

// --- SISTEMA DE AUTOGUARDADO (LOCALSTORAGE) ---

function saveGameState() {

    // NUEVO: Si la aplicación está restaurando datos antiguos o los JSON no han cargado, no guardamos estados corruptos
    if (gameState.loading || Object.keys(dataFactions).length === 0) return;

    // Si los datos aún no cargan de los JSON, no guardamos estados vacíos
    if (Object.keys(dataFactions).length === 0) return;

    const state = {
        globalCritOp: document.getElementById('global-critop') ? document.getElementById('global-critop').value : "",
        tp: document.querySelector('input[name="tpRadio"]:checked').id,
        internalGameState: gameState,
        p1: getPlayerState('p1'),
        p2: getPlayerState('p2')
    };

    // Guardamos todo en formato JSON en el navegador
    localStorage.setItem('killTeamMatchState', JSON.stringify(state));
}

function getPlayerState(p) {
    // Para identificar si es Jugador 1 o Jugador 2 en la clase CSS del input
    const playerClass = p === 'p1' ? '1' : '2';

    return {
        name: document.querySelector(`.player-${playerClass} .name-input`).value,
        faction: document.getElementById(`${p}-faction`).value,
        tacop: document.getElementById(`${p}-tacop`).value,
        // Detectamos el estado de la TacOp leyendo la interfaz visual
        tacopLocked: !document.getElementById(`${p}-tacop-container`).classList.contains('d-flex'),
        tacopRevealed: !document.getElementById(`${p}-revealed-badge-container`).classList.contains('d-none'),
        cp: document.getElementById(`${p}-cp`).innerText,
        critVp: document.getElementById(`${p}-crit-vp`).innerText,
        tacVp: document.getElementById(`${p}-tac-vp`).innerText,
        enemySize: document.getElementById(`${p}-enemy-size`).value,
        kills: document.getElementById(`${p}-kills`).innerText,
        strategicPloys: (gameState[p] && gameState[p].strategicPloys) ? gameState[p].strategicPloys : { 1: [], 2: [], 3: [], 4: [] },
        equipment: getPlayerEquipment(p)
    };
}

function loadGameState() {
    const savedStateStr = localStorage.getItem('killTeamMatchState');

    if (!savedStateStr) return;

    try {
        gameState.loading = true; // <-- NUEVO: Encender bandera antes de tocar el DOM
        const state = JSON.parse(savedStateStr);

        // 1. Restaurar Globals
        if (state.globalCritOp) document.getElementById('global-critop').value = state.globalCritOp;
        if (state.tp) document.getElementById(state.tp).checked = true;

        // Conservar la propiedad loading al restaurar el estado interno
        if (state.internalGameState) {
            gameState = state.internalGameState;
            gameState.loading = true;
        }

        // 2. Restaurar Jugadores
        restorePlayerState('p1', state.p1);
        restorePlayerState('p2', state.p2);

        // 3. Restaurar Interfaz de Operaciones Primarias Secretas
        if (gameState.revealed) {
            document.getElementById('p1-btn-secret').classList.add('d-none');
            document.getElementById('p2-btn-secret').classList.add('d-none');
            document.getElementById('btn-reveal-global').classList.add('d-none');

            const mapNames = { 'critop': 'Crit Op', 'tacop': 'Tac Op', 'killop': 'Kill Op' };

            ['p1', 'p2'].forEach(p => {
                let pBadge = document.getElementById(`${p}-revealed-primary`);
                pBadge.innerText = mapNames[gameState[p].primary];
                pBadge.classList.remove('d-none');
                document.getElementById(`${p}-primary-bonus-display`).classList.remove('d-none');
            });
        } else {
            ['p1', 'p2'].forEach(p => {
                if (gameState[p] && gameState[p].primary) {
                    const btn = document.getElementById(`${p}-btn-secret`);
                    btn.classList.remove('btn-warning');
                    btn.classList.add('btn-success');
                    btn.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Fijada 🔒';
                }
            });
        }

        gameState.loading = false; // <-- NUEVO: Apagar bandera, la UI ya es estable y fiel al guardado
        mostrarNotificacion("Partida cargada exitosamente.");
    } catch (e) {
        gameState.loading = false; // <-- NUEVO: Asegurar apagado si el JSON está corrupto
        console.error("Error cargando partida guardada:", e);
        localStorage.removeItem('killTeamMatchState');
    }
}

function restorePlayerState(p, pState) {
    if (!pState) return;

    const playerClass = p === 'p1' ? '1' : '2';
    document.querySelector(`.player-${playerClass} .name-input`).value = pState.name || "";

    if (pState.faction) {
        document.getElementById(`${p}-faction`).value = pState.faction;
        updateTacOps(p); // Reconstruye el selector y la imagen
    }

    if (pState.tacop) {
        document.getElementById(`${p}-tacop`).value = pState.tacop;
        enableTacOpLock(p);
    }

    // Restaurar los estados visuales que updateTacOps reseteó
    if (pState.tacopRevealed) {
        lockTacOp(p);
        revealTacOp(p);
    } else if (pState.tacopLocked) {
        lockTacOp(p);
    }

    // Restaurar contadores
    document.getElementById(`${p}-cp`).innerText = pState.cp || "2";
    document.getElementById(`${p}-crit-vp`).innerText = pState.critVp || "0";
    document.getElementById(`${p}-tac-vp`).innerText = pState.tacVp || "0";

    if (pState.enemySize) {
        document.getElementById(`${p}-enemy-size`).value = pState.enemySize;
    }

    document.getElementById(`${p}-kills`).innerText = pState.kills || "0";

    // Restaurar ardides estratégicos
    if (!gameState[p]) {
        gameState[p] = { primary: null, strategicPloys: { 1: [], 2: [], 3: [], 4: [] }, equipment: [] };
    }
    if (pState.strategicPloys) {
        gameState[p].strategicPloys = pState.strategicPloys;
    }
    updateActiveStrategicPloysDisplay(p);

    // Restaurar equipamiento
    if (pState.equipment && Array.isArray(pState.equipment)) {
        gameState[p].equipment = pState.equipment;
    } else if (!gameState[p].equipment) {
        gameState[p].equipment = [];
    }
    updateSelectedEquipmentDisplay(p);
}

// Ejecutar la carga cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeMatchData();

    // Detectar cuando el usuario cambia su nombre para guardarlo
    document.querySelectorAll('.name-input').forEach(input => {
        input.addEventListener('blur', saveGameState);
    });

    // Sincronizar altura de bloques al redimensionar ventana
    window.addEventListener('resize', () => {
        syncStratSectionsHeight();
        syncEquipSectionsHeight();
    });
});

function validarSeleccionFacciom(event, playerPrefix) {
    const factionSelect = document.getElementById(`${playerPrefix}-faction`);

    // Si el valor está vacío (es decir, sigue en la opción por defecto)
    if (!factionSelect.value) {
        event.preventDefault(); // Evita que el <select> se despliegue
        mostrarNotificacion("Debes elegir una facción para poder seleccionar una TacOp.");
    }
}

// --- SISTEMA DE REFERENCIA RÁPIDA DE ARMAS ---

function populateWeaponRules() {
    const container = document.getElementById('weaponRulesBody');
    if (!container) return;

    let html = '<div class="list-group list-group-flush">';

    // Convertir el objeto a un array, ordenarlo alfabéticamente y generar el HTML
    const sortedKeys = Object.keys(dataWeapons).sort((a, b) =>
        dataWeapons[a].name.localeCompare(dataWeapons[b].name)
    );

    sortedKeys.forEach(key => {
        const rule = dataWeapons[key];
        // Renderizamos usando únicamente los campos solicitados: name, uso y description_corta
        html += `
        <div class="list-group-item list-group-item-action weapon-rule-item py-3">
            <div class="d-flex w-100 justify-content-between align-items-center mb-1">
                <h6 class="mb-0 fw-bold text-dark">${rule.name}</h6>
                <span class="badge bg-secondary text-uppercase" style="font-size: 0.7rem;">${rule.uso}</span>
            </div>
            <p class="mb-0 small text-muted lh-sm">${rule.description_corta}</p>
        </div>`;
    });

    html += '</div>';
    container.innerHTML = html;
}

// Función de filtro en tiempo real para la barra de búsqueda del Modal
function filterWeaponRules() {
    const term = document.getElementById('weaponSearch').value.toLowerCase();
    const items = document.querySelectorAll('.weapon-rule-item');

    items.forEach(item => {
        // Busca coincidencias tanto en el nombre como en la descripción o el uso
        const text = item.innerText.toLowerCase();
        if (text.includes(term)) {
            item.classList.remove('d-none');
            item.classList.add('d-block');
        } else {
            item.classList.remove('d-block');
            item.classList.add('d-none');
        }
    });
}

// 1. Población del Selector de Killzone
function populateKillzonesDropdown() {
    const select = document.getElementById('killzoneSelect');
    if (!select || !dataMaps) return;

    for (const [key, killzone] of Object.entries(dataMaps)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = killzone.name;
        select.appendChild(option);
    }
}

// 2. Lógica de Cascada Estricta (Killzone -> Mapas)
function updateMapOptions() {
    const killzoneKey = document.getElementById('killzoneSelect').value;
    const mapSelect = document.getElementById('mapSelect');
    const btnRandomMap = document.getElementById('btnRandomMap');
    const btnViewMap = document.getElementById('btnViewMap');
    const btnViewTerrain = document.getElementById('btnViewTerrain');

    mapSelect.innerHTML = '<option value="" selected disabled>-- Selecciona Mapa Manualmente --</option>';

    if (!killzoneKey) {
        mapSelect.disabled = true;
        btnRandomMap.disabled = true;
        btnViewMap.disabled = true;
        btnViewTerrain.disabled = true;
        return;
    }

    // Activar los botones si hay una Killzone válida
    mapSelect.disabled = false;
    btnRandomMap.disabled = false;
    btnViewMap.disabled = false;

    const killzone = dataMaps[killzoneKey];
    // Activar el botón de terrenos SÓLO si existen datos válidos
    if (killzone && Array.isArray(killzone.terrain) && killzone.terrain.length > 0) {
        btnViewTerrain.disabled = false;
    } else {
        btnViewTerrain.disabled = true;
    }

    if (killzone && killzone.maps) {
        killzone.maps.forEach((m, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Mapa ${m.m_id}`;
            mapSelect.appendChild(option);
        });
    }
}

// 3. Motores de Aleatorización
function randomizeCritOp() {
    const select = document.getElementById('global-critop');
    const options = Array.from(select.options).filter(opt => !opt.disabled && opt.value !== "");
    if (options.length > 0) {
        const randomOpt = options[Math.floor(Math.random() * options.length)];
        select.value = randomOpt.value;
        select.dispatchEvent(new Event('change')); // Disparamos tu validador de puntuaciones
    }
}

function randomizeKillzone() {
    const select = document.getElementById('killzoneSelect');
    const options = Array.from(select.options).filter(opt => !opt.disabled && opt.value !== "");
    if (options.length > 0) {
        const randomOpt = options[Math.floor(Math.random() * options.length)];
        select.value = randomOpt.value;
        updateMapOptions(); // Vital: Obligamos a la UI a pintar los mapas de esta Killzone
    }
}

function randomizeMap() {
    const killzoneKey = document.getElementById('killzoneSelect').value;

    // Autocorrección UX: Si no hay Killzone elegida, aleatorizar ambas cosas.
    if (!killzoneKey) {
        randomizeKillzone();
    }

    const select = document.getElementById('mapSelect');
    const options = Array.from(select.options).filter(opt => !opt.disabled && opt.value !== "");
    if (options.length > 0) {
        const randomOpt = options[Math.floor(Math.random() * options.length)];
        select.value = randomOpt.value;
    }
}

function randomizeAll() {
    randomizeCritOp();
    randomizeKillzone();
    randomizeMap();
}

// 4. Modal de Visualización de Mapa
function showMapModal() {
    const killzoneKey = document.getElementById('killzoneSelect').value;
    const mapIndex = document.getElementById('mapSelect').value;

    if (killzoneKey && mapIndex !== "") {
        const mapData = dataMaps[killzoneKey].maps[mapIndex];
        const killzoneName = dataMaps[killzoneKey].name;

        // Inyectar datos
        document.getElementById('mapModalTitle').innerHTML = `<i class="bi bi-map me-2"></i>Mapa ${mapData.m_id} - ${killzoneName}`;
        document.getElementById('mapModalImg').src = mapData.m_img;

        // Lanzar modal de Bootstrap
        const modal = new bootstrap.Modal(document.getElementById('mapViewModal'));
        modal.show();
    } else {
        if (typeof mostrarNotificacion === 'function') {
            mostrarNotificacion("Operación bloqueada: Debes elegir una Killzone y un Mapa para visualizar el plano.");
        } else {
            alert("Operación bloqueada: Debes elegir una Killzone y un Mapa para visualizar el plano.");
        }
    }
}

// 5. Modal de Catálogo de Terrenos
function showTerrainModal() {
    const killzoneKey = document.getElementById('killzoneSelect').value;

    // Validación de seguridad (Programación Defensiva)
    if (!killzoneKey || !dataMaps[killzoneKey]) {
        if (typeof mostrarNotificacion === 'function') mostrarNotificacion("Falta selección: Debes elegir una Killzone primero.");
        return;
    }

    const kzData = dataMaps[killzoneKey];
    const terrainList = kzData.terrain;

    if (!Array.isArray(terrainList) || terrainList.length === 0) {
        if (typeof mostrarNotificacion === 'function') mostrarNotificacion("Esta zona de aniquilación no cuenta con piezas de terreno específicas registradas.");
        return;
    }

    // Cabecera del Modal
    document.getElementById('terrainModalTitle').innerHTML = `<i class="bi bi-bricks text-secondary me-2"></i>Terrenos: ${kzData.name}`;

    // Construcción de la Grilla de Terrenos
    let html = '<div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">';

    terrainList.forEach(t => {
        // Validar y construir los badges de tipo
        let typeBadges = '';
        if (Array.isArray(t.type)) {
            typeBadges = t.type.map(tipo => `<span class="badge bg-dark m-1 shadow-sm" style="font-size: 0.75rem;">${tipo}</span>`).join('');
        }

        // Construir la tarjeta
        html += `
            <div class="col">
                <div class="card h-100 shadow-sm border-secondary">    
                    <div class="equipment-card h-100 shadow-sm border border-secondary rounded overflow-hidden"> 
                        <div class="p-2 bg-secondary text-white text-center">
                            <h6 class="mb-0 fw-bold text-uppercase">${t.t_id || 'N/A'}</h6>
                        </div>
                        <div class="p-3 bg-light text-dark">
                            <div class="card-body p-2 d-flex justify-content-center align-items-center bg-light">
                                ${t.t_img ? `<img src="${t.t_img}" alt="Pieza ${t.t_id}" class="img-fluid rounded mb-2" style="max-height: 100px; object-fit: contain; margin: 0 auto;">` : ''}
                            </div>
                            <div>
                                ${t.type.map(t => `<span class="badge bg-dark me-1 mb-1">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        `;
    });

    html += '</div>';

    // Inyección y llamado al Modal
    document.getElementById('terrainModalBody').innerHTML = html;
    const modal = new bootstrap.Modal(document.getElementById('terrainViewModal'));
    modal.show();
}