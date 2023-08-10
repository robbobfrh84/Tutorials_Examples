# Using Your Custom Domain for Your GitHub Pages Repository - 2023

*Note: This tutorial uses `namecheap.com` as an illustrative domain registrar. However, you can choose any domain registrar you prefer, as other registrars offer similar interfaces.*

- It's recommended to have already purchased a domain before proceeding with this guide.

## GitHub Setup

Assuming you have a GitHub repository ready for hosting, follow these steps:

1. Go to your repository and locate the ⚙️ **Settings** icon.
2. Click the **Pages** button in the left navigation.
3. In this section, find the 'Branch' subsection with a dropdown menu for selecting the deployment branch. It might already display a branch or have 'none' selected.
4. Choose the **main branch** or your preferred hosting branch.
5. Locate the **Custom domain** field.
6. Enter `example.com` 👈 Remember, this should be YOUR domain. Then, click [Save].
   - *Note: Do not include the 'www' prefix.*
7. Confirm the changes by clicking [Save].

Refresh the page, and you might see a yellow notification under your domain stating "DNS Check in Progress.", or that there was an error. That's ok for now, as we haven't yet configured the domain on the registrar side yet.



Return to your repository's root level code and ensure you're viewing the selected branch.

- Do you see the newly created `CNAME` file? It should contain only `example.com`. Make sure it remains unchanged.



## Setting Up on Your Registrar

*NOTE: This example uses `namecheap.com`; other registrars may have slight variations, but the general process should be similar.*

1. **Accessing Your Domain Dashboard**

   Log in to your account on `namecheap.com` and locate your domain name. Click on **Manage** to proceed.

2. **Removing Default Re-routes or "Host Records"**

   Check for any existing re-routes or "Host Records" that might be set by default. These could interfere with the GitHub re-routing process. Refer to the section 'Re-route Errors' below for more details.

3. **Configuring Advanced DNS Settings**

   Look for the tab labeled **Advanced DNS**.

![domain](img/domain.png)

4. **Adding A Record Entries**

   You'll need to add a total of **four** `A Record` entries. Follow these steps for each entry:

   - In the `Host` column, choose `@` for all.

   - For the `TTL` (Time To Live) column, select `automatic` for all.

   - In the `Value` column, input the following IP addresses:

     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
   - 185.199.111.153
   
5. **Adding Your GitHub Username**

   Additionally, you'll need to add an entry for your GitHub Pages using your GitHub username with the `github.io` extension. Follow these steps:

   - Select `CNAME Record` for the `A Record` column.
   - In the `Host` column, choose `www`.
   - In the `Value` column, enter your GitHub account URL. For example: `robbobfrh84.github.io`.
   - Set the `TTL` to `automatic`.

   Your configuration should resemble the example below:

![stuff](img/stuff.png)



6. **Saving Your Records**

   It's crucial to save each record individually. To do so, click on the green checkmark icon ✅ for each record. (Note: This icon is not shown in the provided image as the records were already saved.)

Please remember to follow these steps meticulously to ensure proper setup. Incorrect configuration might result in issues. If you encounter any problems, refer to the 'Re-route Errors' section or seek assistance from your registrar's support.



## Final Steps

Please revisit your GitHub repository and navigate to the **Pages** section within the **Settings** tab.

- Locate and select the checkbox ✅ labeled "Enforce HTTPS."

If everything is functioning correctly, your link should be prominently displayed at the top of this page.

- Nonetheless, it's worth mentioning that I have encountered a few minor hiccups and delays while getting this process to run smoothly in the past.

## Addressing Delays

The duration of delays might vary based on your geographical region. From my personal experience, when I set up this feature in Oakland, CA, I noticed that my site didn't go live immediately. However, after a few hours and by following the steps below, I achieved successful results:

- Remember to clear your browser cookies, as they could potentially contribute to additional delays.
- Additionally, it's a good idea to test the site on mobile devices using cellular data, as they might sometimes display the site before others.

You might also come across a GitHub alert indicating that your domain is *'improperly configured'* in the **Pages** section, even though the link is functional🤔.

- I encountered this situation myself, and interestingly, the alert had disappeared when I logged in the next day.
- My suspicion is that GitHub's actions system on that particular page needed some time to catch up.

## Addressing Re-route Errors

There's a possibility of encountering an error message indicating that the page has been re-routed excessively. Please refer to the accompanying image and ensure that you're not unnecessarily implementing re-routing. If your registrar's interface resembles the provided example, it might be necessary to **remove** the page forwarding to rectify any re-routing errors.

![rerout](img/reroute.png)
