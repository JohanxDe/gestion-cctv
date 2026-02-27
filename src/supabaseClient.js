import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://prhhcblwxrjthlbiifil.supabase.co'
const supabaseKey = 'sb_publishable_95HVW9uyJJIKsYmT3tzvTg_r3VcXfqa'

export const supabase = createClient(supabaseUrl, supabaseKey)