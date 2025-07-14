drop policy "Enable read only own computers" on "public"."computers";

drop policy "Enable read access for user from tenant" on "public"."system_info";

create policy "Enable read only own computers"
on "public"."computers"
as permissive
for select
to authenticated
using ((org_unit_uuid IN ( SELECT org_units.uuid
   FROM org_units
  WHERE (org_units.tenant_uuid = ( SELECT profiles.tenant_id
           FROM profiles
          WHERE (profiles.uuid = ( SELECT auth.uid() AS uid)))))));


create policy "Enable read access for user from tenant"
on "public"."system_info"
as permissive
for select
to authenticated
using ((computer_uuid IN ( SELECT computers.uuid
   FROM computers
  WHERE (computers.org_unit_uuid IN ( SELECT org_units.uuid
           FROM org_units
          WHERE (org_units.tenant_uuid = ( SELECT profiles.tenant_id
                   FROM profiles
                  WHERE (profiles.uuid = ( SELECT auth.uid() AS uid)))))))));




