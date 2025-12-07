# Instalación del Proyecto ## Clonar el repositorio
sh
git clone https://github.com/NEsSa-08/ecommerce-backend.git

cd ecommerce-backend

Instalar dependencias
npm install

Crear base de datos MySQL
CREATE DATABASE proyecto;

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



#Ejecutar el servidor
npm run dev


##Autenticación (Login)

Antes de acceder al panel admin se debe iniciar sesión:

Endpoint:

POST /api/auth/login

Body:
{
  "username": "admin",
  "password": "admin123"
}


te aparecera algo como esto:
Respuesta:
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


link para entrar:
http://localhost:3000/admin/dashboard.html


para entrar a la tienda:
http://localhost:3000/tienda/
