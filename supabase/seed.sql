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
	('00000000-0000-0000-0000-000000000000', '5dbe55d3-85d6-4bcc-9377-8fab8c685bf2', '{"action":"login","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-07-29 16:34:44.560548+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '4f94abaf-da09-4226-a079-38369e07ccb2', 'authenticated', 'authenticated', 'test@test.com', '$2a$10$Yj1b7dxnTYQ6ttmpAF5Aw.xESyvzk5wCti9ahQg9KMSyAFVHbNhBS', '2024-07-29 16:34:44.559457+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-07-29 16:34:44.56071+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4f94abaf-da09-4226-a079-38369e07ccb2", "email": "test@test.com", "email_verified": false, "phone_verified": false}', NULL, '2024-07-29 16:34:44.55426+00', '2024-07-29 16:34:44.562982+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


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
	('ef848c4e-6cbd-42e4-b357-30a1bbad0e64', '4f94abaf-da09-4226-a079-38369e07ccb2', '2024-07-29 16:34:44.560746+00', '2024-07-29 16:34:44.560746+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('ef848c4e-6cbd-42e4-b357-30a1bbad0e64', '2024-07-29 16:34:44.563275+00', '2024-07-29 16:34:44.563275+00', 'password', 'e8014032-d617-4034-be2d-39dfa66afb02');


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
	('00000000-0000-0000-0000-000000000000', 1, 'vwQbEMoI95z2Whm8RUfd7Q', '4f94abaf-da09-4226-a079-38369e07ccb2', false, '2024-07-29 16:34:44.561406+00', '2024-07-29 16:34:44.561406+00', NULL, 'ef848c4e-6cbd-42e4-b357-30a1bbad0e64');


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



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("uuid", "created_at", "photo", "full_name", "tenant_id") VALUES
	('4f94abaf-da09-4226-a079-38369e07ccb2', '2024-07-29 16:34:44.589459+00', NULL, 'janko hrasko', '33c665ab-513e-4847-a1e2-a564b1a654b5');


--
-- Data for Name: system_info; Type: TABLE DATA; Schema: public; Owner: postgres
--



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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, true);


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
