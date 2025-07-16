alter table "public"."org_units" alter column "color" set not null;

alter table "public"."org_units" alter column "color" set data type smallint using "color"::smallint;

alter table "public"."org_units" alter column "icon_id" drop default;

alter table "public"."org_units" alter column "icon_id" set data type smallint using "icon_id"::smallint;

alter table "public"."org_units" add constraint "org_units_color_check" CHECK ((color >= 0)) not valid;

alter table "public"."org_units" validate constraint "org_units_color_check";

alter table "public"."org_units" add constraint "org_units_icon_id_check" CHECK ((icon_id >= 0)) not valid;

alter table "public"."org_units" validate constraint "org_units_icon_id_check";



