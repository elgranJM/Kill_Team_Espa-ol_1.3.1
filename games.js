// =============================================================================
// Kill Team BattleKit - Juegos Locales y Lógica de Marcador (games.js)
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a Elementos del DOM ---
    const profileSelect = document.getElementById('profile-select');
    const newProfileNameInput = document.getElementById('new-profile-name');
    const createProfileBtn = document.getElementById('create-profile-btn');
    const gamesTableBody = document.querySelector('#gamesTable tbody');
    const createGameModalEl = document.getElementById('createGameModal');
    const createGameModal = new bootstrap.Modal(createGameModalEl);
    const startGameBtn = document.getElementById('startGameBtn');
    const playerFactionSelect = document.getElementById('create_match_faccion_player_1');
    const opponentFactionSelect = document.getElementById('create_match_faccion_player_2');
    const finishGameBtn = document.getElementById('finishGameBtn');
    const gipPane = document.getElementById('game-in-progress-pane');
    const exportProfileBtn = document.getElementById('export-profile-btn');
    const importProfileInput = document.getElementById('import-profile-input');

    // Elementos de Partida en Curso (GIP)
    const gipNavItem = document.getElementById('game-in-progress-nav-item');
    const gipTab = new bootstrap.Tab(document.getElementById('game-in-progress-tab'));
    const gamesTab = new bootstrap.Tab(document.getElementById('games-tab'));
    const gipScoreDisplay1 = document.getElementById('gip-digit-1');
    const gipScoreDisplay2 = document.getElementById('gip-digit-2');

    // --- Variables de Estado Global ---
    let currentProfile = '';
    let currentGame = null;
    let factionsData = {};        // Datos de facciones
    let factionTacopsData = {};   // Mapeo facción -> arquetipos (tacops.json)
    let generalTacopsData = {};   // Detalle de secundarias (tacopsgenerales.json)

    // Configuración estética de Arquetipos
    const archetypeConfig = {
        'security': { name: 'Seguridad', color: '#2c3e50' },
        'seek-destroy': { name: 'Búsqueda y Destrucción', color: '#c0392b' },
        'recon': { name: 'Reconocimiento', color: '#27ae60' },
        'infiltration': { name: 'Infiltración', color: '#8e44ad' }
    };

    // --- Carga de Datos ---
    Promise.all([
        fetch('all_factions_data.json').then(res => res.json()).catch(() => ({})),
        fetch('tacops.json').then(res => res.json()).catch(() => ({})),
        fetch('tacopsgenerales.json').then(res => res.json()).catch(() => ({}))
    ]).then(([factions, factionTacops, generalTacops]) => {
        factionsData = factions;
        factionTacopsData = factionTacops;
        generalTacopsData = generalTacops;

        // Poblar selectores de facción en el modal "Nueva Partida"
        const factionNames = Object.keys(factionsData);
        if (factionNames.length > 0) {
            playerFactionSelect.innerHTML = '<option value="blank" selected>Selecciona tu facción</option>';
            opponentFactionSelect.innerHTML = '<option value="blank" selected>Selecciona facción oponente</option>';
            factionNames.sort().forEach(id => {
                const name = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                [playerFactionSelect, opponentFactionSelect].forEach(sel => {
                    const opt = document.createElement('option');
                    opt.value = id;
                    opt.textContent = name;
                    sel.appendChild(opt);
                });
            });
        }
    }).catch(error => console.error("Error cargando bases de datos:", error));

    /**
     * Llena los desplegables de Tac Op filtrando por los arquetipos de la facción elegida.
     * Basado en la lógica de filtrado de arquetipos solicitada.
     */
    function populateTacOpDropdowns(playerNum, factionId, selections) {
        // 1. Obtener arquetipos válidos para esta facción desde tacops.json
        const validArchetypes = factionTacopsData[factionId]?.archetypes || [];
        
        // 2. Filtrar las TacOps generales que coincidan con esos arquetipos
        const availableOpsKeys = Object.keys(generalTacopsData).filter(key => {
            const op = generalTacopsData[key];
            return validArchetypes.includes(op.archetype);
        });

        // 3. Limpiar y llenar los dropdowns (gip-playerX-tacopY)
        for (let i = 1; i <= 3; i++) {
            const selectEl = document.getElementById(`gip-player${playerNum}-tacop${i}`);
            if (!selectEl) continue;

            selectEl.innerHTML = `<option value="">Seleccionar Tac Op ${i}</option>`;

            if (availableOpsKeys.length === 0) {
                const opt = document.createElement('option');
                opt.textContent = "Sin TacOps disponibles";
                opt.disabled = true;
                selectEl.appendChild(opt);
                continue;
            }

            // Agrupar por arquetipo para una mejor UI
            validArchetypes.forEach(archKey => {
                const archInfo = archetypeConfig[archKey] || { name: archKey };
                const opsInArch = availableOpsKeys.filter(k => generalTacopsData[k].archetype === archKey);

                if (opsInArch.length > 0) {
                    const group = document.createElement('optgroup');
                    group.label = archInfo.name;

                    opsInArch.forEach(opKey => {
                        const op = generalTacopsData[opKey];
                        const option = document.createElement('option');
                        option.value = opKey;
                        option.textContent = op.name;
                        // Restaurar selección previa si existe
                        if (selections && selections[i - 1] === opKey) {
                            option.selected = true;
                        }
                        group.appendChild(option);
                    });
                    selectEl.appendChild(group);
                }
            });
        }
    }

    // --- Variables de Estado Global ---








    /**
     * Llena los desplegables de Tac Op filtrando por los arquetipos de la facción elegida.
     * Basado en la lógica de filtrado de arquetipos solicitada.
     */
    function populateTacOpDropdowns(playerNum, factionId, selections) {
        const validArchetypes = factionTacopsData[factionId]?.archetypes || [];
        const availableOpsKeys = Object.keys(generalTacopsData).filter(key => {
            const op = generalTacopsData[key];
            return validArchetypes.includes(op.archetype);
        });

        for (let i = 1; i <= 3; i++) {
            const selectEl = document.getElementById(`gip-player${playerNum}-tacop${i}`);
            if (!selectEl) continue;

            selectEl.innerHTML = `<option value="">Seleccionar Tac Op ${i}</option>`;

            if (availableOpsKeys.length === 0) {
                const opt = document.createElement('option');
                opt.textContent = "Sin TacOps disponibles";
                opt.disabled = true;
                selectEl.appendChild(opt);
                continue;
            }

            validArchetypes.forEach(archKey => {
                const archInfo = archetypeConfig[archKey] || { name: archKey };
                const opsInArch = availableOpsKeys.filter(k => generalTacopsData[k].archetype === archKey);

                if (opsInArch.length > 0) {
                    const group = document.createElement('optgroup');
                    group.label = archInfo.name;

                    opsInArch.forEach(opKey => {
                        const op = generalTacopsData[opKey];
                        const option = document.createElement('option');
                        option.value = opKey;
                        option.textContent = op.name;
                        if (selections && selections[i - 1] === opKey) {
                            option.selected = true;
                        }
                        group.appendChild(option);
                    });
                    selectEl.appendChild(group);
                }
            });
        }
    }

    // --- SEGUNDO TERCIO: Gestión de Perfiles e Historial ---

    /**
     * Exporta los datos del perfil actual a un archivo JSON.
     */
    function exportProfile() {
        if (!currentProfile) {
            return;
        }

        const profileData = {
            profileName: currentProfile,
            games: JSON.parse(localStorage.getItem(`kt_games_${currentProfile}`)) || [],
            currentGame: JSON.parse(localStorage.getItem(`kt_current_game_${currentProfile}`)) || null
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profileData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${currentProfile}_killteam_profile.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    /**
     * Importa un perfil desde un archivo JSON subido por el usuario.
     */
    function importProfile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const profileData = JSON.parse(e.target.result);
                const { profileName, games, currentGame } = profileData;

                if (!profileName) throw new Error("Nombre de perfil no encontrado.");

                let profiles = JSON.parse(localStorage.getItem('kt_profiles')) || [];
                if (!profiles.includes(profileName)) {
                    profiles.push(profileName);
                    localStorage.setItem('kt_profiles', JSON.stringify(profiles));
                }

                if (games) localStorage.setItem(`kt_games_${profileName}`, JSON.stringify(games));
                if (currentGame) localStorage.setItem(`kt_current_game_${profileName}`, JSON.stringify(currentGame));

                loadProfiles(); 
                profileSelect.value = profileName;
                switchProfile(profileName);

            } catch (error) {
                console.error("Error al importar el perfil:", error);
            }
        };
        reader.readAsText(file);
    }

    /**
     * Carga la lista de perfiles y establece el perfil activo.
     */
    function loadProfiles() {
        let profiles = JSON.parse(localStorage.getItem('kt_profiles')) || [];
        if (profiles.length === 0) {
            profiles = ['Perfil Predeterminado'];
            localStorage.setItem('kt_profiles', JSON.stringify(profiles));
        }

        profileSelect.innerHTML = '';
        profiles.forEach(profile => {
            const option = document.createElement('option');
            option.value = profile;
            option.textContent = profile;
            profileSelect.appendChild(option);
        });

        currentProfile = localStorage.getItem('kt_last_profile') || profiles[0];
        if (profileSelect.options.length > 0) profileSelect.value = currentProfile;

        renderGames();
        // Nota: loadCurrentGameForProfile() se definirá en el tercer tercio
        if (typeof loadCurrentGameForProfile === 'function') loadCurrentGameForProfile();
    }

    /**
     * Crea un nuevo perfil de usuario.
     */
    function createProfile() {
        const newProfile = newProfileNameInput.value.trim();
        if (newProfile) {
            let profiles = JSON.parse(localStorage.getItem('kt_profiles')) || [];
            if (!profiles.includes(newProfile)) {
                profiles.push(newProfile);
                localStorage.setItem('kt_profiles', JSON.stringify(profiles));
                newProfileNameInput.value = '';
                
                const option = document.createElement('option');
                option.value = newProfile;
                option.textContent = newProfile;
                profileSelect.appendChild(option);
                profileSelect.value = newProfile;
                switchProfile(newProfile);
            }
        }
    }

    /**
     * Cambia el perfil activo y refresca la vista.
     */
    function switchProfile(newProfile) {
        currentProfile = newProfile;
        localStorage.setItem('kt_last_profile', newProfile);
        renderGames();
        if (typeof loadCurrentGameForProfile === 'function') loadCurrentGameForProfile();
    }

    /**
     * Renderiza el historial de partidas del perfil actual.
     */
    function renderGames() {
        if (!currentProfile) return;
        gamesTableBody.innerHTML = '';
        const games = JSON.parse(localStorage.getItem(`kt_games_${currentProfile}`)) || [];
        
        if (games.length === 0) {
            gamesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No hay partidas registradas.</td></tr>';
            return;
        }

        games.sort((a, b) => b.timestamp - a.timestamp).forEach(game => {
            const result = game.playerScore > game.opponentScore ? 'won' : (game.playerScore < game.opponentScore ? 'lost' : 'draw');
            const resultBg = result === 'won' ? 'text-bg-success' : (result === 'lost' ? 'text-bg-danger' : 'text-bg-secondary');
            
            let resultText = result === 'won' ? 'Victoria' : (result === 'lost' ? 'Derrota' : 'Empate');

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center align-middle">${new Date(game.timestamp).toLocaleDateString()}</td>
                <td class="text-center align-middle"><b>${game.playerScore}</b> - ${game.opponentScore}</td>
                <td class="text-center d-none d-md-table-cell align-middle">${game.opponentName}</td>
                <td class="text-center align-middle"><span class="badge rounded-pill ${resultBg}">${resultText}</span></td>
                <td class="text-center align-middle">
                    <button class="btn btn-sm btn-outline-danger delete-game-btn" data-game-id="${game.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            gamesTableBody.appendChild(row);
        });
    }

    /**
     * Elimina una partida del historial.
     */
    function deleteGame(gameId) {
        let games = JSON.parse(localStorage.getItem(`kt_games_${currentProfile}`)) || [];
        games = games.filter(game => game.id !== gameId);
        localStorage.setItem(`kt_games_${currentProfile}`, JSON.stringify(games));
        renderGames();
    }

    // Registro de eventos para el segundo tercio
    profileSelect?.addEventListener('change', () => switchProfile(profileSelect.value));
    createProfileBtn?.addEventListener('click', createProfile);
    exportProfileBtn?.addEventListener('click', exportProfile);
    importProfileInput?.addEventListener('change', importProfile);
    gamesTableBody?.addEventListener('click', (e) => {
        const btn = e.target.closest('.delete-game-btn');
        if (btn) deleteGame(btn.dataset.gameId);
    });

    // Inicialización de perfiles
    loadProfiles();
});
// =============================================================================
// Kill Team BattleKit - Juegos Locales y Lógica de Marcador (games.js)
// =============================================================================
    // --- Variables de Estado Global ---


    // Estado interno de la partida para el marcador mejorado
    let gameState = {
        currentTP: 1,
        player1: { cp: 3, killTarget: 0, killCount: 0, primary: null, tacop: null },
        player2: { cp: 3, killTarget: 0, killCount: 0, primary: null, tacop: null },
        scores: {
            player1: { crit: {}, tac: {}, kill: 0 },
            player2: { crit: {}, tac: {}, kill: 0 }
        }
    };

    let currentModalPlayer = 1;



    // --- Carga de Datos Inicial ---
    Promise.all([
        fetch('all_factions_data.json').then(res => res.json()).catch(() => ({})),
        fetch('tacops.json').then(res => res.json()).catch(() => ({})),
        fetch('tacopsgenerales.json').then(res => res.json()).catch(() => ({}))
    ]).then(([factions, factionTacops, generalTacops]) => {
        factionsData = factions;
        factionTacopsData = factionTacops;
        generalTacopsData = generalTacops;

        const factionNames = Object.keys(factionsData);
        if (factionNames.length > 0) {
            playerFactionSelect.innerHTML = '<option value="blank" selected>Selecciona tu facción</option>';
            opponentFactionSelect.innerHTML = '<option value="blank" selected>Selecciona facción oponente</option>';
            factionNames.sort().forEach(id => {
                const name = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                [playerFactionSelect, opponentFactionSelect].forEach(sel => {
                    const opt = document.createElement('option');
                    opt.value = id;
                    opt.textContent = name;
                    sel.appendChild(opt);
                });
            });
        }
        loadProfiles(); 


    // --- TERCER TERCIO: Lógica de Partida en Curso y Marcador ---

    /**
     * Inicia una nueva partida, inicializa el estado y cambia a la pestaña GIP.
     */
    function startGame() {
        const p1Faction = playerFactionSelect.value;
        const p2Faction = opponentFactionSelect.value;
        const oppName = document.getElementById('opponent-name').value.trim();

        if (p1Faction === 'blank' || p2Faction === 'blank' || !oppName) {
            alert('Por favor, completa todos los campos para iniciar.');
            return;
        }

        currentGame = {
            id: `game_${Date.now()}`,
            timestamp: Date.now(),
            playerFaction: p1Faction,
            opponentFaction: p2Faction,
            opponentName: oppName,
            playerName: currentProfile,
            state: {
                currentTP: 1,
                p1: { cp: 2, killTarget: 0, killCount: 0, primary: null, tacops: ['', '', ''] },
                p2: { cp: 2, killTarget: 0, killCount: 0, primary: null, tacops: ['', '', ''] },
                scores: { p1: { crit: {}, tac: {} }, p2: { crit: {}, tac: {} } }
            }
        };

        // Resetear gameState global
        gameState = {
            currentTP: 1,
            player1: { cp: 2, killTarget: 0, killCount: 0, primary: null, tacop: null },
            player2: { cp: 2, killTarget: 0, killCount: 0, primary: null, tacop: null },
            scores: {
                player1: { crit: {}, tac: {}, kill: 0 },
                player2: { crit: {}, tac: {}, kill: 0 }
            }
        };

        saveGIPState();
        createGameModal.hide();
        initializeGIPView();
    }

    /**
     * Carga la partida guardada para el perfil actual.
     */
    function loadCurrentGameForProfile() {
        const saved = localStorage.getItem(`kt_current_game_${currentProfile}`);
        if (saved) {
            currentGame = JSON.parse(saved);
            // Mapear de currentGame.state a gameState global
            const s = currentGame.state;
            gameState.currentTP = s.currentTP || 1;
            gameState.player1 = { ...gameState.player1, ...s.p1 };
            gameState.player2 = { ...gameState.player2, ...s.p2 };
            gameState.scores.player1 = s.scores.p1;
            gameState.scores.player2 = s.scores.p2;
            
            initializeGIPView();
        } else {
            currentGame = null;
            gipNavItem.style.display = 'none';
        }
    }

    /**
     * Sincroniza la UI con el estado actual del juego.
     */
    function initializeGIPView() {
        if (!currentGame) return;

        gipNavItem.style.display = 'block';
        gipTab.show();

        // Actualizar nombres y facciones
        document.getElementById('gip-player1-name-display')?.textContent = currentGame.playerName;
        document.getElementById('gip-player2-name-display')?.textContent = currentGame.opponentName;

        // Poblar TacOps dinámicas basadas en arquetipos
        populateTacOpDropdowns(1, currentGame.playerFaction, gameState.player1.tacops);
        populateTacOpDropdowns(2, currentGame.opponentFaction, gameState.player2.tacops);

        // Actualizar CP
        document.getElementById('cp-p1').textContent = gameState.player1.cp;
        document.getElementById('cp-p2').textContent = gameState.player2.cp;

        // Actualizar Objetivos de Bajas
        document.getElementById('enemy-ops-p1').value = gameState.player1.killTarget;
        document.getElementById('enemy-ops-p2').value = gameState.player2.killTarget;
        updateKillTargetUI(1);
        updateKillTargetUI(2);

        // Actualizar Punto de Inflexión (Radio buttons)
        const tpRadio = document.querySelector(`input[name="tp-radio"][data-tp="${gameState.currentTP}"]`);
        if (tpRadio) tpRadio.checked = true;

        // Restaurar Calaveras (Crit y Tac)
        ['player1', 'player2'].forEach((p, idx) => {
            ['crit', 'tac'].forEach(cat => {
                [2, 3, 4].forEach(tp => {
                    const count = gameState.scores[p][cat][`${cat}_${tp}`] || 0;
                    const skulls = document.querySelectorAll(`.skull-container[data-player="${idx+1}"][data-category="${cat}"][data-tp="${tp}"] .skull-grid`);
                    updateSkullDisplay(skulls, count, idx + 1);
                });
            });
        });

        // Restaurar Primarias
        updatePrimaryButton(1, gameState.player1.primary);
        updatePrimaryButton(2, gameState.player2.primary);

        calculateTotalScores();
        updateTurningPointDisplay();
    }

    /**
     * Guarda el estado actual en el localStorage.
     */
    function saveGIPState() {
        if (!currentGame) return;
        currentGame.state = {
            currentTP: gameState.currentTP,
            p1: gameState.player1,
            p2: gameState.player2,
            scores: {
                p1: gameState.scores.player1,
                p2: gameState.scores.player2
            }
        };
        localStorage.setItem(`kt_current_game_${currentProfile}`, JSON.stringify(currentGame));
    }

    // --- Lógica del Marcador (Skulls & Logic) ---

    function handleSkullClick(player, category, tp, skullNum) {
        const key = `${category}_${tp}`;
        const pKey = `player${player}`;
        const currentState = gameState.scores[pKey][category][key] || 0;
        const skulls = document.querySelectorAll(`.skull-container[data-player="${player}"][data-category="${category}"][data-tp="${tp}"] .skull-grid`);
        
        let newValue = 0;
        if (skullNum === 1) {
            newValue = (currentState === 0) ? 1 : 0;
        } else if (skullNum === 2) {
            if (currentState === 0) newValue = 1;
            else if (currentState === 1) newValue = 2;
            else newValue = 0;
        }
        
        gameState.scores[pKey][category][key] = newValue;
        updateSkullDisplay(skulls, newValue, player);
        calculateTotalScores();
        saveGIPState();
    }

    function updateSkullDisplay(skulls, litCount, player) {
        skulls.forEach((skull, index) => {
            skull.classList.remove('lit-p1', 'lit-p2');
            if (index < litCount) skull.classList.add(`lit-p${player}`);
        });
    }

    window.adjustCP = (player, amount) => {
        const pKey = `player${player}`;
        gameState[pKey].cp = Math.max(0, gameState[pKey].cp + amount);
        document.getElementById(`cp-p${player}`).textContent = gameState[pKey].cp;
        saveGIPState();
    };

    window.updateKillTarget = (player) => {
        const select = document.getElementById(`enemy-ops-p${player}`);
        gameState[`player${player}`].killTarget = parseInt(select.value);
        gameState[`player${player}`].killCount = 0;
        updateKillTargetUI(player);
        calculateTotalScores();
        saveGIPState();
    };

    function updateKillTargetUI(player) {
        const target = gameState[`player${player}`].killTarget;
        const counter = document.getElementById(`kill-counter-p${player}`);
        if (target > 0) {
            counter.style.display = 'flex';
            document.getElementById(`kill-count-p${player}`).textContent = gameState[`player${player}`].killCount;
        } else {
            counter.style.display = 'none';
        }
        updateKillSkulls(player);
    }

    window.adjustKillCount = (player, amount) => {
        const p = gameState[`player${player}`];
        if (p.killTarget === 0) return;
        p.killCount = Math.max(0, Math.min(p.killTarget, p.killCount + amount));
        document.getElementById(`kill-count-p${player}`).textContent = p.killCount;
        updateKillSkulls(player);
        calculateTotalScores();
        saveGIPState();
    };

    function updateKillSkulls(player) {
        const p = gameState[`player${player}`];
        const score = calculateKillSkulls(p.killTarget, p.killCount);
        const skulls = document.querySelectorAll(`.kill-skulls-container[data-player="${player}"] .kill-skull`);
        
        skulls.forEach((s, i) => {
            s.classList.remove('lit-p1', 'lit-p2');
            if (i < score) s.classList.add(`lit-p${player}`);
        });
        updateSixthKillSkull();
    }

    function calculateKillSkulls(target, kills) {
        if (target === 0 || kills === 0) return 0;
        const mapping = {
            5: [1,1,1,1,1], 6: [1,1,2,1,1], 7: [1,2,1,2,1], 8: [2,1,2,1,2],
            9: [2,2,1,2,2], 10: [2,2,2,2,2], 11: [2,2,3,2,2], 12: [2,3,2,3,2],
            13: [3,2,3,2,3], 14: [3,3,2,3,3]
        };
        const killsPerSkull = mapping[target] || [1,1,1,1,1];
        let skullsLit = 0;
        let rem = kills;
        for (let k of killsPerSkull) {
            if (rem >= k) { skullsLit++; rem -= k; } else break;
        }
        return skullsLit;
    }

    function updateSixthKillSkull() {
        const s1 = calculateKillSkulls(gameState.player1.killTarget, gameState.player1.killCount);
        const s2 = calculateKillSkulls(gameState.player2.killTarget, gameState.player2.killCount);
        const sk1 = document.querySelector('.kill-skulls-container[data-player="1"] .kill-skull-sixth');
        const sk2 = document.querySelector('.kill-skulls-container[data-player="2"] .kill-skull-sixth');
        
        [sk1, sk2].forEach(s => s?.classList.remove('lit-p1', 'lit-p2'));
        if (s1 > s2) sk1?.classList.add('lit-p1');
        else if (s2 > s1) sk2?.classList.add('lit-p2');
    }

    function calculateTotalScores() {
        let totals = { p1: 0, p2: 0 };
        ['player1', 'player2'].forEach((pKey, i) => {
            const p = (i === 0) ? 'p1' : 'p2';
            ['crit', 'tac'].forEach(cat => {
                Object.values(gameState.scores[pKey][cat]).forEach(v => totals[p] += v);
            });
            totals[p] += calculateKillSkulls(gameState[pKey].killTarget, gameState[pKey].killCount);
        });

        document.getElementById('player1-total-score').textContent = totals.p1;
        document.getElementById('player2-total-score').textContent = totals.p2;
    }

    function updateTurningPointDisplay() {
        document.querySelectorAll('.tp-column').forEach(c => c.classList.remove('current-tp'));
        document.querySelectorAll(`.tp${gameState.currentTP}-col`).forEach(c => c.classList.add('current-tp'));
        document.querySelectorAll('label[for^="tp"]').forEach(l => l.classList.remove('current-tp'));
        document.querySelector(`label[for="tp${gameState.currentTP}"]`)?.classList.add('current-tp');
    }

    // --- Gestión de Primarias (Gambito) ---

    window.openPrimaryModal = (player) => {
        currentModalPlayer = player;
        const modal = new bootstrap.Modal(document.getElementById('primaryModal'));
        const currentVal = gameState[`player${player}`].primary;
        document.querySelectorAll('input[name="primaryRadio"]').forEach(r => {
            r.checked = (r.value === currentVal);
        });
        // Disparar cambio para mostrar alertas informativas
        const checked = document.querySelector('input[name="primaryRadio"]:checked');
        if (checked) checked.dispatchEvent(new Event('change'));
        modal.show();
    };

    window.savePrimary = () => {
        const selected = document.querySelector('input[name="primaryRadio"]:checked');
        if (selected) {
            gameState[`player${currentModalPlayer}`].primary = selected.value;
            updatePrimaryButton(currentModalPlayer, selected.value);
            saveGIPState();
            bootstrap.Modal.getInstance(document.getElementById('primaryModal')).hide();
        }
    };

    function updatePrimaryButton(player, value) {
        const btn = document.getElementById(`primary-p${player}`);
        if (!btn || !value) return;
        btn.innerHTML = `<i class="bi bi-shield-check-fill"></i> ${value}`;
        btn.classList.add('active-primary');
        btn.style.backgroundColor = (player === 1) ? 'var(--player1-color, #0d6efd)' : 'var(--player2-color, #dc3545)';
        btn.style.color = 'white';
    }

    // --- Finalización de Partida ---

    function finishGame() {
        if (!confirm('¿Estás seguro de que deseas terminar la batalla? Se aplicarán los bonos de Primaria.')) return;

        let finalScores = { p1: 0, p2: 0 };

        ['player1', 'player2'].forEach((pKey, i) => {
            const p = (i === 0) ? 'p1' : 'p2';
            let base = { crit: 0, tac: 0, kill: 0 };
            
            // Sumar puntos base
            Object.values(gameState.scores[pKey].crit).forEach(v => base.crit += v);
            Object.values(gameState.scores[pKey].tac).forEach(v => base.tac += v);
            base.kill = calculateKillSkulls(gameState[pKey].killTarget, gameState[pKey].killCount);
            
            let total = base.crit + base.tac + base.kill;
            
            // Aplicar bono de Primaria (Gambito): +50% redondeado arriba
            const primary = gameState[pKey].primary;
            if (primary === 'CRIT OP') total += Math.ceil(base.crit / 2);
            else if (primary === 'TAC OP') total += Math.ceil(base.tac / 2);
            else if (primary === 'KILL OP') total += Math.ceil(base.kill / 2);

            finalScores[p] = total;
        });

        const gameResult = {
            id: currentGame.id,
            timestamp: currentGame.timestamp,
            playerFaction: currentGame.playerFaction,
            opponentFaction: currentGame.opponentFaction,
            opponentName: currentGame.opponentName,
            playerScore: finalScores.p1,
            opponentScore: finalScores.p2
        };

        // Guardar en historial
        let games = JSON.parse(localStorage.getItem(`kt_games_${currentProfile}`)) || [];
        games.push(gameResult);
        localStorage.setItem(`kt_games_${currentProfile}`, JSON.stringify(games));

        // Limpiar GIP
        localStorage.removeItem(`kt_current_game_${currentProfile}`);
        currentGame = null;
        gipNavItem.style.display = 'none';
        
        renderGames();
        gamesTab.show();

        const msg = (finalScores.p1 > finalScores.p2) ? `¡Gana ${currentProfile}!` : 
                    (finalScores.p2 > finalScores.p1) ? `¡Gana ${gameResult.opponentName}!` : "¡Empate!";
        alert(`Partida finalizada.\n\n${currentProfile}: ${finalScores.p1}\n${gameResult.opponentName}: ${finalScores.p2}\n\n${msg}`);
    }

    // --- Listeners de Eventos Globales ---

    document.querySelectorAll('.skull-container').forEach(container => {
        container.addEventListener('click', (e) => {
            const skull = e.target.closest('.skull-grid');
            if (skull) {
                const p = container.dataset.player;
                const cat = container.dataset.category;
                const tp = container.dataset.tp;
                const num = skull.dataset.skull;
                handleSkullClick(p, cat, tp, parseInt(num));
            }
        });
    });

    document.querySelectorAll('input[name="tp-radio"]').forEach(r => {
        r.addEventListener('change', () => {
            gameState.currentTP = parseInt(r.dataset.tp);
            updateTurningPointDisplay();
            saveGIPState();
        });
    });

    document.querySelectorAll('.tacop-select').forEach(sel => {
        sel.addEventListener('change', () => {
            const p = sel.id.includes('p1') ? 'player1' : 'player2';
            // Para simplificar, guardamos las 3 selecciones
            const pNum = sel.id.includes('p1') ? 1 : 2;
            const tacops = [
                document.getElementById(`gip-player${pNum}-tacop1`)?.value || '',
                document.getElementById(`gip-player${pNum}-tacop2`)?.value || '',
                document.getElementById(`gip-player${pNum}-tacop3`)?.value || ''
            ];
            gameState[`player${pNum}`].tacops = tacops;
            saveGIPState();
        });
    });

    // Mapear alertas del modal de primarias
    document.querySelectorAll('input[name="primaryRadio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('[id^="text_primary"]').forEach(div => div.classList.add('d-none'));
            const target = document.getElementById('text_primary' + this.value.replace(' OP', ''));
            if (target) target.classList.remove('d-none');
        });
    });

    startGameBtn?.addEventListener('click', startGame);
    finishGameBtn?.addEventListener('click', finishGame);

    // Re-llamar carga inicial
    loadProfiles();
});
