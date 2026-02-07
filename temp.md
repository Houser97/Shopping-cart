# Pruebas sobre custom hooks
1. Las primeras pruebas tienen que valor con los valores por defecto. Por ejemplo, cómo se comporta cuando no se le pasan parámetros al custom hook, en donde en este caso a los argumentos se le definió con un valor por defecto.
2. Para usar hooks se debe estar en un functional component.
   1. Para esto __@testing-library/react__ ofrece __renderHook__, lo cual monta en un componente al customHook.
   2. Con los métodos de los custom hooks se evalua la consecuencia de llamarlos, no que se hayan llamado.
   3. Al llamar a setter functions o métodos que las invocan se debe envolver en __act__, el cual también es provisto por __@testing-library/react__.
      1. Cada llamada de estado debe tener su propio __act__. Por ejemplo, si en un mismo add se llama 2 veces a la setter function que incrementa en 1 al estado, solo se refleja el cambio hecho por el primer llamado de la setter function. Si se desea validar esto, entonces la segunda llamada de setter function debe estar en un act separado.
         1. __INVESTIGAR MÁS ACERCA DE ESTO, YA QUE PARECE SÍ SE PUEDE, PERO AL DIVIDIR EN ACTS SE TIENE MEJOR ORDEN__.

```ts
describe("useCounter", () => {
    // Con este enfoque se pierde el tipado estricto. Se debe evaluar si se beneficia usar el ciclo de vida para preparar el custom hook, o si es mejor declararlo en cada prueba.
    // let result;

    // beforeEach(() => {
    //     const { result: hookValue } =  renderHook(() => useCounter());
    //     result = hookValue;
    // });

    test("Should initialize with default value of 10", () => {
        const { result } =  renderHook(() => useCounter());

        expect(result.current.counter).toBe(10);
    });

    test("Should initialize with value 20", () => {
        const initialValue = 20;

        const { result } =  renderHook(() => useCounter(initialValue));

        expect(result.current.counter).toBe(initialValue);
    });

    test("Should increment counter when handleAdd is called", () => {
        const { result } =  renderHook(() => useCounter());

        act(() => {
            result.current.handleAdd();
        });
       
        expect(result.current.counter).toBe(11);
    });
})
```

## Pruebas de componentes con custom hooks
```ts
describe("MyCounterApp", () => {
    // Se pudo haber hecho también con screenshot, pero se decidió este enfoque para experimentar.
    // Se revisa que estén todos los elementos del componente
    test("Should render the component", () => {
        render(<MyCounterApp />);

        screen.debug(); // Para ver qué renderiza.

        expect(screen.getByRole('heading', {level: 1}).innerHTML).toContain(
            'counter: 10'
        );

        expect(result.current.counter).toBe(10);

        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
    });

    test("Should increment the counter", () => {
        render(<MyCounterApp />);

        const labelH1 = screen.getByRole('heading', {level: 1});
        const button = screen.getByRole('button', {name: '+1'});

        fireEvent.click(button);

        expect(labelH1.innerHTML).toContain('counter: 11');
    });
});
```

## Simular estado de un custom hook
```ts
import {vi} from 'vitest';

const handleAddMock = vi.fn();
const handleResetMock = vi.fn();
const handleSubtractMock = vi.fn();

vi.mock('path/to/hook', () => ({
    useCounter: () => ({
        counter: 20,
        //handleAdd: vi.fn(), // No se puede hacer referencia, ya que está en una functión anónima. Por esa razón se eleva la función (se crea handleAddMock). Esto se aplica para las demás de abajo.
        handleAdd: handleAddMock,
        handleReset: handleResetMock,
        handleSubtract: handleSubtractMock,
    })
}));

describe("MyCounterApp", () => {
    // Se pudo haber hecho también con screenshot, pero se decidió este enfoque para experimentar.
    // Se revisa que estén todos los elementos del componente
    test("Should render the component", () => {
        render(<MyCounterApp />);

        screen.debug(); // Para ver qué renderiza.

        expect(screen.getByRole('heading', {level: 1}).innerHTML).toContain(
            'counter: 20'
        );

        expect(result.current.counter).toBe(10);

        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
    });

    test("Should call handleAdd if button is clicked", () => {
        render(<MyCounterApp />);


        const button = screen.getByRole('button', {name: '+1'});

        fireEvent.click(button);

        expect(handleAddMock).toHaveBeenCalled();
        expect(handleReset).not.toHaveBeenCalled();
        expect(handleSubtract).not.toHaveBeenCalled();
    });
});
```

# Pruebas sobre instancias de axios
- Permite asegurar que esta configuración permanezca con un candado, ya que un cambio será detectado por el test.
```ts
describe("giphyApi", () => {

    test("Should be configured correctly", () => {
        const params = giphyApi.defaults.params;
        expect(giphyApi.defaults.baseURL).toBe("Url");
        expect(giphyApi.lang).toBe("es");
        expect(giphyApi.api_key).toBe(import.meta.env.VITE_API_KEY);

        expect(params).toStrictEqual({
            lang: 'es',
            api_key:import.meta.env.VITE_API_KEY
        });
    });
});
```

## Pruebas sobre acción - getGifsByQuery (pruebas asíncronas)
- Con pruebas para APIs se obtiene la respuesta de la API para poder usarla como mock.
  - En este caso, se crea la carpeta __src/tests/mock/gifs.data.ts__

```ts
describe("getGifsByQuery", () => {

    test("Should return a list of gifs", async () => {
        const gifs = await getGifsByQuery('key_word');
        const [gif1] = gifs;

        expect(gifs.length).toBe(10);

        expect(gif1).toStrictEqual({
            id: expect.any(String),
            height: expect.any(Number),
        });
    });
});
```

## Pruebas usando axios-mock-adapter, manejo de excepciones, espías y sobre escritura de métodos
- Permite controlar resultados de axios.
    - https://www.npmjs.com/package/axios-mock-adapter
    - https://cursos.devtalles.com/courses/take/react-de-cero/lessons/66090480-axios-mock-adapter-controlar-resultados-de-axios
- Para estas pruebas de igual forma se obtiene una respuesta de la API y se crea __src/tests/giphy.data.ts__.
  - Acá se exporta la respuestra con una variable.
- Los espías se usan para saber que una función ha sido llamada, donde permite tener vigilado el comportamiento de algo.


```bash
npm i -D axios-mock-adapter
```

```ts

import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from '../api/giphy.api';

describe("getGifsByQuery", () => {
    // Se le debe pasar el objeto ya configurado de axios.
    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        // mock.reset(); Acá para la prueba de manejar la excepción no funcionó, por eso se usa la siguiente línea.
        mock = new AxiosMockAdapter(giphyApi);
    });

    test("Should return a list of gifs", async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock);

        const gifs = await getGifsByQuery('key_word');

        expect(gifs.length).toBe(10);

        gifs.forEeach((gif) => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.height).toBe('number');
            expect(typeof gif.url).toBe('string');
        })
    });

    // Excepciones en las peticiones
    test("Should return an empty list of gifs if query is empty", async () => {
        // mock.onGet('/search').reply(200, { data: []});

        // Acá puede ser necesario querer usar la implementacion real de axios. Por eso se comenta la línea anterior y se usa la siguiente de restore. Sin embargo, también es válido usar la anterior y no usar la de restore.
        mock.restore();

        const gifs = await getGifsByQuery('');

        expect(gifs.length).toBe(0);

    });

    // En este caso en el código de getGifsByQuery se tiene un try/catch. Para poder validar que que la función console.error en catch se ejecute se debe usar un espía (para validar que se llame error de console), ya que en este caso se desea saber que se llame el console.error, en donde se debe sobre escribir console.error
    // Por otro lado, se sobrescribe a .error para no tener que ver todo el error en la consola.
    test("Should handle error when the API returns an error", async () => {

        const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {}); // Evita que el console.error imprima en la consola de testing

        mock.onGet('/search').reply(400, { data: {
            message: 'Bad Request',
        }});

        const gifs = await getGifsByQuery('word');

        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled(0);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());

    });
});
```

# Mock de custom hooks, act asíncrono, caché
- En este caso, la función handleTermClicked busca en el caché si ya está la búsqueda hecha anteriormente por medio de la palabra 
buscada:

```ts
if (gifsCache.current[item]) {
    setGifs(gifsCache.current[item])
    return;
}
```

- En este caso se coloca un espía sobre getGifsByQuery.
  - Para poder satisfacer los dos argumentos que pide vi.spyOn, se debe importar está función de la siguiente forma, para poder usar el mñetodo de espía.
```ts
// import  getGifsByQuery } from 'path/to/function'
import * as gifAction from 'path/to/function'

...

vi.spyOn(gifAction, getGifsByQuery);
```

```ts
describe('useGifs', () => {
    test('Should return default values',() => {
        const { result } = renderHook(() => useGifs());

        expect(result.current.gifs.length).toBe(0);
    });

    // act asíncrono
    test('Should return a list of gifs', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch('word');
        });

        expect(result.current.gifs.length).toBe(10);
    });

    // act asíncrono
    test('Should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked('word');
        });

        expect(result.current.gifs.length).toBe(10);
    });

    // Caché
    test('Should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked('word');
        });

        expect(result.current.gifs.length).toBe(10);

        // Acá se usa mockRejectedValue para manejar el reject de una promesa. El de resolve se usa con mockResolvedValue.
        // Se coloca para validar que no se llame este error, ya que la segunda vez que se hace click en el botón ahora es el caché quien tiene que devolver la data y evitar que se llame getGitsByQuery.
        vi.spyOn(gifActions, 'getGifsByQuery')
            .mockRejectedValue(new Error('This is my custom error'));

        await act(async () => {
            await result.current.handleTermClicked('word');
        });

        expect(result.current.gifs.length).toBe(10);

    });

    test('Should return no more than 8 previous terms', () => {
        // Esta es una funcionalidad que tiene la función de handleSearch, en donde se guarda en caché las últimas 8 búsquedas.
        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifActions, 'getGifsByQuery')
            .mockResolvedValue([]);
        
        await act(async () => {
            await result.current.handleSearch('word');
        });

        await act(async () => {
            await result.current.handleSearch('word2');
        });
        await act(async () => {
            await result.current.handleSearch('word3');
        });
        await act(async () => {
            await result.current.handleSearch('word4');
        });
        await act(async () => {
            await result.current.handleSearch('word5');
            });
        await act(async () => {
            await result.current.handleSearch('word6');
        });
        await act(async () => {
            await result.current.handleSearch('word7');
        });
        await act(async () => {
            await result.current.handleSearch('word8');
        });
        await act(async () => {
            await result.current.handleSearch('word9');
        });


        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual([
            // Acá se ponen los últimos 8 términos
        ]);
    });
});
```

# Pruebas sobre efectos y debounce
- Se tiene la función __waitFot__ dada por testing-library/react, la cual permite validar que una función haya sido llamado después de un periodo de tiempo.   
  - Con esta función no hace falta tener el tiempo de debounce como una variable exportada desde el componente que se hace testing.

```ts
describe('searchBar', () => {
    test('Should render searchbart correctly', () => {
        const { container } = render(<SearchBar onQuery={() => {}}/>);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    })

    test('Should call onQuery with the correct value after 700ms', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');
        });


    });

    // Prueba sobre debounce
    test('Should call only once with the last value (debounce)', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't' } });
        fireEvent.change(input, { target: { value: 'te' } });
        fireEvent.change(input, { target: { value: 'tes' } });
        fireEvent.change(input, { target: { value: 'test' } });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');
        });


    });

    test('Should call onQuery when button clicked with the input value', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });

        const button = screen.getByRole('button');
        fireEvent.change(button);


        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');

    });

    test('Should th input has the correct placeholder value', () => {
        const value = 'Buscar';
        render(<SearchBar onQuery={() => {}} placeholder={value}/>);
 
        expect(screen.getByPlaceholderText(value)).toBeDefined();
    });
})
```

# Integrar pruebas con versión de producción
- Se debe agregar el script en package.json. Se crea test:only, el cual luego se agrega en el script de build.

```python
"build": "npm run test:only && .."
"test:only": "vitest run",
```


# Código fuente
https://cursos.devtalles.com/courses/take/react-de-cero/texts/66167041-codigo-fuente


# Sección 16.
## Temas
1. Pruebas sobre ContextAPI
2. Pruebas sobre router
3. Pruebas con query params
4. Pruebas de redirecciones y componentes
5. Mocks y espías
6. Pruebas con TanStack
7. Pruebas sobre custom hooks
8. Mucho más

## 1. Variables de entorno para testing .env.test
1. Se crea el archivo .env.test.
   1. Vite reconoce que se está en testing, por lo que en automático toma ese archivo.
2. En esta sección que considera que el backend también se encuentra en un entorno de testing, por lo que para levantarlo se usa el siguiente comando.

```bash
PORT=PUERTO_TESTING npm run start:dev
```

```ts

const BASE_URL = import.meta.env.VITE_API_URL;

describe('HeroApi', () => {
    test('Should be configured pointing to the testing server', () => {
        expect(heroApi).toBeDefined();
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
        expect(BASE_URL).toContain('3001');
    })
})
```

## 2. getHeroAction
- https://cursos.devtalles.com/courses/take/react-de-cero/lessons/66914469-test-getheroaction
- Esta es una prueba que depende del backend, por lo que se puede evaluar directamente con la respuesta que da el backend.

```ts

const BASE_URL = import.meta.env.VITE_API_URL;

describe('getHeroAction', () => {
    test('Should fetch hero data and return with complete image url', () => {
        // Acá se debe evaluar contra el objeto dado por la respuesta. Se muestra otra forma de hacerlo en el test de getSummaryAction
    })

    test('Should throw error if hero is not found', async () => {
        const idSlug = 'basd';

        const result = await getHeroAction(idSlug).catch((error) => {
            expect(error).toBeDefined();
            expect(error.message).toBe('Request failed with status code 404');
        });

        expect(result).toBeUndefined();
    })
})
```

## 3. getSummaryAction
- Acá se evalúa el contenido de la respuesta del backend siendo más genérico con cada campo: expect.objectContaining({
    intelligence: expect.any(number),
    ...
})
- Solo se deben evaluar las propiedades que sí se consumen en la aplicación, ya que las demás si el backend decide eliminarlas no dispara un error en el testing.
```ts

const BASE_URL = import.meta.env.VITE_API_URL;

describe('getSummaryAction', () => {
    test('Should fetch hero data and return with complete image url', () => {
        // Acá se debe evaluar contra el objeto dado por la respuesta. Se muestra otra forma de hacerlo en el test de getsummaryAction
    })

})
```

## 4. getHeroesByPageAction
- Acá se usa el mock de axios
- http://cursos.devtalles.com/courses/take/react-de-cero/lessons/66919824-test-getheroesbypageaction
- https://cursos.devtalles.com/courses/take/react-de-cero/lessons/66920427-parte-2-test-getheroesbypageaction
- Acá lo interesante es que se valida que la request se llame con los valores deseados, ya que por ejemplo se puede pasar parámetros que no son números. Adicionalmente, se usar history del mock de axios.

## 5. Pruebas sobre useHeroSummary, el cual usa tanstack.
- https://cursos.devtalles.com/courses/take/react-de-cero/lessons/66920856-test-useherosummary
- https://cursos.devtalles.com/courses/take/react-de-cero/lessons/66921428-parte-2-test-useherosummary

```ts

vi.mock('path/to/component', () => ({
    getSummaryAction: vi.fn()
}))

// Segunda opción de tener un mock. En este caso, facilita la manipulación del mock así como validar que se llame con ciertos argumentos.
const mockGetSummaryAction = vi.mocked(getSummaryAction);

// Se debe tener un queryClient
const tanStackCustomProvider = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queris: {
                retry: false
            }
        }
    });

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client = {queryClient}>{children}</QueryClientProvider>
    );
}


describe('useHeroSummary', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    })

    test('Should return the initial state (isLoading)', () => {
        const { result } = renderhook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider(),
        })

        // si se imprime el result se puede ver que según falla debido a que puede haber dependencias cíclicas, sin embargo, no afecta a la prueba.

        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.isError).toBeFalsy();
        expect(result.current.data).toBeUndefined();
    });

    test('Should return success state with data when api call succeeds', async () => {
        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'Superman'
            },
            smartestHero: {
                id: '2',
                name: 'Batman'
            },
            heroCount: 18,
            villainCount: 7
        } as SummaryInformationResponse

        mockGetSummaryAction.mockResolvedValue(mockSummaryData);

        const { result } = renderhook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider(),
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        });

        expect(result.current.isError).toBeFalsy();
        expect(mockGetSummaryAction).toHaveBeenCalled();
        // expect(mockGetSummaryAction).toHaveBeenCalledWith(); este es útil para ver en consola con qué params se llamó.
    });

    test('Should return error state when API call fails', async () => {
        const mockError = new Error('Failed to fetch summary');
        mockGetSummaryAction.getRejectedValue(mockError);

        const { result } = renderhook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider(),
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        });

        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.isError).toBeDefined();
        expect(mockGetSummaryAction).toHaveBeenCalled();
        expect(result.current.error?.messsage).toBe('Failed to fetch summary');
    });
});
```

## 6. FavoriteHero Context
- https://cursos.devtalles.com/courses/take/react-de-cero/lessons/66943142-test-favoritehero-context
- Se debe crear un componente que dependa del contexto.
  - Ayuda a usar el contexto y poder aplicar los tests sobre ese mismo componente.
- localStorage ya se puede usar en las últimas versiones para testing.
  - Es una implementación propia para node, no es el mismo del navegador.
  - También se puede crear un mock del local storage para validar que se llame con los argumentos deseados.


```ts
import { use } from 'react';

const mockHero = {
    id: '1',
    name: 'batman'
} as Hero

const TestComponent = () => {
    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);

    return (
        <div>
            <div data-testid="favorite-count">{favoriteCount}</div>

            <div data-testid="favorite-list">
                {favorites.map((hero) => (
                    <div key={hero.id} data-testid={`hero-${hero.id}`}>
                        {hero.name}
                    </div>
                ))}
            </div>

            <button data-testid="toggle-favorite"
            onClick={() => toggleFavorite(mockHero)}>
                Toggle Favorite
            </button>

            <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
        </div>
    )
}

// Útil por si se quiere alguna inicialización o mock acá. De igual forma, por si se quieren mandar argumentos por acá.
const renderContextTest = () => {

    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    )
}

describe('FavoriteHeroContext', () => {
    beforeEach(() => {
        localStorage.clear();
    })

    test('Should initialize with default values', () => {
        renderContextTest();

        expect(screen.getByTestId("favorite-count").textContent).toBe('0');
        expect(screen.getByTestId("favorite-list").children.length).toBe(0);
    })

    test('Should add hero to favorites when toggleFavorite is called with new Hero', () => {
        renderContextTest();
        const button = screen.getByTestId('favorites');

        fireEvent.click(button);

        expect(screen.getByTestId("favorite-count").textContent).toBe('1');
        expect(screen.getByTestId("is-favorite").textContent).toBe('true');
        expect(screen.getByTestId("hero-1").textContent).toBe('batman');
        expect(localStorage.getItem("favorites")).toBe('[{"id":"1", "name":"batman"}]');
    });

    test('Should remove hero to favorites when toggleFavorite is called', () => {

        
        localStorage.setItem('favorites', JSON.stringify([mockHero]));


        renderContextTest();
        const button = screen.getByTestId('favorites');

        fireEvent.click(button);

        expect(screen.getByTestId("favorite-count").textContent).toBe('0');
        expect(screen.getByTestId("is-favorite").textContent).toBe('false');
        //expect(screen.getByTestId("hero-1")).toBe('undefined'); Cuando se usa getByTestId se supone que sí existe, por lo que se usa queryByTestId
        expect(screen.queryByTestId("hero-1")).toBeNull(); 
    })
})
```
### 6.1 Mock sobr eobjetos globales (mock de localStorage)

```ts
import { use } from 'react';

const mockHero = {
    id: '1',
    name: 'batman'
} as Hero

// mock de localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

const TestComponent = () => {
    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);

    return (
        <div>
            <div data-testid="favorite-count">{favoriteCount}</div>

            <div data-testid="favorite-list">
                {favorites.map((hero) => (
                    <div key={hero.id} data-testid={`hero-${hero.id}`}>
                        {hero.name}
                    </div>
                ))}
            </div>

            <button data-testid="toggle-favorite"
            onClick={() => toggleFavorite(mockHero)}>
                Toggle Favorite
            </button>

            <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
        </div>
    )
}

// Útil por si se quiere alguna inicialización o mock acá. De igual forma, por si se quieren mandar argumentos por acá.
const renderContextTest = () => {

    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    )
}

describe('FavoriteHeroContext', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    })


    test('Should initialize with default values', () => {
        renderContextTest();

        expect(screen.getByTestId("favorite-count").textContent).toBe('0');
        expect(screen.getByTestId("favorite-list").children.length).toBe(0);
    })

    test('Should add hero to favorites when toggleFavorite is called with new Hero', () => {
        renderContextTest();
        const button = screen.getByTestId('favorites');

        fireEvent.click(button);

        expect(screen.getByTestId("favorite-count").textContent).toBe('1');
        expect(screen.getByTestId("is-favorite").textContent).toBe('true');
        expect(screen.getByTestId("hero-1").textContent).toBe('batman');
        // expect(localStorage.getItem("favorites")).toBe('[{"id":"1", "name":"batman"}]');
        
        expect(localStorageMock.setItem).toHaveBeelCalled();
        expect(localStorageMock.setItem).toHaveBeelCalledWith(
            'favorites',
            '[{"id":"1", "name":"batman"}]'
        )
    }

    test('Should remove hero to favorites when toggleFavorite is called', () => {

        
        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));


        renderContextTest();
        const button = screen.getByTestId('favorites');

        fireEvent.click(button);

        expect(screen.getByTestId("favorite-count").textContent).toBe('0');
        expect(screen.getByTestId("is-favorite").textContent).toBe('false');
        //expect(screen.getByTestId("hero-1")).toBe('undefined'); Cuando se usa getByTestId se supone que sí existe, por lo que se usa queryByTestId
        expect(screen.queryByTestId("hero-1")).toBeNull(); 


        expect(localStorageMock.setItem).toHaveBeelCalled();
        expect(localStorageMock.setItem).toHaveBeelCalledWith(
            'favorites',
            '[]'
        )
    })
})
```
