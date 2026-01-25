document.addEventListener('DOMContentLoaded', () => {
    console.log('rules.js loaded');

    const rulesData = {
        principles: [
            {
                title: 'Fase de Estrategia',
                content: `
                <div id="section-strategy" class="row basic-rules">
                    <div class="section">Fase de Estrategia</div>
                    <div class="col-12 intro">
                        <p>La fase de estrategia ocurre al comienzo de cada punto de inflexión y se resuelve en este orden: <b>1. Iniciativa</b> → <b>2. Preparar</b> → <b>3. Gambito</b>.</p>
                    </div>
                    <div class="col-12 strategy-rule">
                        <h3 id="strategy-title-2" class="rules-title mt-3"><i class="bi bi-1-circle-fill"></i> Iniciativa</h3>
                        <ul>
                            <li>El jugador con la iniciativa activa primero en el punto de inflexión y decide el orden de resolución para las reglas que ocurrirían al mismo tiempo.</li>
                            <li>En el primer punto de inflexión, quién tiene la iniciativa se determina por la secuencia de juego de tu paquete de misión.</li>
                            <li>En los puntos de inflexión subsiguientes, los jugadores hacen una tirada de desempate y el ganador decide quién tiene la iniciativa. Si la tirada es un empate, el jugador que no tenía la iniciativa en el punto de inflexión anterior decide quién tiene la iniciativa (esto tiene precedencia sobre las tiradas y empates).</li>
                        </ul>
                        <p><em>En algunos paquetes de misión también determinarás la iniciativa al preparar la batalla. El jugador con la iniciativa decide el orden de resolución para las reglas simultáneas que ocurren antes de que comience la batalla.</em></p>
                    </div>
                    <div class="col-12 strategy-rule">
                        <h3 id="strategy-title-3" class="rules-title mt-3"><i class="bi bi-2-circle-fill"></i> Preparar</h3>
                        <ul>
                            <li>Cada jugador gana 1 Punto de Mando (PM). En cada punto de inflexión después del primero, el jugador que no tiene la iniciativa gana 2PM en su lugar. Los jugadores conservan los PM hasta que los gastan.</li>
                            <li>Cada jugador prepara a todos los agentes amigos.</li>
                        </ul>
                        <p><em>Los PM son un recurso valioso utilizado para activar reglas adicionales llamadas ardides.</em></p>
                        <p><em>Una ficha de orden con el lado más claro hacia arriba muestra a un agente como preparado.</em></p>
                    </div>
                    <div class="col-12 strategy-rule">
                        <h3 id="strategy-title-4" class="rules-title mt-3"><i class="bi bi-3-circle-fill"></i> Gambito</h3>
                        <ul>
                            <li>Comenzando con el jugador que tiene la iniciativa, cada jugador alterna entre usar un <b>GAMBITO ESTRATÉGICO</b> o pasar.</li>
                            <li>Repite este proceso hasta que ambos jugadores hayan pasado en sucesión.</li>
                            <li>Los ardides estratégicos son el <b>GAMBITO ESTRATÉGICO</b> más común, pero cualquier regla etiquetada como <b>GAMBITO ESTRATÉGICO</b> puede ser utilizada. No puedes usar cada <b>GAMBITO ESTRATÉGICO</b> más de una vez por punto de inflexión.</li>
                        </ul>
                    </div>
                </div>`
            },
            {
                title: 'Fase de Tiroteo',
                content: `
                <div id="section-firefight" class="row basic-rules">
                    <div class="section">Fase de Tiroteo</div>
                    <div class="col-12 intro">
                        <p>El jugador que tiene la iniciativa activa a un agente amigo preparado. Una vez que esa activación termina, su oponente activa a uno de sus agentes amigos preparados. Los jugadores repiten este proceso, alternando activaciones hasta que todos los agentes de un jugador estén agotados, momento en el cual pueden <b>contraatacar</b> entre las activaciones restantes de su oponente. Una vez que todos los agentes están agotados, la Fase de Tiroteo termina.</p>
                    </div>
                    <div class="col-12 firefight-rule">
                        <h3 id="firefight-title-2" class="rules-title mt-3">Cuando se activa un agente amigo:</h3>
                        <div class="d-flex flex-column gap-2">
                            <div class="d-flex align-items-center justify-content-center flex-wrap gap-2">
                                <div class="border border-2 rounded px-3 py-2 fw-semibold">1. Determinar orden</div>
                                <div class="fs-4">→</div>
                                <div class="border border-2 rounded px-3 py-2 fw-semibold">2. Realizar acciones</div>
                            </div>
                            <p class="text-center my-1"><em>Repetir hasta que todos los agentes estén agotados</em></p>
                            <div class="d-flex align-items-center justify-content-center flex-wrap gap-2">
                                <div class="border border-2 rounded px-3 py-2 fw-semibold bg-light">El siguiente jugador activa</div>
                                <div class="fs-4">→</div>
                                <div class="border border-2 rounded px-3 py-2 fw-semibold">3. Agotado</div>
                            </div>
                            <p class="mt-2"><em>¿Están todos tus agentes agotados, pero no los de tu oponente? <b>Contraataca</b>.</em></p>
                        </div>
                    </div>
                    <div class="col-12 firefight-rule">
                        <h3 id="firefight-title-3" class="rules-title mt-3"><i class="bi bi-1-circle-fill"></i> Determinar orden</h3>
                        <ul>
                            <li>Selecciona la orden del agente (Trabarse u Ocultación). Mantiene esta orden hasta que sea activado nuevamente.</li>
                        </ul>
                        <p><b>Trabarse:</b> El agente puede realizar acciones de manera normal y puede contraatacar.</p>
                        <p><b>Ocultación:</b> El agente no puede realizar las acciones de <b>Disparar</b> o <b>Cargar</b>, y no puede contraatacar. Sin embargo, mientras esté en cobertura no es un Blanco Valido.</p>
                        <p><em>Dar a tus agentes la orden correcta es clave. A medida que juegues algunas partidas, obtendrás una mayor comprensión de cuándo usar una orden de Trabarse y cuándo usar una orden de Ocultación.</em></p>
                    </div>
                    <div class="col-12 firefight-rule">
                        <h3 id="firefight-title-4" class="rules-title mt-3"><i class="bi bi-2-circle-fill"></i> Realizar acciones</h3>
                        <ul>
                            <li>El agente realiza acciones. Mientras lo hace es el agente activo.</li>
                            <li>Cada acción cuesta Puntos de Acción (PA), y no puedes gastar más PA durante la activación de un agente que su Límite de Puntos de Acción (LPA). Además, un agente no puede realizar la misma acción más de una vez durante su activación; esto se llama <em>restricciones de acción</em>. Algunas reglas raras cambian el costo de las acciones: independientemente de cuántos cambios de PA afecten una acción, el mínimo es siempre 0PA. Este mínimo tiene precedencia sobre todos los cambios de PA.</li>
                            <li>No necesitas declarar todas las acciones del agente cuando se activa. En su lugar, realiza una acción y luego decide la siguiente después de ver el resultado.</li>
                            <li>Si una acción se declara o comienza pero no se puede completar, la acción se cancela. Revierte el estado del juego a antes de esa acción. Por ejemplo, si un agente se ha movido pero no puede completar el movimiento, devuélvelo a donde estaba antes de moverse; no ha realizado esa acción y no has gastado PA en ella.</li>
                        </ul>
                        <p><em>Ejemplo: un agente con LPA 2 podría <b>Reposicionarse</b> (1PA) y <b>Disparar</b> (1PA), totalizando 2PA; pero no podría <b>Retirarse</b> (2PA) y <b>Disparar</b> (1PA), lo que totaliza 3PA.</em></p>
                    </div>
                    <div class="col-12 firefight-rule">
                        <h3 id="firefight-title-5" class="rules-title mt-3"><i class="bi bi-3-circle-fill"></i> Agotado</h3>
                        <ul>
                            <li>Cuando terminas la activación de tu agente, ese agente está <b>agotado</b>. Mientras está agotado, un agente no está preparado.</li>
                        </ul>
                        <p><em>Una ficha de orden con el lado más oscuro hacia arriba muestra a un agente como agotado.</em></p>
                        <div class="border border-2 rounded p-3 mt-2">
                            <div class="fw-bold text-uppercase mb-1">Contraatacar</div>
                            <p>Cuando activarías a un agente amigo preparado, si todos tus agentes están agotados pero tu oponente todavía tiene agentes preparados, puedes seleccionar un agente amigo agotado con una orden de <b>Trabarse</b> para realizar una acción de 1PA <b>gratuita</b>. Cada agente solo puede contraatacar una vez por punto de inflexión, y no puede moverse más de 2" mientras contraataca (esto no es un cambio a su atributo de Movimiento y tiene precedencia sobre todas las demás reglas).</p>
                            <p>Contraatacar es opcional; puedes elegir no hacerlo. En cualquier caso, la activación se alterna de nuevo a tu oponente después.</p>
                            <p><em>Contraatacar no es una activación, es en lugar de activar. Esta diferencia es importante; por ejemplo, significa que las restricciones de acción no se aplicarán.</em></p>
                        </div>
                    </div>
                </div>`
            },
            {
                title: 'Hojas de Datos',
                content: `
                <div id="section-datacards" class="row basic-rules">
                    <div class="section">Hojas de Datos</div>
                    <div class="col-12 intro">
                        <p>Las hojas de datos contienen reglas específicas para cada agente, incluyendo estadísticas clave.</p>
                        <img src="./resources/game_rules_files/datacard-example.png" class="datacard-img img-fluid rounded" alt="Hoja de Datos">
                    </div>
                    <div class="col-12 datacards-rule">
                        <h3 id="datacards-title-2" class="rules-title mt-3"><i class="bi bi-1-circle-fill"></i> Tipo de Agente</h3>
                    </div>
                    <div class="col-12 datacards-rule">
                        <h3 id="datacards-title-3" class="rules-title mt-3"><i class="bi bi-2-circle-fill"></i> Estadísticas del Agente</h3>
                        <ul>
                            <li><i class="icon-apl"></i><b>LPA (Límite de Puntos de Acción):</b> El costo total de acciones que un agente puede realizar durante su activación, y una estadística utilizada para determinar el control de marcadores. Algunas reglas raras cambian el LPA de un agente. Independientemente de por cuántos cambios de estadística de LPA se vea afectado un agente, el total nunca puede ser más de -1 o +1 de su LPA normal. Esto tiene precedencia sobre todos los cambios de estadísticas.<p><em>Si un agente tiene un LPA de 2, y dos reglas dicen sumar 1 al LPA del agente, tendría un LPA de 3.</em></p>
                            </li>
                            <li><i class="icon-move"></i><b>Mover:</b> La distancia de movimiento del agente, utilizada al realizar las acciones de <b>Reposicionarse</b>, <b>Retirarse</b> y <b>Cargar</b>. El atributo de Movimiento de un agente nunca puede cambiarse a menos de 4”. Esto tiene precedencia sobre todos los cambios de estadísticas.<p><em>Si las estadísticas de un agente cambian durante una acción, aplica el cambio una vez que la acción se haya completado.</em></p>
                            </li>
                            <li><i class="icon-move"></i><b>Salvación:</b> El resultado requerido para dados de defensa exitosos siempre que otro agente esté disparando al agente.<p><em>Ten en cuenta que un número más alto en la estadística de Impacto y Salvación es peor porque tu probabilidad de obtener un éxito disminuye. Esto es importante si una regla requiere que mejores o empeores dicha estadística. Por ejemplo, una estadística de Impacto de 4+ empeorada en 1 es 5+.</em></p>
                            </li>
                            <li><i class="icon-wounds"></i><b>Heridas:</b> El número inicial de heridas del agente, que se reduce a medida que se le inflige daño.</li>
                        </ul>
                    </div>
                    <div class="col-12 datacards-rule">
                        <h3 id="datacards-title-4" class="rules-title mt-3"><i class="bi bi-3-circle-fill"></i> Estadísticas de Armas</h3>
                        <ul>
                            <li>Las páginas de selección de kill team en las reglas de tu kill team especifican qué armas tiene un agente. Si no lo especifica, un agente tiene todas las armas en su hoja de datos.</li>
                            <li><i class="icon-shoot"></i><i class="icon-attack"></i> - <b>Tipo de arma:</b> <i class="icon-shoot"></i> son armas a distancia para cuando un agente está disparando, <i class="icon-attack"></i> son armas cuerpo a cuerpo para cuando un agente está combatiendo o tomando represalias.</li>
                            <li><b>Atq:</b> El número de dados de ataque a tirar siempre que un agente usa esta arma.</li>
                            <li><b>Imp:</b> El resultado requerido para dados de ataque exitosos siempre que un agente usa esta arma.</li>
                            <li><b>Dñ:</b> El daño que cada dado de ataque inflige con esta arma. El primer valor es su estadística de Daño Normal (daño de un éxito normal), el segundo valor es su estadística de Daño Crítico (daño de un éxito crítico).</li>
                            <li>A veces, diferentes armas tendrán el mismo nombre primario pero diferentes nombres secundarios, representados entre paréntesis, p. ej., “rifle de plasma (estándar)” y “rifle de plasma (sobrecarga)”. Estos son efectivamente perfiles separados de la misma arma, pero usados como armas diferentes. Si una regla se refiere solo al nombre primario, incluye todas las armas con ese nombre primario.</li>
                        </ul>
                    </div>
                    <div class="col-12 datacards-rule">
                        <h3 id="datacards-title-5" class="rules-title mt-3"><i class="bi bi-5-circle-fill"></i> Reglas Adicionales</h3>
                        <ul>
                            <li>Reglas adicionales que tiene el agente.</li>
                            <li>Acciones únicas que pueden ser realizadas por el agente. Las acciones se explican <a href="#" class="goToTabAndSection" data-tab="actions-tab">aquí</a>.</li>
                        </ul>
                    </div>
                    <div class="col-12 datacards-rule">
                        <h3 id="datacards-title-6" class="rules-title mt-3"><i class="bi bi-6-circle-fill"></i> Claves</h3>
                        <ul>
                            <li>Utilizadas para identificar al agente para las reglas – algunas reglas solo afectarán a agentes con las claves relevantes.</li>
                            <li>Mostradas en fuente <b>CLAVE NEGRITA</b>.</li>
                            <li>Las claves en naranja con un símbolo de calavera, p. ej. <span class="faction">TEMPESTUS AQUILON</span>, son claves de facción – utilizadas para identificar a todos los agentes de ese kill team.</li>
                        </ul>
                    </div>
                    <div class="col-12 datacards-rule">
                        <h3 id="datacards-title-7" class="rules-title mt-3"><i class="bi bi-7-circle-fill"></i> Peanas</h3>
                        <p>Tamaño de peanas en mm.</p>
                    </div>
                </div>`
            },
            {
                title: 'Principios Clave',
                content: `
                <div id="section-principles" class="row basic-rules">
                    <div class="section">Principios Clave</div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-1" class="rules-title mt-3">Peanas</h3>
                        <p class="intro">Todos los agentes están en peanas. La peana es una parte importante de la miniatura para propósitos de reglas, en particular medir distancias. El tamaño de la peana de cada agente se especifica en su hoja de datos. Los lados de diferentes peanas pueden tocarse, pero una peana no puede colocarse sobre otra. Los agentes amigos pueden moverse a través de otros agentes amigos (la peana y la miniatura), pero no a través de agentes enemigos. Las peanas no pueden moverse a través de terreno, o estar sobre el borde de la killzone.</p>
                        <p><em>A medida que juegues tus primeras partidas, obtendrás un mejor contexto para aplicar los principios clave, y podrás simplemente consultarlos cuando sea necesario.</em></p>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-2" class="rules-title mt-3">Rango de Control</h3>
                        <p class="intro">Muchas reglas se relacionan con el rango de control, como mover, combatir y usar cobertura. Algo está dentro del rango de control de un agente si es visible para y está a menos de 1" de ese agente.</p>
                        <p>El rango de control entre agentes es mutuo, por lo tanto, los agentes están dentro del rango de control del otro si uno de ellos es visible para y está a menos de 1" del otro.</p>
                        <p><em>Imagina el rango de control como un área de interacción que el agente tiene con cosas cercanas a él.</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/control-range-1.png" class="figure-img img-fluid rounded" alt="Ejemplo de Rango de Control">
                                    <p>Los agentes A y B están dentro del rango de control del otro.</p>
                                    <p>El terreno está dentro del rango de control de ambos agentes B y C.</p>
                                    <p>Debido al terreno, el agente B no es visible para el agente C, y viceversa, por lo tanto, no están dentro del rango de control del otro.</p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-3" class="rules-title mt-3">Cobertura</h3>
                        <p class="intro">La cobertura se determina de un agente a otro, generalmente cuando uno de ellos está disparando. Un agente está en cobertura si hay terreno interpuesto dentro de su rango de control. Sin embargo, no puede estar en cobertura si está a menos de 2" del otro agente. Interpuesto se explica <a href="#" class="goToSection" data-target="#principles-title-8">aquí</a>.</p>
                        <p><em>Un agente en cobertura con una orden de Ocultación no es un Blanco Valido. Un agente en cobertura con una orden de Trabarse es un Blanco Valido, pero tiene una salvación por cobertura (ver la acción <b>Disparar</b> <a href="#" class="goToTabAndSection" data-tab="actions-tab" data-target="#shoot-action">aquí</a>).</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/cover-example-1.png" class="figure-img img-fluid rounded" alt="Ejemplo de Cobertura">Hay terreno interpuesto dentro del rango de control del agente A, por lo tanto, está en cobertura.</figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/cover-example-2.png" class="figure-img img-fluid rounded" alt="Ejemplo de Cobertura">Hay terreno interpuesto, pero no está dentro del rango de control del agente A, por lo tanto, no está en cobertura.</figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/cover-example-3.png" class="figure-img img-fluid rounded" alt="Ejemplo de Cobertura">Hay terreno dentro del rango de control del agente A, pero el terreno no está interpuesto, por lo tanto, no está en cobertura.</figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/cover-example-4.png" class="figure-img img-fluid rounded" alt="Ejemplo de Cobertura">Hay terreno interpuesto dentro del rango de control del agente A, pero el agente B está a menos de 2" del agente A, por lo tanto, no está en cobertura.</figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-4" class="rules-title mt-3">Daño</h3>
                        <p class="intro">Cuando se inflige daño a un agente, reduce sus heridas en esa cantidad. El número inicial de heridas de un agente está determinado por su atributo de Heridas (<a href="#" class="goToSection" data-target="#section-datacards">ver hojas de datos</a>). Si las heridas de un agente se reducen a 0 o menos, queda incapacitado, y luego es retirado de la killzone.</p>
                        <p>Mientras a un agente le queden menos de sus heridas iniciales, está herido. Mientras le queden menos de la mitad de sus heridas iniciales, también está lesionado. Resta 2" del atributo de Movimiento de los agentes lesionados y empeora el atributo de Impacto de sus armas en 1.</p>
                        <p><em>Lleva la cuenta de las heridas restantes de cada agente con dados, fichas o escribiéndolo.</em></p>
                        <p><em>‘Incapacitado’ y ‘retirado de la killzone’ son cosas separadas. Algunas reglas surten efecto cuando un agente es incapacitado, pero antes de que sea retirado.</em></p>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-5" class="rules-title mt-3">Hojas de Datos</h3>
                        <p class="intro">Las hojas de datos contienen reglas específicas para cada agente, incluyendo estadísticas clave.</p>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-6" class="rules-title mt-3">Dados (D6, D3)</h3>
                        <p class="intro">Usa dados de 6 caras para determinar el resultado de varias reglas. Esto a menudo requerirá x+, donde x es el resultado más bajo posible, p. ej., 3+. A veces se requerirá un resultado dentro de un rango, p. ej., 1-3. Algunas reglas raras requieren que tires un D3. Para hacerlo, tira un D6 y divide el resultado a la mitad (redondeando hacia arriba). Algunas requieren xD6 o xD3 (p. ej., 2D6 o 3D3). Tira x número de dados y suma los resultados. Algunas requieren D6+x o D3+x (p. ej., D6+2 o D3+3).</p>
                        <p>Algunas reglas te permiten volver a tirar una tirada de dados. Nunca puedes volver a tirar una tirada de dados más de una vez, y no puedes seleccionar el resultado original, incluso si el nuevo resultado es peor. Si es un dado de ataque o defensa, vuelves a tirar antes de que sea retenido o descartado. Si puedes volver a tirar múltiples dados diferentes, puedes hacerlo en cualquier orden, incluyendo ver el resultado de una nueva tirada antes de decidir sobre la siguiente. Si múltiples jugadores pueden volver a tirar dados al mismo tiempo (p. ej., durante una acción de <b>Combatir</b>), alternan entre volver a tirar un dado o pasar hasta que ambos pasen en sucesión, comenzando con el jugador con la iniciativa (esto tiene precedencia sobre la iniciativa y las reglas que ocurrirían al mismo tiempo).</p>
                        <p><em>Por ejemplo, si se requiere un 4+, un resultado de dado de 4, 5 o 6 cumple con esto, y si se requiere un 1-4, un resultado de dado de 1, 2, 3 o 4 cumple con esto.</em></p>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-7" class="rules-title mt-3">Distancias</h3>
                        <p class="intro">Varias reglas tienen un requisito de distancia en pulgadas. Al medir hacia y desde algo, hazlo desde la parte más cercana del mismo. Para un agente, hazlo desde su peana, ignorando todas las partes de su miniatura. Al medir hacia y desde un área de la killzone, mide solo la distancia horizontal (en otras palabras, mira desde arriba para ignorar la distancia vertical).</p>
                        <p>Si una regla requiere que algo esté ‘a’ una distancia (within), el requisito se cumple si cualquier parte de ello está a esa distancia o menos. Si una regla requiere que algo esté ‘totalmente a’ una distancia (wholly within), el requisito se cumple si cada parte de ello está a esa distancia o menos. Un agente siempre está a y totalmente a la distancia requerida de sí mismo y de un marcador que está llevando. Si un agente lleva un marcador, ese marcador está a la misma distancia que ese agente.</p>
                        <p><em>Los agentes a cierta distancia de un agente que lleva un marcador también están a la misma distancia de ese marcador.</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/distances-example-1.png" class="figure-img img-fluid rounded" alt="Ejemplo de Distancia">Ejemplo de medición de distancia: El agente B está a 2" del agente A. El marcador de objetivo está a 2" del agente A. El agente C está totalmente a 2" del agente A.</figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-8" class="rules-title mt-3">Equipamiento</h3>
                        <p class="intro">El equipamiento son reglas adicionales que puedes seleccionar antes de la batalla, según se especifique en tu secuencia de juego (<a href="#" class="goToTabAndSection" data-tab="gequipment-tab">ver equipamiento</a>). El equipamiento universal se puede seleccionar para cualquier kill team mientras que el equipamiento de facción es específico. Cada jugador no puede seleccionar cada opción de equipamiento más de una vez por juego.</p>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-9" class="rules-title mt-3">Interpuesto</h3>
                        <p class="intro">Reglas como cobertura y ofuscado requieren que determines si algo está interpuesto, p. ej., terreno. La mayoría de las veces esto se determina fácilmente: si está entre el agente y el objetivo previsto, está interpuesto. A veces esto no estará claro, por lo que usamos líneas de visión.</p>
                        <p>Para usar líneas de visión, el jugador del agente traza líneas rectas imaginarias de 1mm de diámetro desde cualquier punto de su peana hasta cada parte visible de la peana del objetivo previsto. Cualquier cosa que cruce al menos una de estas líneas está interpuesta. Cualquier cosa que crucen todas estas líneas está totalmente interpuesta.</p>
                        <p><em>El jugador del agente decide desde qué punto de la peana se trazan las líneas de visión. Esto puede permitir que el agente obtenga un ángulo de visión más favorable: imagina al agente inclinándose hacia la derecha o hacia la izquierda según sea apropiado.</em></p>
                        <p><em>Lo interpuesto generalmente se determina de un agente a otro, pero algunas reglas raras requerirán que lo determines desde otras cosas como marcadores. En tales casos, trata todas las partes de esa cosa como la ‘peana’ al determinar esto.</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/intervening-example-1.png" class="figure-img img-fluid rounded" alt="Ejemplo de Interpuesto">Las líneas de visión cruzan terreno, por lo tanto, está interpuesto.</figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/intervening-example-2.png" class="figure-img img-fluid rounded" alt="Ejemplo de Interpuesto">Debido a dónde el jugador del agente A ha decidido trazar las líneas de visión, el terreno no está interpuesto.</figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/intervening-example-3.png" class="figure-img img-fluid rounded" alt="Ejemplo de Interpuesto">
                                    <p>Más comúnmente, las líneas de visión se pueden trazar de una manera bidimensional (vista superior) para mayor facilidad. Sin embargo, si hay una diferencia de altura entre los agentes (p. ej., uno de ellos está en terreno de Ventaja), las líneas de visión deben trazarse de una manera tridimensional.</p>
                                    <p>Ninguna de estas líneas de visión cruza el elemento de terreno A, por lo tanto, no está interpuesto.</p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-10" class="rules-title mt-3">Claves</h3>
                        <p class="intro">Las claves son un método de identificación para ciertas reglas. Usarás más comúnmente claves con agentes (<a href="#" class="goToSection" data-target="#principles-title-4">ver hojas de datos</a>) – algunas reglas solo afectarán a agentes con las claves relevantes.</p>
                        <p>Algunas reglas raras también tienen claves, p. ej., <b>APOYO</b> o <b>GAMBITO ESTRATÉGICO</b>. Estas claves no significan nada por sí solas, pero otras reglas interactúan con ellas. Las claves se muestran en fuente <b>CLAVE NEGRITA</b>. Aquellas en naranja con un símbolo de calavera, p. ej., <span class="faction">TEMPESTUS AQUILON</span>, son claves de facción – utilizadas para identificar a todos los agentes/reglas de ese kill team.</p>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-12" class="rules-title mt-3">Marcadores</h3>
                        <p class="intro">Los marcadores se colocan en ubicaciones precisas (esta debe ser una ubicación en la que puedan colocarse) e impactan el juego y a los agentes a su alrededor. Se pueden colocar debajo de los agentes (retira temporalmente a los agentes para hacerlo), y los agentes se pueden colocar sobre ellos. Los marcadores de objetivo tienen 40mm de diámetro. Todos los demás marcadores tienen 20mm de diámetro. Algunos marcadores se conocen como marcadores de misión. Esto no significa nada por sí solo, pero otras reglas interactúan con ello.</p>
                        <p>Los agentes disputan marcadores dentro de su rango de control. Los agentes amigos controlan un marcador si el LPA total de los que lo disputan es mayor que el de los agentes enemigos, pero el control no puede cambiar durante una acción. Mientras un agente lleva un marcador (ver <b>Recoger Marcador</b> <a href="#" class="goToTabAndSection" data-tab="actions-tab" data-target="#pick-up-marker-action">aquí</a>), disputa y controla ese marcador, y es el único agente que puede hacerlo.</p>
                        <p><em>Los marcadores de objetivo son el marcador más común, representando ubicaciones vitales en la killzone. Controlarlos a menudo es necesario para lograr la victoria.</em></p>
                        <p><em>Está bien usar una miniatura para representar un marcador, pero ten un marcador normal disponible si crea problemas de reglas (p. ej., es demasiado grande).</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/markers-example-1.png" class="figure-img img-fluid rounded" alt="Ejemplo de Marcadores">Ejemplo de marcadores en juego. Solo tres agentes disputan el marcador de objetivo, ya que no está dentro del rango de control del agente naranja a la izquierda (el elemento de terreno impide que sea visible). El LPA total de los agentes naranjas que disputan el marcador de objetivo es 2. El LPA total de los agentes blancos que lo disputan es 4, así que ellos lo controlan.</figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-13" class="rules-title mt-3">Ofuscado</h3>
                        <p class="intro">Ofuscado se determina de un agente a otro, generalmente cuando uno de ellos está disparando. Un agente está Ofuscado si hay terreno Pesado interpuesto que está a más de 1” de ambos agentes. Sin embargo, no puede ser Ofuscado por terreno Pesado interpuesto que esté a menos de 1” de cualquiera de los agentes. Interpuesto se explica <a href="#" class="goToSection" data-target="#principles-title-8">aquí</a>.</p>
                        <p>Cuando un agente está disparando, si el agente objetivo está Ofuscado:</p>
                        <ul>
                            <li>El atacante debe descartar un éxito de su elección en lugar de retenerlo.</li>
                            <li>Todos los éxitos críticos del atacante se retienen como éxitos normales y no pueden cambiarse a éxitos críticos (esto tiene precedencia sobre todas las demás reglas).</li>
                        </ul>
                        <p><em>Ofuscado es cuando un agente es un Blanco Valido, pero los obstáculos interpuestos (generalmente terreno) lo convierten en un objetivo menos eficiente. Imagina al agente teniendo que apuntar al enemigo a través de una ruina o una ventana distante.</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/obscured-example-1.png" class="figure-img img-fluid rounded" alt="Ejemplo de Ofuscado">El agente B es visible para el agente A a través de una ventana. Sin embargo, hay terreno Pesado interpuesto a más de 1” de ambos agentes, por lo tanto, el agente B está Ofuscado.</figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/obscured-example-2.png" class="figure-img img-fluid rounded" alt="Ejemplo de Ofuscado">Hay terreno Pesado interpuesto, pero está a menos de 1” de A, por lo tanto, el agente B no está Ofuscado.</figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/obscured-example-3.png" class="figure-img img-fluid rounded" alt="Ejemplo de Ofuscado">Hay terreno Pesado interpuesto. Aunque partes de él están a menos de 1” de los agentes, parte de él no lo está, por lo tanto, el agente B está Ofuscado.<p><em>En otras palabras, que un agente esté a menos de 1" de un elemento de terreno no evita que todo el elemento de terreno sea obstruyente, solo la parte a menos de 1" del agente.</em></p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-14" class="rules-title mt-3">Agentes</h3>
                        <p class="intro">Los agentes son las miniaturas Citadel utilizadas en el juego. Tus agentes son agentes amigos, y los agentes de tu oponente son agentes enemigos.</p>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-15" class="rules-title mt-3">Órdenes</h3>
                        <div class="row">
                            <div class="col-2"><img src="./resources/game_rules_files/order-engage.png" class="figure-img img-fluid rounded" alt="Orden"></div>
                            <div class="col-10">Trabarse: El agente puede realizar acciones de manera normal y puede contraatacar.</div>
                        </div>
                        <div class="row">
                            <div class="col-2"><img src="./resources/game_rules_files/order-conceal.png" class="figure-img img-fluid rounded" alt="Orden"></div>
                            <div class="col-10">Ocultación: El agente no puede realizar las acciones de <b>Disparar</b> y <b>Cargar</b>, y no puede <a href="#" class="goToTabAndSection" data-tab="actions-tab" data-target="#counteract-action">contraatacar</a>. Sin embargo, no es un Blanco Valido mientras está en cobertura.</div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <p>A los agentes se les da una orden de Ocultación cuando se despliegan antes de la batalla. Puedes cambiar la orden de un agente siempre que se active.</p>
                                <p>Las fichas de orden tienen dos lados. El lado más claro muestra que un agente está preparado (puede ser activado en la Fase de Tiroteo) y el lado más oscuro muestra que un agente está agotado (ha sido activado en la Fase de Tiroteo).</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-16" class="rules-title mt-3">Ardides</h3>
                        <p class="intro">Los jugadores pueden gastar PM en ardides para ganar bonificaciones de reglas en el momento oportuno. A menos que se especifique lo contrario, todos los ardides cuestan 1PM. Hay dos tipos de ardides:</p>
                        <ul>
                            <li>Cada ardid estratégico es un <b>GAMBITO ESTRATÉGICO</b> (usado en el paso de Gambito de la Fase de Estrategia). Algunos aplican reglas que se resuelven “inmediatamente”; de lo contrario, aplican reglas que duran hasta el final del punto de inflexión.</li>
                            <li>Los ardides de tiroteo se usan en la Fase de Tiroteo y aplican reglas según especifique el ardid.</li>
                        </ul>
                        <p>Todos los jugadores tienen acceso al ardid de tiroteo Repetición de Mando a continuación y a los ardides en las reglas de su kill team. Aparte de Repetición de Mando, cada jugador no puede usar cada ardid más de una vez por punto de inflexión.</p>
                        <div class="tacop card infiltration" data-type="tactical">
                            <div class="archetype ploys position-relative d-flex justify-content-between"><span class="ploy-name">Repetición de Mando</span><span class="ploy-cps">1PM</span></div>
                            <div class="middle">
                                <div class="description py-2">Usa este ardid de tiroteo después de tirar tus dados de ataque o defensa. Puedes volver a tirar uno de esos dados.</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-17" class="rules-title mt-3">Precedencia</h3>
                        <p class="intro">Algunas reglas raras entrarán en conflicto entre sí, por lo que debe establecerse cuál tiene precedencia. En orden de prioridad, una regla tiene precedencia si:</p>
                        <ol>
                            <li>Específicamente lo dice.</li>
                            <li>El comentario del diseñador en línea lo dice.</li>
                            <li>No se encuentra en el libro básico (es decir, otras reglas tienen precedencia sobre las reglas del libro básico).</li>
                            <li>Dice "no puede".</li>
                            <li>El jugador con la iniciativa decide.</li>
                        </ol>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-18" class="rules-title mt-3">Tirada de Desempate</h3>
                        <p class="intro">Si una regla requiere una tirada de desempate, ambos jugadores tiran un D6 y quien tenga el resultado más alto gana el desempate. Si hay un empate, vuelven a tirar.</p>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-19" class="rules-title mt-3">Fichas</h3>
                        <p class="intro">Las fichas se usan para ayudarte a llevar la cuenta de los efectos de las reglas. A menudo se colocan junto al agente relevante, pero se pueden mover para hacer espacio para otros agentes y marcadores según sea necesario. Se retiran cuando el efecto de regla rastreado termina.</p>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-20" class="rules-title mt-3">Blanco Valido</h3>
                        <p class="intro">Algunas reglas requieren que selecciones un Blanco Valido para un agente. Esto es más común cuando un agente está disparando, pero algunas reglas raras también lo requieren. Si el objetivo previsto tiene una orden de Trabarse, es un Blanco Valido si es visible para el agente. Si el objetivo previsto tiene una orden de Ocultación, es un Blanco Valido si es visible para el agente y no está en cobertura.</p>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-21" class="rules-title mt-3">Visible</h3>
                        <p class="intro">Para que algo sea visible, el agente debe poder verlo. Para comprobar la visibilidad, mira desde detrás del agente y determina si puedes trazar una línea recta sin obstrucciones de 1mm de diámetro desde su cabeza hasta cualquier parte de lo que está tratando de ver. Ignora las peanas de los agentes al determinar esto. Un agente siempre es visible para sí mismo. El agente enemigo es visible en ambas imágenes a continuación, incluso cuando está parcialmente detrás de la ruina cercana.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/visible-example-1.png" class="figure-img img-fluid rounded" alt="Ejemplo de Visible">Ejemplo de visibilidad total.</figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/visible-example-2.png" class="figure-img img-fluid rounded" alt="Ejemplo de Visible">Ejemplo de visibilidad parcial.</figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 principles-rule">
                        <h3 id="principles-title-22" class="rules-title mt-3">Suelo de la Killzone</h3>
                        <p class="intro">El suelo de la killzone es el nivel más bajo de la killzone (es decir, el tablero de juego). Cualquier cosa que esté sobre un marcador que esté en el suelo de la killzone también está en el suelo de la killzone.</p>
                    </div>
                </div>`
            }
        ],
        actions: [
            {
                title: 'Acciones Universales',
                content: `
                <div id="section-actions" class="row basic-rules">
                    <div class="section">Acciones Universales</div>
                    <div class="col-12 intro">
                        <p>Las acciones tienen efectos (<span class="icon-yes icon-inline"></span>) y condiciones (<span class="icon-no icon-inline"></span>). <span class="icon-no icon-inline"></span> son condiciones que deben cumplirse para que el agente realice esa acción, mientras que <span class="icon-yes icon-inline"></span> son efectos cuando un agente está realizando esa acción, incluyendo cualquier requisito al hacerlo. Hay cuatro tipos diferentes de acciones: universales, únicas, de misión y gratuitas.</p>
                        <ul>
                            <li><b>Acciones universales</b> son las acciones más comunes que usarás y pueden ser realizadas por todos los agentes a menos que se especifique lo contrario. Las principales acciones universales se pueden encontrar a continuación.</li>
                            <li><b>Acciones únicas</b> son acciones más raras en las reglas de tu kill team. Solo agentes específicos pueden realizarlas.</li>
                            <li><b>Acciones de misión</b> son específicas para la misión o killzone que estás jugando. Si hay alguna, estará en tu paquete de misión, reglas de killzone o el equipamiento que has seleccionado.</li>
                            <li><b>Acciones gratuitas</b> solo pueden ser realizadas cuando otra regla lo especifica, y se aplican las siguientes reglas:
                                <ul>
                                    <li>Las condiciones de la acción deben cumplirse.</li>
                                    <li>No le cuesta al agente ningún PA adicional realizar la acción.</li>
                                    <li>El agente aún contaría como realizando la acción para todos los demás propósitos de reglas. Por ejemplo, si realizó la acción durante su activación, no podría realizarla nuevamente durante esa activación.</li>
                                </ul>
                            </li>
                        </ul>
                        <p><em>Si un agente realiza una acción gratuita fuera de su activación, no le impide realizar esa acción durante su activación, o viceversa.</em></p>
                    </div>
                    <div class="col-xs-12 basic-rules">
                        <h3 id="reposition-action" class="rules-title mt-3">Reposicionarse</h3>
                        <div class="crit-op border border-0" data-type="action">
                            <div class="middle">
                                <div class="header">
                                    <div class="name-action">Reposicionarse</div>
                                    <div class="ap-box">1PA</div>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li><span class="icon-yes"></span> Mueve al agente activo hasta su atributo de Movimiento a una ubicación donde pueda ser colocado. Esto debe hacerse en uno o más incrementos en línea recta, y los incrementos siempre se redondean hacia arriba a la pulgada más cercana.</li>
                                        <li><span class="icon-no"></span> No puede moverse dentro del rango de control de un agente enemigo, a menos que uno o más agentes amigos ya estén dentro del rango de control de ese agente enemigo, en cuyo caso puede moverse dentro del rango de control de ese agente enemigo pero no puede terminar el movimiento allí.</li>
                                        <li><span class="icon-no"></span> Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, o durante la misma activación en la que realizó la acción de <b>Retirarse</b> o <b>Cargar</b>.</li>
                                    </ul>
                                    <p><em>Moverse en incrementos permite una mayor precisión y claridad.</em></p>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-12 col-md-6">
                                        <figure class="figure"><img src="./resources/game_rules_files/reposition-example-1.png" class="figure-img img-fluid rounded" alt="Terreno Pesado">El agente tiene un atributo de Movimiento de 6”. Primero se mueve en un incremento de línea recta de 2” para despejar la esquina de un muro. Luego se mueve en un incremento de línea recta de 4” — la distancia restante que puede moverse sin exceder su atributo de Movimiento.
                                            <p><em>Estos movimientos se realizan en incrementos de línea recta, en lugar de curvarse alrededor de la esquina.</em></p>
                                        </figure>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <figure class="figure"><img src="./resources/game_rules_files/reposition-example-2.png" class="figure-img img-fluid rounded" alt="Terreno Pesado">El agente primero se mueve en un incremento de línea recta de 0.5” para despejar la esquina de un muro, pero como los incrementos se redondean hacia arriba, esto se trata como 1”. Luego se mueve en un incremento de línea recta de 2.75”, pero nuevamente, esto se redondea a 3”. Se ha movido 4” en total.</figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 basic-rules">
                        <h3 id="dash-action" class="rules-title mt-3">Carrera</h3>
                        <div class="crit-op border border-0" data-type="action">
                            <div class="middle">
                                <div class="header">
                                    <div class="name-action">Correr</div>
                                    <div class="ap-box">1PA</div>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li><span class="icon-yes"></span> Lo mismo que la acción <b>Reposicionarse</b>, excepto que no uses el atributo de Movimiento del agente activo – puede moverse hasta 3” en su lugar. Además, no puede escalar durante este movimiento, pero puede dejarse caer y saltar.</li>
                                        <li><span class="icon-no"></span> Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, o durante la misma activación en la que realizó la acción de <b>Cargar</b>.</li>
                                    </ul>
                                    <p><em>Dado que los agentes no pueden realizar la misma acción más de una vez en su activación, las acciones de Carrera son la forma en que los agentes pueden moverse una mayor distancia.</em></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 basic-rules">
                        <h3 id="fall-back-action" class="rules-title mt-3">Retirarse</h3>
                        <div class="crit-op border border-0" data-type="action">
                            <div class="middle">
                                <div class="header">
                                    <div class="name-action">Retirarse</div>
                                    <div class="ap-box">2PA</div>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li><span class="icon-yes"></span> Lo mismo que la acción <b>Reposicionarse</b>, excepto que el agente activo puede moverse dentro del rango de control de un agente enemigo, pero no puede terminar el movimiento allí.</li>
                                        <li><span class="icon-no"></span> Un agente no puede realizar esta acción a menos que un agente enemigo esté dentro de su rango de control. No puede realizar esta acción durante la misma activación en la que realizó la acción de <b>Reposicionarse</b> o <b>Cargar</b>.</li>
                                    </ul>
                                    <p><em>Si un agente se activa dentro del rango de control de un agente enemigo, la acción de Retirarse es una forma de replegarse. Cuesta 2PA, por lo que la mayoría de los agentes no podrán realizar más acciones en esa activación.</em></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 basic-rules">
                        <h3 id="charge-action" class="rules-title mt-3">Cargar</h3>
                        <div class="crit-op border border-0" data-type="action">
                            <div class="middle">
                                <div class="header">
                                    <div class="name-action">Cargar</div>
                                    <div class="ap-box">1PA</div>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li><span class="icon-yes"></span> Lo mismo que la acción <b>Reposicionarse</b>, excepto que el agente activo puede moverse 2” adicionales.</li>
                                        <li><span class="icon-yes"></span> Puede moverse, y debe terminar el movimiento, dentro del rango de control de un agente enemigo. Si se mueve dentro del rango de control de un agente enemigo del que no hay otros agentes amigos dentro del rango de control, no puede salir del rango de control de ese agente.</li>
                                        <li><span class="icon-no"></span> Un agente no puede realizar esta acción mientras tiene una orden de Ocultación, si ya está dentro del rango de control de un agente enemigo, o durante la misma activación en la que realizó la acción de <b>Reposicionarse</b>, <b>Correr</b> o <b>Retirarse</b>.</li>
                                    </ul>
                                    <p><em>Las acciones de carga permiten a los agentes inmovilizar efectivamente a los enemigos, pero dado que necesitan estar en una orden de trabarse para hacerlo, pueden volverse vulnerables a los disparos enemigos.</em></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 basic-rules">
                        <h3 id="pick-up-marker-action" class="rules-title mt-3">Recoger Marcador</h3>
                        <div class="crit-op border border-0" data-type="action">
                            <div class="middle">
                                <div class="header">
                                    <div class="name-action">Recoger Marcador</div>
                                    <div class="ap-box">1PA</div>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li><span class="icon-yes"></span> Retira un marcador que el agente activo controla sobre el cual se pueda realizar la acción <b>Recoger Marcador</b>. Ese agente ahora lleva, disputa y controla ese marcador.</li>
                                        <li><span class="icon-no"></span> Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, o mientras ya esté llevando un marcador.</li>
                                    </ul>
                                    <p><em>Si la acción <b>Recoger Marcador</b> se puede realizar sobre un marcador, se especificará en otro lugar, como en tu paquete de misión.</em></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 basic-rules">
                        <h3 id="place-marker-action" class="rules-title mt-3">Colocar Marcador</h3>
                        <div class="crit-op border border-0" data-type="action">
                            <div class="middle">
                                <div class="header">
                                    <div class="name-action">Colocar Marcador</div>
                                    <div class="ap-box">1PA</div>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li><span class="icon-yes"></span> Coloca un marcador que el agente activo esté llevando dentro de su rango de control.</li>
                                        <li><span class="icon-yes"></span> Si un agente que lleva un marcador queda incapacitado (ver daño en pág. 47), debe realizar esta acción antes de ser retirado de la killzone, pero lo hace por 0PA. Esto tiene precedencia sobre todas las reglas que le impidan hacerlo.</li>
                                        <li><span class="icon-no"></span> Un agente no puede realizar esta acción durante la misma activación en la que ya realizó la acción <b>Recoger Marcador</b> (a menos que sea incapacitado).</li>
                                    </ul>
                                    <p><em>De manera similar, si hay algún marcador llevado por el agente, se especificará en otro lugar.</em></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 basic-rules">
                        <h3 id="shoot-action" class="rules-title mt-3">Disparar</h3>
                        <div class="crit-op border border-0" data-type="action">
                            <div class="middle">
                                <div class="header">
                                    <div class="name-action">Disparar</div>
                                    <div class="ap-box">1PA</div>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li><span class="icon-yes"></span> Dispara con el agente activo siguiendo la secuencia a continuación. El jugador del agente activo es el atacante. El jugador del agente enemigo seleccionado es el defensor.</li>
                                        <li><span class="icon-no"></span> Un agente no puede realizar esta acción mientras tiene una orden de Ocultación, o mientras esté dentro del rango de control de un agente enemigo.</li>
                                    </ul>
                                    <p><em>Para sorpresa de nadie, Kill Team puede ser un juego muy letal, así que si pierdes frecuentemente agentes por disparos enemigos, considera jugar más defensivamente, colocando a tus agentes en cobertura y usando una orden de Ocultación.</em></p>
                                </div>
                                <div class="rules-steps">
                                    <div class="victory-points">
                                        <div class="sub-header">1. Seleccionar Arma</div>
                                        El atacante selecciona un arma a distancia (<i class="icon-shoot"></i>) para usar que tenga su agente y recoge sus dados de ataque — un número de D6 igual al atributo de Atq del arma.
                                    </div>
                                    <div class="victory-points">
                                        <div class="sub-header">2. Seleccionar Blanco Valido</div>
                                        <p>El atacante selecciona un agente enemigo que sea un Blanco Valido y no tenga agentes amigos dentro de su rango de control.</p>
                                        <p>Si el objetivo previsto tiene una orden de Trabarse, es un Blanco Valido si es visible para el agente activo.</p>
                                        <p>Si el objetivo previsto tiene una orden de Ocultación, es un Blanco Valido si es visible para el agente activo y no está en cobertura.</p>
                                        <p>Un agente es visible si el agente activo puede verlo. Un agente está en cobertura si hay terreno interpuesto dentro de su rango de control. Sin embargo, no puede estar en cobertura mientras esté a menos de 2” del agente activo.</p>
                                        <p>Un agente no puede estar en cobertura y Ofuscado por el mismo elemento de terreno. Si lo estuviera, el defensor debe seleccionar uno de ellos (cobertura u Ofuscado) para esa secuencia cuando su agente sea seleccionado como el Blanco Valido.</p>
                                        <p><em>En algunos casos muy raros, serás tanto el atacante como el defensor, como cuando resuelves un disparo contra un agente amigo como resultado de la regla Estallido. Cuando esto ocurre, tiras tanto los dados de ataque como los de defensa (no tu oponente).</em></p>
                                    </div>
                                    <div class="victory-points">
                                        <div class="sub-header">3. Tirar Dados de Ataque</div>
                                        <p>El atacante tira sus dados de ataque. Cada resultado que iguale o supere el atributo de Impacto del arma es un éxito y se retiene. Cada resultado que no lo haga es un fallo y se descarta. Cada resultado de 6 es siempre un éxito crítico. Cada otro éxito es un éxito normal. Cada resultado de 1 es siempre un fallo.</p>
                                        <p>Si el agente objetivo está Ofuscado:</p>
                                        <ul>
                                            <li>El atacante debe descartar un éxito de su elección en lugar de retenerlo.</li>
                                            <li>Todos los éxitos críticos del atacante se retienen como éxitos normales y no pueden cambiarse a éxitos críticos (esto tiene precedencia sobre todas las demás reglas).</li>
                                        </ul>
                                        <p>Un agente está Ofuscado si hay terreno Pesado interpuesto. Sin embargo, no puede ser Ofuscado por terreno Pesado interpuesto que esté a menos de 1” de cualquiera de los agentes.</p>
                                        <p><em>La obstrucción hace que sea menos efectivo disparar a un agente enemigo si hay grandes obstrucciones en el camino. Sin embargo, se ignora cuando los agentes están en tales obstrucciones; imagínalos asomándose por esquinas o ventanas.</em></p>
                                    </div>
                                    <div class="victory-points">
                                        <div class="sub-header">4. Tirar Dados de Defensa</div>
                                        <p>El defensor recoge tres dados de defensa. Si el agente objetivo está en cobertura, pueden retener un éxito normal sin tirarlo – esto se conoce como una salvación por cobertura. Tiran el resto.</p>
                                        <p>Cada resultado que iguale o supere el atributo de Salvación del objetivo es un éxito y se retiene. Cada resultado que no lo haga es un fallo y se descarta. Cada resultado de 6 es siempre un éxito crítico. Cada otro éxito es un éxito normal. Cada resultado de 1 es siempre un fallo.</p>
                                        <p><em>Recuerda, estar en cobertura en este paso generalmente se aplica a agentes con una orden de Trabarse, ya que una orden de Ocultación les habría impedido ser un Blanco Valido antes.</em></p>
                                    </div>
                                    <div class="victory-points">
                                        <div class="sub-header">5. Resolver Dados de Defensa</div>
                                        <p>El defensor asigna todos sus dados de defensa exitosos para bloquear dados de ataque exitosos.</p>
                                        <ul>
                                            <li>Un éxito normal puede bloquear un éxito normal.</li>
                                            <li>Dos éxitos normales pueden bloquear un éxito crítico.</li>
                                            <li>Un éxito crítico puede bloquear un éxito normal o un éxito crítico.</li>
                                        </ul>
                                    </div>
                                    <div class="victory-points">
                                        <div class="sub-header">6. Resolver Dados de Ataque</div>
                                        <p>Todos los dados de ataque exitosos no bloqueados infligen daño al agente objetivo.</p>
                                        <ul>
                                            <li>Un éxito normal inflige daño igual al atributo de Daño Normal del arma.</li>
                                            <li>Un éxito crítico inflige daño igual al atributo de Daño Crítico del arma.</li>
                                        </ul>
                                        <p>Cualquier agente que haya sido incapacitado (ver daño en pág. 47) se retira después de que el agente activo haya terminado la acción.</p>
                                        <p><em>Algunas armas disparan múltiples veces en la misma acción, como aquellas con las reglas de arma de Área y Torrente (pág. 111). Por lo tanto, los agentes no se retiran hasta que se resuelva toda la acción.</em></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 basic-rules">
                        <h3 id="fight-action" class="rules-title mt-3">Combatir</h3>
                        <div class="crit-op border border-0" data-type="action">
                            <div class="middle">
                                <div class="header">
                                    <div class="name-action">Combatir</div>
                                    <div class="ap-box">1PA</div>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li><span class="icon-yes"></span> Combate con el agente activo siguiendo la secuencia a continuación. El jugador del agente activo es el atacante. El jugador del agente enemigo seleccionado es el defensor.</li>
                                        <li><span class="icon-no"></span> Un agente no puede realizar esta acción a menos que un agente enemigo esté dentro de su rango de control.</li>
                                    </ul>
                                    <p><em>A diferencia de disparar, el combate es un brutal toma y daca. Ten cuidado al elegir con quién peleas, ya que ellos devolverán el golpe.</em></p>
                                </div>
                                <div class="rules-steps">
                                    <div class="victory-points">
                                        <div class="sub-header">1. Seleccionar Agente Enemigo</div>
                                        <p>El atacante selecciona un agente enemigo dentro del rango de control del agente activo contra el cual combatir. Ese agente enemigo tomará represalias en esta acción.</p>
                                        <p><em>La diferencia entre un agente que combate y uno que toma represalias es importante. El agente que combate es el agente activo, mientras que el agente que toma represalias es el agente enemigo elegido.</em></p>
                                    </div>
                                    <div class="victory-points">
                                        <div class="sub-header">2. Seleccionar Armas</div>
                                        <p>Ambos jugadores seleccionan un arma cuerpo a cuerpo (<i class="icon-attack"></i>) para usar que tenga su agente y recogen sus dados de ataque — un número de D6 igual al atributo de Atq del arma.</p>
                                        <p><em>Si una regla indica que un agente no puede tomar represalias, aún puedes combatir contra él, pero no se pueden reunir ni resolver dados de ataque para él.</em></p>
                                    </div>
                                    <div class="victory-points">
                                        <div class="sub-header">3. Tirar Dados de Ataque</div>
                                        <p>Ambos jugadores tiran sus dados de ataque simultáneamente. Cada resultado que iguale o supere el atributo de Impacto de su arma seleccionada es un éxito y se retiene. Cada resultado que no lo haga es un fallo y se descarta. Cada resultado de 6 es siempre un éxito crítico. Cada otro éxito es un éxito normal. Cada resultado de 1 es siempre un fallo.</p>
                                        <p>Mientras un agente amigo es asistido por otros agentes amigos, mejora el atributo de Impacto de sus armas cuerpo a cuerpo en 1 por cada uno que lo haga. Para que un agente amigo lo asista, debe estar dentro del rango de control del agente enemigo en esa pelea y no dentro del rango de control de otro agente enemigo.</p>
                                        <p><em>Tener múltiples agentes amigos en el rango de control de un agente enemigo no les permite combatir todos a la vez, pero tener asistencia hace que sea más probable tener éxito en los dados de ataque.</em></p>
                                    </div>
                                    <div class="victory-points">
                                        <div class="sub-header">4. Resolver Dados de Ataque</div>
                                        <p>Comenzando con el atacante, los jugadores alternan resolviendo uno de sus dados de ataque exitosos no bloqueados. Los jugadores repiten este proceso hasta que un jugador haya resuelto todos sus dados (en cuyo caso su oponente resuelve todos sus dados restantes), o un agente en esa pelea quede incapacitado (ver daño en pág. 47). Cuando un jugador resuelve un dado, debe golpear o bloquear con él.</p>
                                        <p><em>Golpear inflige daño directamente, lo que lo convierte en una forma efectiva de dañar a los enemigos.</em></p>
                                        <p>Si golpean, infligen daño al agente enemigo, luego descartan ese dado.</p>
                                        <ul>
                                            <li>Un éxito normal inflige daño igual al atributo de Daño Normal del arma.</li>
                                            <li>Un éxito crítico inflige daño igual al atributo de Daño Crítico del arma.</li>
                                        </ul>
                                        <p><em>Bloquear no detiene un golpe que ya está ocurriendo; detiene un éxito que aún no está resuelto.</em></p>
                                        <p>Si bloquean, pueden asignar ese dado para bloquear uno de los éxitos no resueltos de su oponente.</p>
                                        <ul>
                                            <li>Un éxito normal puede bloquear un éxito normal.</li>
                                            <li>Un éxito crítico puede bloquear un éxito normal o un éxito crítico.</li>
                                        </ul>
                                        <p><em>Aún puedes bloquear incluso si a tu oponente no le quedan éxitos no resueltos. Esto es útil si no quieres incapacitar al agente enemigo todavía.</em></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 basic-rules">
                        <h3 id="counteract-action" class="rules-title mt-3">Contraatacar</h3>
                        <div class="crit-op border border-0" data-type="action">
                            <div class="middle">
                                <div class="header">
                                    <div class="name-action">Contraatacar</div>
                                    <div class="ap-box">0PA</div>
                                </div>
                                <div class="content">
                                    <p>Cuando activarías a un agente amigo preparado, si todos tus agentes están agotados pero tu oponente todavía tiene agentes preparados, puedes seleccionar un agente amigo agotado con una orden de Trabarse para realizar una acción de 1PA gratis <span class="text-info-emphasis">(Excluyendo Guardia)</span>. Cada agente solo puede contraatacar una vez por punto de inflexión, y no puede moverse más de 2"<span class="text-info-emphasis">, o debe colocarse totalmente a 2" si se retira y se coloca de nuevo, </span> mientras contraataca (esto no es un cambio a su atributo de Movimiento, y tiene precedencia sobre todas las demás reglas). Contraatacar es opcional, así que puedes elegir no hacerlo. En cualquier caso, la activación se alterna de nuevo a tu oponente después.</p>
                                    <p><em>Contraatacar no es una activación, es en lugar de activar. Esta diferencia es importante; por ejemplo, significa que las restricciones de acción no se aplicarán.</em></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            }
        ],
        weapons: [
            {
                title: 'Reglas de Armas',
                content: `
                <div id="section-weapons" class="row basic-rules">
                    <div class="section">Reglas de Armas</div>
                    <div class="col-12 intro">
                        <p>Las reglas de armas se aplican siempre que un agente amigo usa un arma que las tiene. Las reglas de armas comunes se pueden encontrar a continuación, y puedes encontrar reglas de armas raras en las reglas de tu kill team. Las armas no obtienen ningún beneficio por tener la misma regla de arma más de una vez, a menos que la regla de arma tenga una x, en cuyo caso selecciona qué x usar. Si un agente amigo está usando un arma que tiene múltiples reglas de arma que entrarían en vigor al mismo tiempo, puedes elegir el orden en que entran en vigor.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-0" class="rules-title mt-3">Precisa X</h3>
                        <p class="intro">Puedes retener hasta x dados de ataque como éxitos normales sin tirarlos. Si un arma tiene más de una instancia de Precisa x, puedes tratarla como una instancia de Precisa 2 en su lugar (esto tiene precedencia sobre las reglas x anteriores).</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-1" class="rules-title mt-3">Equilibrada</h3>
                        <p class="intro">Puedes volver a tirar uno de tus dados de ataque.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-2" class="rules-title mt-3">Estallido X</h3>
                        <p class="intro">El objetivo que seleccionas es el objetivo primario. Después de disparar al objetivo primario, dispara con esta arma contra cada objetivo secundario en un orden de tu elección (tira cada secuencia por separado). Los objetivos secundarios son otros agentes visibles para y a x del objetivo primario, p. ej., Estallido 2” (todos son objetivos válidos, independientemente de una orden de Ocultación). Los objetivos secundarios están en cobertura y Ofuscados si el objetivo primario lo estaba.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-3" class="rules-title mt-3">Brutal</h3>
                        <p class="intro">Tu oponente solo puede bloquear con éxitos críticos.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-4" class="rules-title mt-3">Incesante</h3>
                        <p class="intro">Puedes volver a tirar cualquiera de los resultados de tus dados de ataque de un resultado (p. ej., resultados de 2).</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-5" class="rules-title mt-3">Devastadora X</h3>
                        <p class="intro">Cada éxito crítico retenido inflige inmediatamente x daño al agente contra el que se está usando esta arma, p. ej., Devastadora 3. Si la regla comienza con una distancia (p. ej., 1” Devastadora x), inflige x daño a ese agente y a cada otro agente visible para y a esa distancia de él. Ten en cuenta que el éxito no se descarta después de hacerlo; aún se puede resolver más tarde en la secuencia.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-6" class="rules-title mt-3">Pesada</h3>
                        <p class="intro">Un agente no puede usar esta arma en una activación <span class="text-info-emphasis">o contraataque</span> en la que se movió, y no puede moverse en una activación <span class="text-info-emphasis">o contraataque</span> en la que usó esta arma. Si la regla es Pesada (solo x), donde x es una acción de movimiento, solo se permite ese movimiento, p. ej., Pesada (solo Carrera). Esta regla de arma no tiene efecto en prevenir la acción de Guardia.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-7" class="rules-title mt-3">Sobrecalentada</h3>
                        <p class="intro">Después de que un agente use esta arma, tira un D6. Si el resultado es menor que el atributo de Impacto del arma, inflige daño a ese agente igual al resultado multiplicado por dos. Si se usa múltiples veces en una acción (p. ej., Estallido), tira solo un D6.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-8" class="rules-title mt-3">Letal X+</h3>
                        <p class="intro">Tus éxitos iguales o mayores que x son éxitos críticos, p. ej., Letal 5+.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-9" class="rules-title mt-3">Limitada X</h3>
                        <p class="intro">Después de que un agente use esta arma un número de veces en la batalla igual a x, ya no la tiene. Si se usa múltiples veces en una acción (p. ej., Estallido), trata esto como un uso.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-10" class="rules-title mt-3">Perforante X</h3>
                        <p class="intro">El defensor recoge x dados de defensa menos, p. ej., Perforante 1. Si la regla es Perforante Críticos x, esto solo entra en efecto si retienes algún éxito crítico.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-11" class="rules-title mt-3">Castigadora</h3>
                        <p class="intro">Si retienes algún éxito crítico, puedes retener uno de tus fallos como un éxito normal en lugar de descartarlo.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-12" class="rules-title mt-3">Alcance X</h3>
                        <p class="intro">Solo los agentes a x del agente activo pueden ser objetivos válidos, p. ej., Alcance 9”</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-13" class="rules-title mt-3">Implacable</h3>
                        <p class="intro">Puedes volver a tirar cualquiera de tus dados de ataque.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-14" class="rules-title mt-3">Desgarradora</h3>
                        <p class="intro">Si retienes algún éxito crítico, puedes retener uno de tus éxitos normales como un éxito crítico en su lugar.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-15" class="rules-title mt-3">Saturar</h3>
                        <p class="intro">El defensor no puede retener salvaciones por cobertura.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-16" class="rules-title mt-3">Buscadora</h3>
                        <p class="intro">Al seleccionar un Blanco Valido, los agentes no pueden usar terreno para cobertura. Si la regla es Buscadora Ligera, los agentes no pueden usar terreno Ligero para cobertura. Aunque esto puede permitir que tales agentes sean seleccionados como objetivo (asumiendo que son visibles), no elimina su salvación por cobertura (si la hay).</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-17" class="rules-title mt-3">Severa</h3>
                        <p class="intro">Si no retienes ningún éxito crítico, puedes cambiar uno de tus éxitos normales a un éxito crítico. <span class="text-warning-emphasis">Las reglas de arma Devastadora y Perforante Críticos aún surten efecto, pero Castigadora y Desgarradora no.</span></p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-18" class="rules-title mt-3">Choque</h3>
                        <p class="intro">La primera vez que golpees con un éxito crítico en cada secuencia, también descarta uno de los éxitos normales no resueltos de tu oponente (o un éxito crítico si no hay ninguno).</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-19" class="rules-title mt-3">Silenciosa</h3>
                        <p class="intro">Un agente puede realizar la acción de Disparar con esta arma mientras tiene una orden de Ocultación.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-20" class="rules-title mt-3">Aturdidora</h3>
                        <p class="intro">Si retienes algún éxito crítico, resta 1 al atributo de LPA del agente contra el que se está usando esta arma hasta el final de su próxima activación.</p>
                    </div>
                    <div class="col-12 rules-weapon">
                        <h3 id="weapon-21" class="rules-title mt-3">Torrente X</h3>
                        <p class="intro">Selecciona un Blanco Valido como normal como el objetivo primario, luego selecciona cualquier número de otros objetivos válidos a x del primer Blanco Valido como objetivos secundarios, p. ej., Torrente 2”. Dispara con esta arma contra todos ellos en un orden de tu elección (tira cada secuencia por separado).</p>
                    </div>
                </div>`
            }
        ],
        terrain: [
            {
                title: 'Terreno y Movimiento',
                content: `
                <div id="section-movement" class="row basic-rules">
                    <div class="section">Terreno y Movimiento</div>
                    <div class="col-12 intro">
                        <p>Los agentes no pueden moverse a través de terreno — deben moverse alrededor, escalar sobre o dejarse caer/saltar de él.</p>
                        <p><em>Los agentes deben terminar un movimiento en una ubicación donde puedan ser colocados; no pueden terminar a mitad de escalada, salto o caída. Si eso no es posible, no pueden comenzar el movimiento.</em></p>
                    </div>
                    <div class="col-12 movement-rule">
                        <h3 id="movement-title-2" class="rules-title mt-3">Escalar</h3>
                        <p class="intro">Un agente debe estar a 1” horizontalmente y 3” verticalmente de terreno que sea visible para ellos para escalarlo. Cada escalada se trata como un mínimo de 2” verticalmente (p. ej., una distancia de 1” se trata como 2”).</p>
                    </div>
                    <div class="col-12 movement-rule">
                        <h3 id="movement-title-3" class="rules-title mt-3">Caer</h3>
                        <p class="intro">Los agentes caen cuando se mueven fuera del terreno o después de haber saltado. Ignora 2” de distancia vertical que caen durante cada acción. Esto significa que una caída vertical de 2” o menos se ignora. Si caen múltiples veces durante una acción, solo se ignoran 2” en total, no 2” de cada caída.</p>
                    </div>
                    <div class="col-12 movement-rule">
                        <h3 id="movement-title-4" class="rules-title mt-3">Saltar</h3>
                        <p class="intro">Los agentes pueden saltar desde <span class="text-warning-emphasis">terreno de Ventaja más alto que 2” del suelo de la killzone</span> cuando se mueven fuera de él. Puedes moverlos hasta 4” horizontalmente desde el borde cuando saltan, hecho como cualquier otro movimiento excepto en un incremento de línea recta. El agente debe entonces caer o escalar desde allí. <span class="text-warning-emphasis">Al saltar desde un elemento de terreno, si hay un parapeto en el borde desde el que saltarías, debes escalarlo primero antes de hacerlo, pero aún saltas desde el nivel del terreno de Ventaja.</span> Al saltar hacia un elemento de terreno, puedes ignorar su diferencia de altura de 1” o menos, incluyendo su parapeto (si lo hay). <span class="text-decoration-line-through text-warning-emphasis">Sin embargo, al saltar desde un elemento de terreno, si tiene un parapeto, debes escalarlo primero.</span></p>
                        <p><em>Saltar significa que los agentes pueden moverse a través de huecos de hasta 4" de ancho y sobre cosas que están debajo de ellos.</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/jumping-1.png" class="figure-img img-fluid rounded"><p>El agente se mueve hacia arriba 4” hasta que está por encima del punto más alto que debe escalar. Se mueve a través de 2” hasta que su peana está completamente pasada del parapeto, luego cae 0” (ya que la caída es menor de 2”).</p><p><em>Recuerda que los incrementos se redondean hacia arriba, así que si el agente se mueve 3.5”, esto se trata como 4”</em></p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/jumping-2.png" class="figure-img img-fluid rounded"><p>El agente se mueve a través de 2” hasta que está completamente fuera de la cornisa, luego cae 2” (una distancia de 4”, pero los primeros 2” se ignoran). El agente también podría saltar fuera del terreno, moviéndose 4” desde un borde antes de caer.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/jumping-3.png" class="figure-img img-fluid rounded"><p>El agente se mueve hacia arriba por 2” (una distancia de 1”, pero tratada como el mínimo de 2”) hasta que está por encima del punto más alto que debe escalar. Se mueve a través de 3” hasta que su peana está completamente pasada del elemento de terreno, luego cae 0” (ya que la caída es menor de 2”).</p>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            {
                title: 'Reglas de Terreno',
                content: `
                <div id="section-terrain" class="row basic-rules">
                    <div class="section">Reglas de Terreno</div>
                    <div class="col-12 intro">
                        <p>Un elemento de terreno se compone de diferentes partes, cada una de las cuales es un tipo de terreno (una parte puede ser más de un tipo). Si estás usando un elemento de terreno de una killzone específica, el tipo de cada parte de ese elemento de terreno se especificará. Si estás usando un elemento de terreno de una killzone de tu propia creación, debes especificar el tipo de cada parte de ese elemento de terreno antes de la batalla. Los tipos de terreno más comunes están a continuación, pero algunas killzones tienen sus propios tipos.</p>
                    </div>
                    <div class="col-12 terrain-rule">
                        <h3 id="terrain-title-2" class="rules-title mt-3">Pesado</h3>
                        <p class="intro">El terreno más grande es Pesado. Puede obstruir a los agentes.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/terrain-heavy-1.png" class="figure-img img-fluid rounded" alt="Terreno Pesado"><em>Es bueno tener una mezcla de terreno Ligero y Pesado en tu killzone, ya que algunas otras reglas interactúan con cada tipo de manera diferente.</em></figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 terrain-rule">
                        <h3 id="terrain-title-3" class="rules-title mt-3">Ligero</h3>
                        <p class="intro">El terreno más pequeño es Ligero. No tiene reglas adicionales, pero otras reglas interactúan con él de manera diferente (p. ej., terreno de Ventaja <a href="#" class="goToSection" data-target="#principles-title-5">aquí</a>).</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/terrain-light-1.png" class="figure-img img-fluid rounded" alt="Terreno Ligero">Terreno Ligero.</figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/terrain-light-2.png" class="figure-img img-fluid rounded" alt="Terreno Ligero">Terreno Ligero.</figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 terrain-rule">
                        <h3 id="terrain-title-4" class="rules-title mt-3">Bloqueante</h3>
                        <p class="intro">El terreno Bloqueante generalmente se atribuye a espacios entre o debajo de un elemento de terreno. La visibilidad no se puede trazar a través de tales espacios, y para los propósitos de cobertura y Ofuscado, los espacios son interpuestos como el terreno a su alrededor.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/terrain-blocking-1.png" class="figure-img img-fluid rounded" alt="Terreno Bloqueante">El espacio debajo de esta tubería es terreno bloqueante.<p><em>Técnicamente, el terreno Bloqueante no es realmente terreno físico, sino más bien los espacios a través de los cuales los agentes no deberían poder ver. El terreno Bloqueante es raro, pero existe para las instancias necesarias.</em></p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/terrain-blocking-2.png" class="figure-img img-fluid rounded" alt="Terreno Bloqueante">El punto de vista de la puerta o el respiradero roto es terreno bloqueante.</figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 terrain-rule">
                        <h3 id="terrain-title-5" class="rules-title mt-3">Ventaja</h3>
                        <p class="intro">El terreno de Ventaja son los niveles superiores de la killzone—áreas sobre las cuales se pueden colocar agentes por encima del tablero de juego. Si el terreno no es terreno de Ventaja, entonces los agentes pueden moverse sobre él, pero no pueden terminar un movimiento o ser desplegados en él. El terreno de Ventaja también es terreno Ligero. El terreno de Ventaja tiene las siguientes características principales.</p>
                        <ul>
                            <li>Primero, siempre que un agente en terreno de Ventaja esté disparando a un agente que tiene una orden de Trabarse, su arma a distancia tiene la regla de arma <a href="#" class="goToTabAndSection" data-tab="weapons-tab" data-target="#weapon-6">Precisa 1</a> si el agente objetivo está al menos 2" más bajo que él, o Precisa 2 si el agente objetivo está al menos 4" más bajo que él.</li>
                            <li>Segundo, siempre que estés seleccionando un Blanco Valido para un agente en terreno de Ventaja, los agentes al menos 2" más bajos que ese agente con una orden de Ocultación no pueden usar terreno Ligero para cobertura. Aunque esto puede permitir que tales agentes sean seleccionados como objetivo (asumiendo que son visibles), no elimina su salvación por cobertura, y el defensor puede retenerla como un éxito crítico en su lugar, o retener una salvación por cobertura adicional.</li>
                            <li>Tercero, para los propósitos de Ofuscado, ignora el terreno Pesado conectado al terreno de Ventaja en el que está el agente activo o el objetivo previsto.</li>
                        </ul>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/terrain-vantage-1.png" class="figure-img img-fluid rounded" alt="Terreno de Ventaja"><em>
                                        <p>Como el terreno de Ventaja también es Ligero, un agente en terreno de Ventaja a menudo estará en cobertura de agentes más bajos que ellos — imagínalos agachándose para ganar una salvación por cobertura o evitar ser un Blanco Valido.</p>
                                        <p>Un agente en terreno de Ventaja puede apuntar a un agente con una orden de Ocultación que está 2” más bajo que ellos y solo en cobertura de terreno Ligero.</p>
                                        <p>Si un agente está Ofuscado para moverse a través de terreno de Ventaja por agentes enemigos u otros elementos de terreno, puede moverse alrededor de estas obstrucciones (sin caerse) siempre que parte de su peana esté siempre en el terreno de Ventaja.</p>
                                    </em></figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/terrain-vantage-2.png" class="figure-img img-fluid rounded" alt="Terreno de Ventaja">El agente B tiene una orden de Ocultación y está en cobertura de terreno Ligero, pero dado que el agente A está en terreno de Ventaja y al menos 2” más alto, el agente B es un Blanco Valido.</figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 terrain-rule">
                        <h3 id="terrain-title-6" class="rules-title mt-3">Accesible</h3>
                        <p class="intro">Los agentes pueden moverse a través de terreno Accesible (esto tiene precedencia sobre <a href="#" class="goToTabAndSection" data-tab="principles-tab" data-target="#principles-title-1">Peanas</a>, y <a href="#" class="goToTabAndSection" data-tab="terrain-tab" data-target="#section-movement">Terreno y Movimiento</a>), pero cuenta como 1" adicional hacerlo. Solo el centro de la peana de un agente necesita moverse a través de terreno Accesible, por lo que los tamaños de las peanas son irrelevantes.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/terrain-accessible-1.png" class="figure-img img-fluid rounded" alt="Terreno Accesible">La puerta es terreno accesible.</figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 terrain-rule">
                        <h3 id="terrain-title-7" class="rules-title mt-3">Insignificante</h3>
                        <p class="intro">El terreno Insignificante suele ser muy pequeño. Para los propósitos de escalar y caer, ignóralo.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/terrain-insignificant-1.png" class="figure-img img-fluid rounded">Pequeñas pilas de escombros son terreno insignificante.<p><em>Un agente puede moverse sobre y a través de terreno Insignificante sin subir y bajar.</em></p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 terrain-rule">
                        <h3 id="terrain-title-8" class="rules-title mt-3">Expuesto</h3>
                        <p class="intro">El terreno Expuesto suele ser muy pequeño, o terreno con grandes huecos detrás del cual los agentes no deberían poder tomar cobertura.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/terrain-exposed-1.png" class="figure-img img-fluid rounded" alt="Terreno Expuesto">Esta escalera y estas cadenas colgantes son terreno expuesto.<p><em>Es particularmente importante identificar el terreno Insignificante y Expuesto antes de la batalla, para evitar malentendidos más tarde.</em></p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 terrain-rule">
                        <h3 id="terrain-title-9" class="rules-title mt-3"><span class="text-warning-emphasis">Techo</span></h3>
                        <p class="intro"><span class="text-warning-emphasis">Los agentes con una peana redonda de 50mm o menos, o una peana ovalada de 60x35mm, pueden moverse debajo de terreno de Techo independientemente de la altura del agente (esto tiene precedencia sobre Terreno y Movimiento en la pág. 56). El agente aún debe terminar la acción en una ubicación donde pueda ser colocado.</span></p>
                    </div>
                </div>`
            },
            {
                title: 'Gallowdark',
                content: `
                <div id="section-gallowdark" class="row basic-rules">
                    <div class="section">Gallowdark</div>
                    <div class="col-12 intro">
                        <p>Killzone: Gallowdark usa un tablero de juego de 606mm x 703mm con un sistema de cuadrícula de 6x7 para la preparación. Tiene 4x muros cortos con compuerta y pilares y 2x cada otro elemento de terreno especificado en la página 109. También tiene 8x pilares izquierdos y 8x pilares derechos, y 30x tapas de pilar para completar la configuración del terreno. Ten en cuenta que algunos mapas de misión usan menos que esto.</p>
                    </div>
                    <div class="col-12 gallowdark-rule">
                        <h3 id="gallowdark-title-2" class="rules-title mt-3">Muro Gallowdark</h3>
                        <p class="intro">Un elemento de terreno muro Gallowdark es terreno Pesado y Muro. Algunos muros incluyen una compuerta, que se explica por separado en la página 69.</p>
                        <p><b>Terreno Muro:</b></p>
                        <ul>
                            <li>Los agentes no pueden moverse sobre o a través de terreno Muro (esto tiene precedencia sobre todas las demás reglas).</li>
                            <li>La visibilidad no puede determinarse sobre o a través de terreno Muro.</li>
                            <li>Aparte de hacia áreas de la killzone (centro de la killzone, zonas de desembarco, etc.), las distancias no pueden medirse sobre o a través de terreno Muro; deben medirse alrededor de él utilizando la ruta más corta posible.</li>
                            <li>Para los propósitos de cobertura y Ofuscado, solo las esquinas y extremos del terreno Muro pueden interponerse, a menos que el agente activo lo haya pasado (ver ejemplos en páginas 67-68).</li>
                        </ul>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/walls-example-1.png" class="figure-img img-fluid rounded"><p>El agente A normalmente estaría a 3” del agente B, pero como las distancias no pueden medirse sobre o a través de terreno Muro, deben medirse alrededor del muro Gallowdark. Esto haría que el agente A esté a más de 3” del agente B.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/walls-example-2.png" class="figure-img img-fluid rounded"><p>El agente B no está en cobertura ya que una esquina o extremo del muro no está interpuesta. Ten en cuenta que las partes menores del muro que sobresalen no hacen una esquina o extremo por sí solas; debe ser la estructura principal del muro la que dobla una esquina o termina, como se muestra en los siguientes diagramas.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/walls-example-3.png" class="figure-img img-fluid rounded"><p>Una esquina del muro está interpuesta, por lo tanto, el agente B está en cobertura.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/walls-example-4.png" class="figure-img img-fluid rounded"><p>El agente A ha pasado la esquina del muro, por lo tanto, no está interpuesta y el agente B no está en cobertura. Ten en cuenta que si el agente A estuviera totalmente en el lado izquierdo de la línea negra punteada, el muro estaría interpuesto y el agente B estaría en cobertura.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/walls-example-5.png" class="figure-img img-fluid rounded"><p>Un extremo del muro está interpuesto, por lo tanto, el agente B está en cobertura.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/walls-example-6.png" class="figure-img img-fluid rounded"><p>Como la compuerta está abierta, un extremo del muro está interpuesto. Está a más de 1” de ambos agentes, por lo tanto, el agente B está Ofuscado.</p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gallowdark-rule">
                        <h3 id="gallowdark-title-3" class="rules-title mt-3">Compuerta</h3>
                        <p class="intro">Una compuerta tiene dos estados: cerrada y abierta. Tiene dos partes — un punto de acceso y una puerta — y sus tipos de terreno dependen del estado de la compuerta. Los agentes pueden realizar la acción de misión <b>Operar Compuerta</b> para cambiar su estado. Las compuertas comienzan la batalla cerradas.</p>
                        <p><em>Como el punto de acceso de una compuerta abierta es terreno Expuesto, los muros a ambos lados deben usarse para cobertura y obstrucción en lugar del punto de acceso.</em></p>
                        <div class="tacop">
                            <div class="header">
                                <div>Operar Compuerta</div>
                                <div class="ap-box">1LPA</div>
                            </div>
                            <div class="content">
                                <ul>
                                    <li><span class="icon icon-yes"></span>Abrir o cerrar una compuerta cuyo punto de acceso está dentro del rango de control del agente.</li>
                                    <li><span class="icon icon-yes"></span>Un agente puede realizar esta acción durante una acción de <b>Carrera</b> o <b>Reposicionarse</b>, y cualquier distancia de movimiento restante puede usarse después de hacerlo.</li>
                                    <li><span class="icon icon-no"></span>Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, o si esa compuerta está abierta y su punto de acceso está dentro del rango de control de un agente enemigo.</li>
                                </ul>
                            </div>
                        </div>
                        <p><em>Abrir una compuerta puede hacer que el agente esté dentro del rango de control de un agente enemigo, en cuyo caso su acción de Carrera o Reposicionarse terminaría inmediatamente (a menos que tenga reglas que le permitan moverse dentro del rango de control de un agente enemigo).</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/walls-hatchway-1.png" class="figure-img img-fluid rounded">
                                    <div class="sub-header">Cerrada</div>
                                    Mientras una compuerta está cerrada:
                                    <ul>
                                        <li>Su puerta debe estar completamente cerrada.</li>
                                        <li>El punto de acceso y la puerta son terreno Pesado y Muro.</li>
                                    </ul>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/walls-hatchway-2.png" class="figure-img img-fluid rounded">
                                    <div class="sub-header">Abierta</div>
                                    Mientras una compuerta está abierta:
                                    <ul>
                                        <li>Su puerta debe estar completamente abierta (no puede estar entreabierta).</li>
                                        <li>Su punto de acceso es terreno Accesible, Insignificante y Expuesto.</li>
                                        <li>Su puerta es terreno Pesado y Muro, y el espacio directamente debajo de ella es terreno Bloqueante.</li>
                                    </ul>
                                    <p><em>Si los agentes impidieran que la puerta se abriera o cerrara completamente, retíralos temporalmente de la killzone, abre o cierra la puerta, luego devuelve a los agentes lo más cerca posible de su ubicación original. Si un agente está dentro del rango de control de un agente enemigo antes de que se abra una puerta, debe ser devuelto allí.</em></p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gallowdark-rule">
                        <h3 id="gallowdark-title-4" class="rules-title mt-3">Entorno Condensado</h3>
                        <p class="intro">Las armas con la regla de arma Estallido, Torrente y/o Devastadora x” (es decir, Devastadora con un requisito de distancia) también tienen la regla de arma Letal 5+ (pág. 111).</p>
                    </div>
                    <div class="col-12 gallowdark-rule">
                        <h3 id="gallowdark-title-5" class="rules-title mt-3">En Guardia</h3>
                        <p class="intro">Una vez durante la activación de cada agente enemigo, después de que ese agente enemigo realice una acción, puedes interrumpir esa activación y seleccionar un agente amigo en guardia para realizar la acción de <b>Combatir</b> o <b>Disparar</b> de forma gratuita (incluyendo acciones que se tratan como tales, p. ej. <b>Combate en Compuerta</b> ver abajo).</p>
                        <p>Ese agente amigo puede incluso realizar la acción de Disparar mientras está dentro del rango de control de un agente enemigo (esto tiene precedencia sobre las condiciones normales de la acción de Disparar). Esto se conoce como un disparo a quemarropa y tiene las siguientes reglas adicionales mientras tu agente lo está haciendo:</p>
                        <ul>
                            <li>Apunta al agente enemigo dentro del rango de control de tu agente (incluso si normalmente no sería un Blanco Valido).</li>
                            <li>Empeora el atributo de Impacto de las armas de tu agente en 1.</li>
                            <li>Hasta el final de la activación del agente enemigo interrumpido, tu agente no puede tomar represalias.</li>
                        </ul>
                        <p><span class="text-warning-emphasis">Si lo haces, ese agente amigo no puede contraatacar durante el punto de inflexión.</span></p>
                        <p><em>Determina el objetivo de manera normal para estas acciones. Esto significa que no tienes que apuntar al agente que interrumpiste.</em></p>
                        <div class="tacop">
                            <div class="header">
                                <div>Guardia</div>
                                <div class="ap-box">1LPA</div>
                            </div>
                            <div class="content">
                                <ul>
                                    <li><span class="icon icon-yes"></span>El agente se pone en guardia (ver abajo) hasta que ocurra cualquiera de lo siguiente:
                                        <ul>
                                            <li>Realiza cualquier acción, <span class="text-info-emphasis">se mueve o es colocado</span>.</li>
                                            <li>Un agente enemigo termina una acción dentro de su rango de control y no interrumpes esa activación (ver abajo).</li>
                                            <li>Su orden cambia.</li>
                                            <li>Es el inicio del siguiente punto de inflexión.</li>
                                        </ul>
                                    </li>
                                    <li><span class="icon icon-no"></span>Esta acción se trata como una acción de <b>Disparar</b>. Un agente no puede realizar esta acción mientras tiene una orden de Ocultación, o mientras está dentro del rango de control de un agente enemigo.</li>
                                </ul>
                            </div>
                        </div>
                        <p><em><b>Guardia</b> es una acción poderosa que permite a un agente atacar más tarde, en el momento oportuno. Puede cambiar la dinámica del juego, así que trata de evitar a los agentes enemigos en guardia, o considera cómo utilizarla mejor tú mismo. Usa la ficha de arriba para indicar cualquier agente que esté en guardia.</em></p>
                    </div>
                    <div class="col-12 gallowdark-rule">
                        <h3 id="gallowdark-title-6" class="rules-title mt-3">Combate en Compuerta</h3>
                        <p class="intro"></p>
                        <div class="tacop">
                            <div class="header">
                                <div>Combate en Compuerta</div>
                                <div class="ap-box">1LPA</div>
                            </div>
                            <div class="content">
                                <ul>
                                    <li><span class="icon icon-yes"></span>Combate con el agente activo (ver secuencia de combate <a href="#" class="goToTabAndSection" data-tab="actions-tab" data-target="#fight-action">aquí</a>)</li>
                                    <li><span class="icon icon-yes"></span>En el paso de Seleccionar Agente Enemigo, en su lugar selecciona un agente enemigo dentro de 2” de, y en el otro lado de, un punto de acceso de una compuerta abierta que el agente activo esté tocando. Durante la duración de esa acción, esos agentes se tratan como si estuvieran dentro del rango de control del otro.</li>
                                    <li><span class="icon icon-no"></span>Esta acción se trata como una acción de <b>Combatir</b>. Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, o si su peana no está tocando un punto de acceso de una compuerta abierta.</li>
                                </ul>
                            </div>
                        </div>
                        <p><em>Esta acción permite a un agente combatir a través de una compuerta abierta — útil si el enemigo la está obstruyendo e impidiendo que tus agentes pasen.</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/hatchwayfight-example-1.png" class="figure-img img-fluid rounded"><p>La peana del agente A está tocando el punto de acceso de una compuerta abierta. Puede realizar la acción <b>Combate en Compuerta</b> para combatir contra el agente B o C.</p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gallowdark-rule">
                        <h3 id="gallowdark-title-7" class="rules-title mt-3">Referencia Clave</h3>
                        <p class="intro"></p>
                        <figure class="figure"><img src="./resources/game_rules_files/gallowdark-esceno.png" class="figure-img img-fluid rounded"></figure>
                    </div>
                </div>`
            },
            {
                title: 'Bheta-Decima',
                content: `
                <div id="section-betha" class="row basic-rules">
                    <div class="section">Bheta-Decima</div>
                    <div class="col-12 intro">
                        <p>Killzone: Bheta-Decima tiene 2x pasarelas cortas, 4x pasarelas medianas, 2x pasarelas largas y 1x condensador termométrico.</p>
                    </div>
                    <div class="col-12 betha-rule">
                        <h3 id="betha-title-2" class="rules-title mt-3">Pasarela</h3>
                        <p class="intro"></p>
                        <ul>
                            <li>Los suelos de pasarela son terreno Accesible y de Ventaja.</li>
                            <li>Los pilares de pasarela son terreno Pesado.</li>
                            <li>Los elementos de terreno de pasarela vienen en tres tamaños: largo, mediano y corto. Cuando están conectados (es decir, sus suelos de pasarela se tocan entre sí), se tratan como el mismo terreno.</li>
                        </ul>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/gantry-example-1.png" class="figure-img img-fluid rounded"></figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 betha-rule">
                        <h3 id="betha-title-3" class="rules-title mt-3">Condensador Termométrico</h3>
                        <p class="intro"></p>
                        <ul>
                            <li>El techo es terreno Accesible y de Ventaja.</li>
                            <li>El borde interior del techo es terreno Expuesto e Insignificante: ignora la ligera diferencia de altura entre el área exterior e interior del techo.</li>
                            <li>Las almenas en el techo son terreno Ligero.</li>
                            <li>Todas las demás partes del mismo son terreno Pesado.</li>
                        </ul>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/condenser-example-1.png" class="figure-img img-fluid rounded"></figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 betha-rule">
                        <h3 id="betha-title-4" class="rules-title mt-3">Áreas Peligrosas</h3>
                        <p class="intro">Killzone: Bheta-Decima tiene las siguientes reglas adicionales que usan áreas peligrosas marcadas en el tablero de juego.</p>
                    </div>
                    <div class="col-12 betha-rule">
                        <h3 id="betha-title-5" class="rules-title mt-3">Movimiento Restringido</h3>
                        <p class="intro">Ninguna parte de la peana de un agente puede estar tocando un área peligrosa.</p>
                        <p><em>Los depredadores al acecho impiden que los agentes se aventuren demasiado cerca del océano, mientras que las fuertes corrientes y el agua tóxica les impiden entrar en él.</em></p>
                    </div>
                    <div class="col-12 betha-rule">
                        <h3 id="betha-title-6" class="rules-title mt-3">Objetivos Restringidos</h3>
                        <p class="intro">Al seleccionar un Blanco Valido para un agente en el suelo de la killzone, un objetivo previsto en el suelo de la killzone no es un Blanco Valido si 4” de área peligrosa está entre ellos.</p>
                        <p>Al seleccionar un Blanco Valido para un agente en terreno de Ventaja, un objetivo previsto en el suelo de la killzone no es un Blanco Valido si la huella de una pasarela está entre ellos. Lo mismo también es cierto a la inversa (un agente en el suelo de la killzone hacia un objetivo previsto en terreno de Ventaja). Sin embargo, en ambos casos, ignora la huella de los elementos de terreno de pasarela en los que está el agente o el objetivo previsto.</p>
                        <p><em>Olas implacables, neblina marina y smog industrial hacen que sea más difícil para los agentes ver objetivos sobre la superficie del océano.</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/targeting-example-1.png" class="figure-img img-fluid rounded"><p>En ambos casos, usa líneas de visión para determinar si un área peligrosa o la huella de una pasarela está entre ellos.</p><p><em>Los objetivos restringidos solo importan si uno o más de los agentes en cuestión están en el suelo de la killzone; si ambos están en terreno de Ventaja, no tiene efecto.</em></p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/targeting-example-2.png" class="figure-img img-fluid rounded"><p>La huella de una pasarela es la pasarela en sí, más el área debajo de ella.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/targeting-example-3.png" class="figure-img img-fluid rounded"><p>4” de área peligrosa están entre los agentes A y B, por lo tanto, el agente B no es un Blanco Valido (y tampoco lo sería el agente A a la inversa).</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/targeting-example-4.png" class="figure-img img-fluid rounded"><p>La huella de una pasarela está entre los agentes A y B, por lo tanto, el agente B no es un Blanco Valido (y tampoco lo sería el agente A a la inversa). Ten en cuenta que la pasarela izquierda se ignora al determinar esto, ya que el agente A está sobre ella.</p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 betha-rule">
                        <h3 id="betha-title-7" class="rules-title mt-3">Equipamiento</h3>
                        <p class="intro">El equipamiento se puede colocar en terreno de Ventaja, en el suelo de la killzone <span class="text-info-emphasis">y a 
2" de terreno Accesible</span> (esto tiene precedencia sobre las 
restricciones habituales).</p>
                    </div>
                </div>`
            },
            {
                title: 'Volkus',
                content: `
                <div id="section-volkus" class="row basic-rules">
                    <div class="section">Volkus</div>
                    <div class="col-12 intro">
                        <p>Killzone: Volkus tiene 2x fortalezas, 2x ruinas grandes, 2x ruinas pequeñas, 2x escombros pesados y 3x escombros ligeros.</p>
                    </div>
                    <div class="col-12 volkus-rule">
                        <h3 id="volkus-title-2" class="rules-title mt-3">Fortaleza</h3>
                        <p class="intro"></p>
                        <ul>
                            <li><b>A</b> El nivel(es) superior de un elemento de terreno fortaleza es terreno de <span class="text-warning-emphasis">Techo y</span> Ventaja.</li>
                            <li><b>B</b> La puerta es terreno Accesible y Pesado.</li>
                            <li><b>C</b> Los escalones de fuego son terreno de Ventaja, Insignificante y Expuesto.</li>
                            <li><b>D</b> El respiradero roto es terreno Bloqueante.</li>
                            <li><span class="text-info-emphasis"><b>E</b> Los tres contenedores de barriles en la Fortaleza A son terreno Bloqueante y Pesado.</span></li>
                            <li><span class="text-info-emphasis"><b>F</b> Los pequeños parapetos rotos en el borde del terreno de Ventaja de la Fortaleza A son terreno Insignificante y Expuesto y Techo.</span></li>
                            <li><span class="text-info-emphasis"><b>G</b> El hueco en el terreno de Ventaja inferior de la Fortaleza B es terreno Accesible.</span></li>
                            <li><span class="text-info-emphasis"><b>H</b> No puedes tener más de un agente amigo en el nivel superior más alto de la Fortaleza B a la vez, y ese agente debe colocarse en un lado u otro de ese nivel, no puede colocarse en el medio (esto significa que no se puede impedir que un agente enemigo se mueva o se coloque en el otro lado). Si la peana de un agente es demasiado grande para colocarse allí, debe moverse (o ser colocado) lo más lejos posible (de lo contrario no puede completar ese movimiento), luego colócalo a un lado y trátalo como si estuviera allí. Mantenlo lo más lejos posible en ese nivel cuando importe para verificar otras reglas (p. ej., rango de control, visibilidad, distancia a otros agentes, etc.). Esto tiene precedencia sobre las reglas para peanas y estar en una ubicación donde pueda ser colocado.</span></li>
                            <li>Todas las demás partes de la misma son terreno Pesado.</li>
                            <li>Para los propósitos de rango de control, ignora la puerta y las partes de este elemento de terreno de menos de 2” de alto al determinar la visibilidad.</li>
                        </ul>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/stronghold-example-1.png" class="figure-img img-fluid rounded"></figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/stronghold-example-2.png" class="figure-img img-fluid rounded"></figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 volkus-rule">
                        <h3 id="volkus-title-3" class="rules-title mt-3">Ruina Grande</h3>
                        <p class="intro"></p>
                        <ul>
                            <li><strong>A</strong> El nivel superior de un elemento de terreno ruina grande es terreno de <span class="text-warning-emphasis">Techo y</span> Ventaja. Para los propósitos de interposición y líneas de visión, trata este nivel como la misma altura que el primer nivel superior de un elemento de terreno fortaleza.</li>
                            <li><strong>B</strong> El parapeto superior es terreno Ligero.</li>
                            <li><strong>C</strong> La puerta es terreno Accesible y Pesado.</li>
                            <li><strong>D</strong> El punto de vista de la puerta es terreno Bloqueante.</li>
                            <li><strong>E</strong> Las ventanas intactas son terreno Barrado y Pesado.<p><strong>Terreno Barrado:</strong> La visibilidad no puede trazarse a través de este terreno a menos que el agente o lo que está intentando ver esté horizontalmente a 1” de él.</p>
                            </li>
                            <li>Todas las demás partes de la misma son terreno Pesado.</li>
                        </ul>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/largeruin-example-1.png" class="figure-img img-fluid rounded"></figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 volkus-rule">
                        <h3 id="volkus-title-4" class="rules-title mt-3">Ruina Pequeña</h3>
                        <p class="intro">Esto es terreno Pesado.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/smallruin-example-1.png" class="figure-img img-fluid rounded"></figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 volkus-rule">
                        <h3 id="volkus-title-5" class="rules-title mt-3">Escombros Pesados</h3>
                        <p class="intro">Esto es terreno Pesado.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/heavyrubble-example-1.png" class="figure-img img-fluid rounded"></figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 volkus-rule">
                        <h3 id="volkus-title-6" class="rules-title mt-3">Escombros Ligeros</h3>
                        <p class="intro">Esto es terreno Ligero.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/lightrubble-example-1.png" class="figure-img img-fluid rounded"></figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 volkus-rule">
                        <h3 id="volkus-title-7" class="rules-title mt-3">Combate Urbano</h3>
                        <p class="intro">Killzone: Volkus tiene las siguientes reglas adicionales.</p>
                    </div>
                    <div class="col-12 volkus-rule">
                        <h3 id="volkus-title-8" class="rules-title mt-3">Fortaleza Condensada</h3>
                        <p class="intro">Siempre que un agente esté disparando con un arma que tiene la regla de arma Estallido, Torrente y/o Devastadora x” (es decir, Devastadora con un requisito de distancia), también tiene la regla de arma Letal 5+ (pág. 111) si el objetivo está totalmente dentro de un elemento de terreno fortaleza y en el suelo de la killzone <span class="text-info-emphasis">o un escalón de fuego</span>.</p>
                        <p><em>La regla Fortaleza Condensada siempre se relaciona con la ubicación del objetivo, por lo que si el objetivo primario está totalmente dentro de una fortaleza, pero el objetivo secundario no lo está, entonces esta regla no se aplica a ese objetivo secundario.</em></p>
                    </div>
                    <div class="col-12 volkus-rule">
                        <h3 id="volkus-title-9" class="rules-title mt-3">Fortaleza Guarnecida</h3>
                        <p class="intro">Cuando un agente totalmente dentro de un elemento de terreno fortaleza está tomando represalias contra un agente que no lo está, el defensor resuelve primero (esto tiene precedencia sobre el orden normal de resolución de combate).</p>
                    </div>
                    <div class="col-12 volkus-rule">
                        <h3 id="volkus-title-10" class="rules-title mt-3">Combate en Puerta</h3>
                        <p class="intro"></p>
                        <div class="tacop">
                            <div class="header">
                                <div>Combate en Puerta</div>
                                <div class="ap-box">1LPA</div>
                            </div>
                            <div class="content">
                                <ul>
                                    <li><span class="icon icon-yes"></span>Combate con el agente activo (ver secuencia de combate en la página 44).</li>
                                    <li><span class="icon icon-yes"></span>En el paso de Seleccionar Agente Enemigo, selecciona un agente enemigo dentro de 2” de, y en el otro lado de, una puerta que el agente activo esté tocando. Durante la duración de esa acción, esos agentes se tratan como si estuvieran dentro del rango de control del otro.</li>
                                    <li><span class="icon icon-no"></span>Esta acción se trata como una acción de Combatir. Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, o si su peana no está tocando una puerta.</li>
                                </ul>
                            </div>
                        </div>
                        <p><em>Esta acción permite a un agente combatir a través de una puerta; es útil si el enemigo la está obstruyendo e impidiendo que tus agentes pasen.</em></p>
                    </div>
                </div>`
            },
            {
                title: 'Tomb World',
                content: `
                <div id="section-tomb_world" class="row basic-rules">
                    <div class="section">Tomb World</div>
                    <div class="col-12 intro">
                        <p>Killzone: Tomb World usa un tablero de juego de 606mm x 703mm con un sistema de cuadrícula de 6x7 para la preparación. Tiene 1x sarcófago, 4x escombros y 2x cada otro elemento de terreno especificado en la página 76-77. También tiene 16x medios pilares para completar la configuración del terreno. Ten en cuenta que algunos mapas de misión usan menos que esto.</p>
                        <p><em><b>Nota del diseñador:</b> Esta killzone es similar a Killzone: Gallowdark del Libro Básico de Kill Team. Para mantener la consistencia de las reglas - especialmente para aquellas impresas en otros lugares - hemos mantenido los términos iguales. Por ejemplo, aunque Killzone: Tomb World usa portales en lugar de escotillas, todavía lo llamamos una compuerta y los agentes realizan la acción <b>Operar Compuerta</b>.</em></p>
                    </div>
                    <div class="col-12 tomb_world-rule">
                        <h3 id="tomb_world-title-2" class="rules-title mt-3">Muro Tomb World</h3>
                        <p class="intro">Un elemento de terreno muro Tomb World es terreno Pesado y Muro. Algunos muros incluyen una compuerta (pág 55) o un punto de brecha (pág 56).</p>
                        Terreno Muro:
                        <ul>
                            <li>Los agentes no pueden moverse sobre o a través de terreno Muro (esto tiene precedencia sobre todas las demás reglas).</li>
                            <li>La visibilidad no puede determinarse sobre o a través de terreno Muro.</li>
                            <li>Aparte de hacia áreas de la killzone (centro de la killzone, zonas de desembarco, etc.), las distancias no pueden medirse sobre o a través de terreno Muro; deben medirse alrededor de él utilizando la ruta más corta posible.</li>
                            <li>Para los propósitos de cobertura y Ofuscado, solo las esquinas y extremos del terreno Muro pueden interponerse, a menos que el agente activo lo haya pasado (ver ejemplos en pág 54).</li>
                        </ul>
                        <figure class="figure"><img src="./resources/game_rules_files/tomb-world-walls-1.png" class="figure-img img-fluid rounded"></figure>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-walls-example-1.png" class="figure-img img-fluid rounded"><p>El agente A normalmente estaría a 3” del agente B, pero como las distancias no pueden medirse sobre o a través de terreno Muro, deben medirse alrededor del muro Tomb World. Esto haría que el agente A esté a más de 3” del agente B.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-walls-example-2.png" class="figure-img img-fluid rounded"><p>El agente B no está en cobertura ya que una esquina o extremo del muro no está interpuesta. Ten en cuenta que las partes menores del muro que sobresalen no hacen una esquina o extremo por sí solas; debe ser la estructura principal del muro la que dobla una esquina o termina, como se muestra en los siguientes diagramas.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-walls-example-3.png" class="figure-img img-fluid rounded"><p>Una esquina del muro está interpuesta, por lo tanto, el agente B está en cobertura.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-walls-example-4.png" class="figure-img img-fluid rounded"><p>El agente A ha pasado la esquina del muro, por lo tanto, no está interpuesta y el agente B no está en cobertura. Ten en cuenta que si el agente A estuviera totalmente en el lado izquierdo de la línea negra punteada, el muro estaría interpuesto y el agente B estaría en cobertura.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-walls-example-5.png" class="figure-img img-fluid rounded"><p>Un extremo del muro está interpuesto, por lo tanto, el agente B está en cobertura.</p>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-walls-example-6.png" class="figure-img img-fluid rounded"><p>Como la compuerta está abierta, un extremo del muro está interpuesto. Está a más de 1” de ambos agentes, por lo tanto, el agente B está Ofuscado.</p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 tomb_world-rule">
                        <h3 id="tomb_world-title-3" class="rules-title mt-3">Compuerta</h3>
                        <p class="intro">Una compuerta tiene dos estados: cerrada y abierta. Tiene dos partes — un punto de acceso y una escotilla — y sus tipos de terreno dependen del estado de la compuerta. Los agentes pueden realizar la acción de misión <b>Operar Compuerta</b> para cambiar su estado. Las compuertas comienzan la batalla cerradas.</p>
                        <p><em>Como el punto de acceso de una compuerta abierta es terreno Expuesto, los muros a ambos lados deben usarse para cobertura y obstrucción en lugar del punto de acceso.</em></p>
                        <div class="tacop">
                            <div class="header">
                                <div>Operar Compuerta</div>
                                <div class="ap-box">1LPA</div>
                            </div>
                            <div class="content">
                                <ul>
                                    <li><span class="icon icon-yes"></span>Abrir o cerrar una compuerta cuyo punto de acceso está dentro del rango de control del agente.</li>
                                    <li><span class="icon icon-yes"></span>Un agente puede realizar esta acción durante una acción de <b>Carrera</b> o <b>Reposicionarse</b>, y cualquier distancia de movimiento restante puede usarse después de hacerlo.</li>
                                    <li><span class="icon icon-no"></span>Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, o si esa compuerta está abierta y su punto de acceso está dentro del rango de control de un agente enemigo.</li>
                                </ul>
                            </div>
                        </div>
                        <p><em>Abrir una compuerta puede hacer que el agente esté dentro del rango de control de un agente enemigo, en cuyo caso su acción de Carrera o Reposicionarse terminaría inmediatamente (a menos que tenga reglas que le permitan moverse dentro del rango de control de un agente enemigo).</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-walls-hatchway-1.png" class="figure-img img-fluid rounded">
                                    <div class="sub-header">Cerrada</div>
                                    Mientras una compuerta está cerrada:
                                    <ul>
                                        <li>Su escotilla debe estar dentro de su punto de acceso.</li>
                                        <li>El punto de acceso y la escotilla son terreno Pesado y Muro.</li>
                                    </ul>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-walls-hatchway-2.png" class="figure-img img-fluid rounded">
                                    <div class="sub-header">Abierta</div>
                                    Mientras una compuerta está abierta:
                                    <ul>
                                        <li>Su escotilla debe ser retirada de la killzone.</li>
                                        <li>Su punto de acceso es terreno Accesible, Insignificante y Expuesto.</li>
                                        <li>Su punto de acceso también es terreno expuesto. Esto significa que el muro a cada lado de él debe usarse para cobertura u obstrucción en su lugar.</li>
                                    </ul>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 tomb_world-rule">
                        <h3 id="tomb_world-title-4" class="rules-title mt-3">Punto de Brecha</h3>
                        <p class="intro">Un punto de brecha tiene dos estados: cerrado y abierto. Tiene dos partes - un punto de acceso y un muro de brecha - y sus tipos de terreno dependen del estado del punto de brecha. Los puntos de brecha comienzan la batalla cerrados. Para abrir un punto de brecha, los agentes pueden realizar la acción de misión Abrir Brecha (en cuyo momento no se puede cerrar de nuevo).</p>
                        <div class="tacop">
                            <div class="header">
                                <div>Abrir Brecha</div>
                                <div class="ap-box">2LPA</div>
                            </div>
                            <div class="content">
                                <ul>
                                    <li><span class="icon icon-yes"></span>Abrir un punto de brecha cerrado cuyo punto de acceso está dentro del rango de control del agente.</li>
                                    <li><span class="icon icon-yes"></span>Un agente que tiene la(s) palabra(s) “breach marker”, “grenadier” o “mine” en su hoja de datos, o tiene un arma con la regla de arma Perforante 2 o Perforante Críticos 2 (excluyendo armas que tienen la regla de arma Estallido o Torrente) puede realizar esta acción por 1 PA menos (hasta un mínimo de 1PA), pero no puede hacerlo durante una activación/contraataque en la que realizó la acción de Cargar o Disparar (o viceversa).</li>
                                    <li><span class="icon icon-yes"></span>Tira un D6 por separado para cada agente que esté en el otro lado del punto de acceso y tenga ese punto de acceso dentro de su rango de control: con un 4+, resta 1 del atributo LPA de ese agente hasta el final de su próxima activación e inflige daño igual al resultado del dado dividido a la mitad (redondeando hacia arriba).</li>
                                    <li><span class="icon icon-no"></span>Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente, o si ese punto de brecha está abierto.</li>
                                </ul>
                            </div>
                        </div>
                        <p><em>Los agentes de élite que forman los kill teams están especialmente equipados para superar todo tipo de barreras. Algunos recurren a rasgos esotéricos y habilidades adaptables para forzar ingeniosamente una ruta hacia su objetivo. Desde potencia de fuego a quemarropa y desestabilizadores atómicos hasta bioácidos y fuerza bruta impulsada por la fe, los agentes tienen una variedad de métodos a su disposición para abrir puntos débiles. Las fuerzas involucradas pueden resultar en daños extremos, con escombros zumbando y ondas de choque violentas golpeando a aquellos con la mala suerte de estar del otro lado.</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-breachpoint-1.png" class="figure-img img-fluid rounded">
                                    <div class="sub-header">Cerrado</div>
                                    Mientras un punto de brecha está cerrado:
                                    <ul>
                                        <li>Su muro de brecha debe estar dentro de su punto de acceso.</li>
                                        <li>El punto de acceso y el muro de brecha son terreno Pesado y Muro.</li>
                                    </ul>
                                </figure>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-breachpoint-2.png" class="figure-img img-fluid rounded">
                                    <div class="sub-header">Abierto</div>
                                    Mientras un punto de brecha está abierto:
                                    <ul>
                                        <li>Su muro de brecha debe ser retirado de la killzone.</li>
                                        <li>Su punto de acceso es terreno Accesible e Insignificante.</li>
                                        <li>Su punto de acceso también es terreno Expuesto. Esto significa que los muros a ambos lados deben usarse para cobertura y obstrucción en su lugar.</li>
                                    </ul>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 tomb_world-rule">
                        <h3 id="tomb_world-title-5" class="rules-title mt-3">Plataforma de teletransporte</h3>
                        <p class="intro">Una plataforma de teletransporte es terreno Expuesto, Insignificante y de Ventaja. Solo un agente puede estar en ella a la vez, y mientras un agente está en ella, ese agente no puede tocar el suelo de la killzone (en otras palabras, un agente no puede estar tanto en la plataforma de teletransporte como en el suelo de la killzone).</p>
                        <figure class="figure"><img src="./resources/game_rules_files/tw-teleport_pad-1.png" class="figure-img img-fluid rounded"></figure>
                        <p>Desde el inicio del segundo punto de inflexión, siempre que un agente amigo en una plataforma de teletransporte realice la acción de <b>Cargar</b>, <b>Retirarse</b> o <b>Reposicionarse</b>, puedes teletransportarlo. Si lo haces, no lo muevas. En su lugar, retíralo de la killzone y colócalo de nuevo en la otra plataforma de teletransporte. Aún debe cumplir con todos los demás requisitos de esa acción, de lo contrario no puede teletransportarse (p. ej. si es la acción de <b>Cargar</b>, el agente debe terminar esa acción dentro del rango de control de un agente enemigo). Si otro agente está en la otra plataforma de teletransporte cuando un agente se teletransporta, intercámbialos (si es un agente enemigo, su jugador controlador lo coloca).</p>
                    </div>
                    <div class="col-12 tomb_world-rule">
                        <h3 id="tomb_world-title-6" class="rules-title mt-3">Sarcófago y escombros (terreno ligero)</h3>
                        <p class="intro">Esto es terreno Ligero.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/tw-lightrubble-example-1.png" class="figure-img img-fluid rounded"></figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 tomb_world-rule">
                        <h3 id="tomb_world-title-7" class="rules-title mt-3">Entorno Condensado</h3>
                        <p class="intro">Las armas con la regla de arma Estallido, Torrente y/o Devastadora x” (es decir, Devastadora con un requisito de distancia) también tienen la regla de arma Letal 5+ (pág. 111).</p>
                    </div>
                    <div class="col-12 tomb_world-rule">
                        <h3 id="tomb_world-title-8" class="rules-title mt-3">En Guardia</h3>
                        <p class="intro">Una vez durante la activación de cada agente enemigo, después de que ese agente enemigo realice una acción, puedes interrumpir esa activación y seleccionar un agente amigo en guardia para realizar la acción de <b>Combatir</b> o <b>Disparar</b> de forma gratuita (incluyendo acciones que se tratan como tales, p. ej. <b>Combate en Compuerta</b> enfrente).</p>
                        <p>Ese agente amigo puede incluso realizar la acción de <b>Disparar</b> mientras está dentro del rango de control de un agente enemigo (esto tiene precedencia sobre las condiciones normales de la acción de <b>Disparar</b>). Esto se conoce como un disparo a quemarropa y tiene las siguientes reglas adicionales mientras tu agente lo está haciendo:</p>
                        <ul>
                            <li>Apunta al agente enemigo dentro del rango de control de tu agente (incluso si normalmente no sería un Blanco Valido).</li>
                            <li>Empeora el atributo de Impacto de las armas de tu agente en 1.</li>
                            <li>Hasta el final de la activación del agente enemigo interrumpido, tu agente no puede tomar represalias.</li>
                        </ul>
                        <p><em>Determina el objetivo de manera normal para estas acciones. Esto significa que no tienes que apuntar al agente que interrumpiste.</em></p>
                        <div class="tacop">
                            <div class="header">
                                <div>Guardia</div>
                                <div class="ap-box">1LPA</div>
                            </div>
                            <div class="content">
                                <ul>
                                    <li><span class="icon icon-yes"></span>El agente se pone en guardia (ver abajo) hasta que ocurra cualquiera de lo siguiente:
                                        <ul>
                                            <li>Realiza cualquier acción.</li>
                                            <li>Un agente enemigo termina una acción dentro de su rango de control y no interrumpes esa activación (ver abajo).</li>
                                            <li>Su orden cambia.</li>
                                            <li>Es el inicio del siguiente punto de inflexión.</li>
                                        </ul>
                                    </li>
                                    <li><span class="icon icon-no"></span>Esta acción se trata como una acción de <b>Disparar</b>. Un agente no puede realizar esta acción mientras tiene una orden de Ocultación, o mientras está dentro del rango de control de un agente enemigo.</li>
                                </ul>
                            </div>
                        </div>
                        <p><em><b>Guardia</b> es una acción poderosa que permite a un agente atacar más tarde, en el momento oportuno. Puede cambiar la dinámica del juego, así que trata de evitar a los agentes enemigos en guardia, o considera cómo utilizarla mejor tú mismo. Usa la ficha de arriba para indicar cualquier agente que esté en guardia.</em></p>
                    </div>
                    <div class="col-12 tomb_world-rule">
                        <h3 id="tomb_world-title-9" class="rules-title mt-3">Combate en Compuerta</h3>
                        <p class="intro"></p>
                        <div class="tacop">
                            <div class="header">
                                <div>Combate en Compuerta</div>
                                <div class="ap-box">1LPA</div>
                            </div>
                            <div class="content">
                                <ul>
                                    <li><span class="icon icon-yes"></span>Combate con el agente activo (ver secuencia de combate <a href="#" class="goToTabAndSection" data-tab="actions-tab" data-target="#fight-action">aquí</a>)</li>
                                    <li><span class="icon icon-yes"></span>En el paso de Seleccionar Agente Enemigo, en su lugar selecciona un agente enemigo dentro de 2” de, y en el otro lado de, un punto de acceso de una compuerta abierta que el agente activo esté tocando. Durante la duración de esa acción, esos agentes se tratan como si estuvieran dentro del rango de control del otro.</li>
                                    <li><span class="icon icon-no"></span>Esta acción se trata como una acción de <b>Combatir</b>. Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, o si su peana no está tocando un punto de acceso de una compuerta abierta.</li>
                                </ul>
                            </div>
                        </div>
                        <p><em>Esta acción permite a un agente combatir a través de una compuerta abierta — útil si el enemigo la está obstruyendo e impidiendo que tus agentes pasen.</em></p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/hatchwayfight-example-1.png" class="figure-img img-fluid rounded"><p>La peana del agente A está tocando el punto de acceso de una compuerta abierta. Puede realizar la acción <b>Combate en Compuerta</b> para combatir contra el agente B o C.</p>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>`
            }
        ],
        equipment: [
            {
                title: 'Equipamiento Universal',
                content: `
                <div id="section-gequipment" class="row basic-rules">
                    <div class="section">Equipamiento Universal</div>
                    <div class="col-12 intro">
                        <p>Las siguientes opciones de equipamiento están disponibles para todos los kill teams, junto con su equipamiento de facción. No puedes seleccionar cada opción más de una vez por batalla.</p>
                    </div>
                    <div class="col-12 gequipment-rule">
                        <h3 id="gequipment-title-0" class="rules-title mt-3">1x Alijo de Munición</h3>
                        <div class="row intro mb-2">
                            <div class="col-sm-3 col-4 text-center pe-0 equipment-image-container"><img class="mx-auto" src="./resources/game_rules_files/ammo-cache.png"></div>
                            <div class="col-sm-9 col-8">
                                <p>Antes de la batalla, puedes colocar uno de tus marcadores de Alijo de Munición totalmente dentro de tu territorio. Los agentes amigos pueden realizar la siguiente acción de misión durante la batalla.</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 unique-actions-section">
                                <div class="header">
                                    <div class="name-action">Reabastecimiento de Munición</div>
                                    <div class="ap-box">0PA</div>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li><span class="icon icon-yes"></span> Uno de tus marcadores de Alijo de Munición que el agente activo controla es usado este punto de inflexión.</li>
                                        <li><span class="icon icon-yes"></span> Hasta el inicio del siguiente punto de inflexión, siempre que este agente esté disparando con un arma de su hoja de datos, puedes volver a tirar uno de tus dados de ataque.</li>
                                        <li><span class="icon icon-no"></span> Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, si ese marcador no es tuyo, o si ese marcador ha sido usado este punto de inflexión.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gequipment-rule">
                        <h3 id="gequipment-title-1" class="rules-title mt-3">1x Dispositivo de Comunicaciones</h3>
                        <div class="row intro mb-2">
                            <div class="col-sm-3 col-4 text-center pe-0 equipment-image-container"><img class="mx-auto" src="./resources/game_rules_files/comms-device.png"></div>
                            <div class="col-sm-9 col-8">
                                <p>Antes de la batalla, puedes colocar uno de tus marcadores de Dispositivo de Comunicaciones totalmente dentro de tu territorio. Mientras un agente amigo controle este marcador, suma 3" a los requisitos de distancia de sus reglas de <b>APOYO</b> que se refieren a agentes amigos (p. ej., "selecciona un agente amigo dentro de 6" sería "dentro de 9" en su lugar"). Ten en cuenta que no puedes beneficiarte de los marcadores de Dispositivo de Comunicaciones de tu oponente.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gequipment-rule">
                        <h3 id="gequipment-title-2" class="rules-title mt-3">1x Minas</h3>
                        <div class="row intro mb-2">
                            <div class="col-sm-3 col-4 text-center pe-0 equipment-image-container"><img class="mx-auto" src="./resources/game_rules_files/mines.png"></div>
                            <div class="col-sm-9 col-8">
                                <p>Antes de la batalla, puedes colocar hasta uno de tus marcadores de Minas totalmente dentro de tu territorio y a más de 2" de otros marcadores, puntos de acceso y terreno accesible. La primera vez que ese marcador esté dentro del rango de control de un agente, retira ese marcador e inflige D3+3 de daño a ese agente.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gequipment-rule">
                        <h3 id="gequipment-title-3" class="rules-title mt-3">1x Alambre de Espino</h3>
                        <div class="row intro mb-2">
                            <div class="col-sm-3 col-4 text-center pe-0 equipment-image-container"><img class="mx-auto" src="./resources/game_rules_files/razor-wire.png"></div>
                            <div class="col-sm-9 col-8">
                                <p>El alambre de espino es terreno Expuesto y Obstructor. Antes de la batalla, puedes colocarlo totalmente dentro de tu territorio, en el suelo de la killzone y a más de 2" de otros elementos de terreno de equipamiento, puntos de acceso y terreno accesible.</p>
                                <p><strong>Obstructor:</strong> Siempre que un agente cruzara sobre este elemento de terreno dentro de 1" de él, trata la distancia como 1" adicional.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gequipment-rule">
                        <h3 id="gequipment-title-4" class="rules-title mt-3">2x Barricadas Ligeras</h3>
                        <div class="row intro mb-2">
                            <div class="col-sm-3 col-4 text-center pe-0 equipment-image-container"><img class="mx-auto" src="./resources/game_rules_files/light-barricade.png"></div>
                            <div class="col-sm-9 col-8">
                                <p>Las barricadas ligeras son terreno Ligero, excepto las patas, que son Insignificantes y Expuestas. Antes de la batalla, puedes colocar cualquier número de ellas totalmente dentro de tu territorio, en el suelo de la killzone y a más de 2" de otros elementos de terreno de equipamiento, puntos de acceso y terreno accesible.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gequipment-rule">
                        <h3 id="gequipment-title-5" class="rules-title mt-3">1x Barricada Pesada</h3>
                        <div class="row intro mb-2">
                            <div class="col-sm-3 col-4 text-center pe-0 equipment-image-container"><img class="mx-auto" src="./resources/game_rules_files/heavy-barricade.png"></div>
                            <div class="col-sm-9 col-8">
                                <p>Una barricada pesada es terreno Pesado. Antes de la batalla, puedes colocarla totalmente dentro de <span class="text-info-emphasis">4"</span> de tu zona de desembarco, en el suelo de la killzone y a más de 2” de otros elementos de terreno de equipamiento, puntos de acceso y terreno accesible.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gequipment-rule">
                        <h3 id="gequipment-title-6" class="rules-title mt-3">2x Escaleras</h3>
                        <div class="row intro mb-2">
                            <div class="col-sm-3 col-4 text-center pe-0 equipment-image-container"><img class="mx-auto" src="./resources/game_rules_files/ladder.png"></div>
                            <div class="col-sm-9 col-8">
                                <p>Las escaleras son terreno Expuesto. Antes de la batalla, puedes colocar cualquier número de ellas de la siguiente manera:</p>
                                <ul>
                                    <li><span class="icon icon-info"></span> Totalmente dentro de tu territorio.</li>
                                    <li><span class="icon icon-info"></span> Erguidas contra terreno que tenga una altura de al menos 2".</li>
                                    <li><span class="icon icon-info"></span> A más de 2" de otros elementos de terreno de equipamiento.</li>
                                    <li><span class="icon icon-info"></span> A más de 1" de puertas y puntos de acceso.</li>
                                </ul>
                                <p>Además, un agente puede moverse a través de las escaleras como si no estuvieran allí (pero no puede terminar sobre ellas), o escalarlas. Una vez por acción, siempre que un agente esté escalando este elemento de terreno, trata la distancia vertical como 1". Ten en cuenta que si un agente luego continúa escalando otro elemento de terreno durante esa acción (incluyendo otra escalera), esa distancia se determina de manera normal.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gequipment-rule">
                        <h3 id="gequipment-title-7" class="rules-title mt-3">1x Barricada Portátil</h3>
                        <div class="row intro mb-2">
                            <div class="col-sm-3 col-4 text-center pe-0 equipment-image-container"><img class="mx-auto" src="./resources/game_rules_files/portable-barricade.png"></div>
                            <div class="col-sm-9 col-8">
                                <p>Una barricada portátil es terreno Ligero, Protector y Portátil. Antes de la batalla, puedes colocarla totalmente dentro de tu territorio, en el suelo de la killzone y a más de 2" de otros elementos de terreno de equipamiento, puntos de acceso y terreno accesible.</p>
                                <p><b>Protector:</b> Mientras un agente está en Cobertura detrás de este elemento de terreno, mejora su atributo de Salvación en 1 (hasta un máximo de 2+).</p>
                                <p><b>Portátil:</b> Este elemento de terreno solo proporciona cobertura mientras un agente está conectado a él y si el escudo está interpuesto (ignora sus patas). Los agentes conectados al interior del mismo pueden realizar la siguiente acción única durante la batalla.</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 unique-actions-section">
                                <div class="header">
                                    <div class="name-action">Mover con Barricada</div>
                                    <div class="ap-box">1PA</div>
                                </div>
                                <div class="content">
                                    <ul>
                                        <li><span class="icon icon-yes"></span> Lo mismo que la acción <b>Reposicionarse</b>, excepto que el agente activo no puede moverse más que su atributo de Movimiento menos 2" y no puede escalar, caer, saltar o usar reglas de cualquier kill team que lo retiren y lo vuelvan a colocar (p. ej. VOLAR de HEARTHKYN SALVAGER, PASO DE SOMBRAS de MANDRAKE).</li>
                                        <li><span class="icon icon-yes"></span> Antes de que este agente se mueva, retira la barricada portátil a la que está conectado. Después de que el agente se mueva, coloca la barricada portátil para que esté una vez más<span class="text-info-emphasis">, pero la barricada portátil no puede colocarse a menos de 2" de otros elementos de terreno de equipamiento, puntos de acceso o terreno Accesible. Si esto no es posible, la barricada portátil no se vuelve a colocar</span>.</li>
                                        <li><span class="icon icon-no"></span> Esta acción se trata como una acción de <b>Reposicionarse</b>. Un agente no puede realizar la acción Mover con Barricada en el mismo punto de inflexión en el que realizó las acciones de <b>Retirarse</b> o <b>Cargar</b>.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <figure class="figure"><img src="./resources/game_rules_files/portable_barricade-1.png" class="figure-img img-fluid rounded"><p>El agente debe contactar ambas patas del interior de la barricada portátil para estar conectado a ella.</p>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gequipment-rule">
                        <h3 id="gequipment-title-8" class="rules-title mt-3">Granadas de Utilidad</h3>
                        <p class="intro">Cuando seleccionas este equipamiento, selecciona dos granadas de utilidad (2 de humo, 2 aturdidoras, o 1 de humo y 1 aturdidora). Cada selección es una acción única que tus agentes pueden realizar, pero tu kill team solo puede usar esa arma un número total de veces durante la batalla igual a tu selección.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <div class="tacop">
                                    <div class="header">
                                        <div>GRANADA DE HUMO</div>
                                        <div class="ap-box">1PA</div>
                                    </div>
                                    <div class="content">
                                        <ul>
                                            <li><span class="icon icon-yes"></span>Coloca uno de tus marcadores de granada de humo a 6" de este agente. Debe ser visible para este agente o estar colocado en terreno de ventaja o un elemento de terreno visible para este agente. El marcador crea un área de humo de 1" horizontalmente e ilimitada verticalmente desde él (pero no debajo de él).</li>
                                            <li><span class="icon icon-yes"></span>Mientras un agente está totalmente dentro de un área de humo, se considera Ofuscado para los agentes a más de 2" de distancia de él y viceversa. Además, cuando un agente dispara a un agente enemigo que está totalmente dentro de un área de humo, la regla Perforante se ignora a menos que ambos agentes estén a menos de 2" el uno del otro.</li>
                                            <li><span class="icon icon-yes"></span>En el Paso de Preparar de la próxima Fase de Estrategia, tira un D3. Retira ese marcador de granada de humo una vez que se complete un número de activaciones igual al resultado de ese D3, o al final del punto de inflexión (lo que ocurra primero).</li>
                                            <li><span class="icon icon-no"></span>Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, o si se ha alcanzado el número total de veces que tu kill team puede realizarla.</li>
                                        </ul>
                                        <figure class="figure"><img src="./resources/game_rules_files/utilitygrenades-example-1.png" class="figure-img img-fluid rounded"></figure>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <div class="tacop">
                                    <div class="header">
                                        <div>GRANADA ATURDIDORA</div>
                                        <div class="ap-box">1PA</div>
                                    </div>
                                    <div class="content">
                                        <ul>
                                            <li><span class="icon icon-yes"></span>Selecciona un agente enemigo a 6" de este agente y visible para él. Ese agente y cada otro agente a 1" de él hace un chequeo de aturdimiento. Para hacer un chequeo de aturdimiento, tira un D6: si el resultado es 3+, resta 1 de su atributo LPA hasta el final de su próxima activación.</li>
                                            <li><span class="icon icon-no"></span>Un agente no puede realizar esta acción mientras esté dentro del rango de control de un agente enemigo, o si has alcanzado el número total de veces que tu kill team puede realizarla.</li>
                                        </ul>
                                        <figure class="figure"><img src="./resources/game_rules_files/utilitygrenades-example-2.png" class="figure-img img-fluid rounded"></figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 gequipment-rule">
                        <h3 id="gequipment-title-9" class="rules-title mt-3">Granadas Explosivas</h3>
                        <p class="intro">Las fuerzas del 41.º Milenio utilizan una amplia gama de granadas ofensivas, desde simples granadas de fragmentación hasta granadas de conmoción de plasma y gravíticas, e incluso dispositivos más exóticos empleados para perforar la armadura enemiga.</p>
                        <p>Cuando seleccionas este equipamiento, selecciona dos granadas explosivas (2 frag, 2 krak, o 1 frag y 1 krak). Cada selección es un arma única que tus agentes pueden usar, pero tu kill team solo puede usar esa arma un número total de veces durante la batalla igual a tu selección.</p>
                        <div class="row rules-examples">
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <div class="weapons-table col-12 p-0 pt-2 position-relative">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th class="text-start ps-2">Nombre</th>
                                                <th>A</th>
                                                <th>HP</th>
                                                <th>D</th>
                                            </tr>
                                            <tr>
                                                <td class="text-start ps-2">Granada Frag</td>
                                                <td>4</td>
                                                <td>4+</td>
                                                <td>2/4</td>
                                            </tr>
                                            <tr>
                                                <th colspan="4" class="text-start ps-2">REGLAS DE ARMA</th>
                                            </tr>
                                            <tr>
                                                <td colspan="4" class="text-start ps-2">Alcance 6", Estallido 2", Saturar</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <figure class="figure"><img src="./resources/game_rules_files/explosivegrenades-example-1.png" class="figure-img img-fluid rounded"></figure>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 rules-example">
                                <div class="weapons-table col-12 p-0 pt-2 position-relative">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th class="text-start ps-2">Nombre</th>
                                                <th>A</th>
                                                <th>HP</th>
                                                <th>D</th>
                                            </tr>
                                            <tr>
                                                <td class="text-start ps-2">Granada Krak</td>
                                                <td>4</td>
                                                <td>4+</td>
                                                <td>4/5</td>
                                            </tr>
                                            <tr>
                                                <th colspan="4" class="text-start ps-2">REGLAS DE ARMA</th>
                                            </tr>
                                            <tr>
                                                <td colspan="4" class="text-start ps-2">Alcance 6", Perforante 1, Saturar</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <figure class="figure"><img src="./resources/game_rules_files/explosivegrenades-example-2.png" class="figure-img img-fluid rounded"></figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            }
        ]
    };

    const searchInput = document.getElementById('rules-search-input');
    const searchButton = document.getElementById('rules-search-button');
    const searchResultsContainer = document.getElementById('search-results');
    const principlesContainer = document.getElementById('principles-content');
    const actionsContainer = document.getElementById('actions-content');
    const weaponsContainer = document.getElementById('weapons-content');
    const terrainContainer = document.getElementById('terrain-content');
    const equipmentContainer = document.getElementById('equipment-content');

    function renderRules() {
        console.log('Rendering rules...');
        let principlesHtml = '';
        rulesData.principles.forEach(section => {
            principlesHtml += section.content;
        });
        principlesContainer.innerHTML = principlesHtml;

        let actionsHtml = '';
        rulesData.actions.forEach(section => {
            actionsHtml += section.content;
        });
        actionsContainer.innerHTML = actionsHtml;

        let weaponsHtml = '';
        rulesData.weapons.forEach(section => {
            weaponsHtml += section.content;
        });
        weaponsContainer.innerHTML = weaponsHtml;

        let terrainHtml = '';
        rulesData.terrain.forEach(section => {
            terrainHtml += section.content;
        });
        terrainContainer.innerHTML = terrainHtml;

        let equipmentHtml = '';
        rulesData.equipment.forEach(section => {
            equipmentHtml += section.content;
        });
        equipmentContainer.innerHTML = equipmentHtml;
        console.log('Rules rendered.');
    }

    function searchRules(searchTerm) {
        searchResultsContainer.innerHTML = '';
        if (searchTerm.length < 3) {
            searchResultsContainer.style.display = 'none';
            return;
        }
        searchResultsContainer.style.display = 'block';

        const results = [];
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        ['principles', 'actions', 'weapons', 'terrain', 'equipment'].forEach(category => {
            rulesData[category].forEach(section => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = section.content;

                const titles = tempDiv.querySelectorAll('.rules-title');
                titles.forEach(title => {
                    if (title.textContent.toLowerCase().includes(lowerCaseSearchTerm)) {
                        results.push({ title: title.textContent, id: title.id, category: category });
                    }
                });
            });
        });


        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('a');
                resultItem.href = `#${result.id}`;
                resultItem.classList.add('list-group-item', 'list-group-item-action');
                resultItem.textContent = result.title;
                resultItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const tabButton = document.getElementById(`${result.category}-tab-button`);
                    if(tabButton) {
                        const tab = new bootstrap.Tab(tabButton);
                        tab.show();
                    }

                    setTimeout(() => {
                        const targetElement = document.getElementById(result.id);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 200);
                    searchResultsContainer.style.display = 'none';
                    searchInput.value = '';
                });
                searchResultsContainer.appendChild(resultItem);
            });
        } else {
            const noResults = document.createElement('div');
            noResults.classList.add('list-group-item');
            noResults.textContent = 'No se encontraron resultados.';
            searchResultsContainer.appendChild(noResults);
        }
    }

    function init() {
        console.log('Initializing rules...');
        renderRules();

        searchButton.addEventListener('click', () => {
            searchRules(searchInput.value);
        });

        searchInput.addEventListener('input', () => {
            searchRules(searchInput.value);
        });

        document.addEventListener('click', (e) => {
            if (!searchResultsContainer.contains(e.target) && e.target !== searchInput) {
                searchResultsContainer.style.display = 'none';
            }
        });
    }

    init();
});