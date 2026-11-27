document.addEventListener('DOMContentLoaded', async () => {
    const chapterTitles = {
        "precision": { title: "1. Modificadores de Precisión", icon: "bi-crosshair text-naranja" },
        "repeticion": { title: "2. Repeticiones de Dados", icon: "bi-arrow-clockwise text-naranja" },
        "antidefensa": { title: "3. Penetración y Anti-Defensa", icon: "bi-shield-slash text-naranja" },
        "dano-area": { title: "4. Daño Directo y Área de Efecto", icon: "bi-fire text-naranja" },
        "reglas-especiales": { title: "5. Restricciones y Reglas Especiales", icon: "bi-exclamation-octagon text-naranja" }
    };

    const loadWeapons = fetch('../data/reglasArmas.json')
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar reglasArmas.json");
            return response.json();
        })
        .then(data => renderWeapons(data, chapterTitles))
        .catch(error => {
            console.error("Error crítico cargando reglasArmas.json:", error);
            document.getElementById('armas-container').innerHTML =
                `<div class="alert alert-danger">Error cargando las reglas de armas. Verifica la consola.</div>`;
        });

    // Esperar a que los 3 módulos terminen de inyectar su HTML
    await Promise.all([loadWeapons, renderKillzones(), renderUniversalEquipment()]);
    initInteractions();
});

function resolveAssetPath(path) {
    if (!path || typeof path !== 'string') return '';
    const clean = path.trim();
    if (!clean || clean.startsWith('http') || clean.startsWith('../')) return clean;
    // Normaliza "/resources/...", "./resources/..." o "resources/..." hacia "../resources/..."
    return '../' + clean.replace(/^(\.\/|\/)/, '');
}

function renderWeapons(rules, chapterTitles) {
    const container = document.getElementById('armas-container');
    container.innerHTML = ''; // Limpiar el spinner

    // Agrupar las reglas por "type"
    const groupedRules = {};
    for (let key in chapterTitles) groupedRules[key] = [];

    for (let key in rules) {
        const rule = rules[key];
        rule.id = key; // Asignar el key como ID para el acordeón
        if (groupedRules[rule.type]) {
            groupedRules[rule.type].push(rule);
        } else {
            console.warn(`Regla ${rule.name} tiene un 'type' desconocido: ${rule.type}`);
        }
    }

    // Construir el HTML
    let htmlOutput = '';

    for (let type in chapterTitles) {
        if (groupedRules[type].length === 0) continue; // Saltar capítulos vacíos

        const chapter = chapterTitles[type];
        htmlOutput += `
                    <div class="rule-section"> <h4 class="mb-3 mt-4 text-dark fw-bold border-bottom pb-2">
                        <i class="bi ${chapter.icon} me-2"></i>${chapter.title}
                        </h4>
                        <div class="accordion mb-4 shadow-sm" id="accordion-${type}">
                `;

        groupedRules[type].forEach(rule => {
            htmlOutput += `
                <div class="accordion-item rule-item">
                    <h2 class="accordion-header" id="heading-${rule.id}">
                        <button class="accordion-button collapsed fw-bold text-dark fs-6" type="button"
                            data-bs-toggle="collapse" data-bs-target="#collapse-${rule.id}"
                            aria-expanded="false" aria-controls="collapse-${rule.id}">
                            ${rule.name}
                            <span class="badge bg-secondary ms-auto me-2" style="font-size: 0.70rem; font-weight: normal;">${rule.uso}</span>
                        </button>
                    </h2>
                    <div id="collapse-${rule.id}" class="accordion-collapse collapse"
                        aria-labelledby="heading-${rule.id}" data-bs-parent="#accordion-${type}">
                        <div class="accordion-body text-secondary">
                            <p class="small mb-2">${rule.description}</p>
                            ${rule.ejemplo ? `<div class="alert alert-light border border-start border-4 small p-2 mb-0 mt-2 text-muted"><i class="bi bi-info-circle-fill text-info me-1"></i><strong>Ejemplo:</strong> ${rule.ejemplo}</div>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        htmlOutput += `</div></div>`; // Cierra el acordeón Y EL .rule-section
    }

    container.innerHTML = htmlOutput;
}

async function renderKillzones() {
    const container = document.getElementById('page-terrenos');

    try {
        // Aseguramos la ruta relativa explícita
        const response = await fetch('../data/maps.json');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: No se encontró el archivo 'maps.json' en la ruta especificada.`);
        }

        const data = await response.json();

        if (!container) {
            console.error('Error: No existe el contenedor con id="page-terrenos" en reglas.html');
            return;
        }

        let htmlOutput = `
            <div class="mb-4">
                <h2 class="border-bottom border-danger pb-2 text-uppercase fw-bold">
                    <i class="bi bi-geo-alt-fill text-danger me-2"></i>Zonas de Aniquilación y Terreno
                </h2>
                <p class="text-muted">Consulta las reglas específicas, acciones únicas, mapas y piezas de terreno para cada Killzone.</p>
            </div>
            <div class="accordion" id="accordionKillzones">
        `;

        let kzIndex = 0;

        for (const [kzId, kzData] of Object.entries(data)) {
            const collapseId = `collapse-kz-${kzId}`;
            const headingId = `heading-kz-${kzId}`;

            // 1. Portada
            let portadaHtml = (kzData.portada && kzData.portada.trim() !== "")
                ? `<img src="${resolveAssetPath(kzData.portada)}" alt="Portada de ${kzData.name}" class="img-fluid rounded mb-3 shadow-sm" style="max-height: 250px; width: 100%; object-fit: cover;">`
                : '';

            // 2. Reglas
            let rulesHtml = '';
            if (Array.isArray(kzData.rules) && kzData.rules.length > 0) {
                rulesHtml = `
                            <div class="mb-4">
                                <h4 class="text-naranja border-bottom pb-1">
                                    <i class="bi bi-book-half me-2"></i>Reglas Especiales
                                </h4>
                                <div class="row row-cols-1 g-3">
                                    ${kzData.rules.map(rule => {
                    const hasImage = rule.r_img && typeof rule.r_img === 'string' && rule.r_img.trim() !== '';

                    // Si tiene imagen, dividimos la tarjeta en 2 columnas: texto (col-md-7/8) e imagen (col-md-5/4)
                    // Si NO tiene imagen, el texto ocupa todo el ancho (col-12)
                    const textColClass = hasImage ? 'col-12 col-md-7 col-lg-8' : 'col-12';
                    const imgColClass = 'col-12 col-md-5 col-lg-4 d-flex align-items-center justify-content-center p-2';

                    return `
                                    <div class="col rule-item">
                                        <div class="equipment-card h-100 shadow-sm border border-dark rounded overflow-hidden">
                                            <div class="p-2 bg-dark text-white text-center">
                                                <h6 class="mb-0 fw-bold text-uppercase">${rule.r_name || 'Regla Especial'}</h6>
                                            </div>
                                                <div class="p-3 bg-light text-dark">
                                                    <div class="row align-items-center">
                                                        <div class="${textColClass}">
                                                            <div class="equipment-description small mb-0">
                                                            ${rule.r_description || ''}
                                                        </div>
                                                    </div>
                                        
                                                    ${hasImage ? `
                                                    <div class="${imgColClass}">
                                                        <img src="${resolveAssetPath(rule.r_img)}" 
                                                        class="img-fluid rounded border shadow-sm" 
                                                        alt="${rule.r_name || 'Imagen de la regla'}"
                                                        style="max-height: 180px; object-fit: contain;">
                                                    </div>
                                                ` : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
                }).join('')}
                        </div>
                    </div>
                        `;
            }

            // 3. Acciones
            let actionsHtml = '';
            if (Array.isArray(kzData.actions) && kzData.actions.length > 0) {
                actionsHtml = `
        <div class="mb-4">
            <h4 class="text-success border-bottom pb-1"><i class="bi bi-lightning-charge-fill me-2"></i>Acciones Únicas</h4>
            ${kzData.actions.map(action => {
                    const descYes = Array.isArray(action.a_description)
                        ? action.a_description.map(desc => `
                        <p class="action-desc d-flex align-items-start mb-1">
                            <span class="icon icon-yes flex-shrink-0 mt-1"></span>
                            <span>${desc}</span>
                        </p>`).join('')
                        : (action.a_description ? `<p class="action-desc d-flex align-items-start mb-1"><span class="icon icon-yes flex-shrink-0 mt-1"></span><span>${action.a_description}</span></p>` : '');

                    const descNo = (action.a_no && action.a_no.trim() !== '') ? `
                    <p class="action-desc d-flex align-items-start mb-0">
                        <span class="icon icon-no flex-shrink-0 mt-1"></span>
                        <span>${action.a_no}</span>
                    </p>` : '';

                    return `
                    <div class="unique-actions-section rule-item border border-dark rounded-0 overflow-hidden p-0 mb-2">
                        <div class="header d-flex justify-content-between align-items-center text-white px-2 py-1">
                            <div class="fw-bold">${action.a_name || 'Acción Única'}</div>
                            <div class="ap-box fw-bold text-white bg-transparent border-0 p-0">${action.cost || '1 PA'}</div>
                        </div>
                        <div class="content small text-start p-2">
                            ${descYes}
                            ${descNo}
                        </div>
                    </div>`;
                }).join('')}
        </div>`;
            }

            // 4. Mapas
            let mapsHtml = '';
            if (kzData.maps && kzData.maps.length > 0) {
                mapsHtml = `
                    <div class="mb-4">
                        <h4 class="text-warning text-dark border-bottom pb-1"><i class="bi bi-map me-2"></i>Mapas Predeterminados</h4>
                        <div class="row row-cols-1 row-cols-md-2 g-3">
                            ${kzData.maps.map(map => `
                                <div class="col-12 col-md-6 mb-4">
                                    <div class="equipment-card h-100 shadow-sm border border-dark rounded overflow-hidden"> 
                                        <div class="p-2 bg-dark text-white text-center">
                                        <h6 class="mb-0 fw-bold text-uppercase">${map.m_id}</h6>
                                        </div>
                                        <div class="p-3 bg-light text-dark">
                                            <div class="card-body p-2 d-flex justify-content-center align-items-center bg-light">
                                                <img src="${resolveAssetPath(map.m_img)}" alt="Mapa ${map.m_id}" class="img-fluid rounded" style="max-height: 250px; object-fit: contain;">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // 5. Terreno
            let terrainHtml = '';
            if (kzData.terrain && kzData.terrain.length > 0) {
                terrainHtml = `
                    <div class="mb-2">
                        <h4 class="text-secondary border-bottom pb-1"><i class="bi bi-bricks me-2"></i>Terreno</h4>
                        <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
                            ${kzData.terrain.map(terr => `
                                <div class="col rule-item">
                                    <div class="card h-100 shadow-sm border-secondary">    
                                        <div class="equipment-card h-100 shadow-sm border border-secondary rounded overflow-hidden"> 
                                            <div class="p-2 bg-secondary text-white text-center">
                                                <h6 class="mb-0 fw-bold text-uppercase">${terr.t_id}</h6>
                                            </div>
                                            <div class="p-3 bg-light text-dark">
                                                <div class="card-body p-2 d-flex justify-content-center align-items-center bg-light">
                                                    ${terr.t_img ? `<img src="${resolveAssetPath(terr.t_img)}" alt="Pieza ${terr.t_id}" class="img-fluid rounded mb-2" style="max-height: 100px; object-fit: contain; margin: 0 auto;">` : ''}
                                                </div>
                                                <div>
                                                   ${Array.isArray(terr.type) ? terr.type.map(t => `<span class="badge bg-dark me-1 mb-1">${t}</span>`).join('') : ''}
                                                </div>
                                            </div>
                                        </div>   
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Ensamblado
            htmlOutput += `
                <div class="accordion-item rule-section mb-3 border-0 shadow-sm rounded">
                    <h2 class="accordion-header" id="${headingId}">
                        <button class="accordion-button ${kzIndex === 0 ? '' : 'collapsed'} fw-bold fs-5 bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${kzIndex === 0 ? 'true' : 'false'}" aria-controls="${collapseId}">
                            ${kzData.name}
                        </button>
                    </h2>
                    <div id="${collapseId}" class="accordion-collapse collapse ${kzIndex === 0 ? 'show' : ''}" aria-labelledby="${headingId}" data-bs-parent="#accordionKillzones">
                        <div class="accordion-body bg-light">
                            ${portadaHtml}
                            <p class="lead mb-4 text-dark">${kzData.description}</p>
                            ${rulesHtml}
                            ${actionsHtml}
                            ${mapsHtml}
                            ${terrainHtml}
                        </div>
                    </div>
                </div>
            `;
            kzIndex++;
        }

        htmlOutput += `</div>`;
        container.innerHTML = htmlOutput;

    } catch (error) {
        console.error("Error al procesar maps.json:", error);
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger shadow-sm" role="alert">
                    <h5 class="fw-bold mb-2"><i class="bi bi-exclamation-octagon-fill me-2"></i>Error al cargar maps.json</h5>
                    <p class="mb-1"><strong>Causa detectada:</strong> <code>${error.message}</code></p>
                    <hr>
                    <small class="text-muted d-block">
                        <strong>Acción recomendada:</strong> Si el error indica <code>Unexpected token</code>, abre <code>maps.json</code> en VS Code o valida la sintaxis en un linter (ej. JSONLint) para corregir comillas o comas no válidas.
                    </small>
                </div>`;
        }
    }
}

async function renderUniversalEquipment() {
    const container = document.getElementById('equipmentAccordion');
    const loading = document.getElementById('equipment-loading');

    try {
        const response = await fetch('../data/equipment.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filtrar estrictamente los universales
        const universalEquip = data.filter(item => item.faction === "universal");
        let htmlOutput = '';

        universalEquip.forEach(eq => {
            const collapseId = `collapse-equip-${eq.id_equip}`;
            const headingId = `heading-equip-${eq.id_equip}`;

            // 1. Procesar Armas (si existen)
            let weaponsHtml = '';
            if (eq.weapon && eq.weapon.length > 0) {
                weaponsHtml = `
                            <div class="table-responsive mt-3">
                                <table class="table table-bordered table-attributes shadow-sm small">
                                    <thead>
                                        <tr>
                                            <th>NOMBRE / NAME</th>
                                            <th>ATAQ. / ATK</th>
                                            <th>IMP. / HIT</th>
                                            <th>DAÑO / DMG</th>
                                            <th>REGLAS / RULES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${eq.weapon.map(w => `
                                            <tr>
                                                <td>${w.w_name}</td>
                                                <td>${w.ATK}</td>
                                                <td>${w.HIT}</td>
                                                <td>${w.DMG}</td>
                                                <td>${w.rules}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `;
            }

            // 2. Procesar Acciones (si existen)
            let actionsHtml = '';
            if (Array.isArray(eq.action) && eq.action.length > 0) {
                actionsHtml = `<div class="mt-3">` + eq.action.map(act => {
                    const descYes = Array.isArray(act.action_yes)
                        ? act.action_yes.map(desc => `
                <p class="action-desc d-flex align-items-start mb-1">
                    <span class="icon icon-yes flex-shrink-0 mt-1"></span>
                    <span>${desc}</span>
                </p>`).join('')
                        : (act.action_yes ? `<p class="action-desc d-flex align-items-start mb-1"><span class="icon icon-yes flex-shrink-0 mt-1"></span><span>${act.action_yes}</span></p>` : '');

                    const descNo = (act.action_no && act.action_no.trim() !== '') ? `
            <p class="action-desc d-flex align-items-start mb-0">
                <span class="icon icon-no flex-shrink-0 mt-1"></span>
                <span>${act.action_no}</span>
            </p>` : '';

                    return `
            <div class="unique-actions-section border border-dark rounded-0 overflow-hidden p-0 mb-2">
                <div class="header d-flex justify-content-between align-items-center text-white px-2 py-1">
                    <div class="fw-bold">${act.action_name || 'Acción'}</div>
                    <div class="ap-box fw-bold text-white bg-transparent border-0 p-0">${act.action_cost || '1 PA'}</div>
                </div>
                <div class="content small text-start p-2">
                    ${descYes}
                    ${descNo}
                </div>
            </div>`;
                }).join('') + `</div>`;
            }

            // 3. Procesar Imágenes (si existen)
            let imagesHtml = '';
            if (eq.img && eq.img.length > 0) {
                imagesHtml = `
                            <div class="row g-2 mt-3 justify-content-center">
                                ${eq.img.map(imgSrc => `
                                    <div class="col-auto">
                                        <img src="${resolveAssetPath(imgSrc)}" class="img-fluid rounded border shadow-sm" style="max-height: 150px;" alt="Imagen de ${eq.name}">
                                    </div>
                                `).join('')}
                            </div>
                        `;
            }

            // 4. Ensamblar el Acordeón
            htmlOutput += `
                        <div class="accordion-item rule-item">
                            <h2 class="accordion-header" id="${headingId}">
                                <button class="accordion-button collapsed fw-bold text-dark fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                                    <i class="bi bi-box-seam me-2 text-secondary"></i> ${eq.name}
                                </button>
                            </h2>
                            <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headingId}" data-bs-parent="#equipmentAccordion">
                                <div class="accordion-body text-secondary">
                                    <div class="equipment-description small">
                                        ${eq.description}
                                    </div>
                                    ${weaponsHtml}
                                    ${actionsHtml}
                                    ${imagesHtml}
                                </div>
                            </div>
                        </div>
                    `;
        });

        if (loading) loading.remove();
        container.innerHTML = htmlOutput;

    } catch (error) {
        console.error("Error crítico cargando equipment.json:", error);
        if (loading) loading.remove();
        container.innerHTML = `<div class="alert alert-danger shadow-sm"><i class="bi bi-exclamation-triangle-fill me-2"></i>Error al cargar los equipamientos universales. Revisa la consola para más detalles.</div>`;
    }
}

// Lógica de Tabs y Búsqueda envuelta en una función
function initInteractions() {
    const searchInput = document.getElementById('searchInput');
    const noResultsMsg = document.getElementById('noResultsMsg');

    const navButtons = document.querySelectorAll('#subpageNav .nav-link');
    const subpages = document.querySelectorAll('.rule-subpage');

    let activePageId = "#page-principios";

    // LÓGICA 1: TABS
    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (searchInput.value.trim().length > 0) return;

            navButtons.forEach(btn => btn.classList.remove('active', 'shadow-sm'));
            this.classList.add('active', 'shadow-sm');

            const target = this.getAttribute('data-target');
            subpages.forEach(page => page.classList.add('d-none'));
            document.querySelector(target).classList.remove('d-none');

            activePageId = target;
        });
    });

    // LÓGICA 2: BUSCADOR
    searchInput.addEventListener('keyup', function () {
        const filter = this.value.toLowerCase().trim();
        const ruleItems = document.querySelectorAll('.rule-item');
        let globalMatches = 0;

        let matchesByPage = {};
        subpages.forEach(page => { matchesByPage[page.id] = 0; });

        if (filter.length === 0) {
            subpages.forEach(page => {
                if (`#${page.id}` === activePageId) {
                    page.classList.remove('d-none');
                } else {
                    page.classList.add('d-none');
                }
            });

            ruleItems.forEach(item => {
                item.style.display = '';
                const collapseDiv = item.querySelector('.accordion-collapse');
                const button = item.querySelector('.accordion-button');
                if (collapseDiv && button) {
                    collapseDiv.classList.remove('show');
                    button.classList.add('collapsed');
                    button.setAttribute('aria-expanded', 'false');
                }
            });

            // Volver a mostrar todas las secciones
            document.querySelectorAll('.rule-section').forEach(section => {
                section.style.display = '';
            });

            noResultsMsg.classList.add('d-none');
            document.getElementById('subpageNav').classList.remove('d-none');
            return;
        }

        document.getElementById('subpageNav').classList.add('d-none');

        ruleItems.forEach(item => {
            const textContent = item.textContent.toLowerCase();
            const parentPage = item.closest('.rule-subpage');

            if (textContent.includes(filter)) {
                item.style.display = '';
                globalMatches++;
                if (parentPage) matchesByPage[parentPage.id]++;

                const collapseDiv = item.querySelector('.accordion-collapse');
                const button = item.querySelector('.accordion-button');
                if (filter.length > 2 && collapseDiv && button) {
                    collapseDiv.classList.add('show');
                    button.classList.remove('collapsed');
                    button.setAttribute('aria-expanded', 'true');
                }
            } else {
                item.style.display = 'none';
            }
        });

        subpages.forEach(page => {
            if (matchesByPage[page.id] > 0) {
                page.classList.remove('d-none');
            } else {
                page.classList.add('d-none');
            }
        });

        // NUEVO LÓGICA: Ocultar títulos (rule-sections) vacíos
        const ruleSections = document.querySelectorAll('.rule-section');
        ruleSections.forEach(section => {
            // Contamos cuántos elementos .rule-item dentro de esta sección NO están ocultos
            const visibleItems = Array.from(section.querySelectorAll('.rule-item'))
                .filter(item => item.style.display !== 'none');

            if (visibleItems.length === 0) {
                section.style.display = 'none'; // Oculta el contenedor completo (título incluido)
            } else {
                section.style.display = ''; // Mantiene visible el contenedor
            }
        });


        if (globalMatches === 0) {
            noResultsMsg.classList.remove('d-none');
        } else {
            noResultsMsg.classList.add('d-none');
        }
    });
}