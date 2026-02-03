document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a Elementos del DOM ---
    const factionSelect = document.getElementById('faction-select');
    // Actualizado: Referencia al nuevo selector de Tipo de Facción
    const factionTypeSelect = document.getElementById('faction-type-select');
    
    // Contenedores de contenido
    const containers = {
        racial: document.getElementById('faction-info-pane'),
        operatives: document.getElementById('datacards-container'),
        tacops: document.getElementById('faction-tacops-pane'),
        ploys: document.getElementById('ploys-pane'),
        equipment: document.getElementById('equipment-pane')
    };

    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    const body = document.body;

    // --- Almacén de Datos ---
    let gameData = {
        ploys: [],
        racial: {},
        factionTacops: {},   // tacops.json (Mapeo Facción -> Arquetipos)
        generalTacops: {},   // tacopsgenerales.json (Detalle de las misiones)
        operatives: {},
        equipment: []        // Inicializado como Array para la nueva estructura
    };

    // --- Nueva Categorización: Tipos de Facción ---
    const factionCategories = {
        'Imperio': [
            'intercessors', 'battleclade', 'deathwatch', 'elucidian-starstrider',
            'hunter-clade', 'imperial-navy-breachers', 'inquisitorial-agent',
            'kasrkin', 'novitiates', 'phobos', 'ratling', 'sanctifiers',
            'scouts', 'tempestus-aquilons', 'wolf-scouts', 'strike-force-variel',
            'exaction-squad', 'veteran-guardsmen'
        ],
        'Caos': [
            'blooded', 'chaos-cult', 'fellgor-ravagers', 'gellerpox',
            'goremongers', 'legionary', 'nemesis-claw', 'plague-marines',
            'warpcoven', 'murderwing'
        ],
        'Xenos': [
            'blades-of-khaine', 'brood-brothers', 'canoptek', 'corsair-voidscarred',
            'farstalker-kinband', 'hearthkyn-salvager', 'hierotek', 'kabalite',
            'kommandos', 'mandrakes', 'pathfinders', 'raveners', 'vespid-stingwings',
            'void-dancer-troupe', 'wrecka-krew', 'wyrmblade', 'yaegirs',
            'xv26-battlesuits'
        ]
    };

    // --- Configuración Visual ---
    const archetypeConfig = {
        'recon': { 
            color: '#f05c22', 
            name: 'Reconocimiento', 
            icon: 'recon.svg' 
        },
        'security': { 
            color: '#0b6be1', 
            name: 'Seguridad', 
            icon: 'security.svg' 
        },
        'seek-destroy': { 
            color: '#bd0003', 
            name: 'Búsqueda y Destrucción', 
            icon: 'seek-destroy.svg' 
        },
        'infiltration': { 
            color: '#5f5f5f', 
            name: 'Infiltración', 
            icon: 'infiltration.svg' 
        }
    };

    // Mapeo de Nombres de Facción para el Selector
    const factionNames = {
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

    // --- Inicialización ---
    async function init() {
        console.log('Iniciando Kill Team BattleKit...');
        setupDarkMode();
        
        try {
            await loadData();
            // Inicializamos el selector con el filtro vacío (o el seleccionado por defecto)
            populateFactionSelector(factionTypeSelect.value);
            console.log('Datos cargados y listos.');
        } catch (error) {
            console.error('Error fatal cargando datos:', error);
            factionSelect.innerHTML = '<option>Error al cargar archivos JSON. Revisa la consola.</option>';
        }

        factionSelect.addEventListener('change', handleFactionSelection);
        
        // Listener para el cambio de Tipo de Facción
        factionTypeSelect.addEventListener('change', (e) => {
            populateFactionSelector(e.target.value);
            // Limpiamos los paneles al cambiar de tipo de filtro para evitar confusión
            clearPanes();
        });
    }

    function setupDarkMode() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) body.classList.add('dark-mode');
        
        toggleDarkModeButton?.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        });
    }

    async function loadData() {
        const files = {
            ploys: 'ploys.json',
            racial: 'racial.json',
            factionTacops: 'tacops.json',
            generalTacops: 'tacopsgenerales.json', 
            operatives: 'operatives.json',
            equipment: 'equipment.json'
        };

        const promises = Object.entries(files).map(async ([key, url]) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                gameData[key] = await response.json();
            } catch (err) {
                console.warn(`No se pudo cargar ${url}:`, err);
                if (Array.isArray(gameData[key])) gameData[key] = [];
                else gameData[key] = {};
            }
        });

        await Promise.all(promises);
    }

    // --- Función de Filtrado Actualizada ---
    function populateFactionSelector(filterType = "") {
        factionSelect.innerHTML = '<option selected value="">Elige un Kill Team...</option>';
        
        let filteredKeys = [];

        if (!filterType || filterType === "Todas las facciones") {
            // Si no hay filtro o es "Todas", usamos todas las claves
            filteredKeys = Object.keys(factionNames);
        } else {
            // Si hay filtro (Imperio, Caos, Xenos), obtenemos el array correspondiente
            // y filtramos solo aquellas que existan en factionNames
            const categoryFactions = factionCategories[filterType] || [];
            filteredKeys = categoryFactions.filter(key => factionNames.hasOwnProperty(key));
        }

        // Ordenamos alfabéticamente por el nombre visible
        filteredKeys.sort((a, b) => factionNames[a].localeCompare(factionNames[b]));
        
        filteredKeys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = factionNames[key];
            factionSelect.appendChild(option);
        });
    }

    // --- Manejador Principal ---
    function handleFactionSelection(e) {
        const factionKey = e.target.value;
        if (!factionKey) {
            clearPanes();
            return;
        }

        console.log(`Renderizando facción: ${factionKey}`);
        clearPanes();

        // 1. Info de Facción y Arquetipos
        renderFactionHeader(factionKey);

        // 2. Agentes
        renderOperatives(factionKey);

        // 3. TacOps
        renderTacops(factionKey);

        // 4. Ardides
        renderPloys(factionKey);

        // 5. Equipamiento
        renderEquipment(factionKey);
    }

    function clearPanes() {
        Object.values(containers).forEach(el => el.innerHTML = '');
    }

    // --- Funciones de Renderizado ---

    // 1 y 2. Reglas de Facción y Arquetipos
    function renderFactionHeader(factionKey) {
        const factionArchetypes = gameData.factionTacops[factionKey]?.archetypes || [];
        let archetypesHtml = '';

        if (factionArchetypes.length > 0) {
            archetypesHtml = `
            <div class="col-12 col-lg-10 mx-auto mb-4">
                <div class="ability-card text-center">
                    <h3 class="mb-3">Arquetipos</h3>
                    <div class="d-flex justify-content-center flex-wrap gap-3">
                        ${factionArchetypes.map(arch => {
                            const config = archetypeConfig[arch] || { color: '#333', name: arch, icon: '' };
                            return `
                            <div class="archetype-box" style="
                                background-color: ${config.color};
                                width: 140px;
                                padding: 15px;
                                border-radius: 8px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                color: white;
                                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                            ">
                                <img src="./resources/game_rules_files/${config.icon}" 
                                     alt="${config.name}" 
                                     style="width: 50px; height: 50px; filter: brightness(0) invert(1); margin-bottom: 10px;">
                                <span style="font-weight: bold; font-size: 0.9em; text-transform: uppercase;">${config.name}</span>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            </div>`;
        }

        const team = gameData.racial[factionKey] || [];
        let teamHtml = '';

        if (Array.isArray(team)) {
            // Filtramos y recorremos solo los elementos que definen al equipo (operativos)
            team.forEach(item => {
                if (item.type === "team") {
                    teamHtml += `
                        <div class="team-roster-box" style="background-color: #000; color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #444;">
                            <h2 style="color: #fff; text-transform: uppercase; border-bottom: 2px solid #fff; padding-bottom: 10px; margin-top: 0;">
                                ${item.name}
                            </h2>
                            <div class="operatives-list" style="line-height: 1.6;">
                                ${item.description}
                            </div>
                        </div>
                    `;
                }
            });
        }

        const abilities = gameData.racial[factionKey] || [];
        let rulesHtml = '';
        
        if (Array.isArray(abilities)) {
            rulesHtml = abilities
                .filter(r => r.type === 'racial' && r.name !== 'Arquetipos') 
                .map(rule => `
                <div class="col-12 col-lg-10 mx-auto mb-3">
                    <div class="ability-card">
                        <h3 class="rules-title">${rule.name}</h3>
                        <div class="rules-text">${rule.description}</div>
                    </div>
                </div>`).join('');
        }

        containers.racial.innerHTML = archetypesHtml + teamHtml + rulesHtml;
    }

    // 3. Agentes
function renderOperatives(factionKey) {
    const operatives = gameData.operatives[factionKey] || [];

    if (operatives.length === 0) {
        containers.operatives.innerHTML = '<div class="alert alert-info">No hay datos de agentes disponibles para esta facción.</div>';
        return;
    }

    const html = operatives.map(op => {
        const imgPath = `./resources/roster_images/${factionKey}/${op.id}.png`;

        // Generación de HTML para Armas
        const weaponsHtml = op.weapons.map(w => {
            const icon = w.type === 'ranged' ? 'shoot.svg' : 'attack.svg';
            return `
            <tr class="weapon-profile-row">
                <td><img src="./resources/game_rules_files/${icon}" class="weapon-icon" width="20"></td>
                <td class="weapon-name fw-bold">${w.name}</td>
                <td class="text-center">${w.stats.A || '-'}</td>
                <td class="text-center">${w.stats['HP/HA'] || '-'}</td>
                <td class="text-center">${w.stats['Dñ'] || '-'}</td>
                <td class="small">${w.stats.RA || '-'}</td>
            </tr>`;
        }).join('');

        // Generación de HTML para Habilidades
        const abilitiesHtml = op.abilities?.length ? 
            `<div class="mt-2 p-2 bg-light rounded"><strong>Habilidades:</strong>${op.abilities.map(a => `<div class="mb-1"><span class="fw-bold">${a.name}:</span> ${a.description}</div>`).join('')}</div>` : '';

        // NUEVO: Generación de HTML para Acciones Únicas (Sistema de Yes/No)
        const actionsHtml = op.uniqueActions?.length ? 
            `<div class="mt-2 p-2 border rounded">
                <strong>Acciones:</strong>
                ${op.uniqueActions.map(a => {
                    // Mapeo de la lista de descripciones positivas (yes.svg)
                    const descYes = Array.isArray(a.description) 
                        ? a.description.map(line => `
                            <div class="d-flex align-items-start mb-1">
                                <img src="./resources/game_rules_files/yes.svg" width="14" class="me-2 mt-1" alt="yes">
                                <span>${line}</span>
                            </div>`).join('')
                        : `<div class="mb-1">${a.description}</div>`;

                    // Mapeo de la descripción negativa (no.svg)
                    const descNo = a.description_no ? `
                        <div class="d-flex align-items-start mt-2 border-top pt-1">
                            <img src="./resources/game_rules_files/no.svg" width="14" class="me-2 mt-1" alt="no">
                            <span class="text-muted fst-italic">${a.description_no}</span>
                        </div>` : '';

                    return `
                    <div class="mb-3">
                        <span class="fw-bold text-primary">${a.name} (${a.cost}):</span>
                        <div class="ps-2 mt-1">${descYes}${descNo}</div>
                    </div>`;
                }).join('')}
            </div>` : '';

        return `
        <div class="card-container col-12 col-lg-11 mt-4 mb-3 mx-auto shadow bg-white border rounded overflow-hidden">
            <div class="row g-0 align-items-stretch">
                <!-- LADO IZQUIERDO: Información y Stats -->
                <div class="col-12 col-md-8 p-3 d-flex flex-column">
                    <div class="mb-2 border-bottom pb-2">
                        <span class="fs-4 fw-bold text-uppercase text-dark">${op.name}</span>
                    </div>

                    <div class="d-flex justify-content-between mb-3 text-center bg-light p-2 rounded">
                        <div><div class="small text-muted fw-bold">LPA</div><div class="fs-4">${op.stats.LPA}</div></div>
                        <div><div class="small text-muted fw-bold">MOV</div><div class="fs-4">${op.stats.MOVER}</div></div>
                        <div><div class="small text-muted fw-bold">SAL</div><div class="fs-4">${op.stats.SALVACIÓN}</div></div>
                        <div><div class="small text-muted fw-bold">HER</div><div class="fs-4">${op.stats.HERIDAS}</div></div>
                    </div>

                    <div class="table-responsive mb-3">
                        <table class="table table-sm table-hover mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th style="width:30px"></th>
                                    <th>Arma</th>
                                    <th class="text-center">A</th>
                                    <th class="text-center">HA</th>
                                    <th class="text-center">Dñ</th>
                                    <th>Reglas adicionales</th>
                                </tr>
                            </thead>
                            <tbody>${weaponsHtml}</tbody>
                        </table>
                    </div>

                    <div class="flex-grow-1">
                        ${abilitiesHtml}
                        ${actionsHtml}
                    </div>
                
                    <!-- PARTE INFERIOR: Peana y Keywords -->
                    <div class="mt-3 pt-2 border-top d-flex justify-content-between align-items-center">
                        <div class="peana-box bg-dark text-white px-2 py-1 rounded small fw-bold" style="font-size: 0.75rem;">
                            ${op.peana || 'N/A'}
                        </div>
                        <div class="text-end text-muted x-small fst-italic" style="font-size: 0.7rem; max-width: 70%;">
                            ${op.keywords || ''}
                        </div>
                    </div>
                </div>

                <!-- LADO DERECHO: Imagen del Agente -->
                <div class="col-12 col-md-4 bg-dark d-flex align-items-center justify-content-center p-2" style="min-height: 250px;">
                    <img src="${imgPath}" 
                         class="img-fluid" 
                         style="max-height: 100%; width: auto; object-fit: contain; display: block;"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                
                    <div class="fallback-image w-100 h-100" style="display:none; background:linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); align-items:center; justify-content:center; text-align:center; padding:20px;">
                        <h3 class="m-0 text-white">${op.name}</h3>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');

    containers.operatives.innerHTML = `<div class="row">${html}</div>`;
}

    // 4. TacOps Generales
    function renderTacops(factionKey) {
        const validArchetypes = gameData.factionTacops[factionKey]?.archetypes || [];
        const allOps = gameData.generalTacops;
        
        const factionOpsKeys = Object.keys(allOps).filter(key => {
            const op = allOps[key];
            return validArchetypes.includes(op.archetype);
        });

        if (factionOpsKeys.length === 0) {
            containers.tacops.innerHTML = '<div class="alert alert-warning text-center">No hay TacOps disponibles para los arquetipos de esta facción.</div>';
            return;
        }

        const html = factionOpsKeys.map(key => {
            const op = allOps[key];
            const archData = archetypeConfig[op.archetype] || { color: '#666', icon: '', name: op.archetype };
            
            let specialImage = '';
            if (op.name === 'Flanco' || key === 'Flanco') {
                specialImage = `<div class="text-center"><img src="./resources/game_rules_files/flank_tacop-1.png" class="img-fluid mt-2 mb-2 rounded border" alt="Diagrama de Flanco" style="max-height:150px;"></div>`;
            }

            let additionalRulesHtml = '';
            if (op.additional_rules) {
                if (Array.isArray(op.additional_rules)) {
                    additionalRulesHtml = `<ul class="mb-2 ps-3 small text-muted">${op.additional_rules.map(r => `<li>${r}</li>`).join('')}</ul>`;
                } else {
                    additionalRulesHtml = `<div class="mb-2 small text-muted">${op.additional_rules}</div>`;
                }
            }

            let vpHtml = '';
            if (op.victoy_points) {
                if (Array.isArray(op.victoy_points)) {
                    vpHtml = `<ul class="mb-0 ps-3">${op.victoy_points.map(vp => `<li>${vp}</li>`).join('')}</ul>`;
                } else {
                    vpHtml = `<div>${op.victoy_points}</div>`;
                }
            }

            const missionAction = op.action_mission_name ? `
                <div class="mt-3 p-2 bg-light rounded border">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <strong>${op.action_mission_name}</strong>
                        <span class="badge bg-secondary">${op.action_mission_cost}</span>
                    </div>
                    <ul class="mb-0 ps-3 small">
                        ${op.action_mission_yes ? `<li class="text-success">${op.action_mission_yes}</li>` : ''}
                        ${op.action_mission_no ? `<li class="text-danger">${op.action_mission_no}</li>` : ''}
                    </ul>
                </div>` : '';

            return `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card h-100 border-0 shadow-sm tacop-card">
                    <div class="card-header text-white d-flex justify-content-between align-items-center" style="background-color: ${archData.color};">
                        <span class="fw-bold">${op.name}</span>
                        <img src="./resources/game_rules_files/${archData.icon}" width="24" style="filter: brightness(0) invert(1);">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <div class="mb-2 small"><strong>Revelar:</strong> ${op.Reveal}</div>
                        ${additionalRulesHtml}
                        ${specialImage}
                        ${missionAction}
                        <div class="mt-auto pt-3 border-top">
                            <strong class="text-primary">Puntos de Victoria:</strong>
                            <div class="small">${vpHtml}</div>
                        </div>
                    </div>
                    <div class="card-footer text-center py-1 text-white small" style="background-color: ${archData.color}; opacity: 0.9;">
                        ${archData.name}
                    </div>
                </div>
            </div>`;
        }).join('');

        containers.tacops.innerHTML = `<div class="row justify-content-center">${html}</div>`;
    }

    // 5. Ardides
    function renderPloys(factionKey) {
        const ploys = gameData.ploys.filter(p => p.faction === factionKey);

        if (ploys.length === 0) {
            containers.ploys.innerHTML = '<div class="alert alert-light text-center">No hay ardides disponibles.</div>';
            return;
        }

        ploys.sort((a, b) => (a.type || '').localeCompare(b.type || ''));

        const html = ploys.map(ploy => {
            const isStrategic = ploy.type === 'strategic';
            const headerColor = isStrategic ? 'bg-dark' : 'bg-secondary';
            const typeLabel = isStrategic ? 'Estratégico' : 'Táctico';
            
            return `
            <div class="col-12 col-md-6 mb-3">
                <div class="card h-100 shadow-sm">
                    <div class="card-header ${headerColor} text-white d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-uppercase small">${ploy.name}</span>
                        <span class="badge bg-light text-dark">${ploy.cps}</span>
                    </div>
                    <div class="card-body">
                        <span class="badge ${isStrategic ? 'bg-warning text-dark' : 'bg-info text-dark'} mb-2">${typeLabel}</span>
                        <div class="card-text small">${ploy.description}</div>
                    </div>
                </div>
            </div>`;
        }).join('');

        containers.ploys.innerHTML = `<div class="row">${html}</div>`;
    }

    // 6. Equipamiento
    function renderEquipment(factionKey) {
        // Obtenemos los datos brutos. Si es un array (como esperamos con la traducción), usamos filter.
        // Si por casualidad es un objeto, usamos el método antiguo de acceso directo (fallback).
        let equipmentList = [];
        if (Array.isArray(gameData.equipment)) {
            equipmentList = gameData.equipment.filter(item => item.faction === factionKey);
        } else if (gameData.equipment && gameData.equipment[factionKey]) {
            equipmentList = gameData.equipment[factionKey];
        }

        if (!equipmentList || equipmentList.length === 0) {
            containers.equipment.innerHTML = '<div class="alert alert-light text-center py-4">Esta Facción no posee Equipamiento.<br></div>';
            return;
        }

        // Ordenar alfabéticamente
        equipmentList.sort((a, b) => a.name.localeCompare(b.name));

        const html = equipmentList.map(item => {
            // Descripción: Array o String
            let descHtml = '';
            if (Array.isArray(item.description)) {
                descHtml = item.description.map(line => `<p class="mb-1">${line}</p>`).join('');
            } else {
                descHtml = `<p>${item.description}</p>`;
            }

            // Armas (si tiene ATK)
            let weaponHtml = '';
            if (item.ATK) {
                weaponHtml = `
                <div class="equip-weapon-table mt-3">
                    <table class="table table-sm table-dark table-bordered mb-0">
                        <thead>
                            <tr class="text-center">
                                <th class="text-start">Arma</th>
                                <th>A</th>
                                <th>HA</th>
                                <th>Dñ</th>
                                <th class="text-start">Reglas adicionales</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="fw-bold text-start">${item.name}</td>
                                <td class="text-center">${item.ATK}</td>
                                <td class="text-center">${item.HIT}</td>
                                <td class="text-center">${item.DMG}</td>
                                <td class="text-start fst-italic">${item.special_rules || '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>`;
            }

            // Acciones de Equipamiento (si tiene action_cost)
            let actionHtml = '';
            if (item.action_cost) {
                actionHtml = `
                <div class="equip-action-box mt-3">
                    <div class="equip-action-header d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-uppercase">${item.action_name}</span>
                        <span class="badge bg-light text-dark">${item.action_cost}</span>
                    </div>
                    <div class="equip-action-content p-2">
                        <div class="equip-action-yes mb-2 p-2 rounded">
                            ${item.action_yes}
                        </div>
                        <div class="equip-action-no p-2 rounded">
                            ${item.action_no}
                        </div>
                    </div>
                </div>`;
            }

            // Estructura de la Tarjeta con clases CSS
            return `
            <div class="col-12 col-md-6 mb-4">
                <div class="equipment-card h-100 shadow-sm border-danger"> 
                    <div class="equipment-header p-2 bg-danger">
                        <h5 class="mb-0 text-warning text-center fw-bold text-uppercase">${item.name}</h5>
                    </div>
                    <div class="equipment-body p-3 bg-light text-dark">
                        <div class="equipment-description small">
                            ${descHtml}
                        </div>
                        ${weaponHtml}
                        ${actionHtml}
                    </div>
                </div>
            </div>`;
        }).join('');

        containers.equipment.innerHTML = `<div class="row">${html}</div>`;
    }

    init();
});