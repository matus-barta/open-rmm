drop policy "Enable to insert computer from correct tenant" on "public"."computers";

create policy "Enable to insert computer from correct tenant"
on "public"."computers"
as permissive
for insert
to authenticated
with check ((org_unit_uuid IN ( SELECT org_units.uuid
   FROM org_units
  WHERE (org_units.tenant_uuid = ( SELECT profiles.tenant_id
           FROM profiles
          WHERE (profiles.uuid = ( SELECT auth.uid() AS uid)))))));




