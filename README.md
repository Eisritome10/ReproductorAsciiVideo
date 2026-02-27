# Reproductor de Video ASCII 🎬💻
ASCII Terminal Player es un proyecto de procesamiento de video en tiempo real desarrollado como parte de mi portafolio profesional en Ingeniería de Sistemas e Informática. La aplicación transforma los fotogramas de un video en representaciones artísticas mediante caracteres ASCII, utilizando manipulación directa de datos de imagen en el navegador.

🚀 Características Principales

Renderizado en Tiempo Real: Algoritmo optimizado para escanear píxeles y convertirlos en símbolos según su valor de luminancia.

Interfaz de Terminal: Control total mediante una consola integrada que acepta comandos como play, pause y stop.

Biblioteca Dinámica: Acceso rápido a videos locales mediante una interfaz lateral organizada.

Carga de Archivos Locales: Soporte para que el usuario suba y visualice sus propios videos en formato ASCII.

Estado "No Signal": Implementación de estática visual (ruido aleatorio) cuando el sistema está en espera, mejorando la experiencia de usuario (UX).

🛠️ Tecnologías Utilizadas
Lenguaje: JavaScript (Vanilla JS).

Frontend: HTML5 (Canvas API) y CSS3 (Grid & Flexbox).

Fuentes: Google Fonts (Nunito / Courier New).

Iconos: Material Icons.

⚙️ Lógica Técnica
El proyecto se basa en la clase AsciiEffect, la cual ejecuta los siguientes pasos técnicos:

Captura: Extrae los datos de color de cada frame del elemento <video> mediante getImageData.

Procesamiento: Analiza el promedio de color (RGB) para determinar el brillo de cada celda.

Mapeo: Asigna un carácter específico (ej. @, #, *, .) basándose en la intensidad de la luz capturada.

Renderizado: Dibuja los caracteres resultantes en un canvas de alta frecuencia.

📂 Estructura del Proyecto

/ReproductorAsciiVideo
├── /Assets
│   ├── /Videos        # Contenido multimedia local
│   ├── /miniaturas    # Previsualizaciones de la biblioteca
│   └── /images        # Recursos visuales e interfaz
├── index.html         # Estructura principal (2 columnas)
├── style.css          # Estética de terminal minimalista
├── index.js           # Lógica de procesamiento y comandos
└── README.md          # Documentación del proyecto

📝 Instalación y Uso
Clona el repositorio: git clone https://github.com/Eisritome10/ReproductorAsciiVideo.git

Abre el archivo index.html en tu navegador preferido.

¡Disfruta de la experiencia retro!
