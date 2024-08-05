create extension if not exists "moddatetime" with schema "extensions";


drop policy "Enable read access for all users" on "public"."computers";

drop policy "Enable to insert computer by correct user" on "public"."computers";

drop policy "Enable read access for all users" on "public"."system_info";

drop policy "Enable read access for all users" on "public"."tenants";

alter table "public"."system_info" add column "updated_at" timestamp with time zone;

create policy "Enable read only own computers"
on "public"."computers"
as permissive
for select
to authenticated
using ((( SELECT org_units.uuid
   FROM org_units
  WHERE (org_units.tenant_uuid = ( SELECT profiles.tenant_id
           FROM profiles
          WHERE (profiles.uuid = ( SELECT auth.uid() AS uid))))) = org_unit_uuid));


create policy "Enable to insert computer from correct tenant"
on "public"."computers"
as permissive
for insert
to authenticated
with check ((( SELECT org_units.uuid
   FROM org_units
  WHERE (org_units.tenant_uuid = ( SELECT profiles.tenant_id
           FROM profiles
          WHERE (profiles.uuid = ( SELECT auth.uid() AS uid))))) = org_unit_uuid));


create policy "Allow insert known uuid"
on "public"."system_info"
as permissive
for insert
to anon
with check (((( SELECT ((current_setting('request.headers'::text, true))::json ->> 'device-uuid'::text)))::uuid = computer_uuid));


create policy "Allow select known uuid"
on "public"."system_info"
as permissive
for select
to anon
using (((( SELECT ((current_setting('request.headers'::text, true))::json ->> 'device-uuid'::text)))::uuid = computer_uuid));


create policy "Allow update known uuid"
on "public"."system_info"
as permissive
for update
to anon
using (((( SELECT ((current_setting('request.headers'::text, true))::json ->> 'device-uuid'::text)))::uuid = computer_uuid))
with check (((( SELECT ((current_setting('request.headers'::text, true))::json ->> 'device-uuid'::text)))::uuid = computer_uuid));


create policy "Enable read access for user from tenant"
on "public"."system_info"
as permissive
for select
to authenticated
using ((( SELECT computers.uuid
   FROM computers
  WHERE (computers.org_unit_uuid = ( SELECT org_units.uuid
           FROM org_units
          WHERE (org_units.tenant_uuid = ( SELECT profiles.tenant_id
                   FROM profiles
                  WHERE (profiles.uuid = ( SELECT auth.uid() AS uid))))))) = computer_uuid));


create policy "Enable read only own tenant"
on "public"."tenants"
as permissive
for select
to authenticated
using ((( SELECT profiles.tenant_id
   FROM profiles
  WHERE (profiles.uuid = ( SELECT auth.uid() AS uid))) = uuid));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.system_info FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');



