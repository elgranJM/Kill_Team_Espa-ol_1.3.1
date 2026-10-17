A continuacion se describe como se espera armar el repositorio para subir a Firebase:

/kill-team-manager
│
├── firebase.json            # Generado por Firebase: Configura cómo se despliega la app
├── .firebaserc              # Generado por Firebase: Vincula tu código con el proyecto en la nube
│
└── /public                  # Carpeta que Firebase Hosting subirá a la nube
    │
    ├── /pages               # index.html, facciones.html, partidas.html, etc.
    ├── /assets              # Imágenes y recursos estáticos
    ├── /css                 # Archivos CSS separados
    │
    └── /js                  # Controladores y lógica modular
        ├── /api             
        │   ├── firebase-config.js # Archivo clave: Contiene tus credenciales de Firebase y exporta la conexión (db, auth)
        │   └── firestoreClient.js # Funciones para leer/escribir tus "JSONs" ahora en la nube
        │
        ├── /state           # gameStore.js (Guarda estado en localStorage temporalmente si se cae internet)
        ├── /components      # Lógica compartida de la UI
        └── /controllers     # Lógica individual (facciones.js, partidas.js)


Considerar: Decidi no poner todo dentro de \public por el momento para que el repositorio no luzca tan vacio, al momento de llevar el proyecto a Firebase se tendra que poner en \public

Referenciaciones:
Localizacion de style.css: \public\css\style.css

Para llamar a style.css: < link rel="stylesheet" href="../css/style.css" > 

Respecto a la carpeta data: Si bien los archivos se almacenaran en base de datos tambien gestionado por Firebase, se tendra en /data por el momento para poder trabajarlos local comodamente

Como el punto anterior, es lo mismo para hacer fetch a un json: ../data/{nombre}.json

Considerar estructura para proximo login (se puede justificar escalabilidad por separar en modulos):

/public
│
├── /pages
│   ├── login.html           # <--- Nueva vista independiente para autenticación
│   ├── index.html
│   ├── facciones.html
│   └── partidas.html
│
└── /js
    ├── /api
    │   ├── firebase-config.js
    │   ├── firestoreClient.js
    │   └── authClient.js     # <--- Módulo para gestionar Auth (Login, Registro, Tokens)
    │
    └── /controllers
        ├── login.js          # <--- Lógica de la pantalla de inicio de sesión
        └── partidas.js