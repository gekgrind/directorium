create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  models text[] not null default '{}',
  tone text[] not null default '{}',
  board_roles text[] not null default '{}',
  export_formats text[] not null default '{}',
  defaults jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_user_settings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_user_settings_updated_at on public.user_settings;
create trigger trg_user_settings_updated_at
before update on public.user_settings
for each row
execute function public.set_user_settings_updated_at();

alter table public.user_settings enable row level security;

drop policy if exists "Users can view their settings" on public.user_settings;
create policy "Users can view their settings"
on public.user_settings
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their settings" on public.user_settings;
create policy "Users can insert their settings"
on public.user_settings
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their settings" on public.user_settings;
create policy "Users can update their settings"
on public.user_settings
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
