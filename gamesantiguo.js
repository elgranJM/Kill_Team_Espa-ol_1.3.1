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
    let factionsData = {}; // Para almacenar datos de all_factions_data.json
    let tacopsData = {};   // Para almacenar datos de tacops.json

    // --- Carga de Datos ---
    Promise.all([
        fetch('all_factions_data.json').then(res => res.json()).catch(err => { console.error("No se pudo cargar all_factions_data.json. Los desplegables de facción estarán vacíos.", err); return {}; }),
        fetch('tacops.json').then(res => res.json()).catch(err => { console.error("No se pudo cargar tacops.json. Los desplegables de Tac Op estarán limitados.", err); return {}; })
    ]).then(([factions, tacops]) => {
        factionsData = factions;
        tacopsData = tacops;

        // Poblar selectores de facción en el modal "Nueva Partida"
        const factionNames = Object.keys(factionsData);
        if (factionNames.length > 0) {
            playerFactionSelect.innerHTML = '<option value="blank" selected>Selecciona una facción</option>';
            opponentFactionSelect.innerHTML = '<option value="blank" selected>Selecciona una facción</option>';
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
    }).catch(error => console.error("Error cargando datos iniciales del juego:", error));


    // --- Importar/Exportar ---

    function exportProfile() {
        if (!currentProfile) {
            alert("Por favor, selecciona un perfil para exportar.");
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
        document.body.appendChild(downloadAnchorNode); // requerido para firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    function importProfile(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const profileData = JSON.parse(e.target.result);
                const { profileName, games, currentGame } = profileData;

                if (!profileName) {
                    alert("Archivo de perfil inválido: falta el nombre del perfil.");
                    return;
                }

                // Guardar el perfil importado
                let profiles = JSON.parse(localStorage.getItem('kt_profiles')) || [];
                if (!profiles.includes(profileName)) {
                    profiles.push(profileName);
                    localStorage.setItem('kt_profiles', JSON.stringify(profiles));
                }

                if (games) {
                    localStorage.setItem(`kt_games_${profileName}`, JSON.stringify(games));
                }
                if (currentGame) {
                    localStorage.setItem(`kt_current_game_${profileName}`, JSON.stringify(currentGame));
                }

                // Recargar perfiles para actualizar la UI y cambiar al perfil importado
                loadProfiles(); 
                profileSelect.value = profileName;
                switchProfile(profileName);


                alert(`Perfil "${profileName}" importado con éxito.`);

            } catch (error) {
                alert("Error al importar el perfil: " + error.message);
            }
        };
        reader.readAsText(file);
    }

    // --- Gestión de Perfiles ---

    /**
     * Carga perfiles desde localStorage, puebla el desplegable y establece el perfil activo.
     */
    function loadProfiles() {
        let profiles = [];
        try {
            const storedProfiles = localStorage.getItem('kt_profiles');
            if (storedProfiles) {
                profiles = JSON.parse(storedProfiles);
            }
        } catch (e) {
            console.error("Error analizando perfiles desde localStorage", e);
            profiles = [];
        }

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
        loadCurrentGameForProfile();
    }

    /**
     * Crea un nuevo perfil de usuario y lo guarda en localStorage.
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
            } else {
                alert('El nombre del perfil ya existe.');
            }
        }
    }

    /**
     * Maneja el cambio de perfil activo y actualiza la UI en consecuencia.
     * @param {string} newProfile - El nombre del perfil al cual cambiar.
     */
    function switchProfile(newProfile) {
        currentProfile = newProfile;
        localStorage.setItem('kt_last_profile', newProfile);
        renderGames();
        loadCurrentGameForProfile();
    }

    // --- Gestión del Historial de Juegos ---

    /**
     * Renderiza la lista de juegos completados para el perfil actual desde localStorage.
     */
    function renderGames() {
        if (!currentProfile) return;
        gamesTableBody.innerHTML = '';
        const games = JSON.parse(localStorage.getItem(`kt_games_${currentProfile}`)) || [];
        if (games.length === 0) {
            gamesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No hay partidas registradas para este perfil.</td></tr>';
            return;
        }
        games.sort((a, b) => b.timestamp - a.timestamp).forEach(game => {
            const result = game.playerScore > game.opponentScore ? 'won' : (game.playerScore < game.opponentScore ? 'lost' : 'draw');
            const resultBg = result === 'won' ? 'text-bg-success' : (result === 'lost' ? 'text-bg-danger' : 'text-bg-secondary');
            
            // Traducción del resultado para la visualización (badges)
            let resultText = '';
            if (result === 'won') resultText = 'Victoria';
            else if (result === 'lost') resultText = 'Derrota';
            else resultText = 'Empate';

            const row = document.createElement('tr');
            row.innerHTML = `
            <td class="text-center align-middle">${new Date(game.timestamp).toLocaleDateString()}</td>
            <td class="text-center align-middle"><b>${game.playerScore}</b> - ${game.opponentScore}</td>
            <td class="text-center d-none d-md-table-cell align-middle">${game.opponentName}</td>
            <td class="text-center align-middle"><span class="badge rounded-pill ${resultBg}">${resultText}</span></td>
            <td class="text-center align-middle"><button class="btn btn-sm btn-danger delete-game-btn" data-game-id="${game.id}"><i class="bi bi-trash"></i></button></td>
            `;
            gamesTableBody.appendChild(row);
        });
    }

    /**
     * Elimina un juego específico del historial.
     * @param {string} gameId - El ID único del juego a eliminar.
     */
    function deleteGame(gameId) {
        if (confirm('¿Estás seguro de que deseas eliminar el historial de esta partida?')) {
            let games = JSON.parse(localStorage.getItem(`kt_games_${currentProfile}`)) || [];
            games = games.filter(game => game.id !== gameId);
            localStorage.setItem(`kt_games_${currentProfile}`, JSON.stringify(games));
            renderGames();
        }
    }

    // --- Gestión de Partida en Curso (GIP) ---

    /**
     * Crea un nuevo objeto de juego, lo guarda e inicializa la vista del marcador.
     */
    function startGame() {
        const playerFaction = playerFactionSelect.value;
        const opponentFaction = opponentFactionSelect.value;
        const opponentName = document.getElementById('opponent-name').value.trim();

        if (playerFaction === 'blank' || opponentFaction === 'blank' || !opponentName) {
            alert('Por favor, selecciona facciones para ambos jugadores e ingresa el nombre del oponente.');
            return;
        }

        currentGame = {
            id: `game_${new Date().getTime()}`,
            timestamp: new Date().getTime(),
            playerFaction: playerFaction,
            opponentFaction: opponentFaction,
            opponentName: opponentName,
            playerName: currentProfile,
            state: {
                player1_cp: 0,
                player2_cp: 0,
                current_tp: 1,
                scores: {}, // Almacenar IDs de checkboxes y conteos de bajas
                tacops: { p1: ['', '', ''], p2: ['', '', ''] }
            }
        };

        localStorage.setItem(`kt_current_game_${currentProfile}`, JSON.stringify(currentGame));
        createGameModal.hide();
        initializeGIPView();
    }

    /**
     * Busca en localStorage una partida en curso para el perfil actual y la carga.
     */
    function loadCurrentGameForProfile() {
        const savedGame = localStorage.getItem(`kt_current_game_${currentProfile}`);
        if (savedGame) {
            currentGame = JSON.parse(savedGame);
            initializeGIPView();
        } else {
            currentGame = null;
            gipNavItem.style.display = 'none'; // Ocultar la pestaña si no hay partida en curso
        }
    }

    /**
     * Configura la pestaña "Partida en Curso" con datos del objeto `currentGame`.
     */
    function initializeGIPView() {
        if (!currentGame) return;

        gipNavItem.style.display = 'block';
        gipTab.show();

        // Actualizar visualización de información del jugador
        document.getElementById('gip-player1-name').textContent = currentGame.playerName;
        document.getElementById('gip-player1-faction').textContent = currentGame.playerFaction.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        document.getElementById('gip-player2-name').textContent = currentGame.opponentName;
        document.getElementById('gip-player2-faction').textContent = currentGame.opponentFaction.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        // Poblar desplegables de TacOp basados en arquetipos de facción
        populateTacOpDropdowns(1, currentGame.playerFaction, currentGame.state.tacops.p1);
        populateTacOpDropdowns(2, currentGame.opponentFaction, currentGame.state.tacops.p2);

        // Restaurar estado del juego (PM, Punto de Inflexión, puntuaciones)
        const state = currentGame.state;
        document.getElementById('gip-player1-cp').value = state.player1_cp || 0;
        document.getElementById('gip-player2-cp').value = state.player2_cp || 0;
        document.querySelector(`.btntp[data-tp="${state.current_tp || 1}"]`).checked = true;

        // Reiniciar y restaurar inputs de puntuación
        document.querySelectorAll('.gip-score-check, .gip-score-input').forEach(el => {
            if (el.type === 'checkbox') el.checked = false;
            else el.value = 0;

            if (state.scores && state.scores[el.id]) {
                if (el.type === 'checkbox') {
                    el.checked = true;
                } else {
                    el.value = state.scores[el.id];
                }
            }
        });

        recalculateScores(); // Calcular y mostrar puntuaciones iniciales
    }

    /**
     * Llena los desplegables de selección de Tac Op basados en los arquetipos disponibles de la facción.
     * @param {number} playerNum - El número de jugador (1 o 2).
     * @param {string} factionId - La clave identificadora de la facción (p. ej., 'intercessors').
     * @param {Array<string>} selections - Las Tac Ops seleccionadas actualmente para este jugador.
     */
    function populateTacOpDropdowns(playerNum, factionId, selections) {
        const factionTacopsInfo = tacopsData[factionId];
        const archetypes = factionTacopsInfo ? factionTacopsInfo.archetypes : [];

        // Mapa de traducción para arquetipos
        const archetypeTranslations = {
            'security': 'Seguridad',
            'seek-destroy': 'Búsqueda y Destrucción',
            'seek-and-destroy': 'Búsqueda y Destrucción',
            'recon': 'Reconocimiento',
            'infiltration': 'Infiltración'
        };

        for (let i = 1; i <= 3; i++) {
            const selectEl = document.getElementById(`gip-player${playerNum}-tacop${i}`);
            selectEl.innerHTML = `<option value="">Seleccionar Tac Op ${i}</option>`; // Reiniciar desplegable

            if (tacopsData.generic && archetypes.length > 0) {
                archetypes.forEach(archKey => {
                    // Traducir nombre del arquetipo
                    const archName = archetypeTranslations[archKey] || archKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = archName;

                    const opsForArch = tacopsData.generic[archKey] || [];
                    opsForArch.forEach(opName => {
                        // Aquí se podrían traducir nombres de TacOps genéricas si se tuvieran mapeados en JS, 
                        // pero por ahora vienen del JSON. Se asume que el JSON podría contener los nombres originales.
                        const option = document.createElement('option');
                        option.value = opName;
                        option.textContent = opName;
                        if (selections && selections[i-1] === opName) {
                            option.selected = true;
                        }
                        optgroup.appendChild(option);
                    });
                    selectEl.appendChild(optgroup);
                });
            }
        }
    }

    /**
     * Reúne todos los datos actuales de la vista GIP y los guarda en localStorage.
     */
    function saveGIPState() {
        if (!currentGame) return;

        const state = currentGame.state;
        state.player1_cp = parseInt(document.getElementById('gip-player1-cp').value) || 0;
        state.player2_cp = parseInt(document.getElementById('gip-player2-cp').value) || 0;
        state.current_tp = document.querySelector('.btntp:checked').dataset.tp;
        state.tacops.p1 = [
            document.getElementById('gip-player1-tacop1').value,
            document.getElementById('gip-player1-tacop2').value,
            document.getElementById('gip-player1-tacop3').value
        ];
        state.tacops.p2 = [
            document.getElementById('gip-player2-tacop1').value,
            document.getElementById('gip-player2-tacop2').value,
            document.getElementById('gip-player2-tacop3').value
        ];

        // Guardar todos los inputs de puntuación
        state.scores = {};
        document.querySelectorAll('.gip-score-check, .gip-score-input').forEach(el => {
            if (el.type === 'checkbox' && el.checked) {
                state.scores[el.id] = true;
            } else if (el.type === 'number' && parseInt(el.value) > 0) {
                state.scores[el.id] = el.value;
            }
        });

        localStorage.setItem(`kt_current_game_${currentProfile}`, JSON.stringify(currentGame));
    }

    /**
     * Calcula los PV totales para cada jugador basándose en casillas marcadas y valores de entrada,
     * actualiza la UI y guarda el estado.
     */
    function recalculateScores() {
        let p1_vp = 0;
        let p2_vp = 0;

        document.querySelectorAll('.gip-score-check:checked').forEach(chk => {
            const points = parseInt(chk.dataset.points) || 0;
            if (chk.dataset.player === '1') p1_vp += points;
            else p2_vp += points;
        });

        document.querySelectorAll('.gip-score-input').forEach(input => {
            const points = parseInt(input.value) || 0; // Asumiendo 1 baja = 1 punto
            if (input.dataset.player === '1') p1_vp += points;
            else p2_vp += points;
        });

        document.getElementById('gip-player1-vp').value = p1_vp;
        document.getElementById('gip-player2-vp').value = p2_vp;
        gipScoreDisplay1.textContent = p1_vp;
        gipScoreDisplay2.textContent = p2_vp;

        saveGIPState();
    }

    /**
     * Finaliza el juego actual, lo guarda en el historial y limpia el estado GIP.
     */
    function finishGame() {
        if (!currentGame) return;

        // Calcular puntuaciones finales incluyendo bonificaciones primarias
        let player1Final = parseInt(document.getElementById('player1-total-score').textContent) || 0;
        let player2Final = parseInt(document.getElementById('player2-total-score').textContent) || 0;
        
        if (gameState.player1.primary) {
            let categoryScore = 0;
            if (gameState.player1.primary === 'CRIT OP') {
                [2, 3, 4].forEach(tp => {
                    categoryScore += gameState.scores.player1.crit[`crit_${tp}`] || 0;
                });
            } else if (gameState.player1.primary === 'TAC OP') {
                [2, 3, 4].forEach(tp => {
                    categoryScore += gameState.scores.player1.tac[`tac_${tp}`] || 0;
                });
            } else if (gameState.player1.primary === 'KILL OP') {
                categoryScore = calculateKillSkulls(gameState.player1.killTarget, gameState.player1.killCount);
            }
            player1Final += Math.ceil(categoryScore / 2);
        }
        
        if (gameState.player2.primary) {
            let categoryScore = 0;
            if (gameState.player2.primary === 'CRIT OP') {
                [2, 3, 4].forEach(tp => {
                    categoryScore += gameState.scores.player2.crit[`crit_${tp}`] || 0;
                });
            } else if (gameState.player2.primary === 'TAC OP') {
                [2, 3, 4].forEach(tp => {
                    categoryScore += gameState.scores.player2.tac[`tac_${tp}`] || 0;
                });
            }
            else if (gameState.player2.primary === 'KILL OP') {
                categoryScore = calculateKillSkulls(gameState.player2.killTarget, gameState.player2.killCount);
            }
            player2Final += Math.ceil(categoryScore / 2);
        }

        const finalGame = {
            id: currentGame.id,
            timestamp: currentGame.timestamp,
            playerFaction: currentGame.playerFaction,
            opponentFaction: currentGame.opponentFaction,
            opponentName: currentGame.opponentName,
            playerScore: player1Final,
            opponentScore: player2Final,
        };

        let games = JSON.parse(localStorage.getItem(`kt_games_${currentProfile}`)) || [];
        games.push(finalGame);
        localStorage.setItem(`kt_games_${currentProfile}`, JSON.stringify(games));

        // Limpiar GIP
        localStorage.removeItem(`kt_current_game_${currentProfile}`);
        currentGame = null;
        gipNavItem.style.display = 'none';
        gamesTab.show();
        renderGames();

        const result = player1Final > player2Final ? '¡Jugador 1 Gana!' : 
                      player2Final > player1Final ? '¡Jugador 2 Gana!' : 
                      '¡Empate!';

        alert(`¡Partida terminada y guardada! Puntuación final: ${player1Final} - ${player2Final}\n\n${result}`);
    }

    const createGameBtn = document.getElementById('createGameBtn');

    // --- Listeners de Eventos ---
    profileSelect?.addEventListener('change', () => switchProfile(profileSelect.value));
    createProfileBtn?.addEventListener('click', createProfile);
    newProfileNameInput?.addEventListener('keypress', e => { if(e.key === 'Enter') createProfile(); });
    startGameBtn?.addEventListener('click', startGame);
    exportProfileBtn?.addEventListener('click', exportProfile);
    importProfileInput?.addEventListener('change', importProfile);

    createGameBtn?.addEventListener('click', () => {
        if (currentGame) {
            if (confirm("Hay una partida en curso. ¿Quieres terminarla?")) {
                if (confirm("¿Quieres guardar la partida antes de terminar?")) {
                    finishGame(); // Esto guardará y limpiará
                    createGameModal.show(); // Mostrar el modal para iniciar un nuevo juego
                } else {
                    // Descartar juego actual
                    localStorage.removeItem(`kt_current_game_${currentProfile}`);
                    currentGame = null;
                    gipNavItem.style.display = 'none';
                    gamesTab.show();
                    createGameModal.show(); // Mostrar el modal para iniciar un nuevo juego
                }
            }
        } else {
            createGameModal.show();
        }
    });

    finishGameBtn?.addEventListener('click', finishGame);

    gamesTableBody?.addEventListener('click', e => {
        const deleteBtn = e.target.closest('.delete-game-btn');
        if (deleteBtn) {
            deleteGame(deleteBtn.dataset.gameId);
        }
    });

    // --- NOTA DE CAMBIO HTML IMPORTANTE ---
    // Para que esto funcione perfectamente, añade la clase `gip-score-input` a tus inputs de "Bajas" en index.html, así:
    // <input type="number" class="form-control form-control-sm gip-score-input" ... >
    // Y elimina el atributo `onchange="..."`, ya que este script ahora lo maneja.

    gipPane?.addEventListener('change', (e) => {
        const target = e.target;
        if (target.matches('.gip-score-check, .gip-score-input, #gip-player1-vp, #gip-player2-vp')) {
            recalculateScores();
        } else if (target.matches('.gip-tacop-select, .btntp, #gip-player1-cp, #gip-player2-cp')) {
            saveGIPState();
        }
    });

    gipPane?.addEventListener('click', (e) => {
        if (e.target.matches('.gip-cp-btn')) {
            const player = e.target.dataset.player;
            const amount = parseInt(e.target.dataset.amount);
            const cpEl = document.getElementById(`gip-player${player}-cp`);
            let currentVal = parseInt(cpEl.value) || 0;
            cpEl.value = Math.max(0, currentVal + amount);
            saveGIPState();
        }
    });

    exportProfileBtn?.addEventListener('click', exportProfile);
    importProfileInput?.addEventListener('change', importProfile);

    // --- Inicialización ---
    loadProfiles();
});

// Sistema de Puntuación Mejorado para Partida en Curso
let gameState = {
    currentTP: 1,
    player1: { cp: 3, killTarget: 0, killCount: 0, primary: null, tacop: null },
    player2: { cp: 3, killTarget: 0, killCount: 0, primary: null, tacop: null },
    scores: {
        player1: { crit: {}, tac: {}, kill: [] },
        player2: { crit: {}, tac: {}, kill: [] }
    }
};

let currentModalPlayer = 1;

// Inicializar el sistema de puntuación mejorado cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si estamos en la pestaña de partida en curso
    if (document.getElementById('game-in-progress-pane')) {
        initializeEnhancedScoring();
    }
});

function initializeEnhancedScoring() {
    setupSkullClickHandlers();
    setupTurningPointHandlers();
    setupPrimaryModalHandlers();
    updateKillSkulls(1);
    updateKillSkulls(2);
    updateSixthKillSkull();
    calculateTotalScores();
}

function setupSkullClickHandlers() {
    // Manejar calaveras de Crit y Tac
    document.querySelectorAll('.skull-container .skull-grid').forEach(skull => {
        skull.addEventListener('click', function() {
            const container = this.closest('.skull-container');
            const player = container.dataset.player;
            const category = container.dataset.category;
            const tp = container.dataset.tp;
            const skullNum = parseInt(this.dataset.skull);
            
            handleSkullClick(player, category, tp, skullNum);
        });
    });

    // Las calaveras de Kill se actualizan automáticamente basadas en el conteo de bajas
}

function setupTurningPointHandlers() {
    document.querySelectorAll('input[name="tp-radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                gameState.currentTP = parseInt(this.dataset.tp);
                updateTurningPointDisplay();
            }
        });
    });
}

function setupPrimaryModalHandlers() {
    // Mostrar/ocultar descripciones basadas en la selección
    document.querySelectorAll('input[name="primaryRadio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Ocultar todas las descripciones
            document.querySelectorAll('[id^="text_primary"]').forEach(div => {
                div.classList.add('d-none');
            });
            
            // Mostrar descripción seleccionada
            if (this.checked) {
                const targetId = 'text_primary' + this.value.replace(' OP', '');
                const targetDiv = document.getElementById(targetId);
                if (targetDiv) {
                    targetDiv.classList.remove('d-none');
                }
            }
        });
    });
}

function handleSkullClick(player, category, tp, skullNum) {
    const key = `${category}_${tp}`;
    const currentState = gameState.scores[`player${player}`][category][key] || 0;
    const skulls = document.querySelectorAll(`.skull-container[data-player="${player}"][data-category="${category}"][data-tp="${tp}"] .skull-grid`);
    
    if (skullNum === 1) {
        // Primera calavera clickeada
        if (currentState === 0) {
            // Encender primera calavera
            gameState.scores[`player${player}`][category][key] = 1;
            updateSkullDisplay(skulls, 1, player);
        } else {
            // Apagar todas las calaveras
            gameState.scores[`player${player}`][category][key] = 0;
            updateSkullDisplay(skulls, 0, player);
        }
    } else if (skullNum === 2) {
        // Segunda calavera clickeada
        if (currentState === 0) {
            // Encender primera calavera
            gameState.scores[`player${player}`][category][key] = 1;
            updateSkullDisplay(skulls, 1, player);
        } else if (currentState === 1) {
            // Encender ambas calaveras
            gameState.scores[`player${player}`][category][key] = 2;
            updateSkullDisplay(skulls, 2, player);
        } else {
            // Apagar todas las calaveras
            gameState.scores[`player${player}`][category][key] = 0;
            updateSkullDisplay(skulls, 0, player);
        }
    }
    
    calculateTotalScores();
}

function updateSkullDisplay(skulls, litCount, player) {
    skulls.forEach((skull, index) => {
        skull.classList.remove('lit-p1', 'lit-p2');
        if (index < litCount) {
            skull.classList.add(`lit-p${player}`);
        }
    });
}

function updateTurningPointDisplay() {
    // Actualizar resaltado de columna TP
    document.querySelectorAll('.tp-column').forEach(col => {
        col.classList.remove('current-tp');
    });
    document.querySelectorAll(`.tp${gameState.currentTP}-col`).forEach(col => {
        col.classList.add('current-tp');
    });
    
    // Actualizar etiquetas de botones de radio
    document.querySelectorAll('label[for^="tp"]').forEach(label => {
        label.classList.remove('current-tp');
    });
    document.querySelector(`label[for="tp${gameState.currentTP}"]`).classList.add('current-tp');
}

function adjustCP(player, amount) {
    gameState[`player${player}`].cp = Math.max(0, gameState[`player${player}`].cp + amount);
    document.getElementById(`cp-p${player}`).textContent = gameState[`player${player}`].cp;
}

function updateKillTarget(player) {
    const select = document.getElementById(`enemy-ops-p${player}`);
    const target = parseInt(select.value);
    gameState[`player${player}`].killTarget = target;
    
    const counter = document.getElementById(`kill-counter-p${player}`);
    if (target > 0) {
        counter.style.display = 'flex';
        // Reiniciar conteo de bajas al cambiar objetivo
        gameState[`player${player}`].killCount = 0;
        document.getElementById(`kill-count-p${player}`).textContent = '0';
        updateKillSkulls(player);
        updateSixthKillSkull();
    } else {
        counter.style.display = 'none';
    }
}

function adjustKillCount(player, amount) {
    const target = gameState[`player${player}`].killTarget;
    if (target === 0) return;
    
    const newCount = Math.max(0, Math.min(target, gameState[`player${player}`].killCount + amount));
    gameState[`player${player}`].killCount = newCount;
    document.getElementById(`kill-count-p${player}`).textContent = newCount;
    updateKillSkulls(player);
    updateSixthKillSkull();
    calculateTotalScores();
}

function updateKillSkulls(player) {
    const killCount = gameState[`player${player}`].killCount;
    const killTarget = gameState[`player${player}`].killTarget;
    
    if (killTarget === 0) return;
    
    // Calcular cuántas calaveras deberían estar encendidas basándose en la progresión de bajas
    let skullsToLight = calculateKillSkulls(killTarget, killCount);
    
    // Actualizar las 5 calaveras principales de kill
    const mainSkulls = document.querySelectorAll(`.kill-skulls-container[data-player="${player}"] .kill-skull`);
    mainSkulls.forEach((skull, index) => {
        skull.classList.remove('lit-p1', 'lit-p2');
        if (index < skullsToLight) {
            skull.classList.add(`lit-p${player}`);
        }
    });
}

function updateSixthKillSkull() {
    const p1KillScore = calculateKillSkulls(gameState.player1.killTarget, gameState.player1.killCount);
    const p2KillScore = calculateKillSkulls(gameState.player2.killTarget, gameState.player2.killCount);

    const p1SixthSkull = document.querySelector('.kill-skulls-container[data-player="1"] .kill-skull-sixth');
    const p2SixthSkull = document.querySelector('.kill-skulls-container[data-player="2"] .kill-skull-sixth');

    p1SixthSkull.classList.remove('lit-p1', 'lit-p2');
    p2SixthSkull.classList.remove('lit-p1', 'lit-p2');

    if (p1KillScore > p2KillScore) {
        p1SixthSkull.classList.add('lit-p1');
    } else if (p2KillScore > p1KillScore) {
        p2SixthSkull.classList.add('lit-p2');
    }
}

function calculateKillSkulls(target, kills) {
    if (kills === 0) return 0;
    
    // Calcular bajas necesarias por calavera basándose en el objetivo
    const killsPerSkull = getKillsPerSkull(target);
    
    let skullsLit = 0;
    let remainingKills = kills;
    
    for (let skull = 1; skull <= 5; skull++) {
        const requiredKills = killsPerSkull[skull - 1];
        if (remainingKills >= requiredKills) {
            skullsLit++;
            remainingKills -= requiredKills;
        } else {
            break;
        }
    }
    
    return skullsLit;
}

function getKillsPerSkull(target) {
    // Devuelve array de bajas necesarias para cada posición de calavera
    switch(target) {
        case 5: return [1, 1, 1, 1, 1]; // Cada baja = 1 calavera
        case 6: return [1, 1, 2, 1, 1]; // 3.ª calavera necesita 2 bajas
        case 7: return [1, 2, 1, 2, 1]; // 2.ª y 4.ª necesitan 2 bajas
        case 8: return [2, 1, 2, 1, 2]; // 1.ª, 3.ª, 5.ª necesitan 2 bajas
        case 9: return [2, 2, 1, 2, 2]; // Todas excepto 3.ª necesitan 2 bajas
        case 10: return [2, 2, 2, 2, 2]; // Todas necesitan 2 bajas
        case 11: return [2, 2, 3, 2, 2]; // 3.ª necesita 3, otras necesitan 2
        case 12: return [2, 3, 2, 3, 2]; // 2.ª y 4.ª necesitan 3, otras necesitan 2
        case 13: return [3, 2, 3, 2, 3]; // 1.ª, 3.ª, 5.ª necesitan 3, otras necesitan 2
        case 14: return [3, 3, 2, 3, 3]; // Todas excepto 3.ª necesitan 3
        default: return [1, 1, 1, 1, 1];
    }
}

function calculateTotalScores() {
    let player1Total = 0;
    let player2Total = 0;
    
    // Calcular puntuaciones Crit y Tac para cada jugador
    ['crit', 'tac'].forEach(category => {
        [2, 3, 4].forEach(tp => {
            const key = `${category}_${tp}`;
            player1Total += gameState.scores.player1[category][key] || 0;
            player2Total += gameState.scores.player2[category][key] || 0;
        });
    });
    
    // Añadir puntuaciones de bajas
    player1Total += calculateKillSkulls(gameState.player1.killTarget, gameState.player1.killCount);
    player2Total += calculateKillSkulls(gameState.player2.killTarget, gameState.player2.killCount);
    
    // Actualizar visualizaciones
    const p1ScoreEl = document.getElementById('player1-total-score');
    const p2ScoreEl = document.getElementById('player2-total-score');
    if (p1ScoreEl) p1ScoreEl.textContent = player1Total;
    if (p2ScoreEl) p2ScoreEl.textContent = player2Total;
}

function openPrimaryModal(player) {
    currentModalPlayer = player;
    const modalEl = document.getElementById('primaryModal');
    if (!modalEl) return;
    
    const modal = new bootstrap.Modal(modalEl);
    
    // Limpiar selecciones previas
    document.querySelectorAll('input[name="primaryRadio"]').forEach(radio => {
        radio.checked = false;
    });
    document.querySelectorAll('[id^="text_primary"]').forEach(div => {
        div.classList.add('d-none');
    });
    
    // Mostrar selección actual si hay alguna
    const currentPrimary = gameState[`player${player}`].primary;
    if (currentPrimary) {
        const radio = document.querySelector(`input[value="${currentPrimary}"]`);
        if (radio) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change'));
        }
    }
    
    modal.show();
}

function savePrimary() {
    const selectedRadio = document.querySelector('input[name="primaryRadio"]:checked');
    if (selectedRadio) {
        gameState[`player${currentModalPlayer}`].primary = selectedRadio.value;
        
        // Actualizar texto del botón
        const button = document.getElementById(`primary-p${currentModalPlayer}`);
        if (button) {
            button.innerHTML = `<i class="bi bi-shield-check-fill"></i> ${selectedRadio.value}`;
            button.style.background = currentModalPlayer === 1 ? 'var(--player1-color)' : 'var(--player2-color)';
            button.style.color = 'white';
        }
        
        // Cerrar modal
        const modalEl = document.getElementById('primaryModal');
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }
    }
}

// Manejar selección de Tac Op (solo se puede seleccionar una)
document.addEventListener('change', function(e) {
    if (e.target && e.target.matches('.tacop-select')) {
        const player = e.target.id.includes('p1') ? 1 : 2;
        gameState[`player${player}`].tacop = e.target.value;
    }
});

