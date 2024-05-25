


context: manejo del estado // store
interceptors: middlewares, manejo de errores, 
adapters: adaptarodes de informacion de los modelos DB a los controladores
modelos y eshema: interface, tipos, 


# Services (Servicios): 
Encapsulan la lógica de negocio y la interacción con fuentes de datos externas. Los servicios se encargan de realizar operaciones como acceder a bases de datos, hacer llamadas a APIs externas, y gestionar la lógica que no está directamente relacionada con la presentación de los datos.

| Servicios que encapsulan la lógica de negocio e interactúan con Supabase y otras fuentes de datos.

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

# Controllers
Controladores que manejan las solicitudes HTTP y utilizan los servicios para realizar operaciones específicas.



# External

# Adapters

# Use Case

# Dominio
