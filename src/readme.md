
# Estructura del proyecto
- atomic design
- Dependency Inversion Principle (DIP)
- Separation of Concerns (SoC)

# lib: [External Layer]

- Shared
  - Custom hooks
- database connection
- utils

# App: [application layer]
- Use Cases: name of use case [login, auth, logout, session]
  - Components
  - Services: Abstract services used by the use cases, such as authentication services.

- Models: Contains the core business entities (e.g., User) and their rules.
  - types
  - adapters
  - adapters





### Services (Servicios): 
Encapsulan la lógica de negocio y la interacción con fuentes de datos externas. Los servicios se encargan de realizar operaciones como acceder a bases de datos, hacer llamadas a APIs externas, y gestionar la lógica que no está directamente relacionada con la presentación de los datos.

| Servicios que encapsulan la lógica de negocio e interactúan con Supabase y otras fuentes de datos.
Adapters

```js
import supabase from './supabaseClient';
export async function getUser(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    throw error;
  }
  return data;
}
```


# pages => [Domain layer]
Presenters: Transform the data to a suitable format for the user interface.
Routes: Define API routes and link them to the appropriate controllers.
Controllers: Handle HTTP requests, interact with use cases, and return responses.




------------


context: manejo del estado // store
interceptors: middlewares, manejo de errores, 
adapters: adaptarodes de informacion de los modelos DB a los controladores
modelos y eshema: interface, tipos, 





# External

# Adapters

# Use Case

# Dominio
