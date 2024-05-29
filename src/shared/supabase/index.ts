import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: "pkce",
    },
  },
);

// query

// return a foreign data
// const { data, error } = await supabase
//   .from('countries')
//   .select(`
//     name,
//     cities!inner (
//       name
//     )
//   `)
//   .or('country_id.eq.1,name.eq.Beijing', { referencedTable: 'cities' })
