document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const GITHUB_OWNER = 'BSData';
    const GITHUB_REPO = 'wh40k-killteam';
    const LOCAL_STORAGE_COMMIT_KEY = 'localCommitSHA';
    const DB_NAME = 'KillTeamDB';
    const DB_VERSION = 1;
    const FILE_STORE_NAME = 'killTeamFiles';

    // --- DOM Element References ---
    const yearSelect = document.getElementById('year-select');
    const factionSelect = document.getElementById('faction-select');
    const datacardsContainer = document.getElementById('datacards-container');
    const ploysContainer = document.getElementById('ploys-pane');
    const equipmentContainer = document.getElementById('equipment-pane');
    const tacopsContainer = document.getElementById('faction-tacops-pane');
    const racialContainer = document.getElementById('faction-info-pane');
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    const body = document.body;

    let allFiles = []; // To store all files from IndexedDB for filtering
    let allPloys = []; // To store data from ploys.json
    let localFactionsData = {}; // To store data from racial.json
    let allTacops = {}; // To store data from tacops.json
    let genericTacopsData = null; // To cache the parsed generic Tac Ops data

    // --- Faction Name Mapping ---
    const specialNameMappings = {
        'Hand of the Archon': 'kabalite',
        'Veteran Guardsmen': 'veteran-guardsmen',
        'Elucidian Starstriders': 'elucidian-starstrider',
        'Gellerpox Infected': 'gellerpox',
        'Hearthkyn Salvagers': 'hearthkyn-salvager',
        'Imperial Navy Breachers': 'imperial-navy-breachers',
        'Phobos Strike Team': 'phobos',
        'Inquisitorial Agents': 'inquisitorial-agent',
        'Corsair Voidscarred': 'corsair-voidscarred',
        'Hierotek Circle': 'hierotek',
        'Canoptek Circle': 'canoptek',
        'Hernkyn Yaegirs': 'yaegirs',
        'Warpcoven': 'warpcoven',
        'Hunter Clade': 'hunter-clade',
        'Farstalker Kinband': 'farstalker-kinband',
        'Nemesis Claw': 'nemesis-claw',
        'Wrecka Krew': 'wrecka-krew',
        'Scout Squad': 'scouts',
        'Strike Force Justian': 'intercessors',
        'Angels of Death': 'intercessors',
        'Plague Marines': 'plague-marines',
        'Tempestus Aquilons': 'tempestus-aquilons',
        'Void-dancer Troupe': 'void-dancer-troupe',
        'Blades of Khaine': 'blades-of-khaine',
        'Brood Brothers': 'brood-brothers',
        'Chaos Cult': 'chaos-cult',
        'Fellgor Ravagers': 'fellgor-ravagers',
        'Goremonger': 'goremongers',
        'Legionaries': 'legionary',
        'Mandrakes': 'mandrakes',
        'Novitiates': 'novitiates',
        'Pathfinders': 'pathfinders',
        'Ratling': 'ratling',
        'Raveners': 'raveners',
        'Sanctifier': 'sanctifiers',
        'Vespid Stingwings': 'vespid-stingwings',
        'Wyrmblade': 'wyrmblade',
        'Kommandos': 'kommandos',
        'Blooded': 'blooded',
        'Exaction Squad': 'exaction-squad',
        'Kasrkin': 'kasrkin',
        'Deathwatch': 'deathwatch',
        'Thousand Sons': 'warpcoven',
        'Tomb World': 'hierotek'
    };

    function mapCatNameToFactionKey(catName) {
        let cleanName = catName.replace(/\d{4}\s-\s/, '').replace('.cat', '').trim();

        if (specialNameMappings[cleanName]) {
            return specialNameMappings[cleanName];
        }

        let key = cleanName.toLowerCase().replace(/\s+/g, '-');
        if (localFactionsData[key] || allPloys.some(p => p.faction === key)) {
            return key;
        }

        const keys = Object.keys(localFactionsData);
        for(const k of keys) {
            if (key.includes(k)) return k;
        }

        return key;
    }

    // --- OPERATIVE IMAGE FUNCTIONS ---

    /**
     * Maps an operative name to its corresponding image filename
     * @param {string} operativeName - The name of the operative from the datasheet
     * @returns {string} - The image path
     */
    function getOperativeImagePath(operativeName, factionKey) {
        if (!operativeName) return null;

        // The image files use the exact operative name with proper capitalization
        // Examples: 'Space Marine Captain.png', 'Intercessor Sergeant.png', 'Assault Intercessor Warrior.png'

        // Clean the operative name but preserve the original capitalization pattern
        let cleanName = operativeName
        .replace(/[^\w\s-']/g, '') // Remove special characters except spaces, hyphens, and apostrophes
        .trim();

        // Build the image path
        let imagePath = `./resources/roster_images/${factionKey}/${cleanName}.png`;

        // Return the path - the browser will handle 404s gracefully with our onerror handler
        return imagePath;
    }

    /**
     * Creates an img element with fallback for missing images
     * @param {string} operativeName - The name of the operative
     * @returns {string} - HTML string for the image or placeholder
     */
    function createOperativeImageHTML(operativeName, factionKey) {
        const imagePath = getOperativeImagePath(operativeName, factionKey);

        if (!imagePath) {
            return `<div style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display:flex; align-items:center; justify-content:center; color:white; font-style:italic; font-size: 1.2rem;">Operative Art</div>`;
        }

        return `<img src="${imagePath}"
        alt="${operativeName}"
        class="header-image"
        onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='<div style=\'height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display:flex; align-items:center; justify-content:center; color:white; font-style:italic; font-size: 1.2rem;\'>${operativeName}</div>';">`;
    }

    // --- END OPERATIVE IMAGE FUNCTIONS ---

    async function initializeApp() {
        console.log('Initializing application...');

        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) body.classList.add('dark-mode');
        toggleDarkModeButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        });

        try {
            const [ploysResponse, factionsResponse, tacopsResponse] = await Promise.all([
                fetch('ploys.json').catch(e => console.warn('Could not fetch ploys.json', e)),
                                                                                        fetch('racial.json').catch(e => console.warn('Could not fetch racial.json', e)),
                                                                                        fetch('tacops.json').catch(e => console.warn('Could not fetch tacops.json', e))
            ]);

            if (ploysResponse && ploysResponse.ok) {
                allPloys = await ploysResponse.json();
                console.log(`Successfully loaded ${allPloys.length} ploys from local file.`);
            }
            if (factionsResponse && factionsResponse.ok) {
                localFactionsData = await factionsResponse.json();
                console.log(`Successfully loaded local data for ${Object.keys(localFactionsData).length} factions.`);
            }
            if (tacopsResponse && tacopsResponse.ok) {
                allTacops = await tacopsResponse.json();
                console.log(`Successfully loaded tac ops data for ${Object.keys(allTacops).length} factions.`);
            }

            await synchronizeData();

            const db = await openDB();
            const transaction = db.transaction(FILE_STORE_NAME, 'readonly');
            const store = transaction.objectStore(FILE_STORE_NAME);
            const allFilesRequest = store.getAll();

            allFilesRequest.onsuccess = () => {
                const files = allFilesRequest.result;
                if (!files || files.length === 0) {
                    factionSelect.innerHTML = '<option>No local data found. Connect to the internet to sync.</option>';
                    return;
                }
                allFiles = files;
                populateYearFilter(allFiles);
                populateFactionFilter(allFiles);
                console.log('Faction dropdown populated from IndexedDB.');
            };
        } catch (error) {
            console.error('Failed to initialize the application.', error);
            factionSelect.innerHTML = '<option>Error loading data.</option>';
        }

        yearSelect.addEventListener('change', () => populateFactionFilter(allFiles));
        factionSelect.addEventListener('change', handleFactionSelection);
    }

    async function handleFactionSelection(event) {
        const selectedFile = event.target.value;
        if (!selectedFile || selectedFile === 'Choose a Kill Team...') {
            clearContentPanes();
            return;
        }

        console.log(`Loading data for: ${selectedFile}`);
        clearContentPanes();

        const factionKey = mapCatNameToFactionKey(selectedFile);
        console.log(`Mapped "${selectedFile}" to faction key: "${factionKey}"`);

        const ploysForFaction = allPloys.filter(p => p.faction === factionKey);
        const racialTraits = localFactionsData[factionKey] || [];
        const tacopsData = allTacops[factionKey];

        renderPloys(ploysForFaction);
        renderFactionInfo(racialTraits, factionKey);
        renderTacops(tacopsData, tacopsContainer);

        try {
            const db = await openDB();
            const transaction = db.transaction(FILE_STORE_NAME, 'readonly');
            const store = transaction.objectStore(FILE_STORE_NAME);
            const fileRequest = store.get(selectedFile);

            fileRequest.onsuccess = () => {
                const fileData = fileRequest.result;
                if (fileData) {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(fileData.content, "application/xml");
                    renderOperatives(parseOperatives(xmlDoc), factionKey);
                    renderEquipment(findEquipment(xmlDoc));
                }
            };
        } catch (error) {
            console.error(`Failed to retrieve ${selectedFile} from DB`, error);
            datacardsContainer.innerHTML = `<div class="alert alert-danger">Could not load operative data for ${selectedFile}.</div>`;
        }
    }

    async function getGenericTacopsData() {
        if (genericTacopsData) {
            return genericTacopsData;
        }

        try {
            const response = await fetch('resources/game_rules_files/factions page example.html');
            const htmlString = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            const tacopElements = doc.querySelectorAll('.tacop.card');

            const tacops = [];
            tacopElements.forEach(el => {
                const nameElement = el.querySelector('h2.name');
                if (nameElement) {
                    const archetype = el.classList.contains('recon') ? 'recon' :
                    el.classList.contains('seek-destroy') ? 'seek-destroy' :
                    el.classList.contains('security') ? 'security' :
                    el.classList.contains('infiltration') ? 'infiltration' : '';
                    const name = nameElement.textContent;
                    let rules = el.querySelector('.mission-container').innerHTML;
                    rules = rules.replace(/Killteam%20BattleKit_files\//g, './resources/game_rules_files/');
                    const id = el.id;
                    tacops.push({ id, name, archetype, rules });
                }
            });

            genericTacopsData = tacops;
            return genericTacopsData;
        } catch (error) {
            console.error("Failed to fetch and parse generic tacops data", error);
            return [];
        }
    }

    async function renderTacops(factionTacops, contentDiv) {
        if (!factionTacops || !factionTacops.archetypes) {
            contentDiv.innerHTML = '<div class="alert alert-warning">No Tac Ops found for this faction.</div>';
            return;
        }

        const genericTacops = await getGenericTacopsData();
        const factionArchetypes = factionTacops.archetypes;
        const filteredTacops = genericTacops.filter(tacop => factionArchetypes.includes(tacop.archetype));

        // De-duplicate the filtered list based on Tac Op ID
        const uniqueTacops = [];
        const seenIds = new Set();
        filteredTacops.forEach(tacop => {
            if (!seenIds.has(tacop.id)) {
                uniqueTacops.push(tacop);
                seenIds.add(tacop.id);
            }
        });

        if (uniqueTacops.length === 0) {
            contentDiv.innerHTML = '<div class="alert alert-info">No matching Tac Ops found for this faction\'s archetypes.</div>';
            return;
        }

        let tacopsHTML = '<div class="row justify-content-center">';
        uniqueTacops.forEach(tacop => {
            tacopsHTML += `
            <div class="col-xs-12 col-md-6 col-lg-4 text-center p-2">
            <div id="${tacop.id}" class="tacop card ${tacop.archetype}-icon">
            <div class="archetype position-relative">
            ${tacop.archetype.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            <i class="gototacops bi bi-heart tc-white position-absolute translate-middle"></i>
            </div>
            <div class="middle">
            <h2 class="name">${tacop.name}</h2>
            <div class="mission-container pt-0">
            ${tacop.rules}
            </div>
            </div>
            </div>
            </div>`;
        });
        tacopsHTML += '</div>';
        contentDiv.innerHTML = tacopsHTML;
    }

    function renderPloys(ployList) {
        if (!ployList || ployList.length === 0) {
            ploysContainer.innerHTML = '<div class="alert alert-warning">No Ploys found for this faction in local data.</div>';
            return;
        }
        ployList.sort((a, b) => {
            const typeA = a.type || '';
            const typeB = b.type || '';
            if (typeA < typeB) return -1;
            if (typeA > typeB) return 1;
            return (a.name || '').localeCompare(b.name || '');
        });

        ploysContainer.innerHTML = `<div class="row">${ployList.map(p => `
            <div class="col-12 col-md-6 mb-3">
            <div class="ploy-card">
            <div class="ploy-header">
            <span class="ploy-type-${p.type ? p.type.toLowerCase() : ''}">${p.name}</span>
            <span>${p.cps || ''}</span>
            </div>
            <hr>
            <p>${p.description}</p>
            </div>
            </div>`).join('')}</div>`;
    }

    function renderFactionInfo(racialTraits, factionKey) {
        let archetypeHtml = '';
        const factionTacopsData = allTacops[factionKey];

        if (factionTacopsData && factionTacopsData.archetypes && factionTacopsData.archetypes.length > 0) {
            const archetypeNames = factionTacopsData.archetypes;
            archetypeHtml = `
            <div class="col-12 col-lg-10 mx-auto mb-3">
            <div class="ability-card">
            <h3>Archetype</h3>
            <div class="middle d-flex justify-left flex-wrap">
            ${archetypeNames.map(name => {
                const archetypeKey = name.toLowerCase().replace(/\s/g, '-');
                const displayName = name.replace(/-/g, ' ');
                return `
                <div class="archetype-item text-center" style="background-color: var(--colour-${archetypeKey}); padding: 10px; width: 100px; margin: 5px;">
                <img src="./resources/game_rules_files/${archetypeKey}.svg" alt="${displayName}" style="width: 60px; height: 60px; margin-bottom: 5px; filter: brightness(0) saturate(100%) invert(1);">
                <span class="archetype-label" style="color: white; font-size: 1em; text-transform: uppercase; display: block; hyphens: auto;">${displayName}</span>
                </div>
                `;
            }).join('')}
            </div>
            </div>
            </div>
            `;
        }

        const otherTraits = (racialTraits || []).filter(trait => trait.name.toLowerCase() !== 'archetype' && trait.name.toLowerCase() !== 'archetypes');
        const traitsHtml = otherTraits.map(info => `
        <div class="col-12 col-lg-10 mx-auto mb-3">
        <div class="ability-card">
        <h3>${info.name}</h3>
        <div>${info.description}</div>
        </div>
        </div>`).join('');

        if (!archetypeHtml && !traitsHtml) {
            racialContainer.innerHTML = '<div class="alert alert-info">No Faction Rules or Archetype found for this faction in local data.</div>';
            return;
        }

        racialContainer.innerHTML = `<div class="row">${archetypeHtml}${traitsHtml}</div>`;
    }

    function clearContentPanes() {
        datacardsContainer.innerHTML = '<div class="alert alert-info">Select a faction to view its operative datasheets.</div>';
        if(ploysContainer) ploysContainer.innerHTML = '';
        if(equipmentContainer) equipmentContainer.innerHTML = '';
        if(racialContainer) racialContainer.innerHTML = '';
        if(tacopsContainer) tacopsContainer.innerHTML = '';
    }

    function populateYearFilter(files) {
        const years = new Set();
        files.forEach(file => {
            const match = file.name.match(/^(\d{4})\s-/);
            if (match) {
                years.add(match[1]);
            }
        });

        const sortedYears = Array.from(years).sort((a, b) => b - a);
        yearSelect.innerHTML = '<option value="all" selected>All Years</option>';
        sortedYears.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
        const option = document.createElement('option');
        option.value = 'generic';
        option.textContent = 'Generic';
        yearSelect.appendChild(option);
    }

    function populateFactionFilter(files) {
        const selectedYear = yearSelect.value;
        factionSelect.innerHTML = '<option selected>Choose a Kill Team...</option>';

        const filteredFiles = files.filter(file => {
            const match = file.name.match(/^(\d{4})\s-/);
            const year = match ? match[1] : 'generic';
            if (selectedYear === 'all') {
                return true;
            } else {
                return year === selectedYear;
            }
        });

        filteredFiles.sort((a, b) => a.name.localeCompare(b.name)).forEach(file => {
            const displayName = file.name.replace('.cat', '').replace(/_/g, ' ');
            const option = document.createElement('option');
            option.value = file.name;
            option.textContent = displayName;
            factionSelect.appendChild(option);
        });
    }

    function parseOperatives(xmlDoc) {
        const operatives = [];
        const operativeNodes = xmlDoc.querySelectorAll('selectionEntry[type="model"]');

        operativeNodes.forEach(node => {
            const profileNode = node.querySelector('profile[typeName="Operative"]');
            if (!profileNode) return;

            const operative = {
                id: node.getAttribute('id'),
                               name: profileNode.getAttribute('name'),
                               stats: {},
                               weapons: [],
                               abilities: [],
                               uniqueActions: [],
                               keywords: ''
            };

            profileNode.querySelectorAll('characteristic').forEach(char => {
                const statName = char.getAttribute('name');
                const statValue = char.textContent;
                operative.stats[statName.toUpperCase()] = statValue;
            });

            const keywordNodes = node.querySelectorAll('categoryLink');
            operative.keywords = Array.from(keywordNodes).map(k => k.getAttribute('name')).join(', ');

            node.querySelectorAll('profile[typeName="Abilities"]').forEach(p => {
                const charNode = p.querySelector('characteristic[name="Ability"]');
                if(charNode) {
                    let isBold = false;
                    const formattedText = charNode.textContent.replace(/\*\*/g, () => {
                        isBold = !isBold;
                        return isBold ? '<strong>' : '</strong>';
                    });
                    operative.abilities.push({
                        name: p.getAttribute('name'),
                                             description: formattedText
                    });
                }
            });

            node.querySelectorAll('profile[typeName="Unique Actions"]').forEach(p => {
                const actionChar = p.querySelector('characteristic[name="Unique Action"]');
                if(actionChar){
                    const name = p.getAttribute('name').split('(')[0].trim();
                    const cost = (p.getAttribute('name').match(/\(([^)]+)\)/) || [])[1] || '1AP';
                    operative.uniqueActions.push({
                        name: name,
                        cost: cost,
                        description: actionChar.textContent.replace(/Ã¢â€"â€ /g, '<span class="text-danger">&diams;</span>').replace(/Ã¢â€"Â¶/g, '<span class="text-success">&diams;</span>')
                    });
                }
            });

        const foundWeaponEntries = new Set();
        const addWeaponsFromEntry = (entryNode) => {
            if (!entryNode || (entryNode.id && foundWeaponEntries.has(entryNode.id))) return;

            const weaponProfiles = entryNode.querySelectorAll('profile[typeName="Weapons"]');
            if (weaponProfiles.length > 0) {
                if (entryNode.id) foundWeaponEntries.add(entryNode.id);

                weaponProfiles.forEach(profile => {
                    const weapon = {
                        originalName: profile.getAttribute('name'),
                                       name: profile.getAttribute('name').replace(/\u2316|\u2694/g, '').trim(),
                                       stats: {},
                                       type: profile.getAttribute('name').includes('\u2316') ? 'ranged' : 'melee'
                    };
                    profile.querySelectorAll('characteristic').forEach(char => {
                        weapon.stats[char.getAttribute('name')] = char.textContent;
                    });
                    operative.weapons.push(weapon);
                });
            }
        };

        node.querySelectorAll('entryLink, selectionEntry[type="upgrade"]').forEach(linkOrEntry => {
            if (linkOrEntry.matches('entryLink')) {
                const targetId = linkOrEntry.getAttribute('targetId');
                if (targetId) {
                    const targetNode = xmlDoc.querySelector(`selectionEntry[id="${targetId}"]`);
                    addWeaponsFromEntry(targetNode);
                }
            } else {
                addWeaponsFromEntry(linkOrEntry);
            }
        });

        operatives.push(operative);
        });
return operatives;
    }

    function renderOperatives(operatives, factionKey) {
        if (!operatives || operatives.length === 0) {
            datacardsContainer.innerHTML = '<div class="alert alert-warning">No operatives found in this file.</div>';
            return;
        }

        let html = operatives.map(op => {
            const weaponGroups = op.weapons.reduce((acc, weapon) => {
                const baseName = weapon.name.split('(')[0].trim();
                if (!acc[baseName]) {
                    acc[baseName] = [];
                }
                acc[baseName].push(weapon);
                return acc;
            }, {});

            const weaponsHtml = Object.entries(weaponGroups)
            .sort(([, weaponsA], [, weaponsB]) => {
                const nameA = weaponsA[0].originalName;
                const nameB = weaponsB[0].originalName;
                const isMeleeA = nameA.includes('\u2694');
                const isMeleeB = nameB.includes('\u2694');

                if (isMeleeA && !isMeleeB) {
                    return 1;
                }
                if (!isMeleeA && isMeleeB) {
                    return -1;
                }
                return 0;
            })
            .map(([baseName, weapons]) => {
                if (weapons.length === 1) {
                    const w = weapons[0];
                    const profileNameMatch = w.name.match(/\(([^)]+)\)/);
            const displayName = profileNameMatch ? `- ${profileNameMatch[1]}` : w.name;
            const isSubProfile = !!profileNameMatch;

            if (isSubProfile) {
                return `<tr class="weapon-group-header"><td><img src="./resources/game_rules_files/${w.type === 'ranged' ? 'shoot.svg' : 'attack.svg'}" class="weapon-icon"></td><td colspan="5">${baseName}</td></tr><tr class="weapon-profile-row multi-profile"><td></td><td class="weapon-name">${displayName}</td><td class="text-center">${w.stats.ATK || w.stats.A || '-'}</td><td class="text-center">${w.stats.HIT || w.stats['WS/BS'] || '-'}</td><td class="text-center">${w.stats.DMG || w.stats.D || '-'}</td><td>${w.stats.WR || w.stats.SR || w.stats['!'] || '-'}</td></tr>`;
            } else {
                return `<tr class="weapon-profile-row"><td><img src="./resources/game_rules_files/${w.type === 'ranged' ? 'shoot.svg' : 'attack.svg'}" class="weapon-icon"></td><td class="weapon-name">${w.name}</td><td class="text-center">${w.stats.ATK || w.stats.A || '-'}</td><td class="text-center">${w.stats.HIT || w.stats['WS/BS'] || '-'}</td><td class="text-center">${w.stats.DMG || w.stats.D || '-'}</td><td>${w.stats.WR || w.stats.SR || w.stats['!'] || '-'}</td></tr>`;
            }
                } else {
                    const uniqueProfiles = [];
                    const seenProfiles = new Set();

                    weapons.forEach(w => {
                        const profileString = JSON.stringify(w.stats);
                        if (!seenProfiles.has(profileString)) {
                            seenProfiles.add(profileString);
                            uniqueProfiles.push(w);
                        }
                    });

                    if (uniqueProfiles.length === 1) {
                        const w = uniqueProfiles[0];
                        return `<tr class="weapon-profile-row"><td><img src="./resources/game_rules_files/${w.type === 'ranged' ? 'shoot.svg' : 'attack.svg'}" class="weapon-icon"></td><td class="weapon-name">${w.name}</td><td class="text-center">${w.stats.ATK || w.stats.A || '-'}</td><td class="text-center">${w.stats.HIT || w.stats['WS/BS'] || '-'}</td><td class="text-center">${w.stats.DMG || w.stats.D || '-'}</td><td>${w.stats.WR || w.stats.SR || w.stats['!'] || '-'}</td></tr>`;
                    }

                    let groupHtml = `<tr class="weapon-group-header"><td><img src="./resources/game_rules_files/${weapons[0].type === 'ranged' ? 'shoot.svg' : 'attack.svg'}" class="weapon-icon"></td><td colspan="5">${baseName} <span class="text-muted" style="font-size: 0.8em;">Select one of the profiles below to use:</span></td></tr>`;

                    uniqueProfiles.forEach(w => {
                        const profileName = w.name.match(/\(([^)]+)\)/) ? w.name.match(/\(([^)]+)\)/)[1] : w.name;
                        groupHtml += `<tr class="weapon-profile-row multi-profile"><td></td><td class="weapon-name">- ${profileName}</td><td class="text-center">${w.stats.ATK || w.stats.A || '-'}</td><td class="text-center">${w.stats.HIT || w.stats['WS/BS'] || '-'}</td><td class="text-center">${w.stats.DMG || w.stats.D || '-'}</td><td>${w.stats.WR || w.stats.SR || w.stats['!'] || '-'}</td></tr>`;
                    });
                    return groupHtml;
                }
            }).join('');

            // THIS IS THE KEY CHANGE - Using createOperativeImageHTML instead of placeholder
            return `
            <div id="operative-${op.id}" class="card-container col-12 col-lg-10 mt-4 mb-3 mx-auto">
            <div class="col-12 col-lg-7 card-header position-relative">${createOperativeImageHTML(op.name, factionKey)}<div class="card-title"><span>${op.name}</span></div></div>
            <div class="card-stats d-flex flex-wrap">
            <div class="stat-item col-6 col-md-3"><span class="stat-label">APL</span><div class="stat-icon-value"><img src="./resources/game_rules_files/apl.svg" class="stat-icon"> ${op.stats.APL || '?'}</div></div>
            <div class="stat-item col-6 col-md-3"><span class="stat-label">Move</span><div class="stat-icon-value"><img src="./resources/game_rules_files/move.svg" class="stat-icon"> ${op.stats.MOVE || '?'}</div></div>
            <div class="stat-item col-6 col-md-3"><span class="stat-label">Save</span><div class="stat-icon-value"><img src="./resources/game_rules_files/save.svg" class="stat-icon"> ${op.stats.SAVE || '?'}</div></div>
            <div class="stat-item col-6 col-md-3"><span class="stat-label">Wounds</span><div class="stat-icon-value"><img src="./resources/game_rules_files/wounds.svg" class="stat-icon"> ${op.stats.WOUNDS || '?'}</div></div>
            </div>
            ${op.weapons.length > 0 ? `<div class="weapons-table"><table><thead><tr><th></th><th>Name</th><th class="text-center">A</th><th class="text-center">BS/WS</th><th class="text-center">D</th><th>SR</th></tr></thead><tbody>${weaponsHtml}</tbody></table></div>` : ''}
            ${op.abilities.length > 0 ? `<div class="abilities-section">${op.abilities.map(a => `<div class="ability-card"><h5>${a.name}</h5><p>${a.description}</p></div>`).join('')}</div>` : ''}
            ${op.uniqueActions.length > 0 ? `<div class="unique-actions-section">${op.uniqueActions.map(a => `<div class="ability-card"><div class="d-flex justify-content-between"><h5>${a.name}</h5><span>${a.cost}</span></div><div class="mt-2">${a.description}</div></div>`).join('')}</div>` : ''}
            <div class="card-footer mt-2"><span class="footer-text">${op.keywords}</span></div></div>`;
        }).join('');
        datacardsContainer.innerHTML = `<div class="row">${html}</div>`;
    }

    function findEquipment(xmlDoc) {
        const equipment = [];
        const group = xmlDoc.querySelector('selectionEntryGroup[name*="Equipment"]');
        if (!group) return [];

        group.querySelectorAll('selectionEntry[type="upgrade"]').forEach(equip => {
            const profile = equip.querySelector('profile[typeName="Equipment"]');
            if (profile) {
                equipment.push({
                    name: profile.getAttribute('name'),
                               description: profile.querySelector('characteristic').textContent
                });
            }
        });
        return equipment;
    }

    function renderEquipment(equipList) {
        if (!equipList || equipList.length === 0) {
            equipmentContainer.innerHTML = '<div class="alert alert-warning">No specific equipment found for this faction.</div>';
            return;
        }
        equipmentContainer.innerHTML = `<div class="row">${equipList.map(e => `
            <div class="col-12 col-md-6 mb-3"><div class="ploy-card"><h5>${e.name}</h5><p>${e.description}</p></div></div>`).join('')}</div>`;
    }

    async function openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(FILE_STORE_NAME)) {
                    db.createObjectStore(FILE_STORE_NAME, { keyPath: 'name' });
                }
            };
            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject('IndexedDB error: ' + event.target.errorCode);
        });
    }

    async function performDBTransaction(storeName, mode, action) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, mode);
            const store = transaction.objectStore(storeName);
            transaction.oncomplete = () => resolve();
            transaction.onerror = (event) => reject('Transaction error: ' + event.target.error);
            action(store, resolve, reject);
        });
    }

    async function getDBFileCount() {
        try {
            const db = await openDB();
            const transaction = db.transaction(FILE_STORE_NAME, 'readonly');
            const store = transaction.objectStore(FILE_STORE_NAME);
            const countRequest = store.count();
            return new Promise((resolve) => {
                transaction.oncomplete = () => resolve(countRequest.result);
                transaction.onerror = () => resolve(0);
            });
        } catch (error) {
            console.error("Could not count DB files, assuming 0.", error);
            return 0;
        }
    }

    async function synchronizeData() {
        console.log('Starting synchronization process...');
        try {
            const commitApiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits/master`;
            const commitResponse = await fetch(commitApiUrl);
            if (!commitResponse.ok) throw new Error(`GitHub API not reachable (commit). Status: ${commitResponse.status}`);
            const commitData = await commitResponse.json();
            const remoteCommitSHA = commitData.sha;

            const localCommitSHA = localStorage.getItem(LOCAL_STORAGE_COMMIT_KEY);
            const localFileCount = await getDBFileCount();

            if (remoteCommitSHA === localCommitSHA && localFileCount > 0) {
                console.log('Data is up-to-date. No synchronization needed.');
                return;
            }

            console.log('New version detected or local data missing. Starting update...');

            const treeApiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees/master?recursive=1`;
            const treeResponse = await fetch(treeApiUrl);
            if (!treeResponse.ok) throw new Error(`GitHub API not reachable (tree). Status: ${treeResponse.status}`);
            const treeData = await treeResponse.json();

            const catFiles = treeData.tree.filter(file => file.path.endsWith('.cat') && !file.path.startsWith('.github'));

            const downloadPromises = catFiles.map(async (fileInfo) => {
                const fileUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/master/${fileInfo.path}`;
                try {
                    const fileResponse = await fetch(fileUrl);
                    if (!fileResponse.ok) throw new Error(`Failed to fetch ${fileInfo.path}`);
                    const fileContent = await fileResponse.text();
                    return { name: fileInfo.path, content: fileContent };
                } catch (error) {
                    console.error(`Failed to download ${fileInfo.path}`, error);
                    return null;
                }
            });

            const filesToStore = (await Promise.all(downloadPromises)).filter(file => file !== null);

            await performDBTransaction(FILE_STORE_NAME, 'readwrite', (store, resolve) => {
                console.log(`Clearing old data and storing ${filesToStore.length} new files...`);
                const clearRequest = store.clear();
                clearRequest.onsuccess = () => {
                    filesToStore.forEach((fileData, index) => {
                        const putRequest = store.put(fileData);
                        if (index === filesToStore.length - 1) {
                            putRequest.onsuccess = () => resolve();
                        }
                    });
                };
            });

            localStorage.setItem(LOCAL_STORAGE_COMMIT_KEY, remoteCommitSHA);
            console.log('Synchronization complete.');

        } catch (error) {
            console.warn(`Could not synchronize with GitHub: ${error.message}. Proceeding with local data.`);
        }
    }

    // --- Start the process ---
    initializeApp();
});
