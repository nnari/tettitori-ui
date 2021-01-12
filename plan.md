# Tettitori-ui

## TODO
- [x] Create initial project structure
- [ ] pls bro figure out react router
- [ ] Authentication
    - [ ] Figure out how to get JWT in our React App
    - [ ] Only render private routes


## Random thoughts
I need to implement React Routing 
Implementation help from Bobrossrtx
```js
{user ? <Route exact path="/profile"> {user ? <Profile/> : <Redirect to="/auth/login"/>} </Route> : ( <Route exact path="/profile"> <Login/> </Route> )}```
    