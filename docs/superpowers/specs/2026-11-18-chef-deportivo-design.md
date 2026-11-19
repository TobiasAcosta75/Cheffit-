# Chef Deportivo — Documento de diseño

Fecha: 2026-11-18
Fuente: `maqueta/Idea maqueta.docx`, imagen "Etapa 3 – pulido de la definición" y conversación de brainstorming.

Convención: lo marcado **[decisión de Claude]** fue propuesto por Claude y no elegido explícitamente por el usuario; se puede corregir.

---

## 1. Intención y porqué

La persona que entrena y sigue macros pierde tiempo y energía decidiendo qué comer para encajar los números ("me faltan 45 g de proteína y 60 g de carbos para la cena, ¿qué preparo en 15 minutos con lo que tengo?"). La app es un **chef personal deportivo**: a partir de los macros del día, la etapa del plan y el ritmo de entrenamiento, **decide qué cocinar y en qué cantidades**, y se reacomoda cuando el día no sale como estaba planeado.

Diferencial: precisión de planilla de macros + practicidad de recetario, con comida variada (no "pollo hervido con arroz").

Uso inicial: el propio usuario. Debe quedar preparada para abrirse a otros usuarios más adelante (sin rehacer la base).

## 2. Objetivos, no-objetivos, anti-objetivos

**Objetivos**
- Todos los módulos del documento original funcionando: perfil y etapas, objetivos diarios dinámicos, motor "El Chef", gestor diario, recetario, meal prep y lista de compras, modo heladera.
- Cerrar el día dentro de tolerancia de macros con el menor esfuerzo posible.
- Registrar comidas fuera de plan escribiendo en lenguaje natural.

**No-objetivos (por ahora)**
- App nativa de tiendas (es web adaptada al celular / PWA).
- Panel para nutricionistas/coaches, pagos, suscripciones.
- Registro por foto o código de barras.
- Micronutrientes detallados.

**Anti-objetivos (fallaría aunque "funcione")**
- Que la IA invente los números de macros. Los macros **siempre** se calculan con la base de alimentos.
- Que registrar lo comido sea lento o tedioso.
- Que la app empuje déficits peligrosos sin avisar.
- Que el chef sugiera siempre las mismas 5 recetas.

## 3. Restricciones

- Usuario en Argentina: alimentos, productos, medidas caseras y vocabulario locales (español rioplatense).
- Costo mínimo: planes gratuitos de hosting/base de datos para uso propio; la IA se paga por uso.
- Uso principal desde el celular.
- IA: Claude (Anthropic).

## 4. Enfoques considerados

| Enfoque | Qué es | Trade-off |
|---|---|---|
| **A. Next.js + Supabase + Claude, desplegado en Vercel (ELEGIDO)** | Un solo proyecto TypeScript para front y lógica; Supabase da Postgres, autenticación y seguridad por usuario | Gratis para uso propio, un solo código, multiusuario listo. El optimizador de porciones se resuelve en TS (suficiente para este tamaño de problema). |
| B. FastAPI (Python) + React + Postgres en Railway/Render | Backend y front separados | Mejores librerías matemáticas, pero dos proyectos y ~USD 5/mes. Solo vale si el optimizador se vuelve muy complejo. |
| Descartado: n8n / no-code | Automatizaciones + front simple | Recálculo en tiempo real y optimización de porciones quedan forzados. |

El usuario eligió **A**.

## 5. Decisiones del usuario

| Tema | Decisión |
|---|---|
| Público | Empezar para uso propio, diseñado para crecer a otros usuarios |
| Alcance | App completa del documento |
| Plataforma | Web adaptada al celular |
| Recetas | Mixto: recetario base curado + IA que adapta/genera variantes, macros siempre validados contra la base |
| Recetario inicial | Claude genera ~50 recetas argentinas; el usuario las revisa (aprueba/corrige/descarta) |
| Macros por etapa | Ambos: cálculo automático por defecto, o carga manual de reglas g/kg del nutricionista |
| Rango de carbos | Valor alto en días de entreno, valor bajo en descanso (ej. 1,8 / 1,5 g/kg) |
| Calorías | Mandan los macros; la app avisa con un piso de seguridad y si el déficit es extremo |
| Registro fuera de plan | Texto libre interpretado por IA, con confirmación |
| Base de alimentos | Tablas públicas (ARGENFOODS / USDA / Open Food Facts) + alimentos propios del usuario |
| Peso | Seguimiento de peso; la app propone nuevos macros y el usuario confirma |
| Modo heladera | Inventario que se actualiza (suma con compras, resta al cocinar, corrección manual) |
| Entreno | Semana tipo (días, horario, intensidad) + ajuste puntual por día |
| Parte técnica | Claude propone y explica; el usuario aprueba |
| IA | Claude (Anthropic) |
| Estilo visual | Pendiente: ver 2–3 propuestas antes de construir la interfaz |
| Plan vs chef | Si hay plan de 3/7 días, el chef mantiene las recetas planificadas y solo ajusta gramos; puede ofrecer cambiar una receta, pero decide el usuario |
| Meal prep | Porciones fijas e iguales; quedan como "platos preparados" que el chef usa primero, compensando con las demás comidas |
| Comensales | Solo el usuario: cada receta es una porción |
| Compartido (multiusuario) | Alimentos importados y recetas iniciales son globales, curados por el usuario como administrador; corregir un alimento global crea una copia personal; recetas creadas/aprobadas por cada usuario son privadas |

## 6. Diseño funcional

### 6.1 Perfil y onboarding
Datos: sexo, edad, altura, peso inicial, nivel de actividad, objetivo (definición / mantenimiento / volumen), cantidad de comidas por día (incluye colaciones pre/post entreno), alimentos a evitar, restricciones (ej. sin lactosa), tiempo máximo de cocina preferido por defecto, semana tipo de entrenamiento.

### 6.2 Etapas y reglas de macros
- Una **etapa** tiene: nombre, fecha de inicio (y fin opcional), objetivo, y **reglas en g/kg**:
  - Proteína: valor fijo (ej. 2,2).
  - Carbohidratos: valor para día de entreno y valor para día de descanso (ej. 1,8 / 1,5).
  - Grasas: valor fijo (ej. 1,0).
  - Notas libres del nutricionista (ej. "déficit calórico fuerte", "priorizar saciedad").
- Hay una sola etapa activa a la vez; el historial de etapas se conserva.
- **Modo manual**: el usuario carga las reglas tal como se las dio el nutricionista (caso de la imagen: Etapa 3).
- **Modo automático** [decisión de Claude]: se estima el gasto con Mifflin-St Jeor × factor de actividad y se proponen reglas por objetivo:
  - Definición: P 2,0–2,2 g/kg · G 0,8–1,0 g/kg · C el resto hasta un déficit ~20 %.
  - Mantenimiento: P 1,8 g/kg · G 1,0 g/kg · C el resto hasta el gasto estimado.
  - Volumen: P 1,8 g/kg · G 1,0 g/kg · C el resto hasta un superávit ~10 %.
  - Para días de entreno vs descanso se reparte la diferencia de carbos (ej. ±10 %).
  El usuario puede editar cualquier valor antes de guardar.
- Macros del día (gramos) = regla g/kg × **peso de referencia** (ver 6.3). kcal = 4·P + 4·C + 9·G.

### 6.3 Peso y recálculo con confirmación
- El usuario carga peso cuando quiera (diario o semanal).
- Peso de referencia = promedio de los últimos 7 días con datos [decisión de Claude].
- Si el promedio difiere ≥ 1 % del peso de referencia vigente [decisión de Claude], la app muestra una propuesta: "Tus nuevos macros serían P X / C Y / G Z. ¿Aplicar?". Solo al confirmar cambia el peso de referencia.
- Gráfico simple de evolución de peso.

### 6.4 Seguridad calórica
[decisión de Claude, valores ajustables]
- Aviso si las kcal del día quedan por debajo de la tasa metabólica basal estimada.
- Aviso si el déficit supera ~30 % del gasto estimado.
- Avisos, no bloqueos. Texto de aclaración en onboarding: la app no reemplaza a un profesional.

### 6.5 Entrenamiento y tipo de día
- Semana tipo: para cada día, si entrena, horario e intensidad (baja/media/alta).
- Ajuste puntual: cambiar el día de hoy (o cualquier fecha) sin tocar la semana tipo.
- El tipo de día define qué valor de carbos usar. El horario define en qué comidas se ubican más carbos (pre y post entreno).

### 6.6 Motor de recomendación ("El Chef")
1. **Reparto del día en comidas.** Los macros del día se reparten entre los slots configurados (desayuno, almuerzo, merienda, cena, pre/post entreno). En días de entreno, una parte mayor de carbos va al pre y post entreno según el horario; la proteína se reparte de forma pareja; la grasa se aleja del pre entreno. [decisión de Claude: proporciones concretas a cargo del constructor, configurables]
2. **Candidatos.** Recetas aptas para el momento del día, que respeten las restricciones y alimentos evitados, y el tiempo máximo si el filtro está activo. Con "modo heladera" activo, solo recetas cuyos ingredientes estén en el inventario (con opción de mostrar "te falta 1 ingrediente").
3. **Escalado de porciones.** Cada ingrediente de una receta indica si es escalable y su rango (mín/máx en gramos; ej. pechuga 100–250 g; condimentos fijos). El chef ajusta los gramos para acercarse al objetivo de la comida minimizando el error, con la proteína pesando más. Este es el mecanismo central para "encajar los números".
4. **Ranking.** Ajuste a macros tras escalar (primero), saciedad en etapas de déficit (proteína y volumen por kcal), variedad (penaliza recetas usadas en los últimos días), favoritos, uso de lo que hay en la heladera.
5. **Intercambio rápido.** Un botón muestra la siguiente mejor alternativa equivalente para ese slot.
6. **Recálculo en tiempo real.** Cada vez que se registra o modifica una comida, el objetivo restante del día se redistribuye entre las comidas no hechas y se recalculan las sugerencias.
7. **Días con plan.** Si el día pertenece a un plan de 3/7 días (6.10), las comidas del día son las recetas planificadas: el recálculo solo ajusta gramos dentro de los rangos de cada ingrediente. Si no alcanza para cerrar el día, el chef **ofrece** cambiar una receta (preferentemente por una que use lo que hay en el inventario); el cambio solo ocurre si el usuario lo acepta. Los platos preparados (meal prep) tienen macros fijos y no se escalan; el chef compensa con las otras comidas. En días sin plan, el chef elige libremente.
8. **Persistencia.** Las sugerencias de cada slot se guardan; abrir el panel no las cambia. Solo se recalculan las comidas no hechas cuando cambia algo (registro, edición, cambio de tipo de día, nuevo peso aplicado) o cuando el usuario pide intercambio.
9. **Tolerancia de "día cerrado"** [decisión de Claude]: ±5 g proteína, ±10 g carbos, ±5 g grasas; configurable.

### 6.7 Rol de la IA (Claude)
La IA **nunca** produce los números finales de macros.
- **Interpretar texto libre**: "2 empanadas de carne y una coca zero" → lista estructurada de alimentos de la base + gramos estimados (usando medidas caseras). El usuario ve y corrige antes de guardar. Si un alimento no existe en la base, la IA propone el más parecido o la creación de uno nuevo (el usuario confirma los valores).
- **Generar variantes y recetas nuevas**: la IA propone ingredientes (elegidos de la base), gramos y pasos; el sistema calcula los macros; la receta queda como "pendiente de revisión" hasta que el usuario la apruebe.
- **Recetario inicial**: proceso de una sola vez que genera ~50 recetas argentinas, rápidas, cubriendo todos los momentos del día, calculadas contra la base; el usuario las revisa en una pantalla de aprobación.

### 6.8 Gestor diario
- Panel principal: barras de progreso de proteína, carbos, grasas y kcal (consumido vs objetivo del día), tipo de día, etapa activa.
- Lista de comidas del día con la sugerencia del chef. Acciones: marcar como hecha, cambiar porciones (ej. 150 → 200 g de carne, impacto visible al instante), intercambiar, registrar otra cosa.
- Registro rápido por texto libre (6.7).

### 6.9 Recetario
- Ficha: ingredientes en gramos y medida casera, pasos cortos, tiempo, momento(s) del día, etiquetas, macros por porción, foto opcional.
- Favoritos, búsqueda y filtros (tiempo, momento, etiqueta).
- Alta/edición manual de recetas y aprobación de recetas generadas por IA.

### 6.10 Planificación y meal prep
- Planificar 3 o 7 días: el chef propone el menú completo respetando el tipo de cada día; el usuario puede cambiar comidas.
- El plan es un dato guardado (no solo una propuesta): define las recetas de cada comida y alimenta la lista de compras. Ver 6.6 punto 7 para cómo reacciona el chef.
- Meal prep: marcar una receta para cocinar en lote (N porciones). Al cocinar el lote se fijan los gramos y se crea un **plato preparado** con N porciones iguales y macros fijos por porción. El plan asigna esas porciones a comidas concretas; el chef las usa primero y compensa con el resto del día.
- Las recetas son siempre para una persona (el usuario cocina solo para sí); un lote es N veces esa porción.

### 6.11 Lista de compras
- Generada desde el plan: total de ingredientes **menos lo que hay en el inventario**, agrupado por categoría (verdulería, carnicería, almacén, lácteos…).
- Mostrar en gramos y en unidad de compra cuando aplique (ej. "6 huevos", "1 kg de pechuga").
- Al marcar comprado, se suma al inventario.

### 6.12 Modo heladera (inventario)
- Inventario por alimento, en gramos (o unidades convertidas a gramos).
- Suma al marcar compras; resta los ingredientes **al cocinar** (gramos reales de la receta o del lote).
- Los platos preparados son ítems del inventario contados en porciones; se descuenta una porción al marcarla como comida.
- Corrección manual en cualquier momento (los números van a desviarse; la corrección tiene que ser rápida).

### 6.13 Base de alimentos
- Valores por 100 g: kcal, proteínas, carbohidratos, grasas, fibra.
- Fuente de cada alimento (ARGENFOODS / USDA / Open Food Facts / usuario).
- Medidas caseras por alimento (ej. 1 huevo = 50 g, 1 cucharada de aceite = 13 g).
- Importación inicial con un subconjunto relevante (alimentos comunes en Argentina); el usuario puede crear y corregir alimentos.

### 6.14 Preparada para varios usuarios
- Autenticación y aislamiento de datos por usuario desde el primer día (aunque haya un solo usuario).
- Alimentos y recetas "globales" (compartidas) vs "del usuario":
  - Globales: alimentos importados y las ~50 recetas iniciales. Solo un rol **administrador** (el usuario actual) puede crearlas o editarlas.
  - Si un usuario corrige un alimento global, se crea una copia personal que reemplaza al global solo para él.
  - Recetas creadas a mano o generadas por IA y aprobadas por un usuario son privadas de ese usuario.

## 7. Arquitectura (decidida)

- **Next.js** (App Router, TypeScript), PWA instalable en el celular.
- **Supabase**: Postgres, Auth, Row Level Security.
- **Claude API** desde el servidor (nunca expuesta la clave en el navegador), con salidas estructuradas para el parseo de texto y la generación de recetas.
- **Vercel** para el despliegue.

## 8. Orden de construcción

[decisión de Claude] La app completa se entrega por fases, cada una utilizable:

0. Propuestas visuales (2–3) y elección de estilo.
1. Base: proyecto, auth, base de alimentos importada, perfil/onboarding, etapas (manual y automático), semana de entreno, cálculo de macros del día, panel diario con registro manual.
2. Recetario + recetario inicial generado y revisado + motor del chef (reparto, escalado, ranking, intercambio, recálculo).
3. Registro por texto libre con IA + seguimiento de peso con propuesta de recálculo + avisos de seguridad.
4. Planificación 3/7 días, meal prep, lista de compras, inventario/modo heladera.
5. Pulido: PWA, rendimiento, detalles visuales.

## 9. Pendiente / a cargo del constructor

**Pendiente del usuario**
- Estilo visual (fase 0).

**A cargo del constructor**
- Esquema exacto de base de datos y migraciones.
- Algoritmo de escalado (programación lineal con una librería JS o heurística), siempre que respete rangos por ingrediente y prioridad de la proteína.
- Proporciones por defecto de reparto de macros entre comidas.
- Modelo de Claude a usar para cada tarea (por defecto, el más reciente adecuado en costo).
- Qué subconjunto de las tablas públicas importar y cómo normalizarlo.
- Pruebas: el motor del chef y los cálculos de macros deben tener pruebas automáticas.
