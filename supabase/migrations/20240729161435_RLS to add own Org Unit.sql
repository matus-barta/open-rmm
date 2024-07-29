create policy "Enable user to add Org Unit to own Tenant"
on "public"."org_units"
as permissive
for insert
to authenticated
with check ((( SELECT profiles.tenant_id
   FROM profiles
  WHERE (profiles.uuid = ( SELECT auth.uid() AS uid))) = tenant_uuid));




