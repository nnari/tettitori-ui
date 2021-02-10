# Tettitori-ui

## TODO

- [x] Create initial project structure
- [x] pls bro figure out react router
- [ ] Authentication
  - [ ] Figure out how to get JWT in our React App
  - [ ] Only render private routes

## palaveri 22.01.2021

Infosivulle kuvaus palvelusta + isompi kuva Hämeen linnasta
"Ryhmittäminen"
Yrityksen nimi näkyviin ilmoitukseen
Lajittelu nimen mukaan
Verkko-osoite kenttä ilmoitukseen
Hakutoiminto!
seuraava 29.1.2021 09:30

## Random thoughts

I need to implement React Routing
Implementation help from Bobrossrtx

````js
{user ? <Route exact path="/profile"> {user ? <Profile/> : <Redirect to="/auth/login"/>} </Route> : ( <Route exact path="/profile"> <Login/> </Route> )}```



````
