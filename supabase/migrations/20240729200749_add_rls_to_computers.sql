drop policy "Enable read access for all users" on "public"."computers";

alter table "public"."computers" drop constraint "public_computer_tenant_uuid_fkey";

alter table "public"."computers" drop column "tenant_uuid";

create policy "Enable to insert computer by correct user"
on "public"."computers"
as permissive
for insert
to authenticated
with check ((( SELECT org_units.uuid
   FROM org_units
  WHERE (org_units.tenant_uuid = ( SELECT profiles.tenant_id
           FROM profiles
          WHERE (profiles.uuid = ( SELECT auth.uid() AS uid))))) = org_unit_uuid));


create policy "Enable read access for all users"
on "public"."computers"
as permissive
for select
to authenticated
using ((( SELECT org_units.uuid
   FROM org_units
  WHERE (org_units.tenant_uuid = ( SELECT profiles.tenant_id
           FROM profiles
          WHERE (profiles.uuid = ( SELECT auth.uid() AS uid))))) = org_unit_uuid));




