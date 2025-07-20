SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

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
	('00000000-0000-0000-0000-000000000000', '3abb8bc4-d3a1-4429-92ce-308e4144d79e', '{"action":"token_revoked","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"token"}', '2024-08-05 20:55:33.426233+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f577392-a420-4192-be03-e59937309f47', '{"action":"login","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-16 19:20:58.110704+00', ''),
	('00000000-0000-0000-0000-000000000000', '185a96ac-719d-4aba-b00d-79055a01b633', '{"action":"token_refreshed","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"token"}', '2025-07-16 20:19:13.947592+00', ''),
	('00000000-0000-0000-0000-000000000000', '158215c1-8740-448a-9e49-55edf3024b65', '{"action":"token_revoked","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"token"}', '2025-07-16 20:19:13.949017+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b379fcb8-6463-4abf-9e70-fe23fce72599', '{"action":"login","actor_id":"4f94abaf-da09-4226-a079-38369e07ccb2","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 14:46:29.655988+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '4f94abaf-da09-4226-a079-38369e07ccb2', 'authenticated', 'authenticated', 'test@test.com', '$2a$10$Yj1b7dxnTYQ6ttmpAF5Aw.xESyvzk5wCti9ahQg9KMSyAFVHbNhBS', '2024-07-29 16:34:44.559457+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-07-20 14:46:29.657246+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4f94abaf-da09-4226-a079-38369e07ccb2", "email": "test@test.com", "email_verified": false, "phone_verified": false}', NULL, '2024-07-29 16:34:44.55426+00', '2025-07-20 14:46:29.660448+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


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
	('2cb38ea7-6cc3-4aaf-bc8e-77016f06dd59', '4f94abaf-da09-4226-a079-38369e07ccb2', '2024-08-05 19:30:24.671547+00', '2024-08-05 20:55:33.430336+00', NULL, 'aal1', NULL, '2024-08-05 20:55:33.430257', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '192.168.65.1', NULL),
	('88fbfe64-7c53-467d-8746-556a29e82238', '4f94abaf-da09-4226-a079-38369e07ccb2', '2025-07-16 19:20:58.111726+00', '2025-07-16 20:19:13.964164+00', NULL, 'aal1', NULL, '2025-07-16 20:19:13.964119', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '142.251.39.74', NULL),
	('e31a0a57-09d2-480c-927d-52ad6fe33246', '4f94abaf-da09-4226-a079-38369e07ccb2', '2025-07-20 14:46:29.65736+00', '2025-07-20 14:46:29.65736+00', NULL, 'aal1', NULL, NULL, 'node', '172.19.0.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('ef848c4e-6cbd-42e4-b357-30a1bbad0e64', '2024-07-29 16:34:44.563275+00', '2024-07-29 16:34:44.563275+00', 'password', 'e8014032-d617-4034-be2d-39dfa66afb02'),
	('0c8a15ba-3905-4f14-ad6a-1a00b9b22ee8', '2024-07-31 10:16:36.571658+00', '2024-07-31 10:16:36.571658+00', 'password', '69b008db-d2ad-4dfd-bf6a-cdb6b66aa63e'),
	('2cb38ea7-6cc3-4aaf-bc8e-77016f06dd59', '2024-08-05 19:30:24.674841+00', '2024-08-05 19:30:24.674841+00', 'password', '291714aa-dada-41d9-b6d1-ef11db310764'),
	('88fbfe64-7c53-467d-8746-556a29e82238', '2025-07-16 19:20:58.114181+00', '2025-07-16 19:20:58.114181+00', 'password', '6a8ce195-6e88-4b12-ae16-2805992343a4'),
	('e31a0a57-09d2-480c-927d-52ad6fe33246', '2025-07-20 14:46:29.661252+00', '2025-07-20 14:46:29.661252+00', 'password', '7c3ce58a-c1c3-4d27-9e9e-faef1a2efc67');


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
	('00000000-0000-0000-0000-000000000000', 4, 'EmBjBwic_s6AagO0E95K-Q', '4f94abaf-da09-4226-a079-38369e07ccb2', false, '2024-08-05 20:55:33.427971+00', '2024-08-05 20:55:33.427971+00', 'tkmBGOW8qW3sBgvfssJAVQ', '2cb38ea7-6cc3-4aaf-bc8e-77016f06dd59'),
	('00000000-0000-0000-0000-000000000000', 5, '22hyyddohkee', '4f94abaf-da09-4226-a079-38369e07ccb2', true, '2025-07-16 19:20:58.112498+00', '2025-07-16 20:19:13.950568+00', NULL, '88fbfe64-7c53-467d-8746-556a29e82238'),
	('00000000-0000-0000-0000-000000000000', 6, '2gyqdjhdbvvn', '4f94abaf-da09-4226-a079-38369e07ccb2', false, '2025-07-16 20:19:13.956176+00', '2025-07-16 20:19:13.956176+00', '22hyyddohkee', '88fbfe64-7c53-467d-8746-556a29e82238'),
	('00000000-0000-0000-0000-000000000000', 7, 'zm73z6qgkgm2', '4f94abaf-da09-4226-a079-38369e07ccb2', false, '2025-07-20 14:46:29.65858+00', '2025-07-20 14:46:29.65858+00', NULL, 'e31a0a57-09d2-480c-927d-52ad6fe33246');


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
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tenants" ("uuid", "created_at", "name") VALUES
	('33c665ab-513e-4847-a1e2-a564b1a654b5', '2024-07-29 16:34:44.584151+00', 'ACME');


--
-- Data for Name: org_units; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."org_units" ("uuid", "created_at", "name", "tenant_uuid", "color", "icon_id") VALUES
	('497aeef2-edd7-4122-8d05-2edcc206a187', '2024-07-29 16:34:44.596277+00', 'Default', '33c665ab-513e-4847-a1e2-a564b1a654b5', 0, 0),
	('8694cf8d-367f-42b8-894e-1771c6ba3cd7', '2025-07-16 19:19:46.624898+00', 'Office', '33c665ab-513e-4847-a1e2-a564b1a654b5', 1, 1),
	('e4f3818f-8a03-4fc6-8683-961955ccca75', '2025-07-16 19:20:02.3006+00', 'Home', '33c665ab-513e-4847-a1e2-a564b1a654b5', 2, 2),
	('0cc1e5cc-b165-444b-b0e8-d19ab991ec04', '2025-07-16 19:20:14.977909+00', 'L12', '33c665ab-513e-4847-a1e2-a564b1a654b5', 3, 3),
	('7babf233-29d0-4d1c-b256-c122c36a3586', '2025-07-16 19:20:27.713442+00', 'NewGardens', '33c665ab-513e-4847-a1e2-a564b1a654b5', 4, 4),
	('77d94bde-b2d5-46ad-b8f2-afca7e7ff99c', '2025-07-16 19:19:46.624898+00', 'Stark Industries', '33c665ab-513e-4847-a1e2-a564b1a654b5', 6, 6),
	('a648ae72-b51b-436c-ae73-852f1250b3c4', '2025-07-16 19:20:14.977909+00', 'Konpeki Plaza', '33c665ab-513e-4847-a1e2-a564b1a654b5', 13, 13),
	('31867062-522f-494c-b2d1-03777566bb8b', '2025-07-16 19:20:02.3006+00', 'Istok LLC', '33c665ab-513e-4847-a1e2-a564b1a654b5', 7, 7),
	('5fdc4fc1-8bce-4da3-920b-c9f3b7da2c1a', '2025-07-16 19:20:14.977909+00', 'Cyberdyne Systems', '33c665ab-513e-4847-a1e2-a564b1a654b5', 8, 8),
	('68a06984-eab8-4c51-80bd-eea2de3ef070', '2025-07-16 19:20:27.713442+00', 'Aperture Sciences', '33c665ab-513e-4847-a1e2-a564b1a654b5', 9, 9),
	('f8b504b8-a4f5-44ce-9b30-a74551c9e12f', '2024-07-29 16:34:44.596277+00', 'RDA', '33c665ab-513e-4847-a1e2-a564b1a654b5', 5, 5),
	('cc4bc505-50a0-4332-9e25-f99992d5d530', '2024-07-29 16:34:44.596277+00', 'Pandora', '33c665ab-513e-4847-a1e2-a564b1a654b5', 10, 10),
	('29b911d8-1c54-4a4e-b405-85d0c33331e3', '2025-07-16 19:19:46.624898+00', 'InGen', '33c665ab-513e-4847-a1e2-a564b1a654b5', 11, 11),
	('5a2b30fd-1b91-4329-a531-992ae0862ce3', '2025-07-16 19:20:02.3006+00', 'Oscorp', '33c665ab-513e-4847-a1e2-a564b1a654b5', 12, 12),
	('1f4f328c-0f47-4daa-b8d8-811bcb649a88', '2025-07-16 19:20:27.713442+00', 'Tyrell', '33c665ab-513e-4847-a1e2-a564b1a654b5', 14, 14),
	('82839489-1ff9-4e75-b471-7f25850ffa1d', '2025-07-16 19:20:27.713442+00', 'Nakatomi', '33c665ab-513e-4847-a1e2-a564b1a654b5', 15, 15);


--
-- Data for Name: computers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."computers" ("uuid", "created_at", "one_time_key", "is_allowed", "is_added", "org_unit_uuid") VALUES
	('4ad217f2-2859-4b55-b582-aab0aaf01262', '2024-07-31 10:17:18.906088+00', 'iXlyTWCyYm78SL1gc-kbA6a0ugJCc4vyBIo4BlFTpPxkWW50PxnttHRxfCnyPT0s', true, true, '497aeef2-edd7-4122-8d05-2edcc206a187'),
	('6322c626-9a67-437e-859f-def6beb0aeea', '2025-07-20 14:49:03.093778+00', 'jZMDyAUHssUaMZIU03yMn3hpfdyHmrJwLKnE4rnYllpIoVFbitictElV4OCYV4FM', false, false, '497aeef2-edd7-4122-8d05-2edcc206a187'),
	('bff9b555-fb10-48bf-940a-d944b1346b59', '2025-07-20 14:49:25.564418+00', 'M2vDcYzRIXswTWg4vSZSrpOS2EKqmS8aRXvaYseUb2gZIEUQNTjVxnENqF0y0xsr', false, false, '497aeef2-edd7-4122-8d05-2edcc206a187'),
	('a1345d0e-c05a-40e2-b16e-18ffe8dae51b', '2025-07-20 14:49:47.050749+00', 'DuCmfbxf0FVFmn1tXtcuHhmjJZXfMEIUfC5riWCi2gxQd1KApqwzj5snqrhwyh4u', false, false, '497aeef2-edd7-4122-8d05-2edcc206a187');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("uuid", "created_at", "photo", "full_name", "tenant_id") VALUES
	('4f94abaf-da09-4226-a079-38369e07ccb2', '2024-07-29 16:34:44.589459+00', NULL, 'janko hrasko', '33c665ab-513e-4847-a1e2-a564b1a654b5');


--
-- Data for Name: system_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."system_info" ("computer_uuid", "created_at", "machine_type", "pending_reboot", "computer_name", "last_bootup_time", "os_version", "os_name", "kernel_version", "updated_at") VALUES
	('4ad217f2-2859-4b55-b582-aab0aaf01262', '2024-08-05 18:49:10.968199+00', 'Physical', false, 'Mac-mini-M1.local', '2024-06-06 11:47:45+00', '14.5', 'MacOS 14.5 Sonoma', '23.5.0', '2024-08-05 21:32:52.690352+00'),
	('6322c626-9a67-437e-859f-def6beb0aeea', '2025-07-20 14:51:12.807305+00', 'VM', true, 'T-1000', '2025-07-20 14:50:56+00', '10.0', 'Windows', NULL, NULL),
	('a1345d0e-c05a-40e2-b16e-18ffe8dae51b', '2025-07-20 14:51:53.110113+00', 'LXC', false, 'Utility', '2025-07-20 14:51:38+00', '24.04', 'Ubuntu', NULL, NULL),
	('bff9b555-fb10-48bf-940a-d944b1346b59', '2025-07-20 14:52:17.645892+00', 'Unknown', NULL, 'idk', '2025-07-20 14:52:12+00', NULL, NULL, NULL, '2025-07-20 14:52:40.893991+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
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
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 7, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
