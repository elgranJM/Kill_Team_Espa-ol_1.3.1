        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('critops-cards-container');
            let allCritOps = {};

            // Petición al nuevo JSON de CritsOps
            fetch('../data/CritsOps.json')
                .then(response => {
                    if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
                    return response.json();
                })
                .then(data => {
                    allCritOps = data;
                    renderCritOps();
                })
                .catch(error => {
                    console.error("Error cargando CritOps:", error);
                    container.innerHTML = `<div class="alert alert-danger" role="alert">
                        Error al cargar la base de datos de CritOps.
                    </div>`;
                });

            function renderCritOps() {
                container.innerHTML = '';

                for (const [key, op] of Object.entries(allCritOps)) {
                    container.innerHTML += generateCritOpCard(key, op);
                }
            }

            function generateCritOpCard(key, op) {
                // 1. Manejo de Reglas Adicionales (Opcional en el JSON)
                let additionalRulesHtml = '';
                if (op.aditional_rules) {
                    additionalRulesHtml = `
                        <div class="victory-points mb-3">
                            <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Reglas Adicionales</div>
                            <div class="small text-start text-muted lh-sm">${op.aditional_rules}</div>
                        </div>
                    `;
                }

                // 2. Manejo de la Acción de Misión solicitada por el usuario
                let actionHtml = '';
                // Iteramos dinámicamente sobre todo el arreglo para soportar múltiples acciones
                if (op.action_mission && op.action_mission.length > 0) {
                    
                    const accionesMapeadas = op.action_mission.map(am => {
                        if (!am.action_mission_name) return '';
                        return `
                            <div class="unique-actions-section border border-dark rounded mb-2 overflow-hidden">
                                <div class="header d-flex justify-content-between align-items-center text-white px-2 py-1">
                                    <div class="fw-bold">${am.action_mission_name}</div>
                                    <div class="ap-box fw-bold text-white bg-transparent border-0 p-0">${am.action_mission_cost}</div>
                                </div>
                                <div class="content p-2 small text-start">
                                    ${am.action_mission_yes ? `<p class="mb-1 d-flex align-items-start"><span class="icon icon-yes flex-shrink-0 mt-1"></span> <span>${am.action_mission_yes}</span></p>` : ''}
                                    ${am.action_mission_no ? `<p class="mb-0 d-flex align-items-start"><span class="icon icon-no flex-shrink-0 mt-1"></span> <span>${am.action_mission_no}</span></p>` : ''}
                                </div>
                            </div>
                        `;
                    }).join('');

                    // Inyectamos el subtítulo solo si existen acciones renderizadas
                    if (accionesMapeadas) {
                        actionHtml = `
                            <div class="sub-header mt-3 text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Acción de Misión</div>
                            ${accionesMapeadas}
                        `;
                    }
                }

                // 3. Manejo de los Puntos de Victoria
                let vpHtml = '';
                if (op.victoy_points) {
                    vpHtml = `
                        <div class="victory-points mt-auto">
                            <div class="sub-header text-uppercase fw-bold border-bottom pb-1 mb-2 text-start">Puntos de Victoria</div>
                            <div class="small text-start lh-sm">${op.victoy_points}</div>
                        </div>
                    `;
                }

                // Generación de la Tarjeta final
                return `
                    <div class="col-xs-12 col-md-6 col-xl-4 text-center p-2 fade-in">
                        <div class="card shadow-sm h-100 border-0 bg-secondary-soft">
                            <!-- Cabecera Naranja Exclusiva de CritOp -->
                            <div class="position-relative text-white p-2 rounded-top fw-bold d-flex align-items-center justify-content-center shadow-sm" style="background-color: #ff5418;">
                                <div class="ap-box bg-dark px-2 rounded small">${op.id}</div>
                                <span>&nbsp&nbspCRIT OP</span>
                            </div>
                            
                            <div class="p-3 d-flex flex-column h-100 bg-white border border-top-0 rounded-bottom">
                                <h4 class="name fw-bold text-dark mb-4">${op.name_es}</h4>
                                <div class="mission-container pt-0 flex-grow-1 d-flex flex-column">
                                    ${additionalRulesHtml}
                                    ${actionHtml}
                                    ${vpHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });