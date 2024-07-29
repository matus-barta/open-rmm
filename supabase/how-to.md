# Make db migration

```bash
supabase db diff | supabase migration new "migration name"
```

# Save seed

```bash
supabase db diff my_schema
supabase db dump --local --data-only > supabase/seed.sql
```
