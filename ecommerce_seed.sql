--
-- PostgreSQL database dump
--

\restrict V1sGQ7AWRj7fhUIKwDq1G7BQII0tvHFDPhhXXg60jjoIgiVvNsM1nVLBvmwSFzt

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 16.11 (Debian 16.11-1.pgdg13+1)

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
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.addresses (id, user_id, label, full_name, phone, line1, line2, city, state, postal_code, country, latitude, longitude, is_default, created_at, updated_at) VALUES (1, 20, 'home', 'vishwa', '9952800915', '27c malligai street', 'sethupathy nagar', 'sivaganagai', 'tamilnadu', '630611', 'India', NULL, NULL, true, '2025-11-13 19:22:16.357505+00', '2025-11-15 08:34:23.32008+00');
INSERT INTO public.addresses (id, user_id, label, full_name, phone, line1, line2, city, state, postal_code, country, latitude, longitude, is_default, created_at, updated_at) VALUES (3, 20, NULL, 'test', '9952800912', 'addr', 'add2', 'chennai', 'tamilnadu', '630611', 'india', NULL, NULL, false, '2025-11-15 13:20:34.445252+00', '2025-11-15 13:20:34.445252+00');
INSERT INTO public.addresses (id, user_id, label, full_name, phone, line1, line2, city, state, postal_code, country, latitude, longitude, is_default, created_at, updated_at) VALUES (4, 10, NULL, 'vishwa', '9952800915', 'addr1', 'ad', 'madurai', 'tamilnadu', '630611', 'india', NULL, NULL, false, '2025-11-16 07:14:55.215649+00', '2025-12-04 15:20:23.744859+00');
INSERT INTO public.addresses (id, user_id, label, full_name, phone, line1, line2, city, state, postal_code, country, latitude, longitude, is_default, created_at, updated_at) VALUES (6, 21, NULL, 't4', '9958009', 'addr', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, '2025-12-04 17:28:15.228978+00', '2025-12-04 17:28:15.228978+00');


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, name, slug, parent_id, active) VALUES (3, 'Health Mix', 'Health Mix', 0, true);
INSERT INTO public.categories (id, name, slug, parent_id, active) VALUES (4, 'Nuts', 'nuts', 0, true);
INSERT INTO public.categories (id, name, slug, parent_id, active) VALUES (2, 'Oils', 'oils', 0, true);
INSERT INTO public.categories (id, name, slug, parent_id, active) VALUES (1, 'Spices', 'spices', 0, true);
INSERT INTO public.categories (id, name, slug, parent_id, active) VALUES (5, 'Ghee', 'ghee', 0, false);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products (id, description, image_url, name, price, featured, active, cost_price, created_at, images, reorder_level, stock_quantity, updated_at, category_id, category) VALUES (4, 'Best Oil', NULL, 'Gingelly oil', 400, true, true, 500, '2025-11-19 18:06:00.439745+00', '', 0, 10, '2025-12-04 16:25:16.322486+00', 2, NULL);
INSERT INTO public.products (id, description, image_url, name, price, featured, active, cost_price, created_at, images, reorder_level, stock_quantity, updated_at, category_id, category) VALUES (3, 'Pure organic turmeric from Madurai', 'assets/images/spices.jpg', 'Turmeric Powder', 100, false, true, NULL, NULL, 'product-3-1763233678843.jpg', NULL, NULL, '2025-12-04 16:25:24.700436+00', 1, NULL);
INSERT INTO public.products (id, description, image_url, name, price, featured, active, cost_price, created_at, images, reorder_level, stock_quantity, updated_at, category_id, category) VALUES (2, 'Pure organic turmeric from Erode', 'assets/images/spices.jpg', 'Turmeric Powder', 120, false, false, NULL, NULL, NULL, NULL, NULL, '2025-12-04 16:25:30.316189+00', 1, NULL);
INSERT INTO public.products (id, description, image_url, name, price, featured, active, cost_price, created_at, images, reorder_level, stock_quantity, updated_at, category_id, category) VALUES (5, 'Groundnut oil from madurai', NULL, 'Groundnut oil', 200, true, false, 200, '2025-12-04 18:46:38.093943+00', '', 0, 10, '2025-12-04 18:47:15.599796+00', 2, NULL);


--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.addresses_id_seq', 6, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 5, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 5, true);


--
-- PostgreSQL database dump complete
--

\unrestrict V1sGQ7AWRj7fhUIKwDq1G7BQII0tvHFDPhhXXg60jjoIgiVvNsM1nVLBvmwSFzt

