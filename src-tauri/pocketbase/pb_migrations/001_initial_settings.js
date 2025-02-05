migrate((app) => {
  let settings = app.settings();

  settings.meta.appName = "CandyCash";
  settings.batch.enabled = true;

  app.save(settings);
});
