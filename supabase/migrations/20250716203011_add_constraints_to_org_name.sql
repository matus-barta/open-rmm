alter table "public"."org_units" add constraint "org_units_name_check" CHECK ((length(name) < 20)) not valid;

alter table "public"."org_units" validate constraint "org_units_name_check";



