## Instalaciones
- [Gist](https://gist.github.com/klerith/2d46749155918952b593e952dc7cf5c8) con las instalaciones.

## 01. Creación de proyecto
1. Ejecutar siguiente comando.
```bash
npx create-next-app <nombre>
ó
npx create-next-app@latest <nombre>
```

2. Colocar siguientes configuraciones en la terminal.
```bash
    √ Would you like to use TypeScript? ... Yes
    √ Would you like to use ESLint? ... Yes
    √ Would you like to use Tailwind CSS? ... Yes
    √ Would you like your code inside a `src/` directory? ... Yes
    √ Would you like to use App Router? (recommended) ... Yes
    √ Would you like to use Turbopack for `next dev`? ... Yes
    √ Would you like to customize the import alias (`@/*` by default)? ... No
```


3. Correr aplicación:
```bash
npm run dev
```

4. Limpiar archivo __page.tsx__.
```ts
export default function Home() {
  return (
    <div>
      Hola Mundo
    </div>
  );
}

```

- Nota:
    - Actualmente se tiene una aplicación de calendario corriendo en el puerto 3000, la cual no se ha investigado por qué sigue ejecutandose esa aplicación. Se accede a la aplicación de NEXT por medio de la ruta dada para la red en lugar de localhost.

## 02. Estructura de directorios
1. __src/componentes__. 
    - Crear archivo barril.
2. __src/interfaces__.
3. __src/store__.
    - Para el gestor de estado, el cual va a ser de Zustand.
### app
1. __src/app/auth__.
    1. __src/app/auth/login__.
    2. __src/app/auth/register__.
2. __src/app/(shop)__.
    - Acá es donde se va a colocar el código de la aplicación.
    - Se usa () para que el enrutamiento no ocupe la palabra shop.
    - Se mueve el archivo __src/app/page.tsx__ a esta carpeta.
    - Se crea el archivo __layout.tsx__
        - Se ocupa el __shortcut__ __lrc__ para crear el componente.

## 03. Directorios con 
- A partir de la versión 15 de Next este es un proceso asíncrono, por lo que se debe usar await en los params para poder usarlos.

## 04. Autenticación
### Opción 1. Con cookies
- Hacer esto requiere modificar el backend para que use las cookies.
- [Video de referencia](https://www.youtube.com/watch?v=2ZEFTpchGZo).
1. Instalar __cookies-next__.
    - [Documentación](https://www.npmjs.com/package/cookies-next).
    - Este paquete permite guardar las cookie tanto en el servidor como el cliente. Ofrece métodos especiales para el frontend y otro para el backend. Su uso permite persistir las cookies aunque se refresque la aplicación.
    - Cuando se usa con el backend se deben pasar la cookies de next. Con el cliente no es necesario.

```bash
npm i cookies-next
```

2. Uso en el backend para guardar información de usuario y token.
    - Se usa el la action que hace login. De igual forma se usa en la de registro.
```ts
'use server'
import shoppingApi from "@/config/api/shoppingApiAxios";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from 'next/headers';

export const login = async (email: string, password: string) => {

    try {
        const { data } = await shoppingApi.post('/auth/login-cookies', { email, password });
        const { token, user } = data;
        await Promise.all([
            setCookie('Authentication', token, { cookies }),
            setCookie('UserInfo', JSON.stringify(user), { cookies })
        ])
        return data;
    } catch (error) {
        console.log(error)
        return {};
    }

}
```

3. Uso de cookies desde front. En este ejemplo se usa para colocar los datos del usuario en el front en al momento de revalidar la sesión y ver que la sesión es válida. Se realiza en las acciones de auth.
    - Se usa en este caso para leer la información del carrito.
    - Se debe tener cuidado ya que pueden haber problemas de hidratación ya que el cliente puede no concordar con lo que se creó de parte del servidor. Esto pasa ya que en el cliente se leen datos de Zustand, lo que hace que se altere la UI. [Video de referencia, minuto 4:50](https://www.udemy.com/course/nextjs-fh/learn/lecture/30997972#learning-tools).
```ts
    checkAuthStatus: async () => {
        const userInfo = await getCookie("UserInfo");
        console.log(userInfo)

        if (userInfo) {
            try {
                const parsedUser: User = JSON.parse(userInfo.toString());
                set({ user: parsedUser, status: Status.AUTHENTICATED });
            } catch (error) {
                console.error("Error parsing user cookie:", error);
                set({ user: null, status: Status.UNAUTHENTICATED });
            }
        } else {
            set({ user: null, status: Status.UNAUTHENTICATED });
        }
    },

    logout: async () => {
        const deleteUserCookiePromise = deleteCookie('UserInfo');
        const deleteAuthCookiePromise = deleteCookie('Authentication');

        await Promise.all([
            deleteUserCookiePromise,
            deleteAuthCookiePromise
        ]);

        set({ user: null, status: Status.UNAUTHENTICATED });
    }
```

4. Al tener rutas que requieran la autenticación, se deben especificar las cookies en los headres. El nombre de la cookie debe coincidir con la que se busca en el backend personalizado (en este caso NestJS).
    - Este ejemplo muestra una action de auth para validar sesión.
```ts
export const validate = async () => {

    try {
        const cookieHeader = await getCookie('Authentication', { cookies })
        const { data } = await shoppingApi.get('/auth', {
            headers: {
                Cookie: `Authentication=${cookieHeader}`
            }
        });
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }

}

```


### Cambios en backend
1. __Gateway Microservice__. Instalar el paquete de __cookie-parser__.
```bash
npm i cookie-parser
npm i @types/cookie-parser
```

2. __Gateway Microservice__. Configurar uso de cookies en __main.ts__.
```ts
 app.use(cookieParser());
```
3. __Gateway Microservice__. Crear nuevos controladores para realizar autenticación con cookies.
  - La única diferencia es que el controlador del gateway debe agregar las cookies en la response con el token adquirido desde el microservicio de auth.

```ts
  @Post('register-cookies')
  async registerUserWithCookie(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
    try {
      const { token, user } = await firstValueFrom(
        this.client.send('auth.register.user', registerUserDto)
      );

      res.cookie('Authentication', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
      });

      return res.json({ token, user });
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Post('login-cookies')
  async loginUserWithCookie(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const { token, user } = await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto)
      );

      res.cookie('Authentication', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
      });

      return res.json({ token, user });
    } catch (error) {
      throw new RpcException(error)
    }
  }
```

4. __Gateway Microservice__. Ajustar Guard para tomar token de cookies también en caso de que en Bearer no venga.

```ts
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  
  import { Request } from 'express';
  import { firstValueFrom } from 'rxjs';
  import { NATS_SERVICE } from 'src/config/services';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
  
    constructor(
      @Inject( NATS_SERVICE ) private readonly client: ClientProxy, 
    ) {}
  
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      let token = this.extractTokenFromCookies(request);
      token = token ? token : this.extractTokenFromHeader(request)

      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
  
      try {
        const { user, token: newToken } = await firstValueFrom(
          this.client.send('auth.verify.user', token),
        );
  
        request['user'] = user;
        request['token'] = newToken;
      } catch {
        throw new UnauthorizedException('Invalid token');
      }
  
      return true;
    }
    
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }

    private extractTokenFromCookies(request: Request): string | undefined {
      return request.cookies?.Authentication;
    }
  }
```

5. Instalar __cookies-next__ en proyecto de NextJS.
  - [Documentación](https://www.npmjs.com/package/cookies-next)
  - Sin este paquete la cookie siempre se perdía al refrescar el navegador. Por otro lado, no se podía recuperar la cookie para el proceso de validación.

```bash
npm i cookies-next
```

6. Crear ServerActions __src\actions\auth\auth.ts__
  - Al hacer login se debe guardar la cookie en el server de NextJS.
  - Al validar el token se debe mandar la cookie.

```ts
'use server'
import shoppingApi from "@/config/api/shoppingApiAxios";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from 'next/headers';

export const login = async (email: string, password: string) => {

    try {
        const { data } = await shoppingApi.post('/auth/login-cookies', { email, password });
        const token = data.token;
        setCookie('Authentication',  token, {cookies})
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }

}

export const validate = async () => {

    try {
        const cookieHeader = await getCookie('Authentication', {cookies})
        const { data } = await shoppingApi.get('/auth', {
            headers: {
                Cookie: `Authentication=${cookieHeader}`
            }
        });
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }

}

```

7. Configurar axios para que siempre mande las cookies.
  - Esta configuración se realizó en __ecommerce\src\config\api\shoppingApiAxios.ts__.

```ts
import axios from 'axios';
export const url = 'http://localhost:3010/api'
//const url = 'https://shopping-cart-a2.onrender.com/api'
const shoppingApi = axios.create({
    baseURL: url,
    withCredentials: true,
});

shoppingApi.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default shoppingApi;
```

### Opción 2. Local Storage


## Tailwind V4
- A partir de esta versión ya no se genera el archivo __tailwind.config.ts__, ya que ahora se pueden editar los estilos personalizados en el archivo __global.css__.


### Agregar custom breakpoints
__global.css__
```css
@theme {
  --breakpoint-xs: 400px;
  --breakpoint-xs450: 450px;
  --breakpoint-xs480: 480px;
  --breakpoint-sm: 500px;
  --breakpoint-2sm: 600px;
  --breakpoint-md750: 750px;
  --breakpoint-md800: 800px;
  --breakpoint-md: 850px;
  --breakpoint-md900: 900px;
  --breakpoint-lg: 1100px;
  --breakpoint-2lg: 1200px;
  --breakpoint-xl: 1400px;
}
```

## Uso de Image
- [Documentación](https://nextjs.org/docs/app/api-reference/components/image)
- [Video](https://www.udemy.com/course/nextjs-fh/learn/lecture/30635694#overview) acerca de prioridad de imagen. Acá se oucpa la propiedad __priority__ en __false__ cuando se sabe que las imágenes se van a cargar bajo demanda.
- Cuando se ocupa un dominio para traer las imágenes, tal como cloudinary, se debe configurar en __next.config.js__.
```js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
```
- Ejemplo de uso.
```ts
<Image 
    className='max-w-[230px] w-full h-auto self-center justify-self-center 2sm:max-w-auto 2sm:w-auto 2sm:h-[230px] 2sm:justify-self-start' 
    src={images[0]} 
    alt="Apple" 
    width={500}
    height={500}>    
</Image>
```

# Pendientes
- Ajuste de metatags.
- Colocar gesto de estado.
- Gestiona autenticación.

# Zustand
- [Documentación](https://zustand-demo.pmnd.rs/)

1. Instalar.
```bash
npm i zustand
```

2. Crear store __src/store/ui/ui-store.ts__
3. Persistir data con __persist__
    - En este caso se usa con el carrito.
```ts
import { CartData } from "@/actions/cart/cart";
import { ProductCart } from "@/domain/entities/product.cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: Record<string, ProductCart>,
    totalPrice: number,
    totalProducts: number,
    updateCart: (cartData: CartData) => void
}

export const useCartStore = create<State>()(
    persist((set) => ({
        cart: {},
        totalPrice: 0,
        totalProducts: 0,
        updateCart: (cartData) => {
            const { productsInCart, totalPrice, totalProducts } = cartData;
            set({ cart: productsInCart, totalPrice, totalProducts })
        },
    }), {
        name: 'shopping-cart'
    })
);
```

# Refreschar pantalla
- Se realiza en ReviewCard al momento de eliminar una Review.
  - Se usa useRouter de next/navigation.
```ts
'use client'

import { useRouter } from "next/navigation";


export const ReviewCard = ({ review, productId, userReaction }: Props) => {


    const router = useRouter();

    const handleDelete = async (id: string) => {
        await deleteReview(id);
        router.refresh();
```

# Slug
- [Video](https://www.udemy.com/course/nextjs-fh/learn/lecture/30960578#overview)
1. En la tabla de productos, se crea el campo de __slug__.
  - Este campo debe ser __unique__, lo cual ya indexa el campo.
2. Crear action para recuperar 


## Pendientes
- Metadata
- Revalidaciones
2. Al tener una negativa del backend acerca de la autenticación del usuario, se debe correr el logout en el cliente.
    - Verificar que el backend mande error cuando el token expiró.
    - Capturar el error en el cliente para gestionar logout.

4. Usar Slug y no id del producto
    - Se debe agregar un nuevo campo en tabla de products para definir slug.
    - Crear lógica para buscar productos por slug.
5. Implementar lógica de pago.
6. Crear página notfound  

## Listo
1. Hacer query para validar token de sesión o colocar fecha de expiración para ir checando el el front.
  - Se resolvió por el momento validando en el back si el token es correcto para después asignar la información de usuario en la store.
3. Persistir carrito en el cliente.
7. En el backend revisar si al borrar una review se borran también las reacciones.
  - Se creó el método hardDelete para eliminar tanto las reacciones como la review.