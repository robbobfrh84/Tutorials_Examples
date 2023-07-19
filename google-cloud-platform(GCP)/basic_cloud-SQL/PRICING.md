# Pricing!

Please note that by default you will be using the `db-n1-standard-1` pricing model, which will $1-2 USD a day.

To change to a cheaper/testing option. Go go to your instance in the GC console and click `edit`

Fist option is to change your "machine type" to using the "micro" storage.
- Select the menu icon > sql > and find YOUR sql instance
- Under the Configuration section find and click `Configure machine type and storage`
- Select the smallest type: `db-f1-micro` for a shared server use.
- Don't forget to select [save] > It'll notify you that you'll need to restart your server.
  - This may take a few minuets.

Your second options is to just "pause" your instance. This will make it so it dosn't change you while paused.
- Select the menu icon > sql > and find YOUR sql instance
- Find and select the ⏹ "stop" button
