# TODO

## Agent

### notes

- maybe rename to just service
- if not GUI system this is the main CLI app

### todos

- [ ] self installer
  - [ ] research self installing cross platform options
  - [ ] create service
  - [ ] copy executable and config files
  - [ ] add itself to path
- [ ] self updater
  - [ ] research self updating (tauri may have the solution)
- [x] read system info
- [x] report system info
- [x] register system to dashboard

## GUI agent

### notes

`tauri based gui application`

- using IPC to communicate with services
- some basic application management
- only distributed to GUI systems
- packaged together with `service/agent`

## WWW

- [x] registration/login
  - [ ] proper UI
- [ ] account management
  - [x] logout
    - [ ] implement in proper place in UI
  - [ ] MFA
  - [ ] change password
  - [ ] invite/create account
  - [ ] profile picture
- [ ] Org. units
  - [x] default handling during creation
  - [x] add
        - [ ] new UI
  - [ ] edit
  - [ ] delete
  - [ ] UI for color and icon
- [ ] computers view
  - [x] list computers and their info
  - [x] show computer details
  - [x] create computer and its OTK
  - [ ] edit computer
- [ ] search
- [ ] documentation
  - [ ] markdown rendering
  - [ ] where to store markdown
  - [ ] markdown editor (local storage during editing)
  - [ ] add/edit/delete documents
- [ ] inventory (based on InProgress POC)
  - [ ] create device (should be able to connect with RMM device)
- [ ] Settings
  - [ ] tenant settings
  - [ ] idk...

## Supabase

- [x] tenants
- [x] org units
- [x] profiles
- [x] computers
- [x] system info
- [ ] storage for images
- [ ] login with OAuth
- [ ] support for Docs
- [ ] support for Inventory
- [ ] correct RLS for tenants, profiles, computers, system info, org units
- [ ] Edge fn
  - [x] registering agent

## Stuff around the project

- [ ] docker compose for self hosting (based on supabase and add other packages needed)
- [ ] dockerize WWW for self-hosting
- [ ] self-hosting documentation
- [ ] documentation in general

## CI/CD

- [ ] build agent
- [ ] build docker package for WWW
