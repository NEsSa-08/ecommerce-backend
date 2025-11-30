Este proyecto implementa un backend funcional en **Node.js + Express + MySQL + Sequelize**, acompañado de un **panel administrativo profesional** totalmente funcional para administrar:

- Categorías  
- Productos  
- Clientes  

Incluye **autenticación JWT**, CRUDs completos, dashboard profesional y estructura adecuada de backend.

---

#  Estructura del Proyecto
iProyectoBackend/
│── controllers/ # Controladores de la API
│── models/ # Modelos Sequelize
│── routes/ # Endpoints para CRUDs
│── services/ # Servicios extra
│── config/ # Configuración (BD y JWT)
│── public/
│ └── admin/ # Panel administrativo (HTML+CSS+JS)
│── index.js # Servidor principal
└── README.md

---

#  Base de Datos

El backend utiliza **MySQL** + **Sequelize ORM**.  
Tablas utilizadas:

- `Users`
- `Categories`
- `Products`
- `Clients`

Si no existe un usuario admin, se crea automáticamente:
usuario: admin
contraseña: admin123

-----
#  Instalación del Proyecto

##  Clonar el repositorio

```sh
git clone https://github.com/NEsSa-08/ecommerce-backend.git
cd ecommerce-backend
----
Instalar dependencias
npm install

Crear base de datos MySQL

CREATE DATABASE ecommerce;
-----
Configurar conexión en config/db.js
const sequelize = new Sequelize(
  "ecommerce",
  "root",
  "TU_PASSWORD",
  {
    host: "localhost",
    dialect: "mysql"
  }
);

----------

ejecutar el servidor

npm run dev

------------

Autenticación (Login)

Antes de acceder al panel admin se debe iniciar sesión:

Endpoint:

POST /api/auth/login

Body:
{
  "username": "admin",
  "password": "admin123"
}

te va a dar una respuesta como:
{
  "token": "xxxxxx",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}

Guardar el token en el navegador:

localStorage.setItem("token", "AQUÍ_TU_TOKEN");


-----------====

acceso al panel: 

http://localhost:3000/admin/dashboard.html
