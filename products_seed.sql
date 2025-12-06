--
-- PostgreSQL database dump
--

\restrict FI7p5vXCEFWegbb9zIXqGt8JY9rLpSOWjeGO5OyoiqkuKrPd2defuf1SHQ0iJda

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
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products (id, description, image_url, name, price, featured, active, cost_price, created_at, images, reorder_level, stock_quantity, updated_at, category_id, category) VALUES (4, 'Best Oil', NULL, 'Gingelly oil', 400, true, true, 500, '2025-11-19 18:06:00.439745+00', '', 0, 10, '2025-12-04 16:25:16.322486+00', 2, NULL);
INSERT INTO public.products (id, description, image_url, name, price, featured, active, cost_price, created_at, images, reorder_level, stock_quantity, updated_at, category_id, category) VALUES (3, 'Pure organic turmeric from Madurai', 'assets/images/spices.jpg', 'Turmeric Powder', 100, false, true, NULL, NULL, 'product-3-1763233678843.jpg', NULL, NULL, '2025-12-04 16:25:24.700436+00', 1, NULL);
INSERT INTO public.products (id, description, image_url, name, price, featured, active, cost_price, created_at, images, reorder_level, stock_quantity, updated_at, category_id, category) VALUES (2, 'Pure organic turmeric from Erode', 'assets/images/spices.jpg', 'Turmeric Powder', 120, false, false, NULL, NULL, NULL, NULL, NULL, '2025-12-04 16:25:30.316189+00', 1, NULL);
INSERT INTO public.products (id, description, image_url, name, price, featured, active, cost_price, created_at, images, reorder_level, stock_quantity, updated_at, category_id, category) VALUES (5, 'Groundnut oil from madurai', NULL, 'Groundnut oil', 200, true, false, 200, '2025-12-04 18:46:38.093943+00', '', 0, 10, '2025-12-04 18:47:15.599796+00', 2, NULL);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 5, true);


--
-- PostgreSQL database dump complete
--

\unrestrict FI7p5vXCEFWegbb9zIXqGt8JY9rLpSOWjeGO5OyoiqkuKrPd2defuf1SHQ0iJda

