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
                        Error al cargar la base de datos de CritOps. Asegúrate de que el archivo 'CritsOps.json' esté en la misma carpeta.
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
                        <div class="victory-points-container">
                            <div class="sub-header text-uppercase fw-bold border-bottom text-start">Reglas Adicionales</div>
                            <div class="small text-start text-muted lh-sm">${op.aditional_rules}</div>
                        </div>
                    `;
                }

                // 2. Manejo de la Acción de Misión solicitada por el usuario
                let actionHtml = '';
                if (op.action_mission && op.action_mission.length > 0) {
                    const accionesMapeadas = op.action_mission.map(am => {
                        if (!am.action_mission_name) return '';
                        return `
                            <div class="unique-actions-section border border-dark rounded-0 overflow-hidden p-0 mb-2">
                                <div class="header d-flex justify-content-between align-items-center text-white px-2 py-1">
                                    <div class="fw-bold">${am.action_mission_name}</div>
                                    <div class="ap-box fw-bold text-white bg-transparent border-0 p-0">${am.action_mission_cost}</div>
                                </div>
                                <div class="content small text-start p-2">
                                    ${am.action_mission_yes ? `<p class="action-desc d-flex align-items-start mb-1"><span class="icon icon-yes flex-shrink-0 mt-1"></span> <span>${am.action_mission_yes}</span></p>` : ''}
                                    ${am.action_mission_no ? `<p class="action-desc d-flex align-items-start mb-0"><span class="icon icon-no flex-shrink-0 mt-1"></span> <span>${am.action_mission_no}</span></p>` : ''}
                                </div>
                            </div>
                        `;
                    }).join('');

                    if (accionesMapeadas) {
                        actionHtml = `
                            <div class="sub-header text-uppercase fw-bold border-bottom text-start mt-display-only">Acción de Misión</div>
                            ${accionesMapeadas}
                        `;
                    }
                }

                // 3. Manejo de los Puntos de Victoria
                let vpHtml = '';
                if (op.victoy_points) {
                    vpHtml = `
                        <div class="victory-points mt-auto">
                            <div class="sub-header text-uppercase fw-bold border-bottom text-start">Puntos de Victoria</div>
                            <div class="small text-start lh-sm">${op.victoy_points}</div>
                        </div>
                    `;
                }

                // Generación de la Tarjeta final
                return `
                    <div class="col-xs-12 col-md-6 col-xl-4 text-center p-2 fade-in" data-op-id="${key}">
                        <div class="card shadow-sm h-100 border-0 bg-secondary-soft">
                            <!-- Cabecera Naranja Exclusiva de CritOp -->
                            <div class="position-relative text-white p-2 rounded-top fw-bold d-flex align-items-center justify-content-center shadow-sm" style="background-color: #ff5418;">
                                <div class="ap-box bg-dark px-2 rounded small">${op.id}</div>
                                <span>&nbsp&nbspCRIT OP</span>
                            </div>
                            
                            <!-- Contenedor blanco con la nueva clase watermark-container -->
                            <div class="p-3 d-flex flex-column h-100 bg-white border border-top-0 rounded-bottom watermark-container">
                                
                                <!-- Marca de Agua Absoluta -->
                                <img src="../resources/marca-de-agua.png" class="watermark-img" alt="Símbolo de facción">
                                
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

            // --- LÓGICA DE IMPRESIÓN ---

            // 1. Llenar el select múltiple
            function populatePrintDropdown() {
                const select = document.getElementById('specificPrintSelect');
                select.innerHTML = ''; // Limpiamos para inyectar directo las opciones
                for (const [key, op] of Object.entries(allCritOps)) {
                    select.innerHTML += `<option value="${key}">${op.name_es}</option>`;
                }
            }

            setTimeout(populatePrintDropdown, 100);

            // 2. Controlar si el <select> está deshabilitado
            window.togglePrintSelect = function () {
                const isSpecific = document.getElementById('printSpecific').checked;
                document.getElementById('specificPrintSelect').disabled = !isSpecific;
            };

            // Generador de Contraportadas
            function generateBackCoverHtml() {
                return `
                    <div class="col-xs-12 col-md-6 col-xl-4 text-center p-2 fade-in back-cover-wrapper">
                        <div class="card back-cover-card shadow-sm h-100 border-0 d-flex flex-column justify-content-between position-relative">
                            <div class="stripe-top text-white fw-bold">
                                <span>CRIT OP</span>
                            </div>
                            <div class="flex-grow-1 d-flex align-items-center justify-content-center">
                                <img src="../resources/marca-de-agua-naranja.png" class="back-watermark" alt="CritOp Back">
                            </div>
                            <div class="stripe-bottom text-white fw-bold">
                                <span>CRIT OP</span>
                            </div>
                        </div>
                    </div>
                `;
            }

            // 3. Ejecutar el filtrado (Soporte Multi-Select) y llamar a la impresora
            window.executePrint = function () {
                const isSpecific = document.getElementById('printSpecific').checked;
                const includeBackCovers = document.getElementById('printBackCovers').checked;
                const container = document.getElementById('critops-cards-container');
                const allCards = container.querySelectorAll('[data-op-id]');
                
                let printedCount = 0;

                // Limpieza de seguridad por si quedaron contraportadas anteriores
                document.querySelectorAll('.back-cover-wrapper').forEach(el => el.remove());

                if (isSpecific) {
                    const selectEl = document.getElementById('specificPrintSelect');
                    const selectedKeys = Array.from(selectEl.selectedOptions).map(opt => opt.value);

                    if (selectedKeys.length === 0) {
                        alert("Error: Debes seleccionar al menos una misión específica para imprimir.");
                        return;
                    }

                    printedCount = selectedKeys.length;

                    allCards.forEach(card => {
                        if (selectedKeys.includes(card.getAttribute('data-op-id'))) {
                            card.classList.remove('d-print-none');
                        } else {
                            card.classList.add('d-print-none');
                        }
                    });
                } else {
                    printedCount = allCards.length;
                    allCards.forEach(card => card.classList.remove('d-print-none'));
                }

                // Inyectar las contraportadas si el usuario marcó la casilla
                if (includeBackCovers && printedCount > 0) {
                    for (let i = 0; i < printedCount; i++) {
                        container.insertAdjacentHTML('beforeend', generateBackCoverHtml());
                    }
                }

                const printModalEl = document.getElementById('printModal');
                const modalInstance = bootstrap.Modal.getInstance(printModalEl);
                modalInstance.hide();

                setTimeout(() => {
                    window.print();

                    // Limpieza post-impresión para restaurar la pantalla
                    document.querySelectorAll('.back-cover-wrapper').forEach(el => el.remove());

                    if (isSpecific) {
                        allCards.forEach(card => card.classList.remove('d-print-none'));
                    }
                }, 400);
            };
        });