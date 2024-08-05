# Notes for supabase (no clue where to put this)

## add updated_at timestamp

<https://dev.to/paullaros/updating-timestamps-automatically-in-supabase-5f5o>

```sql
-- Add new columns to table named `created_at` and `updated_at`
ALTER TABLE YOUR_TABLE_NAME
ADD COLUMN created_at timestamptz default now(),
ADD COLUMN updated_at timestamptz;

-- Enable MODDATETIME extension
create extension if not exists moddatetime schema extensions;

-- This will set the `updated_at` column on every update
create trigger handle_updated_at before update on YOUR_TABLE_NAME
  for each row execute procedure moddatetime (updated_at);
```

## upserting with RLS

<https://github.com/supabase/supabase/pull/9522#issuecomment-1278600121>
<https://github.com/supabase/supabase/issues/4797>
<https://github.com/orgs/supabase/discussions/4755>

when upserting with RLS _need to have_ RLS for

- **Update** also _with check_ statement
- **Insert** and **Select**
