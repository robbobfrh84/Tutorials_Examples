# Use your custom domain for your GitHub Pages repository.

*Note: This tutorial will use `namecheap.com` as an example domain registrar. However, it is not necessary to use Namecheap, as other registrars have similar interfaces.*

## Setting up on GitHub

Let's start by assuming you already have a GitHub repository ready to host. No? Start a new one and place the `index.html` file (found in this folder) in your repository. Push those changes to get something going.

1. Select your repository and find the **Settings** ⚙️ icon.
2. Scroll down until you find the **GitHub Pages** section.
3. Here you'll see a 'source' section with a dropdown box below. It may show a branch already or be set to 'none'.
4. Select **main branch** (or whatever branch you want to host from).
5. **Custom domain** should have an entry available now.
6. Put `example.com` 👈 Yep, that should be YOUR domain + [Save].
   - *NOTE: Don't add www.*
7. [Save].


Now, go checkout your repo again.
- See `CNAME`, the new file created?
  - It should just have `example.com` in it. Yep, that guy should stay riiiight there.

## Setting up on your registrar

*NOTE: This example uses `namecheap.com`; other registrars may vary, but should be similar.*

In your dashboard on `namecheap.com`, find your domain name and click **Manage**.

- Remove any re-routes that may exist by default.
  - They'll mess up re-routing procedures with GitHub. See 'Re-route errors' below.

Find the tab that says **Advanced DNS**.

![domain](img/domain.png)

Now, you're going to add **four** `A Record` entries:
- for `Host` select `@` for all
- for `TTL` select `automatic` for all
- for `value` use each of these numbers:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

Also, add **YOUR** GitHub username with the `github.io` extension.
- Example: `robbobfrh84.github.io`

Save them all! And...
Checkout your `example.com` in the browser!

Did it work?
- Yes? Nice!
- NO? You may have to wait a few minutes. However, double-check that everything is trimmed and isolated to what is directed here. Compare to these photos.

![stuff](img/stuff.png)

## Delays

Delays may vary from region to region. In my experience, setting this up in Austin, TX, I was able to view my site live within a few minutes after setting up all the parts.
- Remember to clear your cookies as they may cause additional delays.
- Also, test on mobile devices using cellular data.

## Re-route errors:

You may get an error telling you the page re-routed too many times. See the included image and check that you're not re-routing unnecessarily. If your registrar is showing something similar to the provided example, you may **need to remove** the page forwarding to fix the rerouting errors.

![rerout](img/reroute.png)
