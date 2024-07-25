drop policy "Enable read access for all users" on "public"."org_units";

drop policy "Enable read access for all users" on "public"."profiles";

create policy "Enable to read only own Org Units"
on "public"."org_units"
as permissive
for select
to authenticated
using ((( SELECT profiles.tenant_id
   FROM profiles
  WHERE (profiles.uuid = ( SELECT auth.uid() AS uid))) = tenant_uuid));


create policy "User can see their own profile only."
on "public"."profiles"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = uuid));




