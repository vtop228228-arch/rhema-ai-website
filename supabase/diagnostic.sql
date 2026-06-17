-- AI-агент диагностики (SPEC §9.5). Применить в Supabase SQL Editor.
-- Запись идёт через service_role с сервера (RLS обходится); чтения с клиента нет.

create table if not exists public.diagnostic_sessions (
  id          uuid primary key default gen_random_uuid(),
  session_id  text unique not null,
  sphere      text not null default '',
  pain        text not null default '',
  result_map  text not null default '',
  created_at  timestamptz not null default now()
);

create table if not exists public.diagnostic_leads (
  id          uuid primary key default gen_random_uuid(),
  session_id  text not null,
  name        text not null,
  contact     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists diagnostic_leads_session_idx on public.diagnostic_leads (session_id);

-- RLS включаем, политик для anon не создаём — доступ только через service_role.
alter table public.diagnostic_sessions enable row level security;
alter table public.diagnostic_leads    enable row level security;
