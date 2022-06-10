document.addEventListener("DOMContentLoaded", () => {
    let last_podcast_url = "";
    const show_button = document.querySelector(".show_button");
    show_button.addEventListener("click", async () => {
        const podcast_url = document.querySelector(".podcast_url").value;

        if (!podcast_url || podcast_url === last_podcast_url) {
            return false;
        } else {
            last_podcast_url = podcast_url;
        }
        const secret_message = document.querySelector(".secret_message");
        secret_message.style.visibility = "visible";
        window.setTimeout(() => {
            secret_message.style.visibility = "hidden";
        }, 3000);
        const podcast_feed = await (await fetch(podcast_url)).text();
        const titleMatch = podcast_feed.match(/<title>([^<]+)<\/title>/);
        if (titleMatch.length > 0) {
            const h3 = document.createElement("h3");
            h3.textContent = titleMatch[1];
            document.body.appendChild(h3);
        }
        const enclosures = podcast_feed.match(/\<enclosure[^\>]+/gi);
        const media_urls = enclosures.map((tag) => {
            const url = tag.match(/url="([^"]+)"/);
            return url.length > 0 && url[1];
        });

        media_urls.forEach((media_url) => {
            const anchor = document.createElement("a");

            anchor.href = media_url;
            anchor.textContent = media_url;
            document.body.appendChild(anchor);

            const br = document.createElement("br");
            document.body.appendChild(br);
        });
    });
});
