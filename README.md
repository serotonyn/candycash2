# Publish steps

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
