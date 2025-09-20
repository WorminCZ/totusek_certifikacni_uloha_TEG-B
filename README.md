# totusek_certifikacni_uloha_TEG-B

Repozitáž k závěrečné úloze Cypress Akademie
Automatizované testy pro Teg-B

╔════════════════════════════════╗
║ Vytvořil ║
║ Jaroslav Totušek ║
╚════════════════════════════════╝

Tento projekt obsahuje sadu testů napsaných v Cypressu - E2E, atomické, api i ddt
.
Cílem je ověřit klíčovou funkčnost aplikace Teg-B, od přihlášení uživatele, přes práci s účty až po úpravy uživatelského profilu.

📦 Co testy obsahují

Autentizace – přihlášení uživatele přes UI i API.

Dashboard – viditelnost loga, hlavičky, menu a tlačítek.

Uživatelský profil – editace údajů a validace změn.

Účty – zakládání účtů přes API a ověřování zůstatků na frontendu.

DDT (Data-Driven Testing) – využití fixture souborů pro testování více kombinací vstupních dat.

🛠 Použité technologie

Cypress
– framework pro E2E testy.

Faker.js
– generování testovacích uživatelských dat.

Page Object
– oddělení logiky testů od lokátorů.

Fixtures (JSON)
– správa testovacích dat mimo kód.
