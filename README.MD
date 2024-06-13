
# Projektnamn: 
Airbean_individuell_Ann

## Projektbeskrivning
Inlämningsuppgift för kursen Frontendramverk (FE23). 

## Installation
För att installera nödvändiga paket, kör följande kommando:
`npm install express body-parser express-session bcrypt`

## Starta servern
För att starta servern, kör:
`npm start`

## URL
http://localhost:3000/

### Endpoints
| Anrop       | Route           | Resultat |
| ------------- |:-------------:| -----:|
| POST |/login | Logga in |
| POST |/logout | Logga ut|
| GET  |/admin/menu  |  Visa Meny |
| POST | /admin/menu  |   Lägga till produkt i meny |
| DEL  |/admin/menu/:id |   Ta bort produkt från meny |
| PUT  |/admin/menu/:id  |    Modifiera produkt i meny|
| POST | /admin/campaign  |   Lägg till kampanj |
| GET | /admin/campaigns  |   Visa alla kampanjer|
| GET | /check-login   |   Kontrollera om användaren är inloggad |


