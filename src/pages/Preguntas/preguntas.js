// preguntas.js
const categorias = [
    {
      nombre: "Introducción",
      preguntas: [
        "¿Qué criterios consideró para definir su tema de investigación?",
        "¿Cuál es el problema de investigación y cómo se relaciona con las necesidades de su sociedad?",
        "¿En qué se diferencia su trabajo de investigación de otras investigaciones?",
        "Define las variables de tu estudio y fundaméntalo con uno o varios autores.",
        "Define las fases de tu proceso y fundaméntalo con uno o varios autores.",
        "¿Cuáles son tus indicadores de estudio? ¿Cómo se calculan? ¿Por qué los elegiste? Fundamente con uno o varios autores.",
        "¿Cuál es el objetivo de tu investigación?"
      ]
    },
    {
      nombre: "Método",
      preguntas: [
        "¿Cuál es el objeto y sujeto de estudio de tu investigación?",
        "¿Explique las razones de por qué su investigación es aplicada o básica?",
        "¿Explique las razones de por qué su investigación es no experimental, preexperimental, cuasiexperimental o experimento puro?",
        "¿Qué criterios tomó en cuenta para elegir el instrumento de recolección de datos de su investigación?",
        "¿Cuál es el enfoque de tu investigación? ¿Por qué?",
        "¿Qué nivel de investigación has empleado? ¿Por qué?",
        "¿Qué método de análisis de datos utilizaste?",
        "¿Qué dimensiones utilizaste en consideración para tus variables y por qué? Sustenta tu respuesta.",
        "¿Por qué escogiste la variable D/I para la investigación en tu trabajo? Explique sus resultados con respecto a la contrastación a sus variables.",
        "¿Cómo se va a subvencionar su investigación y de qué manera?",
        "¿En qué se basó para dimensionar sus variables?",
        "¿Cuál ha sido tu justificación de estudio?",
        "¿A partir de dónde has hecho tu cuestionario?",
        "¿Cómo elaboraste tu cuestionario?",
        "¿Cómo se llama el proceso por el que se inicia el cuestionario?",
        "¿Cuál ha sido tu técnica de estudio?",
        "¿Cómo has ejecutado tu encuesta o cuestionario?",
        "¿Tu variable D/I es muy amplia, qué instrumento e indicadores utilizaste para medir esa variable?",
        "La variable GESTIÓN es muy amplia. ¿Cómo has dimensionado una variable tan amplia y compleja?",
        "¿Tuviste problemas para recoger datos para tu instrumento?",
        "¿Qué función cumple el nivel de significancia? Por ejemplo, en el RHO SPEARMAN.",
        "¿Cuál ha sido tu diseño de estudio y por qué?",
        "¿Qué técnicas utilizaste para tu instrumento y cómo lo has ejecutado?",
        "¿Qué es el coeficiente RHO SPEARMAN y qué indica en los resultados?",
        "¿Qué relación tiene tu variable D/I con la parte laboral de tu institución?",
        "¿Qué opinión tienes sobre la herramienta que utilizaste para tu investigación?",
        "¿Qué punto de la investigación te pareció muy importante para empezar a desarrollar la operacionalización de las variables?",
        "¿Opinión sobre el capítulo de discusión de resultados? Su importancia para demás investigaciones.",
        "¿Cuál es el proceso para realizar la parte de DISCUSIÓN?",
        "¿En qué aporta tu investigación a la institución que usaste para la investigación?",
        "¿Cómo se calcula la muestra de la población?",
        "¿Por qué escogiste el enfoque CUANT/CUALI en tu investigación y por qué?",
        "¿Cómo has realizado el procedimiento de investigación?",
        "¿En qué consiste el RHO SPEARMAN? (si es que lo ha utilizado en su tesis)",
        "¿Por qué has utilizado esos autores para la teoría para su tesis y señale cuál es el autor más importante para su tesis?",
        "¿Cuál es el aporte teórico para su trabajo?",
        "¿Para qué se operacionaliza una variable? Para la medición de la variable.",
        "¿En qué momento se dice que el instrumento es aplicable y a quién recurres para la validez?",
        "¿Quiénes han sido tu unidad de análisis para la ejecución del instrumento?",
        "¿Qué teoría te basaste para las variables de tu tesis?",
        "¿Qué es una correlación de variables, en qué consiste y para qué sirve?",
        "¿Por qué es estudio no experimental? Porque no se manipulan las variables.",
        "Mencione las teorías básicas relacionadas a sus dos variables y por qué las utilizó para su investigación.",
        "¿Por qué es estudio experimental? Porque se manipulan las variables.",
        "¿Qué es y en qué consiste la escala de Likert?",
        "¿Qué es la escala nominal y ordinal en Likert?",
        "Indique qué autores hablan de su variable.",
        "¿Por qué el trabajo es correlacional causal?",
        "¿Por qué es preexperimental, experimental (probabilístico), no experimental (no probabilístico)? ¿En qué consiste y/o qué es?",
        "¿En qué consiste el CHI-CUADRADO y para qué sirve en la investigación?",
        "¿Qué limitaciones tuviste durante la investigación?",
        "¿Cuál fue la motivación para la realización de la investigación?",
        "¿Por qué la investigación es básica o aplicada?",
        "¿En cuál de sus dimensiones ha incidido más su investigación y por qué?",
        "¿Cuál es la justificación teórica, práctica y metodológica de su investigación?",
        "¿En base a qué has dimensionado tu variable independiente o dependiente?"
      ]
    },
    {
      nombre: "Resultados",
      preguntas: [
        "¿Cuáles fueron los criterios que utilizó en la recopilación de información para su investigación?",
        "¿Cuáles son los pasos estadísticos seguidos en su investigación? Explique.",
        "¿Por qué realizó la prueba de normalidad? y ¿Por qué usó Shapiro Wilk y no otro? Fundamente su respuesta.",
        "¿Por qué realizó la prueba de hipótesis? Y ¿Por qué usó Spearman, T Student, etc., y no otro? Fundamente su respuesta.",
        "¿Cuál es el aporte relevante que brinda su trabajo de investigación a la comunidad científica?"
      ]
    },
    {
      nombre: "Metodología de Desarrollo",
      preguntas: [
        "¿Por qué elegiste esta metodología de desarrollo?",
        "¿Cuáles son las fases de la metodología de desarrollo utilizada?",
        "¿Cuál es el ciclo de vida de un proyecto de desarrollo de software?",
        "¿Cuántos requerimientos funcionales y no funcionales consideró para desarrollo del software?",
        "¿Cuál es la diferencia entre un requerimiento funcional y no funcional?",
        "¿Cuántos casos de uso consideró para el desarrollo del software? (sólo si aplica)",
        "¿Cuántos sprint consideró para el desarrollo del software? (sólo si aplica)",
        "¿Cuántas iteraciones consideró para el desarrollo del software? (sólo si aplica)"
      ]
    },
    {
      nombre: "Software",
      preguntas: [
        "Explícame las partes de tu sistema, siguiendo el flujo de las fases de tu proceso.",
        "En tu metodología mencionas el requerimiento iniciar sesión, a ver, muéstramelo en tu sistema, quiero verlo (Puede atacar cualquier requerimiento de la metodología).",
        "Realiza un registro y que ese se vea reflejado en tu ficha postest.",
        "¿Con qué criterios de seguridad cuenta tu software?",
        "¿Utilizas algún tipo de encriptación para datos sensibles? En que parte de tu código, muéstrame.",
        "¿Qué patrón de diseño utilizaste para el desarrollo del software? Fundamente su respuesta.",
        "¿Utilizaste framework para el desarrollo del software? ¿Sí o No? ¿Por qué? Fundamente su respuesta.",
        "¿Qué tecnologías usaste para el desarrollo del software? Fundamente su respuesta."
      ]
    },
    {
      nombre: "Base de Datos",
      preguntas: [
        "¿Por qué elegiste la base de datos MySql?",
        "¿Cuántas tablas tiene tu base de datos?",
        "¿Estás usando procedimientos almacenados? ¿Sí o No? ¿Por qué? Fundamente su respuesta.",
        "¿Tu base de datos está normalizada? Fundamente su respuesta.",
        "¿Las claves de los usuarios están encriptadas?",
        "¿Cuál es la diferencia entre tu modelo lógico y físico? Explícame las relaciones de tu base de datos."
      ]
    }
  ];
  
  export default categorias;
  