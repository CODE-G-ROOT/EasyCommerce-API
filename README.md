# Documentación de la API

## Descripción General

La API de backend proporciona una solución segura, eficiente y orientada al usuario para gestionar pedidos y productos en una aplicación de ecommerce centrada en el dropshipping. A continuación, destacamos algunas de las características clave que hacen que esta API sea una opción segura, confiable y fácil de usar:

- **Seguridad Robusta:** La API ha sido configurada para garantizar la seguridad de los datos del usuario. No permite el acceso directo a la base de datos ni la exposición de los valores de los campos, lo que protege la integridad y privacidad de la información del sistema.

- **Almacenamiento Seguro de Imágenes:** Las imágenes asociadas a los productos se almacenan de forma segura en Cloudinary, un servicio confiable de gestión de activos digitales en la nube. Cloudinary ofrece medidas de seguridad avanzadas, como encriptación de datos en reposo y en tránsito, para garantizar la protección de las imágenes del usuario contra accesos no autorizados.

- **Validaciones Estrictas:** La API implementa validaciones estrictas en las peticiones para garantizar la integridad y consistencia de los datos. Esto incluye validaciones de tipo de datos, campos requeridos y formatos de entrada, asegurando que solo se procesen peticiones válidas y que los datos almacenados sean precisos y coherentes.

- **Manejo de Errores:** La API cuenta con un robusto sistema de manejo de errores para garantizar la seguridad del servidor y evitar caídas. Los errores se gestionan de manera adecuada, proporcionando mensajes de error claros y detallados para facilitar la resolución de problemas.

- **Pedidos Temporales:** Los pedidos creados a través de la API tienen una fecha de caducidad de 30 días. Después de este período, los pedidos se eliminan automáticamente para optimizar el almacenamiento y mantener la base de datos libre de registros obsoletos.

> Estas características combinadas aseguran una experiencia de usuario segura, confiable y sin problemas, protegiendo la privacidad de los datos del usuario, ofreciendo un almacenamiento seguro para las imágenes asociadas a los productos y garantizando la integridad de los datos almacenados.
