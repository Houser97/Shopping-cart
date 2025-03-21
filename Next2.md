# Zustand
- [Documentación](https://zustand-demo.pmnd.rs/)

1. Instalar.
```bash
npm i zustand
```

2. Crear store __src/store/ui/ui-store.ts__




## Pendientes
1. Hacer query para validar token de sesión o colocar fecha de expiración para ir checando el el front.
2. Al tener una negativa del backend acerca de la autenticación del usuario, se debe correr el logout en el cliente.
    - Verificar que el backend mande error cuando el token expiró.
    - Capturar el error en el cliente para gestionar logout.
3. Persistir carrito en el cliente.
4. Usar Slug y no id del producto
    - Se debe agregar un nuevo campo en tabla de products para definir slug.
    - Crear lógica para buscar productos por slug.
    