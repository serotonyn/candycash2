migrate(
  (app) => {
    let superusers = app.findCollectionByNameOrId("_superusers");

    let record = new Record(superusers);

    // note: the values can be eventually loaded via $os.getenv(key)
    // or from a special local config file
    record.set("email", "bob@bob.bob");
    record.set("password", "bob@bob.bob");

    app.save(record);
  },
  (app) => {
    // optional revert operation
    try {
      let record = app.findAuthRecordByEmail("_superusers", "bob@bob.bob");
      app.delete(record);
    } catch {
      // silent errors (probably already deleted)
    }
  }
);
