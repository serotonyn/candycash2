migrate((app) => {
  let settings = app.settings();

  settings.meta.appName = "CandyCash";
  settings.batch.enabled = true;

  settings.backups.cron = "0 12 * * *";

  app.save(settings);
});
