# Before Build

tauri "signer" "generate" "-w" "~/.tauri/myapp.key"

in powershell
$env:TAURI_SIGNING_PRIVATE_KEY="content of myapp.key"
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD="123"

# Publish steps

https://gist.github.com/serotonyn/dc6558e5d02b1670ad6a0a78694ac52c

- password for private key is `123`
- bump version (use `pnpm run bump-version`)
- build app (use `pnpm run build`)
- generate latest.json (use `pnpm run generate-latest-json`)
- commit and push
- create a new release on github uploading the latest.json file and the msi file

# Print

- Using SumatraPDF-3.5.2-64

# Before publishing

- Add Machine guid (use `Get-ItemProperty -Path HKLM:\\SOFTWARE\\Microsoft\\Cryptography | Select-Object -ExpandProperty MachineGuid`)
- (Optional) Add seeds (`src/constants/seed_gourmandises.ts`)

# From old db to new structure

- remove appdata database and start the app to get new files
- open both old and new databases in tableplus
- export content from tables to new tables
- copy storage folder (pb_data/storage) to get images (from old to new)

# next update

- do I still need users table, since I'm getting the name of current user from windows

# jerrys crypto id

- 1f5a95d9-5f85-4128-b103-dfa6db2aa50c
