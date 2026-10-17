# Matriz de traducción

Esta matriz recoge la terminología en español que usa el proyecto para traducir las reglas de *Kill Team* (3.ª edición). Para cada término del juego en inglés indica el término que usamos y, cuando corresponde, las variantes que **no** se deben usar.

Se aplica a todo el contenido de reglas de la web, en especial a los archivos de datos de facciones: `operatives.json`, `racial.json`, `ploys.json` y `equipment.json`. Cualquier texto nuevo o corrección debe seguirla.

## Criterios de traducción

- **Fuente principal:** el PDF oficial en español de cada facción (tarjetas de datos, reglas de facción, ardides y equipo) junto con su registro de actualizaciones (erratas).
- **Erratas:** si la tarjeta y la errata no coinciden, manda la errata, salvo que la tarjeta y la versión oficial en inglés coincidan entre sí contra ella.
- **Referencia en inglés:** cuando el texto en español es ambiguo o tiene un error evidente, se contrasta con la versión en inglés de las reglas.
- **Unificación:** cuando el PDF oficial usa un término distinto al de esta matriz (por ejemplo, las tarjetas dicen "usado" y la matriz usa "agotado"), se reemplaza por el término de la matriz para que toda la web sea coherente.
- **Formato en los archivos de datos:** la palabra clave de la facción va en `<span class="faction">…</span>` tal como aparece en las tarjetas (por ejemplo, `BANDAESTIRPE ACECHANTE`); los nombres de acciones (**Disparar**, **Cargar**…) y las demás palabras clave (**LÍDER**, **APOYO**…) van en `<b>…</b>`.

## 1. Conceptos generales

| Inglés | Español (usar) | No usar | Nota |
|---|---|---|---|
| Kill team | **comando** | — | — |
| Operative | **agente** | — | — |
| Friendly / Enemy (operative) | **amigo / enemigo** | — | — |
| Leader | **LÍDER (palabra clave)** | — | — |
| Killzone | **zona de aniquilación** | — | — |
| Drop zone | **zona de descenso** | — | — |
| Territory | **territorio** | — | — |
| Turning point | **punto de inflexión** | turno (para referirse al turning point) | "Turno" solo se usa en frases como "cuando sea tu turno de activar un agente". |
| Strategy phase | **fase de estrategia** | — | — |
| Firefight phase | **fase de tiroteo** | — | — |
| Ready step | **paso de preparación** | — | — |
| Initiative | **iniciativa** | — | — |
| Activation | **activación** | — | — |
| Counteract | **reaccionar / reacción** | contraatacar / contraataque (para esta mecánica) | Cuando es tu turno de activar pero todos tus agentes están agotados y el rival aún tiene agentes preparados, un agente tuyo que no haya reaccionado en el punto de inflexión realiza una acción de 1PA; si es de movimiento, no puede mover más de 2". |
| Retaliate | **contraatacar / contraataque** | reaccionar / reacción (para esta mecánica), represalia | Durante la acción de Combatir, el agente que recibe el ataque también tira sus dados de ataque y responde: eso es contraatacar. No confundir con la reacción. |
| Expended / Ready (operative) | **agotado / preparado** | usado (para el estado del agente) | "Usado" se mantiene solo con su sentido normal, por ejemplo "si ya has usado ese ardid". |
| Set up (deploy) | **desplegar** | — | — |
| Datacard | **tarjeta de datos** | — | — |
| Base | **peana** | — | — |
| Marker / Token | **marcador / ficha** | — | — |
| Objective marker | **marcador de objetivo** | — | — |
| Mission action | **acción de misión** | — | — |
| Unique action | **acción única** | — | — |
| Free action | **acción libre** | acción gratis / gratuita | — |
| Faction rule | **regla de facción** | — | — |
| Strategy ploy | **ardid de estrategia** | — | — |
| Firefight ploy | **ardid de tiroteo** | — | — |
| Strategic gambit | **GAMBITO ESTRATÉGICO** | — | — |
| Faction equipment / Universal equipment | **equipo de facción / equipo universal** | — | — |
| SUPPORT | **APOYO** | — | — |
| PSYCHIC (weapon rule / keyword) | **PSÍQUICA (regla de arma) / PSÍQUICO (palabra clave)** | — | — |
| Approved Ops | **Operaciones aprobadas** | — | — |
| Kill op / Elimination op | **operación de asesinato / eliminación** | — | — |
| Close quarters | **combate cerrado** | — | — |

## 2. Atributos y abreviaturas

| Inglés | Español (usar) |
|---|---|
| APL (Action Point Limit) | **LPA** |
| AP (Action Point) | **PA** |
| CP (Command Point) | **PM** |
| VP (Victory Point) | **PV** |
| Move | **Movimiento (MOV.)** |
| Save | **Salvación (SALV.)** |
| Wounds | **Heridas** |
| ATK (Attacks) | **Ataques (ATQ)** |
| HIT | **Impactar (IMP)** |
| DMG (Normal / Critical Dmg) | **Daño (normal / crítico)** |
| WR (Weapon rules) | **Reglas de armas (RA)** |

## 3. Órdenes y estados

| Inglés | Español (usar) | No usar | Nota |
|---|---|---|---|
| Engage (order) | **Trabarse** | — | — |
| Conceal (order) | **Ocultarse** | Ocultación | — |
| Guard (on guard) | **apostado** | — | — |
| Injured | **lesionado** | — | Agente con menos de la mitad de sus heridas iniciales; empeora sus atributos. |
| Wounded | **herido** | — | Agente que ha perdido al menos una herida. No se intercambia con "lesionado". |
| Incapacitated | **incapacitado** | — | — |
| Control range | **zona de control** | rango de control / área de control | — |
| Visible | **visible** | — | — |
| In cover / Cover | **a cubierto / cobertura** | — | — |
| Obscured | **ofuscado** | — | — |
| Valid target | **blanco válido** | — | — |
| Primary / Secondary target | **blanco primario / blanco secundario** | — | — |

## 4. Acciones

| Inglés | Español (usar) | No usar | Nota |
|---|---|---|---|
| Reposition | **Reposicionarse** | — | — |
| Dash | **Correr** | — | — |
| Fall Back | **Retroceder** | — | — |
| Charge | **Cargar** | — | La acción es "Cargar" (no "Carga"); "carga" solo forma parte de nombres como "Carga de demolición". |
| Shoot | **Disparar** | — | — |
| Fight | **Combatir** | — | — |
| Guard | **Ponerse en guardia** | — | — |
| Pick Up Marker | **Recoger marcador** | — | — |
| Place Marker | **Colocar marcador** | — | — |
| Operate Hatch | **Operar portillo** | Operar compuerta | — |
| Climb / Drop / Jump | **trepar / descender / saltar** | — | — |

## 5. Dados y secuencias

| Inglés | Español (usar) | No usar |
|---|---|---|
| Roll a D6 | **tira 1D6** | tira un 1D6 |
| Retain (a die) | **guardar** | retener |
| Re-roll | **repetir** | — |
| Discard | **descartar** | — |
| Normal / Critical success | **éxito normal / éxito crítico** | — |
| Fail | **fallo** | — |
| Attack dice / Defence dice | **dados de ataque / dados de defensa** | — |
| Cover save | **salvación por cobertura** | — |
| Strike / Block (fight) | **golpear / bloquear** | — |
| Assist (in a fight) | **asistir** | — |
| Sequence | **secuencia** | — |
| Point-blank shot | **disparo a bocajarro** | — |

## 6. Reglas de armas

| Inglés | Español (usar) | No usar |
|---|---|---|
| Accurate x | **Certera x** | — |
| Balanced | **Equilibrada** | — |
| Blast x | **Área x** | Estallido / Explosión |
| Brutal | **Brutal** | — |
| Ceaseless | **Incesante** | — |
| Devastating x | **Devastadora x** | — |
| Heavy (Dash only / Reposition only) | **Pesada (solo Correr / solo Reposicionarse)** | — |
| Hot | **Sobrecalentamiento** | — |
| Lethal x+ | **Letal x+** | — |
| Limited x | **Limitada x** | — |
| Piercing x | **Penetración x** | Perforante (salvo en "granada perforante") |
| Piercing Crits x | **Críticos de penetración x** | — |
| Punishing | **Castigadora** | — |
| Range x | **Alcance x** | — |
| Relentless | **Implacable** | — |
| Rending | **Desgarradora** | — |
| Saturate | **Saturación** | — |
| Seek / Seek Light | **Buscadora / Buscadora (Ligero)** | — |
| Severe | **Severa** | — |
| Shock | **Choque** | — |
| Silent | **Silenciosa** | — |
| Stun | **Aturdidora** | Aturdir |
| Torrent x | **Ráfaga x** | Torrente |

## 7. Terreno

| Inglés | Español (usar) |
|---|---|
| Light (terrain) | **terreno Ligero** |
| Heavy (terrain) | **terreno Pesado** |
| Vantage (terrain) | **terreno Aventajado** |
| Accessible (terrain) | **terreno Accesible** |
| Insignificant (terrain) | **terreno Insignificante** |
| Exposed (terrain) | **terreno Expuesto** |
| Wall (terrain) | **terreno Muro** |

## 8. Equipo universal

| Inglés | Español (usar) |
|---|---|
| Ammo cache | **Depósito de munición** |
| Razor wire | **Alambre de púas** |
| Comms device | **Aparato de comunicaciones** |
| Mines | **Minas** |
| Light barricades | **Barricadas ligeras** |
| Heavy barricade | **Barricada pesada** |
| Ladders | **Escaleras** |
| Portable barricade | **Barricada portátil** |
| Utility grenades | **Granadas especiales** |
| Explosive grenades | **Granadas explosivas** |
| Breaching charge | **Carga de demolición** |
| Frag / Krak grenade | **granada frag / granada perforante** |
| Smoke / Stun grenade | **granada de humo / granada aturdidora** |

## 9. Nombres de facciones

Nombre en inglés según [BattleKit](https://battlekit.killteam.ru/), nombre en español que muestra la web y palabra clave de facción que se usa en las tarjetas de datos.

| Grupo | Inglés | Español (web) | Palabra clave en las tarjetas | Clave interna |
|---|---|---|---|---|
| Imperio | Angels of Death | **Ángeles de la Muerte** | `ÁNGEL DE LA MUERTE` | `intercessors` |
| Imperio | Battleclade | **Clado de Batalla** | `CLADO DE BATALLA` | `battleclade` |
| Imperio | Celestian Insidiants | **Insidiadora Celeste** | `INSIDIADORA CELESTE` | `celestian-insidiants` |
| Imperio | Death Korps | **Korps de la Muerte** | `KORPS DE LA MUERTE` | `veteran-guardsmen` |
| Imperio | Deathwatch | **Vigías de la Muerte** | `VIGÍA DE LA MUERTE` | `deathwatch` |
| Imperio | Elucidian Starstrider | **Recorrestrellas Elucidianos** | `RECORRESTRELLAS ELUCIDIANO` | `elucidian-starstrider` |
| Imperio | Exaction Squad | **Escuadra de Exacción** | `ESCUADRA DE EXACCIÓN` | `exaction-squad` |
| Imperio | Hunter Clade | **Clado de Caza** | `CLADO DE CAZA` | `hunter-clade` |
| Imperio | Imperial Navy Breachers | **Abordadores de la Armada Imperial** | `ABORDADOR DE LA ARMADA IMPERIAL` | `imperial-navy-breachers` |
| Imperio | Inquisitorial Agents | **Operativos Inquisitoriales** | `OPERATIVO INQUISITORIAL` | `inquisitorial-agent` |
| Imperio | Kasrkin | **Kasrkin** | `KASRKIN` | `kasrkin` |
| Imperio | Novitiates | **Novicias** | `NOVICIA` | `novitiates` |
| Imperio | Phobos Strike Team | **Asaltantes Phobos** | `ASALTANTE PHOBOS` | `phobos` |
| Imperio | Ratling | **Rátido** | `RÁTIDO` | `ratling` |
| Imperio | Sanctifiers | **Santificadores** | `SANTIFICADOR` | `sanctifiers` |
| Imperio | Scout Squad | **Escuadra de Exploradores** | `ESCUADRA DE EXPLORADORES` | `scouts` |
| Imperio | Spectre Squad | **Escuadra Espectro** | `ESCUADRA ESPECTRO` | `spectre-squad` |
| Imperio | Strike Force Variel | **Fuerza de Ataque Variel** | `FUERZA DE ATAQUE VARIEL` | `strike-force-variel` |
| Imperio | Tempestus Aquilons | **Tempestus Aquilons** | `TEMPESTUS AQUILON` | `tempestus-aquilons` |
| Imperio | Wolf Scouts | **Exploradores Lobo** | `EXPLORADOR LOBO` | `wolf-scouts` |
| Caos | Blooded | **Ungidos** | `UNGIDO` | `blooded` |
| Caos | Chaos Cult | **Culto del Caos** | `CULTO DEL CAOS` | `chaos-cult` |
| Caos | Fellgor Ravagers | **Expoliagores Impíos** | `EXPOLIAGOR IMPÍO` | `fellgor-ravagers` |
| Caos | Gellerpox Infected | **Infectados Geller** | `INFECTADO GELLER` | `gellerpox` |
| Caos | Goremongers | **Siembrasangres** | `SIEMBRASANGRE` | `goremongers` |
| Caos | Legionary | **Legionarios** | `LEGIONARIO` | `legionary` |
| Caos | Murderwing | **Ala Asesina** | `ALA ASESINA` | `murderwing` |
| Caos | Nemesis Claw | **Garra Némesis** | `GARRA NÉMESIS` | `nemesis-claw` |
| Caos | Plague Marines | **Marines de Plaga** | `MARINE DE PLAGA` | `plague-marines` |
| Caos | Warpcoven | **Aquelarre Disforme** | `AQUELARRE DISFORME` | `warpcoven` |
| Xenos | Blades of Khaine | **Filos de Khaine** | `FILOS DE KHAINE` | `blades-of-khaine` |
| Xenos | Brood Brother | **Hermanos de Progenie** | `HERMANO DE PROGENIE` | `brood-brothers` |
| Xenos | Canoptek Circle | **Círculo Canóptico** | `CÍRCULO CANÓPTICO` | `canoptek` |
| Xenos | Corsair Voidscarred | **Corsarios del Vacío** | `CORSARIO DEL VACÍO` | `corsair-voidscarred` |
| Xenos | Exodite Dragon Master | **Señores Dragoneros Exoditas** | `SEÑOR DRAGONERO EXODITA` | `exodite-dragon-masters` |
| Xenos | Farstalker Kinband | **Bandaestirpe Acechante** | `BANDAESTIRPE ACECHANTE` | `farstalker-kinband` |
| Xenos | Hand of the Archon | **Mano del Arconte** | `MANO DEL ARCONTE` | `kabalite` |
| Xenos | Hearthkyn Salvager | **Sucesores Recuperadores** | `SUCESOR RECUPERADOR` | `hearthkyn-salvager` |
| Xenos | Hernkyn Yaegir | **Yaegirs Hernkyn** | `YAEGIR HERNKYN` | `yaegirs` |
| Xenos | Hierotek Circle | **Círculo de Hierotecnólogos** | `CÍRCULO DE HIEROTECNÓLOGOS` | `hierotek` |
| Xenos | Kommando | **Orkomandos** | `ORKOMANDO` | `kommandos` |
| Xenos | Mandrakes | **Mandrágoras** | `MANDRÁGORAS` | `mandrakes` |
| Xenos | Pathfinders | **Rastreadores T'au** | `RASTREADOR` | `pathfinders` |
| Xenos | Raveners | **Mantifex** | `MÁNTIFEX` | `raveners` |
| Xenos | Vespid Stingwing | **Aguijones Alados Véspid** | `AGUIJÓN ALADO VÉSPID` | `vespid-stingwings` |
| Xenos | Void Dancer Troupe | **Compañía de Bailarines del Vacío** | `COMPAÑÍA DE BAILARINES DEL VACÍO` | `void-dancer-troupe` |
| Xenos | Wrecka Krew | **Demoledorez** | `DEMOLEDOREZ` | `wrecka-krew` |
| Xenos | Wyrmblade | **FiloSierpe** | `FILOSIERPE` | `wyrmblade` |
| Xenos | XV26 Stealth Battlesuit | **Exoarmaduras XV26 Sigilo** | `EXOARMADURA XV26 SIGILO` | `xv26-battlesuits` |
