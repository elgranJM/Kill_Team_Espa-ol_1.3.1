// 1. DICCIONARIO DE DATOS (Solución a la restricción de lectura de carpetas)
const terrainData = {
    "General": ["point.png"],
    "Chalnath": ["chalnath_b_1.png", "chalnath_b_2.png", "chalnath_m_1.png", "chalnath_m_2.png", "chalnath_m_3.png", "chalnath_m_4.png", "chalnath_m_5.png", "chalnath_m_6.png"],
    "Gallowdark": ["gallowdark_a_1.png", "gallowdark_a_2.png", "gallowdark_a_3.png", "gallowdark_a_4.png", "gallowdark_b_1.png", "gallowdark_b_2.png", "gallowdark_b_3.png", "gallowdark_s_1.png", "gallowdark_s_2.png", "gallowdark_s_3.png", "gallowdark_s_4.png"],
    "Moroch": ["moroch_a_1.png", "moroch_a_2.png", "moroch_b_1.png", "moroch_b_2.png", "moroch_m_1.png", "moroch_m_2.png", "moroch_m_3.png"],
    "Nachmunt": ["nachmunt_b_1.png", "nachmunt_b_2.png", "nachmunt_g_1.png", "nachmunt_s_1.png", "nachmunt_s_2.png", "nachmunt_t_1.png", "nachmunt_t_2.png", "nachmunt_t_3.png", "nachmunt_t_4.png", "nachmunt_t_5.png", "nachmunt_t_6.png", "nachmunt_t_7.png"],
    "Octarius": ["octarius_b_1.png", "octarius_b_2.png", "octarius_g_1.png", "octarius_m_1.png", "octarius_m_2.png", "octarius_m_3.png", "octarius_p_1.png", "octarius_p_2.png", "octarius_p_3.png", "octarius_t_1.png", "octarius_t_2.png", "octarius_t_3.png"],
    "Tombworld": ["tomb_world_a_1.png", "tomb_world_a_2.png", "tomb_world_a_3.png", "tomb_world_a_4.png", "tomb_world_b_1.png", "tomb_world_b_2.png", "tomb_world_b_3.png", "tomb_world_b_4.png", "tomb_world_c_1.png", "tomb_world_c_2.png", "tomb_world_c_3.png", "tomb_world_c_4.png", "tomb_world_c_5.png", "tomb_world_s_1.png", "tomb_world_s_2.png", "tomb_world_t.png"],
    "Volkus": ["volkus_lr_1.png", "volkus_lr_2.png", "volkus_obs_1.png", "volkus_obs_2.png", "volkus_obs_3.png", "volkus_obs_4.png", "volkus_obs_5.png", "volkus_sr_1.png", "volkus_sr_2.png", "volkus_v_1.png", "volkus_v_2.png"],
    "WTC": ["wtc_b_1.png", "wtc_b_3.png", "wtc_b_5.png", "wtc_b_6.png", "wtc_c_2.png", "wtc_m_1.png", "wtc_m_2.png", "wtc_m_3.png", "wtc_m_4.png", "wtc_m_5.png", "wtc_m_6.png", "wtc_m_7.png", "wtc_m_8.png", "wtc_m_9.png", "wtc_m_10.png", "wtc_p_1.png"],
    "Otros": ["others_b_1.png", "others_b_2.png", "others_b_3.png", "others_b_4.png", "others_b_5.png", "others_m_1.png", "others_t_1.png"]
};

// DICCIONARIO DE DIMENSIONES NATIVAS
const pieceDimensions = {
    // --- Gallowdark (Horcasombría) ---
    "gallowdark_a_1.png": { w: 359, h: 52 },
    "gallowdark_a_2.png": { w: 450, h: 52 },
    "gallowdark_a_3.png": { w: 359, h: 52 },
    "gallowdark_a_4.png": { w: 450, h: 52 },
    "gallowdark_b_1.png": { w: 159, h: 24 },
    "gallowdark_b_2.png": { w: 159, h: 38 },
    "gallowdark_b_3.png": { w: 251, h: 52 },
    "gallowdark_s_1.png": { w: 53, h: 52 },
    "gallowdark_s_2.png": { w: 53, h: 52 },
    "gallowdark_s_3.png": { w: 53, h: 52 },
    "gallowdark_s_4.png": { w: 53, h: 52 },

    // --- Tombworld (Mundo Tumba) ---
    "tomb_world_a_1.png": { w: 450, h: 52 },
    "tomb_world_a_2.png": { w: 450, h: 52 },
    "tomb_world_a_3.png": { w: 450, h: 52 },
    "tomb_world_a_4.png": { w: 450, h: 52 },
    "tomb_world_b_1.png": { w: 157, h: 24 },
    "tomb_world_b_2.png": { w: 157, h: 24 },
    "tomb_world_b_3.png": { w: 251, h: 52 },
    "tomb_world_b_4.png": { w: 251, h: 52 },
    "tomb_world_c_1.png": { w: 186, h: 240 },
    "tomb_world_c_2.png": { w: 170, h: 152 },
    "tomb_world_c_3.png": { w: 122, h: 124 },
    "tomb_world_c_4.png": { w: 78, h: 122 },
    "tomb_world_c_5.png": { w: 103, h: 114 },
    "tomb_world_s_1.png": { w: 53, h: 52 },
    "tomb_world_s_2.png": { w: 53, h: 52 },
    "tomb_world_t.png": { w: 183, h: 184 },

    // --- Octarius ---
    "octarius_b_1.png": { w: 262, h: 407 },
    "octarius_b_2.png": { w: 213, h: 390 },
    "octarius_g_1.png": { w: 407, h: 408 },
    "octarius_m_1.png": { w: 285, h: 95 },
    "octarius_m_2.png": { w: 330, h: 101 },
    "octarius_m_3.png": { w: 369, h: 104 },
    "octarius_p_1.png": { w: 190, h: 147 },
    "octarius_p_2.png": { w: 114, h: 89 },
    "octarius_p_3.png": { w: 260, h: 116 },
    "octarius_t_1.png": { w: 245, h: 245 },
    "octarius_t_2.png": { w: 234, h: 312 },
    "octarius_t_3.png": { w: 249, h: 285 },

    // --- Volkus ---
    "volkus_lr_1.png": { w: 347, h: 234 },
    "volkus_lr_2.png": { w: 372, h: 262 },
    "volkus_obs_1.png": { w: 176, h: 219 },
    "volkus_obs_2.png": { w: 233, h: 138 },
    "volkus_obs_3.png": { w: 177, h: 84 },
    "volkus_obs_4.png": { w: 177, h: 119 },
    "volkus_obs_5.png": { w: 134, h: 66 },
    "volkus_sr_1.png": { w: 391, h: 205 },
    "volkus_sr_2.png": { w: 361, h: 196 },
    "volkus_v_1.png": { w: 431, h: 461 },
    "volkus_v_2.png": { w: 456, h: 336 },

    // -- Moroch --
    "moroch_a_1.png": { w: 333, h: 365 },
    "moroch_a_2.png": { w: 340, h: 242 },
    "moroch_b_1.png": { w: 675, h: 472 },
    "moroch_b_2.png": { w: 360, h: 501 },
    "moroch_m_1.png": { w: 356, h: 131 },
    "moroch_m_2.png": { w: 356, h: 115 },
    "moroch_m_3.png": { w: 161, h: 98 },

    // -- Nachmund --
    "nachmunt_b_1.png": { w: 411, h: 406 },
    "nachmunt_b_2.png": { w: 263, h: 187 },
    "nachmunt_g_1.png": { w: 572, h: 198 },
    "nachmunt_s_1.png": { w: 164, h: 159 },
    "nachmunt_s_2.png": { w: 195, h: 307 },
    "nachmunt_t_1.png": { w: 151, h: 146 },
    "nachmunt_t_2.png": { w: 173, h: 145 },
    "nachmunt_t_3.png": { w: 95, h: 233 },
    "nachmunt_t_4.png": { w: 141, h: 307 },
    "nachmunt_t_5.png": { w: 224, h: 141 },
    "nachmunt_t_6.png": { w: 95, h: 126 },
    "nachmunt_t_7.png": { w: 95, h: 132 },

    // -- Torneo de Campeonato Mundial --
    "wtc_b_1.png": { w: 366, h: 233 },
    "wtc_b_3.png": { w: 366, h: 233 },
    "wtc_b_5.png": { w: 322, h: 195 },
    "wtc_b_6.png": { w: 323, h: 195 },
    "wtc_c_2.png": { w: 118, h: 99 },
    "wtc_m_1.png": { w: 507, h: 305 },
    "wtc_m_2.png": { w: 139, h: 74 },
    "wtc_m_3.png": { w: 210, h: 65 },
    "wtc_m_4.png": { w: 508, h: 306 },
    "wtc_m_5.png": { w: 303, h: 102 },
    "wtc_m_6.png": { w: 310, h: 102 },
    "wtc_m_7.png": { w: 306, h: 105 },
    "wtc_m_8.png": { w: 314, h: 308 },
    "wtc_m_9.png": { w: 503, h: 311 },
    "wtc_m_10.png": { w: 503, h: 311 },
    "wtc_p_1.png": { w: 53, h: 52 },

    // -- otros --
    "others_b_1.png": { w: 335, h: 310 },
    "others_b_2.png": { w: 362, h: 237 },
    "others_b_3.png": { w: 378, h: 254 },
    "others_b_4.png": { w: 409, h: 266 },
    "others_b_5.png": { w: 153, h: 168 },
    "others_m_1.png": { w: 304, h: 205 },
    "others_t_1.png": { w: 273, h: 274 },

    // -- Chalnath --
    "chalnath_b_1.png": { w: 513, h: 331 },
    "chalnath_b_2.png": { w: 535, h: 534 },
    "chalnath_m_1.png": { w: 391, h: 386 },
    "chalnath_m_2.png": { w: 215, h: 173 },
    "chalnath_m_3.png": { w: 380, h: 389 },
    "chalnath_m_4.png": { w: 611, h: 631 },
    "chalnath_m_5.png": { w: 298, h: 189 },
    "chalnath_m_6.png": { w: 324, h: 207 },

    "point.png": { w: 183, h: 184 }
};


// se mantiene el factor de escala que se calibro empíricamente
const TERRAIN_SCALE_FACTOR = 0.585;

const basePathMap = "../resources/creacion-mapas/Mapas-generales/";
const basePathTerrain = "../resources/creacion-mapas/";

let selectedPiece = null;

// --- VARIABLES DE HISTORIAL (UNDO/REDO) ---
let historyStack = [];
let historyIndex = -1;
let isRestoringHistory = false;
let keyboardModified = false; // Bandera para evitar spam de guardado

// --- PORTAPAPELES Y BORDES ---
let clipboard = [];
let pasteOffset = 0; // Para que las piezas no se peguen exactamente una sobre otra

// --- VARIABLES DE TELEMETRÍA (MODO DEV) ---
let isTelemetryEnabled = false; // Apagado por defecto para el usuario final

// --- VARIABLES DE SELECCIÓN DE ÁREA (MARQUEE) ---
let isSelecting = false;
let selStartX = 0;
let selStartY = 0;

function getPieceTolerance(piece) {
    if (!isGridModeActive) return { left: 0, right: 0, top: 0, bottom: 0 };

    const filename = piece.querySelector('img').src.split('/').pop();
    let rotation = ((Number(piece.dataset.rotation) || 0) % 360 + 360) % 360;

    // Muros estándar clasificados por tamaño
    if (gridWallLong.includes(filename)) return GRID_TOLERANCE_LONG[rotation] || GRID_TOLERANCE_LONG[0];
    if (gridWallMedium.includes(filename)) return GRID_TOLERANCE_MEDIUM[rotation] || GRID_TOLERANCE_MEDIUM[0];
    if (gridWallTiny.includes(filename) || gridWallB2.includes(filename)) return GRID_TOLERANCE_TINY[rotation] || GRID_TOLERANCE_TINY[0];

    // Excepciones y Pilares
    if (gridPillars.includes(filename)) {
        return GRID_TOLERANCE_PILLARS[rotation] || GRID_TOLERANCE_PILLARS[0];
    }
    if (gridWallWtcIrregular.includes(filename)) {
        return GRID_TOLERANCE_WTC_IRREGULAR[rotation] || GRID_TOLERANCE_WTC_IRREGULAR[0];
    }
    if (gridWallWtcM8.includes(filename)) {
        return GRID_TOLERANCE_WTC_M8[rotation] || GRID_TOLERANCE_WTC_M8[0];
    }

    // Fallback de seguridad (Muros Short o libres)
    return { left: 50, right: 50, top: 40, bottom: 40 };
}

function getPieceBounds(piece) {
    const workspace = document.getElementById("workspace");
    const tol = getPieceTolerance(piece);
    let rotation = ((Number(piece.dataset.rotation) || 0) % 360 + 360) % 360;

    let isVertical = (rotation === 90 || rotation === 270);
    let realWidth = isVertical ? piece.offsetHeight : piece.offsetWidth;
    let realHeight = isVertical ? piece.offsetWidth : piece.offsetHeight;

    return {
        minX: -tol.left,
        minY: -tol.top,
        maxX: workspace.clientWidth - realWidth + tol.right,
        maxY: workspace.clientHeight - realHeight + tol.bottom
    };
}

function clampToWorkspace(x, y, piece) {
    const bounds = getPieceBounds(piece);
    return {
        x: Math.max(bounds.minX, Math.min(x, bounds.maxX)),
        y: Math.max(bounds.minY, Math.min(y, bounds.maxY))
    };
}

// --- VARIABLES MODO CUADRÍCULA (GRID SNAPPING) ---
let isGridModeActive = false;
const GRID_SIZE = 115; // Constante matemática exacta (Telemetría)

// --- MATRICES DE TOLERANCIA POR TAMAÑO DE PIEZA ---

// Muros Largos (450px) - Gallowdark A2/A4 y Tombworld A1-A4
const GRID_TOLERANCE_LONG = {
    0: { left: 50, right: 50, top: 40, bottom: 40 },
    90: { left: 140, right: -70, top: -70, bottom: 140 },
    180: { left: 50, right: 50, top: 40, bottom: 40 },
    270: { left: 140, right: -70, top: -70, bottom: 140 }
};

// Muros Medianos (359px) - Gallowdark A1/A3
const GRID_TOLERANCE_MEDIUM = {
    0: { left: 50, right: 50, top: 40, bottom: 40 },
    90: { left: 100, right: -75, top: -75, bottom: 100 },
    180: { left: 50, right: 50, top: 40, bottom: 40 },
    270: { left: 100, right: -75, top: -75, bottom: 100 }
};

// Muros Pequeños y B2 (159px) - Gallowdark B1/B2 y Tombworld B1/B2
const GRID_TOLERANCE_TINY = {
    0: { left: 50, right: 50, top: 40, bottom: 40 },
    90: { left: 55, right: -30, top: -30, bottom: 55 },
    180: { left: 50, right: 50, top: 40, bottom: 40 },
    270: { left: 55, right: -30, top: -30, bottom: 55 }
};
// Matriz exclusiva para muros irregulares de WTC (wtc_m_4, wtc_m_9, wtc_m_10)
const GRID_TOLERANCE_WTC_IRREGULAR = {
    0: { left: 50, right: 50, top: 40, bottom: 40 },
    90: { left: 100, right: -30, top: 15, bottom: 100 }, // Aumentado 'top' de -30 a 30 para alcanzar el borde superior
    180: { left: 50, right: 50, top: 40, bottom: 40 },
    270: { left: 100, right: 15, top: -30, bottom: 100 }  // Aumentado 'right' de -30 a 30 para alcanzar el borde derecho
};
// Matriz exclusiva para la pieza cuadrada grande de WTC (wtc_m_8.png)
const GRID_TOLERANCE_WTC_M8 = {
    0: { left: 50, right: 50, top: 40, bottom: 40 },
    90: { left: 45, right: 45, top: 45, bottom: 45 },
    180: { left: 50, right: 50, top: 40, bottom: 40 },
    270: { left: 45, right: 45, top: 45, bottom: 45 }
};
// Matriz simétrica para pilares (no sufren desplazamiento de masa al rotar)
const GRID_TOLERANCE_PILLARS = {
    0: { left: 20, right: 20, top: 20, bottom: 20 },
    90: { left: 20, right: 20, top: 20, bottom: 20 },
    180: { left: 20, right: 20, top: 20, bottom: 20 },
    270: { left: 20, right: 20, top: 20, bottom: 20 }
};

// Clasificación estricta de piezas restrictivas
const gridWallLong = [
    "gallowdark_a_2.png", "gallowdark_a_4.png",
    "tomb_world_a_1.png", "tomb_world_a_2.png", "tomb_world_a_3.png", "tomb_world_a_4.png"
];

const gridWallWtcIrregular = [
    "wtc_m_1.png", "wtc_m_4.png", "wtc_m_9.png", "wtc_m_10.png"
];

const gridWallWtcDoors = [
    "wtc_m_5.png", "wtc_m_6.png"
];

const gridWallWtcM7 = [
    "wtc_m_7.png"
];

const gridWallWtcM8 = [
    "wtc_m_8.png"
];

const gridWallMedium = [
    "gallowdark_a_1.png", "gallowdark_a_3.png"
];

const gridWallShort = [
    "gallowdark_b_3.png",
    "tomb_world_b_3.png", "tomb_world_b_4.png"
];

const gridWallTiny = [
    "gallowdark_b_1.png",
    "tomb_world_b_1.png", "tomb_world_b_2.png"
];

const gridWallB2 = [
    "gallowdark_b_2.png" // Pieza asimétrica con centro de masa variable
];

const gridPillarsCorner = [
    "gallowdark_s_1.png", "gallowdark_s_2.png",
    "tomb_world_s_1.png"
];

const gridPillarsFull = [
    "gallowdark_s_3.png", "gallowdark_s_4.png",
    "tomb_world_s_2.png",
    "wtc_p_1.png"
];

const gridPillars = [
    "gallowdark_s_1.png", "gallowdark_s_2.png", "gallowdark_s_3.png", "gallowdark_s_4.png",
    "tomb_world_s_1.png", "tomb_world_s_2.png",
    "wtc_p_1.png"
];

// --- FUNCIÓN TEMPORAL DE TELEMETRÍA (DEV TRACKER) ---
function updateDevTelemetry(piece) {
    const telemetryBox = document.getElementById("dev-telemetry");

    // Compuerta lógica: Si está apagado o no hay pieza, ocultar y abortar
    if (!isTelemetryEnabled || !piece) {
        telemetryBox.style.display = "none";
        return;
    }

    const img = piece.querySelector('img');
    if (!img) return;

    const filename = img.src.split('/').pop();
    const posX = parseFloat(piece.style.left || 0).toFixed(1);
    const posY = parseFloat(piece.style.top || 0).toFixed(1);
    const rotation = piece.dataset.rotation || 0;

    telemetryBox.style.display = "block";
    telemetryBox.innerHTML = `
                <div class="fw-bold text-white mb-2 border-bottom border-secondary pb-1">🔧 Telemetría de Pieza</div>
                Archivo: <span class="text-info">${filename}</span><br>
                Posición X: <span class="text-success">${posX}px</span><br>
                Posición Y: <span class="text-success">${posY}px</span><br>
                Rotación: <span class="text-danger">${rotation}°</span>
            `;

    // También lo enviamos a consola
    console.log(`Pieza: ${filename} | X: ${posX}, Y: ${posY}, Rot: ${rotation}`);
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    loadPalette();
    setupWorkspaceEvents();

    // Retrasar levemente la carga del estado para asegurar la construcción del DOM
    setTimeout(() => {
        const loaded = loadMapState();
        if (!loaded) {
            // Si no hay datos guardados, inicia con el mapa por defecto
            changeMap();
        }
    }, 100);
});

// 2. LÓGICA DE LA INTERFAZ Y AUTO-ESCALA
function changeMap(isRestoring = false, preserveZoom = false) {
    const select = document.getElementById("map-select");
    const mapImg = document.getElementById("map-bg");
    const workspace = document.getElementById("workspace");
    const wrapper = document.getElementById("workspace-wrapper");
    const val = select.value;

    // Cambiar la imagen
    mapImg.src = basePathMap + val;

    // Motor de Proporciones (1 pulgada = 30px)
    const SCALE_PX_PER_INCH = 30;
    let widthInches, heightInches;

    if (val.includes("map-cq-long")) {
        widthInches = 27.7;
        heightInches = 23.9;
    } else if (val.includes("map-cq-short")) {
        widthInches = 27.7;
        heightInches = 23.9;
    } else {
        widthInches = 30.0;
        heightInches = 22.4;
    }

    const finalWidth = widthInches * SCALE_PX_PER_INCH;
    const finalHeight = heightInches * SCALE_PX_PER_INCH;

    workspace.style.width = finalWidth + "px";
    workspace.style.height = finalHeight + "px";

    // --- LÓGICA DE AUTOESCALA AL CARGAR ---
    // Medir el contenedor padre real, no la ventana entera
    if (!preserveZoom) {
        const parentContainer = document.getElementById("workspace-wrapper").parentElement;
        const availableWidth = parentContainer.clientWidth * 0.95; // 95% del espacio real

        if (finalWidth > availableWidth) {
            currentZoomLevel = availableWidth / finalWidth;
        } else {
            currentZoomLevel = 1.0;
        }
    }

    // CRÍTICO: Achicar físicamente el wrapper y escalar visualmente el workspace
    wrapper.style.width = (finalWidth * currentZoomLevel) + "px";
    wrapper.style.height = (finalHeight * currentZoomLevel) + "px";
    workspace.style.transform = `scale(${currentZoomLevel})`;
    wrapper.style.transform = 'none'; // Limpiar basura residual por si acaso

    if (!isRestoring) {
        saveMapState();
    }
}

// Función específica para aplicar Zoom Manual
function applyZoom(delta) {
    const wrapper = document.getElementById("workspace-wrapper");
    const workspace = document.getElementById("workspace");
    currentZoomLevel += delta;

    if (currentZoomLevel < MIN_ZOOM) currentZoomLevel = MIN_ZOOM;
    if (currentZoomLevel > MAX_ZOOM) currentZoomLevel = MAX_ZOOM;

    const baseW = parseFloat(workspace.style.width);
    const baseH = parseFloat(workspace.style.height);

    // Redimensionar wrapper y escalar workspace
    wrapper.style.width = (baseW * currentZoomLevel) + "px";
    wrapper.style.height = (baseH * currentZoomLevel) + "px";
    workspace.style.transform = `scale(${currentZoomLevel})`;
}

function loadPalette() {
    const kz = document.getElementById("kz-select").value;
    const container = document.getElementById("palette-container");
    container.innerHTML = "";

    const pieces = terrainData[kz] || [];

    pieces.forEach(filename => {
        // Lógica de rutas basada en tu descripción
        const folder = kz === "General" ? "" : kz + "/";
        const src = basePathTerrain + folder + filename;

        const img = document.createElement("img");
        img.src = src;
        img.className = "palette-item";
        img.draggable = false; // Desactivamos el drag nativo del navegador

        // Al hacer clic en la paleta, se añade al centro del lienzo
        img.onclick = () => addPieceToWorkspace(src);
        container.appendChild(img);
    });
}

function getGridOffsets(filename, rotation) {
    const isHorizontal = (rotation === 0 || rotation === 180);
    const HALF_GRID = GRID_SIZE / 2;

    // 1. Pilares (Salto completo)
    if (gridPillarsCorner.includes(filename)) return { stepX: GRID_SIZE, stepY: GRID_SIZE, offsetX: -5, offsetY: 0 };
    if (gridPillarsFull.includes(filename)) return { stepX: GRID_SIZE, stepY: GRID_SIZE, offsetX: -3.5, offsetY: 1.5 };

    // 2. Muros (Medio salto)
    let config = { stepX: HALF_GRID, stepY: HALF_GRID, offsetX: 0, offsetY: 0 };

    if (gridWallLong.includes(filename)) {
        config.offsetX = isHorizontal ? -5.6 : -4.2;
        config.offsetY = isHorizontal ? -0.5 : 0;
    } else if (gridWallWtcIrregular.includes(filename)) {
        const vals = { 0: [-25.6, -10.5], 90: [-24.2, -30.0], 180: [-10.6, -25.5], 270: [-13.2, -15.0] };
        [config.offsetX, config.offsetY] = vals[rotation];
    } else if (gridWallWtcDoors.includes(filename)) {
        const vals = { 0: [-25.6, -10.5], 90: [-24.2, -25.0], 180: [-10.6, -25.5], 270: [-9.2, -10.0] };
        [config.offsetX, config.offsetY] = vals[rotation];
    } else if (gridWallWtcM7.includes(filename)) {
        const vals = { 0: [-10.6, -10.5], 90: [-24.2, -10.0], 180: [-25.6, -20.5], 270: [-14.2, -20.0] };
        [config.offsetX, config.offsetY] = vals[rotation];
    } else if (gridWallWtcM8.includes(filename)) {
        const vals = { 0: [-30.6, -15.5], 90: [-24.2, -30.0], 180: [-10.6, -25.5], 270: [-19.2, -10.0] };
        [config.offsetX, config.offsetY] = vals[rotation];
    } else if (gridWallMedium.includes(filename)) {
        config.offsetX = isHorizontal ? 22.4 : 20.9;
        config.offsetY = -2.0;
    } else if (gridWallShort.includes(filename)) {
        const vals = { 0: [-4.0, 0], 90: [-2.5, 56.5], 180: [-5.5, 0], 270: [-61.5, 56.0] };
        [config.offsetX, config.offsetY] = vals[rotation];
    } else if (gridWallTiny.includes(filename)) {
        config.offsetX = isHorizontal ? 23.0 : -35.0;
        config.offsetY = isHorizontal ? 5.5 : 66.5;
    } else if (gridWallB2.includes(filename)) {
        const vals = { 0: [25.0, 6.5], 90: [-38.0, 61.5], 180: [24.0, -3.5], 270: [-28.0, 61.5] };
        [config.offsetX, config.offsetY] = vals[rotation];
    }

    return config;
}

// --- MOTOR DE ENCAJE A CUADRÍCULA (ALGEBRAICO CORREGIDO) ---
function snapToGrid(piece) {
    if (!isGridModeActive || !piece) return;

    const imgSrc = piece.querySelector('img').src;
    const filename = imgSrc.split('/').pop();

    if (!isStrictGridPiece(filename)) return;

    let currentX = parseFloat(piece.style.left || 0);
    let currentY = parseFloat(piece.style.top || 0);

    let rawRotation = Number(piece.dataset.rotation) || 0;
    let rotation = ((rawRotation % 360) + 360) % 360;

    // Extraemos la configuración limpia
    const { stepX, stepY, offsetX, offsetY } = getGridOffsets(filename, rotation);

    // Aplicamos la matemática
    currentX = Math.round((currentX - offsetX) / stepX) * stepX + offsetX;
    currentY = Math.round((currentY - offsetY) / stepY) * stepY + offsetY;

    piece.style.left = currentX + "px";
    piece.style.top = currentY + "px";
}

// 3. LÓGICA DEL LIENZO Y PIEZAS
function addPieceToWorkspace(src) {
    const workspace = document.getElementById("workspace");

    const piece = document.createElement("div");
    piece.className = "map-piece";
    piece.dataset.rotation = 0;

    const img = document.createElement("img");
    img.src = src;

    // Extraer el nombre del archivo de la ruta
    const filename = src.split('/').pop();

    // Si la pieza está registrada, forzamos su tamaño ajustado
    if (pieceDimensions[filename]) {
        const nativeW = pieceDimensions[filename].w;
        const nativeH = pieceDimensions[filename].h;

        let specificScaleFactor = TERRAIN_SCALE_FACTOR; // 0.585 por defecto para las killzones

        img.style.width = (nativeW * specificScaleFactor) + "px";
        img.style.height = (nativeH * specificScaleFactor) + "px";
    }

    piece.appendChild(img);
    workspace.appendChild(piece);

    // Centrar la pieza dentro del mapa usando sus dimensiones sin zoom.
    const centerPiece = () => {
        // Evita modificar una pieza eliminada mientras cargaba su imagen.
        if (!piece.isConnected) return;

        const pieceWidth = img.offsetWidth;
        const pieceHeight = img.offsetHeight;

        piece.style.left =
            ((workspace.clientWidth - pieceWidth) / 2) + "px";

        piece.style.top =
            ((workspace.clientHeight - pieceHeight) / 2) + "px";
    };

    centerPiece();

    if (!pieceDimensions[filename]) {
        const centerAndSave = () => {
            if (!piece.isConnected) return;

            centerPiece();

            if (isGridModeActive) {
                normalizeGridRotation(piece);
                snapToGrid(piece);
            }

            saveMapState();
        };

        if (img.complete && img.naturalWidth > 0) {
            centerPiece();
        } else {
            img.addEventListener("load", centerAndSave, { once: true });
        }
    }

    // Eventos de ratón para el Drag & Drop manual
    piece.addEventListener("mousedown", startDrag);
    piece.addEventListener("click", (e) => e.stopPropagation());

    selectPiece(piece);

    if (isGridModeActive) {
        normalizeGridRotation(piece);
        snapToGrid(piece);
    }

    saveMapState();
}

// 4. CONTROL DE ESTADOS Y MOVIMIENTO (DRAG & DROP)
let isDragging = false;
let dragStart = { mouseX: 0, mouseY: 0 };
let dragOffsets = []; // Almacena las posiciones de múltiples piezas

function startDrag(e) {
    if (e.button !== 0) return; // Solo clic izquierdo
    if (!e.target.classList.contains('map-piece')) return;

    // Lógica de Selección Múltiple
    if (e.ctrlKey) {
        toggleSelection(e.target);
    } else if (!e.target.classList.contains('selected')) {
        // Si hace clic normal en una pieza no seleccionada, selecciona solo esa
        selectPiece(e.target);
    }

    const selection = document.querySelectorAll('.map-piece.selected');
    if (selection.length === 0) return;

    isDragging = true;
    dragStart = { mouseX: e.clientX, mouseY: e.clientY };

    // Guardar posición inicial de TODAS las piezas seleccionadas
    dragOffsets = Array.from(selection).map(p => ({
        piece: p,
        left: parseFloat(p.style.left) || 0,
        top: parseFloat(p.style.top) || 0
    }));

    document.addEventListener("mousemove", dragPiece);
    document.addEventListener("mouseup", stopDrag);
}

function dragPiece(e) {
    if (!isDragging) return;
    let dx = (e.clientX - dragStart.mouseX) / currentZoomLevel;
    let dy = (e.clientY - dragStart.mouseY) / currentZoomLevel;

    const workspace = document.getElementById("workspace");

    // 1. Filtro de colisión en grupo (Group Bumper)
    dragOffsets.forEach(item => {
        const bounds = getPieceBounds(item.piece);

        const targetX = item.left + dx;
        const targetY = item.top + dy;

        if (targetX < bounds.minX) {
            dx = bounds.minX - item.left;
        } else if (targetX > bounds.maxX) {
            dx = bounds.maxX - item.left;
        }

        if (targetY < bounds.minY) {
            dy = bounds.minY - item.top;
        } else if (targetY > bounds.maxY) {
            dy = bounds.maxY - item.top;
        }
    });

    // 2. Aplicar el desplazamiento ya restringido
    dragOffsets.forEach(item => {
        item.piece.style.left = (item.left + dx) + "px";
        item.piece.style.top = (item.top + dy) + "px";
    });

    if (dragOffsets.length > 0) updateDevTelemetry(dragOffsets[0].piece);
}

function stopDrag(e) {
    isDragging = false;
    document.removeEventListener("mousemove", dragPiece);
    document.removeEventListener("mouseup", stopDrag);

    if (isGridModeActive) {
        dragOffsets.forEach(item => snapToGrid(item.piece));
    }
    dragOffsets = [];
    saveMapState();
}

function toggleSelection(piece) {
    if (piece.classList.contains("selected")) {
        piece.classList.remove("selected");
        // Si ya no quedan piezas seleccionadas, limpiar UI
        if (document.querySelectorAll('.map-piece.selected').length === 0) {
            selectedPiece = null;
            document.getElementById("controls-panel").classList.remove("active");
        }
    } else {
        piece.classList.add("selected");
        selectedPiece = piece; // Foco en la última seleccionada para UI
        document.getElementById("controls-panel").classList.add("active");
    }
    updateDevTelemetry(piece);
}

// 5. CONTROLES DEL PANEL (Botones visuales de la referencia)
function selectPiece(piece) {
    if (selectedPiece) selectedPiece.classList.remove("selected");
    selectedPiece = piece;
    selectedPiece.classList.add("selected");
    document.getElementById("controls-panel").classList.add("active");

    updateDevTelemetry(selectedPiece); // <-- INYECTAR AQUÍ
}

function deselectAll() {
    // Limpia el borde de TODAS las piezas seleccionadas simultáneamente
    document.querySelectorAll('.map-piece.selected').forEach(p => p.classList.remove("selected"));
    selectedPiece = null;
    document.getElementById("controls-panel").classList.remove("active");

    updateDevTelemetry(null);
}

function setupWorkspaceEvents() {
    const workspace = document.getElementById("workspace");

    // 1. INICIO: Detectar clic sostenido en el fondo
    workspace.addEventListener("mousedown", (e) => {
        // Solo reaccionar si hacemos clic directo en el fondo o mapa (no en una pieza)
        if (e.target.id === 'workspace' || e.target.id === 'map-bg') {
            // Limpiar selección actual si no presiona Ctrl
            if (!e.ctrlKey) deselectAll();

            isSelecting = true;

            // CRÍTICO: Abortar la selección de texto/imágenes nativa del navegador (evita el sombreado azul)
            e.preventDefault();

            // Cálculo absoluto ignorando los elementos hijos
            const rect = workspace.getBoundingClientRect();
            selStartX = (e.clientX - rect.left) / currentZoomLevel;
            selStartY = (e.clientY - rect.top) / currentZoomLevel;

            const selBox = document.getElementById("selection-box");
            selBox.style.display = "block";
            selBox.style.left = selStartX + "px";
            selBox.style.top = selStartY + "px";
            selBox.style.width = "0px";
            selBox.style.height = "0px";
        }
    });

    // 2. DIBUJO: Expandir el cuadro al arrastrar
    // Usamos 'window' para que la caja no se trabe si el usuario mueve el ratón muy rápido y sale del contenedor
    window.addEventListener("mousemove", (e) => {
        if (!isSelecting) return;

        const rect = workspace.getBoundingClientRect();
        const currentX = (e.clientX - rect.left) / currentZoomLevel;
        const currentY = (e.clientY - rect.top) / currentZoomLevel;

        const selBox = document.getElementById("selection-box");

        const x = Math.min(selStartX, currentX);
        const y = Math.min(selStartY, currentY);
        const width = Math.abs(currentX - selStartX);
        const height = Math.abs(currentY - selStartY);

        selBox.style.left = x + "px";
        selBox.style.top = y + "px";
        selBox.style.width = width + "px";
        selBox.style.height = height + "px";
    });

    // 3. ANÁLISIS: Soltar el mouse y detectar colisiones AABB
    window.addEventListener("mouseup", (e) => {
        if (!isSelecting) return;
        isSelecting = false;

        const selBox = document.getElementById("selection-box");
        selBox.style.display = "none";

        const selLeft = parseFloat(selBox.style.left);
        const selTop = parseFloat(selBox.style.top);
        const selWidth = parseFloat(selBox.style.width);
        const selHeight = parseFloat(selBox.style.height);

        if (selWidth < 5 || selHeight < 5) return;

        const selRight = selLeft + selWidth;
        const selBottom = selTop + selHeight;

        const pieces = document.querySelectorAll('.map-piece');
        let newlySelected = 0;

        pieces.forEach(piece => {
            const pLeft = parseFloat(piece.style.left) || 0;
            const pTop = parseFloat(piece.style.top) || 0;
            const pRight = pLeft + piece.offsetWidth;
            const pBottom = pTop + piece.offsetHeight;

            if (pRight > selLeft && pLeft < selRight && pBottom > selTop && pTop < selBottom) {
                piece.classList.add('selected');
                newlySelected++;
            }
        });

        if (newlySelected > 0) {
            const firstPiece = document.querySelector('.map-piece.selected');
            selectedPiece = firstPiece;
            document.getElementById("controls-panel").classList.add("active");
            updateDevTelemetry(firstPiece);
        }
    });
}

function isStrictGridPiece(filename) {
    return gridWallLong.includes(filename) ||
        gridWallWtcIrregular.includes(filename) ||
        gridWallWtcDoors.includes(filename) ||
        gridWallWtcM7.includes(filename) ||
        gridWallWtcM8.includes(filename) ||
        gridWallMedium.includes(filename) ||
        gridWallShort.includes(filename) ||
        gridWallTiny.includes(filename) ||
        gridWallB2.includes(filename) ||
        gridPillars.includes(filename);
}

function rotateSelected(degrees, skipSave = false) {
    const selection = document.querySelectorAll('.map-piece.selected');
    if (selection.length === 0) return;

    selection.forEach(piece => {
        const imgSrc = piece.querySelector('img').src;
        const filename = imgSrc.split('/').pop();
        const isStrictGrid = isStrictGridPiece(filename);

        if (isGridModeActive && isStrictGrid) {
            normalizeGridRotation(piece);
        }

        let currentRotation = Number(piece.dataset.rotation) || 0;

        if (isGridModeActive && isStrictGrid) {
            const snapDegrees = (degrees > 0) ? 90 : -90;
            currentRotation = (currentRotation + snapDegrees) % 360;
        } else {
            currentRotation = (currentRotation + degrees) % 360;
        }

        piece.dataset.rotation = currentRotation;
        piece.style.transform = `rotate(${currentRotation}deg)`;

        if (isGridModeActive && isStrictGrid) {
            snapToGrid(piece);
        }
    });

    updateDevTelemetry(selection[0]); // Actualiza el HUD con la pieza principal
    if (!skipSave) saveMapState();
}

function movePieceWrapper(dirX, dirY) {
    const selection = document.querySelectorAll('.map-piece.selected');
    if (selection.length === 0) return;

    const workspace = document.getElementById("workspace");

    const primaryStepX = getMovementStep(selection[0]) * dirX;
    const primaryStepY = getMovementStep(selection[0]) * dirY;

    let canMove = true;

    // 2. Pre-Cálculo (Dry Run)
    selection.forEach(piece => {
        if (isGridModeActive) {
            normalizeGridRotation(piece);
            snapToGrid(piece);
        }
        const currentLeft = parseFloat(piece.style.left) || 0;
        const currentTop = parseFloat(piece.style.top) || 0;

        const targetX = currentLeft + primaryStepX;
        const targetY = currentTop + primaryStepY;

        const bounds = getPieceBounds(piece);

        if (targetX < bounds.minX || targetX > bounds.maxX || targetY < bounds.minY || targetY > bounds.maxY) {
            canMove = false;
        }
    });

    if (!canMove) return;

    // 3. Ejecución del movimiento
    selection.forEach(piece => {
        const currentLeft = parseFloat(piece.style.left) || 0;
        const currentTop = parseFloat(piece.style.top) || 0;

        piece.style.left = (currentLeft + primaryStepX) + "px";
        piece.style.top = (currentTop + primaryStepY) + "px";

        if (isGridModeActive) {
            snapToGrid(piece);
        }
    });

    updateDevTelemetry(selection[0]);
}

function deleteSelected() {
    const selection = document.querySelectorAll('.map-piece.selected');
    if (selection.length === 0) return;

    selection.forEach(piece => piece.remove());
    deselectAll();
    saveMapState();
}

function copySelected() {
    const selection = document.querySelectorAll('.map-piece.selected');
    if (selection.length === 0) return;

    // 1. Calcular el origen (Bounding Box Top-Left) del grupo seleccionado
    let minX = Infinity;
    let minY = Infinity;

    selection.forEach(piece => {
        const x = parseFloat(piece.style.left) || 0;
        const y = parseFloat(piece.style.top) || 0;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
    });

    // 2. Guardar la configuración y la posición relativa de cada pieza
    clipboard = Array.from(selection).map(piece => {
        const img = piece.querySelector('img');
        return {
            src: img.src,
            rotation: piece.dataset.rotation || 0,
            width: img.style.width,
            height: img.style.height,
            relX: (parseFloat(piece.style.left) || 0) - minX,
            relY: (parseFloat(piece.style.top) || 0) - minY
        };
    });

    pasteOffset = 0; // Reiniciar el desfase al copiar algo nuevo
    showLoadNotification("Piezas copiadas al portapapeles", "bi-files");
}

function cutSelected() {
    copySelected();
    deleteSelected();
}

function pasteClipboard() {
    if (clipboard.length === 0) return;

    deselectAll(); // Quitar selección actual para enfocar las nuevas piezas
    const workspace = document.getElementById("workspace");

    // Usamos un desfase equivalente a media cuadrícula (aprox 57.5px) para que no se pegue exacto encima
    pasteOffset += 57.5;

    // Punto de anclaje base para el nuevo grupo
    const baseX = 400 + pasteOffset;
    const baseY = 300 + pasteOffset;

    clipboard.forEach(item => {
        const piece = document.createElement("div");
        piece.className = "map-piece selected";
        piece.dataset.rotation = item.rotation;

        const img = document.createElement("img");
        img.src = item.src;
        if (item.width) img.style.width = item.width;
        if (item.height) img.style.height = item.height;

        piece.appendChild(img);
        workspace.appendChild(piece);

        // 1. Restaurar la distancia relativa respecto al punto base
        let targetX = baseX + item.relX;
        let targetY = baseY + item.relY;

        // 2. Aplicar los límites del tablero (clamping)
        const clamped = clampToWorkspace(targetX, targetY, piece);
        piece.style.left = clamped.x + "px";
        piece.style.top = clamped.y + "px";
        piece.style.transform = `rotate(${item.rotation}deg)`;

        piece.addEventListener("mousedown", startDrag);
        piece.addEventListener("click", (e) => e.stopPropagation());

        // 3. Evaluar encaje algebraico si la cuadrícula está activa
        if (isGridModeActive) {
            normalizeGridRotation(piece);
            snapToGrid(piece);
        }
    });

    document.getElementById("controls-panel").classList.add("active");
    saveMapState();
}

function getMovementStep(piece) {
    if (!isGridModeActive) return 5;

    const filename = piece.querySelector("img").src.split("/").pop();
    const isPillar = gridPillars.includes(filename);

    // Pilares requieren salto completo para ir de esquina a esquina
    if (isPillar) return GRID_SIZE;

    // Muros y piezas libres se mueven fluidamente de a medio bloque
    return GRID_SIZE / 2;
}

function moveFromUI(dirX, dirY) {
    const selection = document.querySelectorAll('.map-piece.selected');
    if (selection.length === 0) return;

    movePieceWrapper(dirX, dirY);
    saveMapState();
}

// --- CONTROL DE PROFUNDIDAD (FRENTE / FONDO) ---
function bringToFront() {
    const selection = document.querySelectorAll('.map-piece.selected');
    if (selection.length === 0) return;
    const workspace = document.getElementById("workspace");

    // Appending a node already in the DOM moves it to the end (front)
    selection.forEach(piece => workspace.appendChild(piece));
    saveMapState();
}

function sendToBack() {
    const selection = document.querySelectorAll('.map-piece.selected');
    if (selection.length === 0) return;
    const workspace = document.getElementById("workspace");
    const mapBg = document.getElementById("map-bg");

    // Insertar justo después del mapa de fondo para que quede detrás de todo lo demás
    selection.forEach(piece => workspace.insertBefore(piece, mapBg.nextSibling));
    saveMapState();
}

// 6. EXPORTACIÓN DEL MAPA A PNG
function exportMap() {
    // Ocultar elementos UI (bordes de selección) antes de la captura
    deselectAll();

    const workspace = document.getElementById("workspace");

    // Uso de html2canvas para renderizar el DOM como imagen
    html2canvas(workspace, {
        backgroundColor: null, // Mantiene transparencias si las hubiera
        scale: 2 // Aumenta la resolución de salida
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "mapa_personalizado.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }).catch(err => {
        console.error("Error al exportar el mapa:", err);
        alert("Hubo un error al generar la imagen. Revisa la consola.");
    });
}

// --- SISTEMA DE AUTOGUARDADO (LOCALSTORAGE) ---

function saveMapState() {
    const workspace = document.getElementById("workspace");
    const pieces = Array.from(workspace.querySelectorAll('.map-piece')).map(piece => {
        const img = piece.querySelector('img');
        return {
            src: img.src,
            left: piece.style.left,
            top: piece.style.top,
            rotation: piece.dataset.rotation || 0,
            width: img.style.width,
            height: img.style.height
        };
    });

    const state = {
        mapBg: document.getElementById("map-select").value,
        zoom: currentZoomLevel,
        grid: isGridModeActive,
        pieces: pieces
    };

    if (!isRestoringHistory) {
        const serializedState = JSON.stringify(state);
        const currentHistoryState = historyIndex >= 0 ? JSON.stringify(historyStack[historyIndex]) : null;

        if (serializedState !== currentHistoryState) {
            if (historyIndex < historyStack.length - 1) {
                historyStack = historyStack.slice(0, historyIndex + 1);
            }
            historyStack.push(state);
            historyIndex = historyStack.length - 1;
        }
    }

    if (historyStack.length > MAX_HISTORY_STATES) {
        historyStack.shift();
        historyIndex = historyStack.length - 1;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderSavedPieces(piecesArray) {
    const workspace = document.getElementById("workspace");
    piecesArray.forEach(p => {
        const piece = document.createElement("div");
        piece.className = "map-piece";
        piece.dataset.rotation = p.rotation;
        piece.style.left = p.left;
        piece.style.top = p.top;
        piece.style.transform = `rotate(${p.rotation}deg)`;

        const img = document.createElement("img");
        img.src = p.src;
        if (p.width) img.style.width = p.width;
        if (p.height) img.style.height = p.height;

        piece.appendChild(img);
        workspace.appendChild(piece);

        piece.addEventListener("mousedown", startDrag);
        piece.addEventListener("click", (e) => e.stopPropagation());
    });
}

function loadMapState() {
    const savedStateStr = localStorage.getItem(STORAGE_KEY);
    if (!savedStateStr) return false;

    try {
        const state = JSON.parse(savedStateStr);

        if (state.mapBg) {
            const mapSelect = document.getElementById("map-select");
            mapSelect.value = state.mapBg;
            changeMap(true, true);
        }

        if (state.zoom) {
            currentZoomLevel = state.zoom;
            const workspace = document.getElementById("workspace");
            const wrapper = document.getElementById("workspace-wrapper");
            const baseW = parseFloat(workspace.style.width);
            const baseH = parseFloat(workspace.style.height);
            wrapper.style.width = (baseW * currentZoomLevel) + "px";
            wrapper.style.height = (baseH * currentZoomLevel) + "px";
            workspace.style.transform = `scale(${currentZoomLevel})`;
        }

        if (state.grid !== undefined) {
            isGridModeActive = state.grid;
            const switchEl = document.getElementById("gridToggleSwitch");
            if (switchEl) switchEl.checked = isGridModeActive;
        }

        if (state.pieces && state.pieces.length > 0) {
            renderSavedPieces(state.pieces);
        }

        saveMapState();
        showLoadNotification();
        return true;
    } catch (e) {
        console.error("Error restaurando el estado del mapa:", e);
        return false;
    }
}

function executeClearAllMap() {
    const workspace = document.getElementById("workspace");
    // Eliminar solo las piezas, conservando la imagen de fondo
    const pieces = workspace.querySelectorAll('.map-piece');
    pieces.forEach(p => p.remove());
    deselectAll();

    // CRÍTICO: Purgar el historial de memoria para hacer la acción irreversible
    historyStack = [];
    historyIndex = -1;

    // Al guardar ahora, este lienzo vacío se convertirá en el "Paso 0" inamovible
    saveMapState();

    showLoadNotification("Mapa limpiado y memoria borrada", "bi-trash-fill");
}

// 7. NOTIFICACIÓN VISUAL DINÁMICA
function showLoadNotification(mensaje = "Mapa cargado correctamente", icono = "bi-check-circle-fill") {
    const toast = document.createElement("div");
    toast.className = "p-3 bg-dark text-white fw-bold shadow-lg d-flex align-items-center";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "2000";
    toast.style.border = "1px solid #6c757d";
    toast.innerHTML = `<i class="bi ${icono} text-info me-2 fs-5"></i> ${mensaje}`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = "opacity 0.5s ease";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

const STORAGE_KEY = "killTeamMapCreatorState";
const MAX_HISTORY_STATES = 20;

// --- CONTROL DE HISTORIAL (CTRL+Z / CTRL+Y) ---
function undoAction() {
    if (historyIndex > 0) {
        historyIndex--;
        applyHistoryState(historyStack[historyIndex]);
    }
}

function redoAction() {
    if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        applyHistoryState(historyStack[historyIndex]);
    }
}

// --- VARIABLES DE ZOOM ---
let currentZoomLevel = 1.0;
const ZOOM_STEP = 0.1;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2.0;

function applyHistoryState(state) {
    isRestoringHistory = true; // Evitar ciclo infinito de guardado
    deselectAll();

    // 1. Restaurar Fondo
    if (state.mapBg) {
        const mapSelect = document.getElementById("map-select");
        mapSelect.value = state.mapBg;
        // Restaurar el mapa sin guardar ni modificar el zoom actual.
        changeMap(true, true);
    }

    // Sincronizar el interruptor y el estado de la cuadrícula con este punto exacto del historial
    if (state.grid !== undefined) {
        isGridModeActive = state.grid;
        const switchEl = document.getElementById("gridToggleSwitch");
        if (switchEl) switchEl.checked = isGridModeActive;
    }

    // 2. Limpiar e inyectar piezas de la fotografía histórica
    const workspace = document.getElementById("workspace");
    workspace.querySelectorAll('.map-piece').forEach(p => p.remove());

    if (state.pieces && state.pieces.length > 0) {
        renderSavedPieces(state.pieces);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    isRestoringHistory = false;
}



// --- MANEJO DE EVENTOS DEL TECLADO ---
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // --- ATAJOS GLOBALES ---

    // Atajos Ctrl (Historial, Selección Múltiple, Portapapeles y Telemetría)
    if (e.ctrlKey) {
        // Modo Desarrollador (Telemetría oculta)
        if (e.altKey && e.key.toLowerCase() === 'i') {
            e.preventDefault();
            isTelemetryEnabled = !isTelemetryEnabled;

            // Refrescar el estado visual inmediatamente leyendo la pieza actual si la hay
            const currentSelected = document.querySelector('.map-piece.selected');
            updateDevTelemetry(currentSelected);
            return;
        }

        if (e.key.toLowerCase() === 'z') { e.preventDefault(); undoAction(); return; }
        if (e.key.toLowerCase() === 'y') { e.preventDefault(); redoAction(); return; }
        if (e.key.toLowerCase() === 'c') { e.preventDefault(); copySelected(); return; }
        if (e.key.toLowerCase() === 'x') { e.preventDefault(); cutSelected(); return; }
        if (e.key.toLowerCase() === 'v') { e.preventDefault(); pasteClipboard(); return; }

        // Ctrl + A: Seleccionar Todo
        if (e.key.toLowerCase() === 'a') {
            e.preventDefault();
            const pieces = document.querySelectorAll('.map-piece');
            if (pieces.length === 0) return;

            pieces.forEach(p => p.classList.add('selected'));
            document.getElementById("controls-panel").classList.add("active");
            updateDevTelemetry(pieces[0]);
            return;
        }
    }

    // Atajos de Zoom
    if (e.key === '+' || e.key === 'Add') { applyZoom(ZOOM_STEP); return; }
    if (e.key === '-' || e.key === 'Subtract') { applyZoom(-ZOOM_STEP); return; }

    // Tecla C: Alternar Cuadrícula
    if (e.key.toLowerCase() === 'c') {
        const switchEl = document.getElementById("gridToggleSwitch");
        switchEl.checked = !switchEl.checked;
        toggleGridMode();
        return;
    }

    // Tabulador: Ciclar Selección Automática
    if (e.key === 'Tab') {
        e.preventDefault(); // Evita que el navegador seleccione los menús desplegables nativos
        const pieces = Array.from(document.querySelectorAll('.map-piece'));
        if (pieces.length === 0) return;

        const currentSelected = document.querySelector('.map-piece.selected');
        let nextIndex = 0;

        if (currentSelected) {
            nextIndex = (pieces.indexOf(currentSelected) + 1) % pieces.length;
        }

        deselectAll();
        selectPiece(pieces[nextIndex]);
        pieces[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // --- CONTROLES DE MOVIMIENTO ---
    // Solo actuar si hay piezas activas
    const selectedPieces = document.querySelectorAll('.map-piece.selected');
    if (selectedPieces.length === 0) return;

    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'q', 'e', 'backspace', 'delete'].includes(key)) {
        e.preventDefault(); // Previene scrolls indeseados
    }

    switch (key) {
        case 'w': movePieceWrapper(0, -1); keyboardModified = true; break;
        case 's': movePieceWrapper(0, 1); keyboardModified = true; break;
        case 'a': movePieceWrapper(-1, 0); keyboardModified = true; break;
        case 'd': movePieceWrapper(1, 0); keyboardModified = true; break;
        case 'q': rotateSelected(-15, true); keyboardModified = true; break;
        case 'e': rotateSelected(15, true); keyboardModified = true; break;
        case 'f': e.preventDefault(); sendToBack(); break;
        case 'r': e.preventDefault(); bringToFront(); break;
        case 'backspace':
        case 'delete':
            deleteSelected();
            break;
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'q', 'e'].includes(key) && keyboardModified) {
        // Hemos removido snapToGrid de aquí. Solo disparamos el autoguardado.
        saveMapState();
        keyboardModified = false;
    }
});

function normalizeGridRotation(piece) {
    if (!piece) return;
    const img = piece.querySelector("img");
    if (!img) return;

    const filename = img.src.split("/").pop();
    const isStrictGrid = isStrictGridPiece(filename);

    if (!isStrictGrid) return;

    const currentRotation = Number(piece.dataset.rotation) || 0;
    const snappedRotation = Math.round(currentRotation / 90) * 90;
    const normalizedRotation = ((snappedRotation % 360) + 360) % 360;

    piece.dataset.rotation = String(normalizedRotation);
    piece.style.transform = `rotate(${normalizedRotation}deg)`;
}

function toggleGridMode() {
    isGridModeActive = document.getElementById("gridToggleSwitch").checked;

    if (!isGridModeActive) {
        // CRÍTICO: Si se apaga, debemos guardar ese nuevo estado en la memoria antes de salir
        saveMapState();
        return;
    }

    const pieces = document.querySelectorAll("#workspace .map-piece");

    pieces.forEach(piece => {
        normalizeGridRotation(piece);
        snapToGrid(piece);
    });

    // Guardar el estado con la cuadrícula activa y las piezas ajustadas
    saveMapState();
}

// --- RESPONSIVIDAD DINÁMICA (RESIZE) ---
let resizeTimer;
window.addEventListener('resize', () => {
    // Patrón Debounce: limpiamos el temporizador si el usuario sigue arrastrando la ventana
    clearTimeout(resizeTimer);

    // Ejecutamos la matemática 250ms después de que el usuario suelte el borde
    resizeTimer = setTimeout(() => {
        // Recalcular el zoom automáticamente
        // true = abstenerse de guardar nativamente, false = forzar el recálculo de escala
        changeMap(true, false);

        // CRÍTICO: Apagamos temporalmente el registro de historial para no arruinar el Ctrl+Z
        isRestoringHistory = true;

        // Guardamos el nuevo nivel de zoom en el localStorage de forma silenciosa
        saveMapState();

        // Volvemos a encender el historial
        isRestoringHistory = false;
    }, 250);
});