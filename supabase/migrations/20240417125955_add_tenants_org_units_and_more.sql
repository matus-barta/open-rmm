revoke delete on table "public"."computer"
from
    "anon";

revoke insert on table "public"."computer"
from
    "anon";

revoke references on table "public"."computer"
from
    "anon";

revoke
select
    on table "public"."computer"
from
    "anon";

revoke trigger on table "public"."computer"
from
    "anon";

revoke
truncate on table "public"."computer"
from
    "anon";

revoke
update on table "public"."computer"
from
    "anon";

revoke delete on table "public"."computer"
from
    "authenticated";

revoke insert on table "public"."computer"
from
    "authenticated";

revoke references on table "public"."computer"
from
    "authenticated";

revoke
select
    on table "public"."computer"
from
    "authenticated";

revoke trigger on table "public"."computer"
from
    "authenticated";

revoke
truncate on table "public"."computer"
from
    "authenticated";

revoke
update on table "public"."computer"
from
    "authenticated";

revoke delete on table "public"."computer"
from
    "service_role";

revoke insert on table "public"."computer"
from
    "service_role";

revoke references on table "public"."computer"
from
    "service_role";

revoke
select
    on table "public"."computer"
from
    "service_role";

revoke trigger on table "public"."computer"
from
    "service_role";

revoke
truncate on table "public"."computer"
from
    "service_role";

revoke
update on table "public"."computer"
from
    "service_role";

revoke delete on table "public"."org_unit"
from
    "anon";

revoke insert on table "public"."org_unit"
from
    "anon";

revoke references on table "public"."org_unit"
from
    "anon";

revoke
select
    on table "public"."org_unit"
from
    "anon";

revoke trigger on table "public"."org_unit"
from
    "anon";

revoke
truncate on table "public"."org_unit"
from
    "anon";

revoke
update on table "public"."org_unit"
from
    "anon";

revoke delete on table "public"."org_unit"
from
    "authenticated";

revoke insert on table "public"."org_unit"
from
    "authenticated";

revoke references on table "public"."org_unit"
from
    "authenticated";

revoke
select
    on table "public"."org_unit"
from
    "authenticated";

revoke trigger on table "public"."org_unit"
from
    "authenticated";

revoke
truncate on table "public"."org_unit"
from
    "authenticated";

revoke
update on table "public"."org_unit"
from
    "authenticated";

revoke delete on table "public"."org_unit"
from
    "service_role";

revoke insert on table "public"."org_unit"
from
    "service_role";

revoke references on table "public"."org_unit"
from
    "service_role";

revoke
select
    on table "public"."org_unit"
from
    "service_role";

revoke trigger on table "public"."org_unit"
from
    "service_role";

revoke
truncate on table "public"."org_unit"
from
    "service_role";

revoke
update on table "public"."org_unit"
from
    "service_role";

alter table "public"."computer"
drop constraint "computer_one_time_key_check";

alter table "public"."computer"
drop constraint "computer_one_time_key_key";

alter table "public"."computer"
drop constraint "public_computer_org_unit_id_fkey";

alter table "public"."system_info"
drop constraint "public_system_info_computer_uuid_fkey";

drop view if exists "public"."computer_with_system_info";

drop view if exists "public"."org_unit_with_count";

alter table "public"."computer"
drop constraint "computer_pkey";

alter table "public"."org_unit"
drop constraint "org_unit_pkey";

drop index if exists "public"."computer_one_time_key_key";

drop index if exists "public"."computer_pkey";

drop index if exists "public"."org_unit_pkey";

drop table "public"."computer";

drop table "public"."org_unit";

create table
    "public"."computers" (
        "uuid" uuid not null default gen_random_uuid (),
        "created_at" timestamp with time zone not null default now(),
        "one_time_key" text,
        "is_allowed" boolean not null default false,
        "is_added" boolean not null default false,
        "org_unit_uuid" uuid not null default gen_random_uuid (),
        "tenant_uuid" uuid not null default gen_random_uuid ()
    );

alter table "public"."computers" enable row level security;

create table
    "public"."org_units" (
        "uuid" uuid not null default gen_random_uuid (),
        "created_at" timestamp with time zone not null default now(),
        "name" text not null default 'Default'::text,
        "tenant_uuid" uuid not null default gen_random_uuid (),
        "color" text,
        "icon_id" bigint not null default '0'::bigint
    );

alter table "public"."org_units" enable row level security;

create table
    "public"."profiles" (
        "uuid" uuid not null,
        "created_at" timestamp with time zone not null default now(),
        "photo" text,
        "full_name" text not null,
        "tenant_id" uuid not null
    );

alter table "public"."profiles" enable row level security;

create table
    "public"."tenants" (
        "uuid" uuid not null default gen_random_uuid (),
        "created_at" timestamp with time zone not null default now(),
        "name" text not null
    );

alter table "public"."tenants" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (uuid);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (uuid);

CREATE UNIQUE INDEX computer_one_time_key_key ON public.computers USING btree (one_time_key);

CREATE UNIQUE INDEX computer_pkey ON public.computers USING btree (uuid);

CREATE UNIQUE INDEX org_unit_pkey ON public.org_units USING btree (uuid);

alter table "public"."computers"
add constraint "computer_pkey" PRIMARY KEY using index "computer_pkey";

alter table "public"."org_units"
add constraint "org_unit_pkey" PRIMARY KEY using index "org_unit_pkey";

alter table "public"."profiles"
add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."tenants"
add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."computers"
add constraint "computer_one_time_key_check" CHECK ((length(one_time_key) = 64)) not valid;

alter table "public"."computers" validate constraint "computer_one_time_key_check";

alter table "public"."computers"
add constraint "computer_one_time_key_key" UNIQUE using index "computer_one_time_key_key";

alter table "public"."computers"
add constraint "public_computer_org_unit_uuid_fkey" FOREIGN KEY (org_unit_uuid) REFERENCES org_units (uuid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."computers" validate constraint "public_computer_org_unit_uuid_fkey";

alter table "public"."computers"
add constraint "public_computer_tenant_uuid_fkey" FOREIGN KEY (tenant_uuid) REFERENCES tenants (uuid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."computers" validate constraint "public_computer_tenant_uuid_fkey";

alter table "public"."org_units"
add constraint "public_org_unit_tenant_uuid_fkey" FOREIGN KEY (tenant_uuid) REFERENCES tenants (uuid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."org_units" validate constraint "public_org_unit_tenant_uuid_fkey";

alter table "public"."profiles"
add constraint "public_profiles_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants (uuid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "public_profiles_tenant_id_fkey";

alter table "public"."profiles"
add constraint "public_profiles_uuid_fkey" FOREIGN KEY (uuid) REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "public_profiles_uuid_fkey";

alter table "public"."system_info"
add constraint "public_system_info_computer_uuid_fkey" FOREIGN KEY (computer_uuid) REFERENCES computers (uuid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."system_info" validate constraint "public_system_info_computer_uuid_fkey";

grant delete on table "public"."computers" to "anon";

grant insert on table "public"."computers" to "anon";

grant references on table "public"."computers" to "anon";

grant
select
    on table "public"."computers" to "anon";

grant trigger on table "public"."computers" to "anon";

grant
truncate on table "public"."computers" to "anon";

grant
update on table "public"."computers" to "anon";

grant delete on table "public"."computers" to "authenticated";

grant insert on table "public"."computers" to "authenticated";

grant references on table "public"."computers" to "authenticated";

grant
select
    on table "public"."computers" to "authenticated";

grant trigger on table "public"."computers" to "authenticated";

grant
truncate on table "public"."computers" to "authenticated";

grant
update on table "public"."computers" to "authenticated";

grant delete on table "public"."computers" to "service_role";

grant insert on table "public"."computers" to "service_role";

grant references on table "public"."computers" to "service_role";

grant
select
    on table "public"."computers" to "service_role";

grant trigger on table "public"."computers" to "service_role";

grant
truncate on table "public"."computers" to "service_role";

grant
update on table "public"."computers" to "service_role";

grant delete on table "public"."org_units" to "anon";

grant insert on table "public"."org_units" to "anon";

grant references on table "public"."org_units" to "anon";

grant
select
    on table "public"."org_units" to "anon";

grant trigger on table "public"."org_units" to "anon";

grant
truncate on table "public"."org_units" to "anon";

grant
update on table "public"."org_units" to "anon";

grant delete on table "public"."org_units" to "authenticated";

grant insert on table "public"."org_units" to "authenticated";

grant references on table "public"."org_units" to "authenticated";

grant
select
    on table "public"."org_units" to "authenticated";

grant trigger on table "public"."org_units" to "authenticated";

grant
truncate on table "public"."org_units" to "authenticated";

grant
update on table "public"."org_units" to "authenticated";

grant delete on table "public"."org_units" to "service_role";

grant insert on table "public"."org_units" to "service_role";

grant references on table "public"."org_units" to "service_role";

grant
select
    on table "public"."org_units" to "service_role";

grant trigger on table "public"."org_units" to "service_role";

grant
truncate on table "public"."org_units" to "service_role";

grant
update on table "public"."org_units" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant
select
    on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant
truncate on table "public"."profiles" to "anon";

grant
update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant
select
    on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant
truncate on table "public"."profiles" to "authenticated";

grant
update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant
select
    on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant
truncate on table "public"."profiles" to "service_role";

grant
update on table "public"."profiles" to "service_role";

grant delete on table "public"."tenants" to "anon";

grant insert on table "public"."tenants" to "anon";

grant references on table "public"."tenants" to "anon";

grant
select
    on table "public"."tenants" to "anon";

grant trigger on table "public"."tenants" to "anon";

grant
truncate on table "public"."tenants" to "anon";

grant
update on table "public"."tenants" to "anon";

grant delete on table "public"."tenants" to "authenticated";

grant insert on table "public"."tenants" to "authenticated";

grant references on table "public"."tenants" to "authenticated";

grant
select
    on table "public"."tenants" to "authenticated";

grant trigger on table "public"."tenants" to "authenticated";

grant
truncate on table "public"."tenants" to "authenticated";

grant
update on table "public"."tenants" to "authenticated";

grant delete on table "public"."tenants" to "service_role";

grant insert on table "public"."tenants" to "service_role";

grant references on table "public"."tenants" to "service_role";

grant
select
    on table "public"."tenants" to "service_role";

grant trigger on table "public"."tenants" to "service_role";

grant
truncate on table "public"."tenants" to "service_role";

grant
update on table "public"."tenants" to "service_role";

create policy "Enable read access for all users" on "public"."computers" as permissive for
select
    to public using (true);

create policy "Enable read access for all users" on "public"."org_units" as permissive for
select
    to public using (true);

create policy "Enable read access for all users" on "public"."profiles" as permissive for
select
    to public using (true);

create policy "Enable read access for all users" on "public"."system_info" as permissive for
select
    to public using (true);

create policy "Enable read access for all users" on "public"."tenants" as permissive for
select
    to public using (true);