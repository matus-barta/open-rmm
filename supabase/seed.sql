SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '534292db-6ea5-4d3e-a029-9e0a3e8a1256', '{"action":"user_signedup","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-07-29 16:34:44.558989+00', ''),
	('00000000-0000-0000-0000-000000000000', '5dbe55d3-85d6-4bcc-9377-8fab8c685bf2', '{"action":"login","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-07-29 16:34:44.560548+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a6fb81e5-3a4a-433c-a191-3db2bcdfc375', '{"action":"login","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-07-31 10:16:36.562289+00', ''),
	('00000000-0000-0000-0000-000000000000', '47bc6d8a-8e41-4dcf-a5db-2d06b266b369', '{"action":"login","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-08-05 19:30:24.668894+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ca93aca-0211-4604-80b4-3660d4a80e4a', '{"action":"token_refreshed","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"token"}', '2024-08-05 20:55:33.424995+00', ''),
	('00000000-0000-0000-0000-000000000000', '3abb8bc4-d3a1-4429-92ce-308e4144d79e', '{"action":"token_revoked","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"token"}', '2024-08-05 20:55:33.426233+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '4f94abaf-da09-4226-a079-38369e07ccb2', 'authenticated', 'authenticated', 'test@test.com', '$2a$10$Yj1b7dxnTYQ6ttmpAF5Aw.xESyvzk5wCti9ahQg9KMSyAFVHbNhBS', '2024-07-29 16:34:44.559457+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-08-05 19:30:24.671499+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4f94abaf-da09-4226-a079-38369e07ccb2", "email": "test@test.com", "email_verified": false, "phone_verified": false}', NULL, '2024-07-29 16:34:44.55426+00', '2024-08-05 20:55:33.429295+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('4f94abaf-da09-4226-a079-38369e07ccb2', '4f94abaf-da09-4226-a079-38369e07ccb2', '{"sub": "4f94abaf-da09-4226-a079-38369e07ccb2", "email": "test@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-07-29 16:34:44.557523+00', '2024-07-29 16:34:44.557542+00', '2024-07-29 16:34:44.557542+00', 'b7bcfe8b-9621-4462-9aea-d1534c0acd67');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('ef848c4e-6cbd-42e4-b357-30a1bbad0e64', '4f94abaf-da09-4226-a079-38369e07ccb2', '2024-07-29 16:34:44.560746+00', '2024-07-29 16:34:44.560746+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('0c8a15ba-3905-4f14-ad6a-1a00b9b22ee8', '4f94abaf-da09-4226-a079-38369e07ccb2', '2024-07-31 10:16:36.56563+00', '2024-07-31 10:16:36.56563+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('2cb38ea7-6cc3-4aaf-bc8e-77016f06dd59', '4f94abaf-da09-4226-a079-38369e07ccb2', '2024-08-05 19:30:24.671547+00', '2024-08-05 20:55:33.430336+00', NULL, 'aal1', NULL, '2024-08-05 20:55:33.430257', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '192.168.65.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('ef848c4e-6cbd-42e4-b357-30a1bbad0e64', '2024-07-29 16:34:44.563275+00', '2024-07-29 16:34:44.563275+00', 'password', 'e8014032-d617-4034-be2d-39dfa66afb02'),
	('0c8a15ba-3905-4f14-ad6a-1a00b9b22ee8', '2024-07-31 10:16:36.571658+00', '2024-07-31 10:16:36.571658+00', 'password', '69b008db-d2ad-4dfd-bf6a-cdb6b66aa63e'),
	('2cb38ea7-6cc3-4aaf-bc8e-77016f06dd59', '2024-08-05 19:30:24.674841+00', '2024-08-05 19:30:24.674841+00', 'password', '291714aa-dada-41d9-b6d1-ef11db310764');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'vwQbEMoI95z2Whm8RUfd7Q', '4f94abaf-da09-4226-a079-38369e07ccb2', false, '2024-07-29 16:34:44.561406+00', '2024-07-29 16:34:44.561406+00', NULL, 'ef848c4e-6cbd-42e4-b357-30a1bbad0e64'),
	('00000000-0000-0000-0000-000000000000', 2, 'iHQmLGFmUHGxDJrEFsWAfw', '4f94abaf-da09-4226-a079-38369e07ccb2', false, '2024-07-31 10:16:36.568465+00', '2024-07-31 10:16:36.568465+00', NULL, '0c8a15ba-3905-4f14-ad6a-1a00b9b22ee8'),
	('00000000-0000-0000-0000-000000000000', 3, 'tkmBGOW8qW3sBgvfssJAVQ', '4f94abaf-da09-4226-a079-38369e07ccb2', true, '2024-08-05 19:30:24.673243+00', '2024-08-05 20:55:33.427+00', NULL, '2cb38ea7-6cc3-4aaf-bc8e-77016f06dd59'),
	('00000000-0000-0000-0000-000000000000', 4, 'EmBjBwic_s6AagO0E95K-Q', '4f94abaf-da09-4226-a079-38369e07ccb2', false, '2024-08-05 20:55:33.427971+00', '2024-08-05 20:55:33.427971+00', 'tkmBGOW8qW3sBgvfssJAVQ', '2cb38ea7-6cc3-4aaf-bc8e-77016f06dd59');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tenants" ("uuid", "created_at", "name") VALUES
	('33c665ab-513e-4847-a1e2-a564b1a654b5', '2024-07-29 16:34:44.584151+00', 'ACME');


--
-- Data for Name: org_units; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."org_units" ("uuid", "created_at", "name", "tenant_uuid", "color", "icon_id") VALUES
	('497aeef2-edd7-4122-8d05-2edcc206a187', '2024-07-29 16:34:44.596277+00', 'Default', '33c665ab-513e-4847-a1e2-a564b1a654b5', NULL, 0);


--
-- Data for Name: computers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."computers" ("uuid", "created_at", "one_time_key", "is_allowed", "is_added", "org_unit_uuid") VALUES
	('4ad217f2-2859-4b55-b582-aab0aaf01262', '2024-07-31 10:17:18.906088+00', 'iXlyTWCyYm78SL1gc-kbA6a0ugJCc4vyBIo4BlFTpPxkWW50PxnttHRxfCnyPT0s', true, true, '497aeef2-edd7-4122-8d05-2edcc206a187');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("uuid", "created_at", "photo", "full_name", "tenant_id") VALUES
	('4f94abaf-da09-4226-a079-38369e07ccb2', '2024-07-29 16:34:44.589459+00', NULL, 'janko hrasko', '33c665ab-513e-4847-a1e2-a564b1a654b5');


--
-- Data for Name: system_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."system_info" ("computer_uuid", "created_at", "machine_type", "pending_reboot", "computer_name", "last_bootup_time", "os_version", "os_name", "kernel_version", "updated_at") VALUES
	('4ad217f2-2859-4b55-b582-aab0aaf01262', '2024-08-05 18:49:10.968199+00', 'Physical', false, 'Mac-mini-M1.local', '2024-06-06 11:47:45+00', '14.5', 'MacOS 14.5 Sonoma', '23.5.0', '2024-08-05 21:32:52.690352+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 4, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
