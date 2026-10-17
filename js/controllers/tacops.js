        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('tacops-cards-container');
            const archetypeFilter = document.getElementById('tacopsFilterSelect');
            const favFilter = document.getElementById('favTacopsSwitch');

            let allTacOps = {};
            let favTacOps = JSON.parse(localStorage.getItem('favTacops')) || [];

            const archetypeDisplay = {
                'recon': 'Reconocimiento',
                'security': 'Seguridad',
                'infiltration': 'Infiltración',
                'seek-destroy': 'Buscar y Destruir'
            };

            fetch('../data/tacopsgenerales.json')
                .then(response => {
                    if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
                    return response.json();
                })
                .then(data => {
                    allTacOps = data;
                    renderTacOps();
                })
                .catch(error => {
                    console.error("Error cargando TacOps:", error);
                    container.innerHTML = `<div class="alert alert-danger" role="alert">
                        Error al cargar la base de datos de TacOps. Asegúrate de que el archivo 'tacopsgenerales.json' esté en la misma carpeta o de estar utilizando un servidor local.
                    </div>`;
                });

            function renderTacOps() {
                container.innerHTML = '';
                const selectedArchetype = archetypeFilter.value;
                const showOnlyFavs = favFilter.checked;
                let renderedCount = 0;

                for (const [key, op] of Object.entries(allTacOps)) {
                    const isFav = favTacOps.includes(key);
                    if (selectedArchetype !== 'all' && op.archetype !== selectedArchetype) continue;
                    if (showOnlyFavs && !isFav) continue;

                    renderedCount++;
                    container.innerHTML += generateCardHtml(key, op, isFav);
                }

                if (renderedCount === 0) {
                    container.innerHTML = `<div class="col-12 text-center p-5">
                        <i class="bi bi-clipboard-x text-muted" style="font-size: 3rem;"></i>
                        <p class="mt-3 text-muted">No se encontraron TacOps que coincidan con los filtros actuales.</p>
                    </div>`;
                }
            }

            function generateCardHtml(key, op, isFav) {
                const archName = archetypeDisplay[op.archetype] || op.archetype;
                const favIconClass = isFav ? 'bi-heart-fill text-white' : 'bi-heart text-white-50';

                let additionalRulesHtml = '';
                if (op.additional_rules) {
                    if (Array.isArray(op.additional_rules)) {
                        additionalRulesHtml = `<div class="victory-points"><div class="sub-header">Reglas Adicionales</div><ul>${op.additional_rules.map(r => `<li>${r}</li>`).join('')}</ul></div>`;
                    } else {
                        additionalRulesHtml = `<div class="victory-points"><div class="sub-header">Reglas Adicionales</div><p class="text-muted small mb-0">${op.additional_rules}</p></div>`;
                    }
                }

                let actionHtml = '';
                if (op.action_mission_name) {
                    actionHtml = `
                        <div class="sub-header mt-3 text-uppercase fw-bold border-bottom pb-1 mb-2">Acción de Misión</div>
                        <div class="unique-actions-section border border-dark rounded-0 overflow-hidden p-0 mb-2">
                            <div class="header d-flex justify-content-between align-items-center text-white px-2 py-1">
                                <div class="fw-bold">${op.action_mission_name}</div>
                                <div class="ap-box fw-bold text-white bg-transparent border-0 p-0">${op.action_mission_cost}</div>
                            </div>
                            <div class="content small text-start p-2">
                                ${op.action_mission_yes ? `<p class="action-desc d-flex align-items-start mb-1"><span class="icon icon-yes flex-shrink-0 mt-1"></span> <span>${op.action_mission_yes}</span></p>` : ''}
                                ${op.action_mission_no ? `<p class="action-desc d-flex align-items-start mb-0"><span class="icon icon-no flex-shrink-0 mt-1"></span> <span>${op.action_mission_no}</span></p>` : ''}
                            </div>
                        </div>
                    `;
                }

                let vpHtml = '';
                if (op.victoy_points) {
                    if (Array.isArray(op.victoy_points)) {
                        const vpList = [...op.victoy_points];
                        let limitText = '';
                        if (vpList[vpList.length - 1] && vpList[vpList.length - 1].includes("No puedes obtener más de")) {
                            limitText = `<p class="fst-italic text-danger small mt-2 mb-0">${vpList.pop()}</p>`;
                        }
                        vpHtml = `<ul class="text-start small mb-1">${vpList.map(vp => `<li>${vp}</li>`).join('')}</ul>${limitText}`;
                    } else {
                        vpHtml = `<p class="small mb-0 text-start">${op.victoy_points}</p>`;
                    }
                }

                // AQUÍ SE INYECTA EL COLOR HEXADECIMAL: style="background-color: ${getCustomColor(op.archetype)};"
                return `
                    <div class="col-xs-12 col-md-6 col-lg-4 text-center p-2 tacop-container fade-in">
                        <div class="tacop card shadow-sm h-100 ${op.archetype} border-0">
                            <div class="archetype position-relative text-white p-2 rounded-top fw-bold d-flex align-items-center justify-content-center" style="background-color: ${getCustomColor(op.archetype)};">
                                <img src="${getArchetypeIcon(op.archetype)}" class="svg-white" alt="Icono ${archName}" style="width: 1.5rem; height: 1.5rem; margin-right: 8px;">
                                <span>${archName.toUpperCase()}</span>
                                <i class="gototacops bi ${favIconClass} position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer" 
                                   style="cursor: pointer; font-size: 1.2rem;" 
                                   onclick="window.toggleFavorite('${key}')" title="Favorito"></i>
                            </div>
                            <div class="middle p-3 d-flex flex-column h-100 bg-light">
                                <h4 class="name fw-bold text-dark mb-3">${op.name}</h4>
                                <div class="mission-container pt-0 flex-grow-1">
                                    <div class="victory-points mb-3">
                                        <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2">Revelar</div>
                                        <div class="small text-start">${op.Reveal}</div>
                                    </div>
                                    ${additionalRulesHtml}
                                    ${actionHtml}
                                    <div class="victory-points mt-auto">
                                        <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2">Puntos de Victoria</div>
                                        ${vpHtml}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            // FUNCIÓN ACTUALIZADA CON COLORES HEX EXACTOS
            function getCustomColor(archetype) {
                switch (archetype) {
                    case 'recon': return '#f05c22';         // Naranja
                    case 'security': return '#0b6be1';      // Azul
                    case 'infiltration': return '#5f5f5f';  // Gris
                    case 'seek-destroy': return '#bd0003';  // Rojo
                    default: return '#6c757d';              // Gris fallback
                }
            }

            // NUEVA FUNCIÓN PARA OBTENER LA RUTA DEL SVG OFICIAL
            function getArchetypeIcon(archetype) {
                switch (archetype) {
                    case 'recon': return '../resources/game_rules_files/recon.svg';
                    case 'security': return '../resources/game_rules_files/security.svg';
                    case 'infiltration': return '../resources/game_rules_files/infiltration.svg';
                    case 'seek-destroy': return '../resources/game_rules_files/seek-destroy.svg';
                    default: return '';
                }
            }

            archetypeFilter.addEventListener('change', renderTacOps);
            favFilter.addEventListener('change', renderTacOps);

            window.toggleFavorite = function (key) {
                const index = favTacOps.indexOf(key);
                if (index > -1) favTacOps.splice(index, 1);
                else favTacOps.push(key);
                localStorage.setItem('favTacops', JSON.stringify(favTacOps));
                renderTacOps();
            };
        });