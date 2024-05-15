# Notas

- QUEDA PENDIENTE, CONFIGURAR LO DE LAS IMÁGENES:
    1. QUE SE MUESTREN
    2. QUE SE PUEDAN INSERTAR Y ALMACENAR EN EL BACKEND
    3. QUE SE PUEDEN ACTUALIZAR Y ELIMINAR

- CREAR USUARIOS 
    - ADMIN
    - USER -> IMPLEMENTAR FUNCIONALIDAD EN UN FUTURO (PARA QUE PODAMOS VENDER EL SERVICIO)
    - CLIENT

- Es importante RECORDAR que hay que tener un usuario específico para el cliente, para que de esta forma, se pueda evitar ataques DDOS

- crear users col y agregar los usuarios a los productos,a demás de que por seguridad, para hacer un push o un get a la db con la api, se va a necesitar un usuario en concreto que será definido por defecto.
- sin usuario no hay gestion.


- Recordar crear las rutas dinámicas para las imágenes
- Además cuando se vaya a insertar el campo en la base de datos, se debe insertar la ruta completa de la imagen en la db.


> Ahora los pedidos de la base de datos, tienen una fecha de caducidad de 30 Dias, por lo que se eliminarán automáticamente 30 días después de su última actualización. Estos valores variarán dependiendo de la cantidad de pedidos.   